const express = require('express');
const weaponsRoutes = require('./weapons');

const router = express.Router();

// Mount weapon routes
router.use('/', weaponsRoutes);

// API information endpoint
router.get('/', (req, res) => {
  res.json({
    message: '🎮 Freedom Librairies API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      weapons: {
        listAll: '/weapons',
        getByName: '/weapons/:name',
        search: '/weapons/search?q=:query',
        stats: '/weapons/stats'
      }
    },
    examples: {
      getAllWeapons: `${req.protocol}://${req.get('host')}/api/weapons`,
      getSpecificWeapon: `${req.protocol}://${req.get('host')}/api/weapons/minigun`,
      searchWeapons: `${req.protocol}://${req.get('host')}/api/weapons/search?q=rifle`,
      getStats: `${req.protocol}://${req.get('host')}/api/weapons/stats`
    }
  });
});

module.exports = router;