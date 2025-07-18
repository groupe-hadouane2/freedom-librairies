const weaponService = require('../services/weaponService');

class WeaponsController {
  /**
   * Get all weapons
   */
  async getAllWeapons(req, res, next) {
    try {
      const weapons = await weaponService.getAllWeapons();
      
      res.json({
        success: true,
        count: weapons.length,
        data: weapons
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get weapon by name/id
   */
  async getWeaponByName(req, res, next) {
    try {
      const { name } = req.params;
      const weapon = await weaponService.getWeaponByName(name);

      if (!weapon) {
        return res.status(404).json({
          success: false,
          message: `Weapon '${name}' not found`
        });
      }

      res.json({
        success: true,
        data: weapon
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search weapons
   */
  async searchWeapons(req, res, next) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query parameter "q" is required'
        });
      }

      const weapons = await weaponService.searchWeapons(q);

      res.json({
        success: true,
        query: q,
        count: weapons.length,
        data: weapons
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get weapon statistics
   */
  async getWeaponStats(req, res, next) {
    try {
      const stats = await weaponService.getWeaponStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(req, res) {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
      },
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  }
}

module.exports = new WeaponsController();