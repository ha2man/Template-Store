const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const { ROLES } = require('../../constants');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { backupDatabase } = require('../../services/backupService');

// add manual backup
router.post('/manual', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
      const user = req.user;
  
      backupDatabase('manual');
  
      res.status(200).json({
        success: true,
        message: `Manual database backup has been done successfully!`,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});

// add auto backup
router.post('/auto', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
      const user = req.user;
  
      backupDatabase('auto');
  
      res.status(200).json({
        success: true,
        message: `Auto database backup has been done successfully!`,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});