const fs = require('fs');
const path = require('path');

class WeaponService {
  constructor() {
    this.weaponsPath = path.join(__dirname, '../../weapon');
    this.weapons = null;
  }

  /**
   * Load all weapons from JSON files
   */
  async loadWeapons() {
    try {
      const files = fs.readdirSync(this.weaponsPath);
      const weaponFiles = files.filter(file => file.endsWith('.json'));
      
      this.weapons = [];

      for (const file of weaponFiles) {
        try {
          const filePath = path.join(this.weaponsPath, file);
          const weaponData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          // Extract weapon name from filename (remove weapon_ prefix and .json extension)
          const weaponId = file.replace('weapon_', '').replace('.json', '');
          
          this.weapons.push({
            id: weaponId,
            filename: file,
            ...weaponData
          });
        } catch (error) {
          console.warn(`⚠️  Warning: Could not parse weapon file ${file}:`, error.message);
        }
      }

      console.log(`✅ Loaded ${this.weapons.length} weapons`);
      return this.weapons;
    } catch (error) {
      console.error('❌ Error loading weapons:', error);
      throw error;
    }
  }

  /**
   * Get all weapons
   */
  async getAllWeapons() {
    if (!this.weapons) {
      await this.loadWeapons();
    }
    return this.weapons;
  }

  /**
   * Get weapon by name/id
   */
  async getWeaponByName(name) {
    if (!this.weapons) {
      await this.loadWeapons();
    }

    const weapon = this.weapons.find(w => 
      w.id.toLowerCase() === name.toLowerCase() ||
      w.name.toLowerCase() === name.toLowerCase()
    );

    return weapon || null;
  }

  /**
   * Search weapons by query
   */
  async searchWeapons(query) {
    if (!this.weapons) {
      await this.loadWeapons();
    }

    const searchTerm = query.toLowerCase();
    
    return this.weapons.filter(weapon => 
      weapon.name.toLowerCase().includes(searchTerm) ||
      weapon.id.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get weapon statistics
   */
  async getWeaponStats() {
    if (!this.weapons) {
      await this.loadWeapons();
    }

    const stats = {
      total: this.weapons.length,
      categories: {},
      averageDamage: 0,
      averageRecoil: 0
    };

    let totalHeadDamage = 0;
    let totalVerticalRecoil = 0;
    let validDamageCount = 0;
    let validRecoilCount = 0;

    this.weapons.forEach(weapon => {
      // Calculate averages
      if (weapon.damage && weapon.damage.head) {
        totalHeadDamage += weapon.damage.head;
        validDamageCount++;
      }

      if (weapon.recoil && weapon.recoil.vertical) {
        totalVerticalRecoil += weapon.recoil.vertical;
        validRecoilCount++;
      }
    });

    stats.averageDamage = validDamageCount > 0 ? Math.round(totalHeadDamage / validDamageCount) : 0;
    stats.averageRecoil = validRecoilCount > 0 ? Number((totalVerticalRecoil / validRecoilCount).toFixed(2)) : 0;

    return stats;
  }
}

module.exports = new WeaponService();