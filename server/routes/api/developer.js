const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const { DEVELOPER_STATUS, ROLES } = require('../../constants');
const Developer = require('../../models/developer');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

// add developer api
router.post('/add', async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }

    if (!phoneNumber || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter a phone number and an email address.' });
    }

    const existingDeveloper = await Developer.findOne({ email });

    if (existingDeveloper) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const developer = new Developer({
      name,
      email,
      phoneNumber
    });
    const developerDoc = await developer.save();

    await mailgun.sendEmail(email, 'developer-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      developerDoc: developerDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// search developers api
router.get('/search', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { search } = req.query;

    const regex = new RegExp(search, 'i');

    const developers = await Developer.find({
      $or: [
        { phoneNumber: { $regex: regex } },
        { email: { $regex: regex } },
        { name: { $regex: regex } },
        { status: { $regex: regex } }
      ]
    })

    res.status(200).json({
      developers
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all developers api
router.get('/', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const developers = await Developer.find()
      .sort('-created')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Developer.countDocuments();

    res.status(200).json({
      developers,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// disable developer account
router.put('/:id/active', auth, async (req, res) => {
  try {
    const developerId = req.params.id;
    const update = req.body.developer;
    const query = { _id: developerId };

    const developerDoc = await Developer.findOneAndUpdate(query, update, {
      new: true
    });

    if (!update.isActive) {
      await mailgun.sendEmail(developerDoc.email, 'developer-deactivate-account');
    }

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// approve developer
router.put('/approve/:id', auth, async (req, res) => {
  try {
    const developerId = req.params.id;
    const query = { _id: developerId };
    const update = {
      status: DEVELOPER_STATUS.Approved,
      isActive: true
    };

    const developerDoc = await Developer.findOneAndUpdate(query, update, {
      new: true
    });

    await createDeveloperUser(
      developerDoc.email,
      developerDoc.name,
      developerId,
      req.headers.host
    );

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// reject developer
router.put('/reject/:id', auth, async (req, res) => {
  try {
    const developerId = req.params.id;

    const query = { _id: developerId };
    const update = {
      status: DEVELOPER_STATUS.Rejected
    };

    await Developer.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/signup/:token', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const userDoc = await User.findOne({
      email,
      resetPasswordToken: req.params.token
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const query = { _id: userDoc._id };
    const update = {
      email,
      firstName,
      lastName,
      password: hash,
      resetPasswordToken: undefined
    };

    await User.findOneAndUpdate(query, update, {
      new: true
    });

    const developerDoc = await Developer.findOne({
      email
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const developerId = req.params.id;
      await deactivateDeveloper(developerId);
      const developer = await Developer.deleteOne({ _id: developerId });

      res.status(200).json({
        success: true,
        message: `Developer has been deleted successfully!`,
        developer
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const createDeveloperUser = async (email, name, developer, host) => {
  const firstName = name;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      developer,
      role: ROLES.Developer
    };

    const developerDoc = await Developer.findOne({
      email
    });

    await mailgun.sendEmail(email, 'developer-welcome', null, name);

    return await User.findOneAndUpdate(query, update, {
      new: true
    });
  } else {
    const buffer = await crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');
    const resetPasswordToken = resetToken;

    const user = new User({
      email,
      firstName,
      lastName,
      resetPasswordToken,
      developer,
      role: ROLES.Developer
    });

    await mailgun.sendEmail(email, 'developer-signup', host, {
      resetToken,
      email
    });

    return await user.save();
  }
};

module.exports = router;
