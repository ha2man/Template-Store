const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const { ROLES } = require('../../constants');
const Maintenance = require('../../models/maintenance');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// Create a new maintenance
router.post('/', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
      const { from_date, to_date, description } = req.body;

      const maintenance = new Maintenance({
        from_date,
        to_date,
        description
      });
  
      await maintenance.save();
  
      res.status(200).json({
          success: true,
          message: `Maintenance has been added successfully!`,
          maintenance
      });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create maintenance request' });
    }
});
  
// Get all maintenances
router.get('/', async (req, res) => {
    try {
      const maintenances = await Maintenance.find().sort({ created: -1 });
  
      res.status(200).json(maintenances);
    } catch (error) {
      res.status(400).json({ error: 'Failed to retrieve maintenance history' });
    }
  });
  
// Get a specific maintenance by ID
router.get('/:id', async (req, res) => {
    try {
      const maintenance = await Maintenance.findById(req.params.id);
  
      if (!maintenance) {
        return res.status(404).json({ error: 'Maintenance not found' });
      }
  
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
});
  
// Update a maintenance by ID
router.put('/:id', async (req, res) => {
    try {
      const { from_date, to_date, description } = req.body;
  
      const updatedMaintenance = await Maintenance.findByIdAndUpdate(
        req.params.id,
        { from_date, to_date, description },
        { new: true }
      );
  
      if (!updatedMaintenance) {
        return res.status(404).json({ error: 'Maintenance not found' });
      }
  
      res.status(200).json(updatedMaintenance);
    } catch (error) {
      res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
});

// Delete a maintenance by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedMaintenance = await Maintenance.findByIdAndRemove(req.params.id);
  
      if (!deletedMaintenance) {
        return res.status(404).json({ error: 'Maintenance not found' });
      }
  
      res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (error) {
      res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
});


module.exports = router;