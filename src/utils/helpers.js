/**
 * Utility functions for the API
 */

/**
 * Format response data consistently
 */
const formatResponse = (success, data, message = null, meta = {}) => {
  const response = {
    success,
    timestamp: new Date().toISOString(),
    ...meta
  };

  if (message) {
    response.message = message;
  }

  if (data !== undefined) {
    response.data = data;
  }

  return response;
};

/**
 * Sanitize weapon name for search/comparison
 */
const sanitizeWeaponName = (name) => {
  return name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
};

/**
 * Validate search query
 */
const validateSearchQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return false;
  }
  
  const trimmed = query.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
};

/**
 * Calculate damage efficiency
 */
const calculateDamageEfficiency = (weapon) => {
  if (!weapon.damage || !weapon.recoil) {
    return null;
  }

  const avgDamage = (weapon.damage.head + weapon.damage.chest) / 2;
  const recoilPenalty = weapon.recoil.vertical || 1;
  
  return Math.round((avgDamage / recoilPenalty) * 10) / 10;
};

module.exports = {
  formatResponse,
  sanitizeWeaponName,
  validateSearchQuery,
  calculateDamageEfficiency
};