function _weapons() {
    weapons = [

      { name: 'fire-ball', damage: 1, velocityX: 300, velosityY: 0, bounce: 0, gravity: false, },
      /*
      { name: 'fire-ball-2', damage: 1, velocityX: 150, velosityY: -150, bounce: 0.8, gravity: true,},

      { name: 'fire-ball-3', damage: 1, velocityX: 100, velosityY: 0, bounce: 0, gravity: true, }
      */

    ];
}

function _weapon(weaponBullet, weaponBullets, w, type, enemyType, enemyWeapon) {

  if(type.name !== 'enemy') {

    weaponBullet = weaponBullets.getFirstDead(true, type.x, type.y, '', 0);

    var activeWeapon = 'fire-ball';
    var activeWeaponObj = w.find(weapon => weapon.name === activeWeapon);

    if(activeWeaponObj) {
      weaponBullet.damage = activeWeaponObj.damage;

      _weaponType(weaponBullet, activeWeaponObj.velocityX, type, 41, 26, activeWeapon, activeWeaponObj.gravity, activeWeaponObj.velosityY, activeWeaponObj.bounce);

      bulletDistance = weaponBullet;
    }

  } else {

    if(enemyType == 'hell-beast') {

      setTimeout(()=>{

        let xPostion = -17,
            yPostion = 46;

        if (type.flipX !== false) {
          xPostion = 17;
        }

        enemyBullet = enemyBullets.getFirstDead(true, type.x + xPostion, type.y + yPostion, '', 0);

        if(enemyWeapon == 'fire-ball') {

          _weaponType(enemyBullet, Math.abs(player.x - type.x), type, 20, 20, 'fire-bomb-enemy', true, -150, 0);

        } else if(enemyWeapon == 'fire-bomb') {

          _weaponType(enemyBullet, 100, type, 30, 17, 'fire-ball-enemy', false, 0, 0);
        }

        bulletDistance = enemyBullet;
      }, 200)
    }
  }

  
  function _weaponType(bullet, velocityX, type, bodyWidth, bodyHeight, animation, garavity, velocityY, bounce) {

    var activeWeaponVelocityX = (type.name !== 'enemy') ? velocityX : velocityX * -1;

    if (type.flipX !== false) {

      activeWeaponVelocityX = (type.name !== 'enemy') ? velocityX * -1 : velocityX;

      bullet.flipX = true;

    } else {

      bullet.flipX = false;
    }
    bullet.setData('data-animation', animation);
    bullet.body.width = bodyWidth;
    bullet.body.height = bodyHeight;
    bullet.setActive(true).setVisible(true);
    bullet.anims.play(animation, true);
    bullet.body.setAllowGravity(garavity).setVelocity(activeWeaponVelocityX, velocityY).setBounceY(bounce);
  }
}