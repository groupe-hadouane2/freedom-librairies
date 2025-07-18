const express = require('express');
const weaponsController = require('../controllers/weaponsController');

const router = express.Router();

// Health check
router.get('/health', weaponsController.healthCheck);

// Weapon statistics
router.get('/weapons/stats', weaponsController.getWeaponStats);

// Search weapons (must be before /:name route to avoid conflicts)
router.get('/weapons/search', weaponsController.searchWeapons);

// Get all weapons
router.get('/weapons', weaponsController.getAllWeapons);

// Get weapon by name/id
router.get('/weapons/:name', weaponsController.getWeaponByName);

module.exports = router;