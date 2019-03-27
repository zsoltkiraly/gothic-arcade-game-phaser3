function _physics() {
    var death = false;

    //Ütközés a játékos a pályával
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, wall);
    this.physics.add.collider(player, groundFloat);
    this.physics.add.collider(player, building);

    this.physics.add.collider(enemies, ground);
    this.physics.add.collider(enemies, wall);


    this.physics.add.collider(key, objectFloats);
    this.physics.add.collider(key, ground);
    this.physics.add.collider(key, wall);

    this.physics.add.collider(potions, wall);
    this.physics.add.collider(potions, ground, (potion)=> {
        potion.body.setVelocityX(0);
    });
    

    this.physics.add.collider(coins, wall);
    this.physics.add.collider(coins, ground, (coin) => {
        coin.body.setVelocityX(0);
    });



    this.physics.add.collider(hearts, wall);
    this.physics.add.collider(hearts, ground, (coin) => {
        coin.body.setVelocityX(0);
    });


    //Ütközés a láthatatlan fallal és visszafordulás
    this.physics.add.collider(enemies, invisibleWallLeft, (enemy) => {

        if(invisibleWallLeft.layer.name) {
            enemy.flipX = true;
        }
    });


    this.physics.add.collider(enemies, invisibleWallRight, (enemy) => {

        if(invisibleWallRight.layer.name) {
            enemy.flipX = false;
        }
    });


    //Átfedés a játékos és a tüskék között
    this.physics.add.collider(player, impalement, _impalementCollider, null, this);

    function _impalementCollider(player, object) {
        jumpingFlag = true;
        _losesLife.call(this);

        if(maximumHealth <= 3) {
            setTimeout(()=> {
                if(player.body) {
                    player.body.setVelocityY(-280);
                    player.anims.play('hero-jump', true);
                }
            }, 100);
        }
    }


    //Átfedés az ajtók és a játékos között
    this.physics.add.overlap(player, doors, (player, door)=> {
        if(haveKey.visible == true) {
            doorClose.setVisible(false);
        }
    }, null, this);


    //Átfedés hordó és az érme között
    this.physics.add.overlap(barrels, coins, (barrel, coin)=> {
        coin.setVisible(false);
        coin.setData('data-id', barrel.getData('data-id'));
    }, null, this);


    //Átfedés a hordó és a plusz élet között
    this.physics.add.overlap(barrels, hearts, (barrel, heart)=> {
        heart.setVisible(false);
        heart.setData('data-id', barrel.getData('data-id'));
    }, null, this);


    //Átfedés a hordó és a bájital között
    this.physics.add.overlap(barrels, potions, (barrel, potion)=> {
        potion.setVisible(false);
        potion.setData('data-id', barrel.getData('data-id'));
    }, null, this);


    //Átfedés a játékos és az ellenféllel között
    this.physics.add.overlap(player, enemies, _enemyOverlapPlayer, null, this);


    function _losesLifeEnemy(enemy) {
        if(enemy.data.list[3].value == 'skeleton' && haveKey.visible == true) {

            _losesLife.call(this);

        } else if(enemy.data.list[3].value !== 'skeleton') {

             _losesLife.call(this);
        }
    } 


    function _enemyOverlapPlayer(player, enemy) {

        if(player.x < enemy.x) {

            if(attackingflag) {

                _losesLifeEnemy.call(this, enemy);

            } else {

                if(player.flipX == false && enemy.flipX == false || player.flipX == false && enemy.flipX == true) {

                    _enemyDestroy.call(this, enemy);

                } else {

                    _losesLifeEnemy.call(this, enemy);
                }
            }
        } else if(player.x > enemy.x) {

            if(attackingflag) {

                _losesLifeEnemy.call(this, enemy);
            } else {
                if(player.flipX == true && enemy.flipX == true || player.flipX == true && enemy.flipX == false) {

                    _enemyDestroy.call(this, enemy);

                } else {

                    _losesLifeEnemy.call(this, enemy);
                }
            }
        }
    }


    //Átfedés a játékos és az ellenség által eldobott érme között
    //Az ellenfelek egyenlőre egyetlen egy változó értékű és változó kinézetű érmét tudnak elejteni
    this.physics.add.overlap(player, enemyCoinsArray, _enemyCoinsOverlapPlayer, null, this);

    function _enemyCoinsOverlapPlayer(player, enemyCoin) {
        score += parseFloat(enemyCoin.getData('data-coin-value'));
        scoreText.setText(score);

        if(enemyCoin.getData('data-coin-name') == 'gold') {

            _takeUp.call(this, 2, 0, 0, 17, 0, 0.6, enemyCoin);

        } else if(enemyCoin.getData('data-coin-name') == 'silver') {
            
            _takeUp.call(this, 3, 0, 0, 17, 0, 0.6, enemyCoin);

        } else if(enemyCoin.getData('data-coin-name') == 'bronz') {

            _takeUp.call(this, 4, 0, 0, 17, 0, 0.6, enemyCoin);
        }

        enemyCoin.body.setVelocityX(0);
        enemyCoin.body.setAllowGravity(false);
        enemyCoin.destroy();
    }


    //Átfedés a játékos a hordó között
    this.physics.add.overlap(player, barrels, _barrelOverlapPlayer, null, this);

    function _barrelOverlapPlayer(player, barrel) {

        if(!attackingflag) {
            //Hordó széttörik
            _visibleObjects(coinsArray, barrel, true, true, 4, -300, 'coin');
            _visibleObjects(heartsArray, barrel, true, true, 6,-350, 'heart');
            _visibleObjects(potionsArray, barrel, true, true, 2,-250, 'potion');

            //TODO amíg nem készül el a hordó széttörési animáció
            _takeUp.call(this, 5, -15, 7, 25, 0.4, 0.8, barrel);
            _removeObjects.call(this, barrels, barrel, false);
        }
    }


    //Átfedés a játékos a mágikus üveg között
    this.physics.add.overlap(player, potions, _potionOverlapPlayer, null, this);

    function _potionOverlapPlayer(player, potion) {

        if(maximumBullets < 3 && crouch) {

            _removeObjects.call(this, potions, potion, false);
            maximumBullets = bulletsReload;
            _takeUp.call(this, 1, -5, 10, 12, 0, 0.3, potion);

            for(var i = 0; i < playerMagicAbility.length; i++) {

                playerMagicAbility[i].setVisible(true);
            }
        }
    }

    bullets = this.physics.add.group({ allowGravity: false });
    //bullets.maxSize = maximumBullets;

    this.physics.add.collider(bullets, ground);
    this.physics.add.collider(bullets, wall, _bulletColliderWall, null, this);


    function _bulletColliderWall(bullet, wall) {

        bullet.anims.play('fire-disappear', true);

        bullet.on('animationcomplete', () => {
            bullet.destroy();
        }, this);
    }


    this.physics.add.collider(bullets, groundFloat, _bulletColliderWallTop, null, this);

    function _bulletColliderWallTop(bullet, wall) {

        if(!bullet.body.onFloor()) {
            bullet.anims.play('fire-ball-disappear', true);

            bullet.on('animationcomplete', () => {
                bullet.destroy();
            }, this);
        }
    }


    enemyBullets = this.physics.add.group({ allowGravity: false });

    this.physics.add.collider(enemyBullets, ground, _enemyBulletsColliderGround, null, this);

    function _enemyBulletsColliderGround(bullet, ground) {

        bullet.body.width = 40;
        bullet.body.height = 20;
        bullet.body.setVelocityX(0);
        bullet.anims.play('fire-bomb-enemy-disappear', true);

        bullet.on('animationcomplete', () => {
            bullet.destroy();
        }, this);
    }

    this.physics.add.collider(enemyBullets, wall, _enemyBulletsColliderWall, null, this);

    function _enemyBulletsColliderWall(bullet, wall) {

        bullet.anims.play('fire-ball-enemy-disappear', true);

        bullet.on('animationcomplete', () => {
            bullet.destroy();
        }, this);
    }


    this.physics.add.collider(enemyBullets, groundFloat, _enemyBulletsColliderWallTop, null, this);

    function _enemyBulletsColliderWallTop(bullet, wall) {

        if(!bullet.body.onFloor()) {

            bullet.anims.play('fire-ball-enemy-disappear', true);

            bullet.on('animationcomplete', () => {
                bullet.destroy();
            }, this);
        }
    }


    this.physics.add.overlap(enemyBullets, player, _enemyBulletsColliderPlayer, null, this);

    function _enemyBulletsColliderPlayer(player, bullet) {

        if(bullet.getData('data-animation') == 'fire-bomb-enemy') {

            bullet.anims.play('fire-bomb-enemy-disappear', true);

        } else if(bullet.getData('data-animation') == 'fire-ball-enemy') {

            bullet.anims.play('fire-ball-enemy-disappear', true);
        }

        _losesLife.call(this);

        bullet.on('animationcomplete', () => {
            bullet.destroy();
        }, this);
    }


    this.physics.add.overlap(bullets, enemies, _bulletOverlapEnemy, null, this);

    function _bulletOverlapEnemy(bullet, enemy) {

        //Hogy lássuk eltaláltuk az ellenfelet, átszinezzük egy pillanatra.
        enemy.setTintFill('0xffffff');
        enemy.health -= bullet.damage;

        if (enemy.health < 1) {
            _enemyDestroy.call(this, enemy);
        }

        //Találat esetén eltültetni a játéktérről azonnal
        bullet.setActive(false).setVisible(false);
        bullet.y = -200;

        //30 milisec után töröljük az átszinezést
        setTimeout(() => {
            enemy.clearTint();
        }, 30);
    }


    this.physics.add.overlap(bullets, barrels, _bulletOverlapBarrel, null, this);

    function _bulletOverlapBarrel(player, barrel) {
        //Hordó széttörik
        _visibleObjects(coinsArray, barrel, true, true, 4, -300, 'coin');
        _visibleObjects(heartsArray, barrel, true, true, 10,-350, 'heart');
        _visibleObjects(potionsArray, barrel, true, true, 4,-150, 'potion');

        //TODO amíg nem készül el a hordó széttörési animáció
        _takeUp.call(this, 5, -15, 7, 25, 0.4, 0.8, barrel);
        _removeObjects.call(this, barrels, barrel, false);
    }


    //Blend effekt, object követéssel
    function _takeUp(color, x, y, speed, start, end, follow) {

        var particles = this.add.particles('blend');

        var emitter = particles.createEmitter({
            frame: color,
            x: x,
            y: y,
            speed: speed,
            scale: { start: start, end: end },
            blendMode: 'ADD'
        });

        emitter.startFollow(follow);

        this.time.delayedCall(1000, function() {
            particles.destroy();
        });
    }


    //Átfedés a játékos az érme között
    this.physics.add.overlap(player, coins, _coinOverlapPlayer, null, this);

    function _coinOverlapPlayer(player, coin) {

        if(coin.visible && attackingflag) {

            function _takeUpCoin(blend) {

                score += coin.data.list[1].value;
                scoreText.setText(score);
                _takeUp.call(this, blend, 0, 0, 17, 0, 0.6, coin);
                _removeObjects.call(this, coins, coin, false);
            }

            if(coin.data.list[0].value == 'gold') {

                _takeUpCoin.call(this, 2);

            } else if(coin.data.list[0].value == 'silver') {
                
                _takeUpCoin.call(this, 3);

            } else if(coin.data.list[0].value == 'bronz') {

                _takeUpCoin.call(this, 4);
            }
        }
    }


    //Átfedés a játékos a plusz élet között
    this.physics.add.overlap(player, hearts, _heartsOverlapPlayer, null, this);

    function _heartsOverlapPlayer(player, heart) {

        if(heart.visible && attackingflag && maximumHealth < 3) {

            //Élet felvétel
            _takeUp.call(this, 0, 0, 0, 17, 0, 0.6, heart);
            _removeObjects.call(this, hearts, heart, false);

            if(maximumHealth == 2) {
                maximumHealth = 3;
                playerHealth[2].setVisible(true);


            } else if(maximumHealth == 1) {
                maximumHealth = 2;
                playerHealth[1].setVisible(true);
            }

        }
    }


    //Átfedés a játékos a kulcs között
    this.physics.add.overlap(player, key, _keyOverlapPlayer, null, this);

    function _keyOverlapPlayer(player, key) {

        _takeUp.call(this, 2, 0, 0, 17, 0, 0.6, key);
        key.destroy();
        haveKey.setVisible(true);
    }


    function _visibleObjects(array, object, visible, gravity, setVelocityX, setVelocityY, animation) {

        for(var i = 0; i < array.length; i++) {
            let el = array[i];

            if(el.getData('data-id') == object.getData('data-id')) {

                if(animation == 'coin') {

                    //Arany
                    if(el.data.list[0].value == 'gold') {

                        el.anims.play('coin-gold', true);
                        el.body.setVelocityX(setVelocityX);
                        el.body.width = 23;
                        el.body.height = 24;
                        el.body.setOffset(0, -2);

                    //Ezüst
                    } else if(el.data.list[0].value == 'silver') {
                        
                        el.anims.play('coin-silver', true);
                        el.body.width = 21;
                        el.body.height = 20;
                        el.body.setOffset(0, 1);
                        el.body.setVelocityX(setVelocityX + 12);

                    //Bronz
                    } else if(el.data.list[0].value == 'bronz') {

                        el.anims.play('coin-bronz', true);
                        el.body.width = 18;
                        el.body.height = 17;
                        el.body.setOffset(0, 1);
                        el.body.setVelocityX(setVelocityX + 20);
                    }
                } else {
                    el.body.setVelocityX(setVelocityX);
                    el.anims.play(animation, true);
                }

                el.body.setAllowGravity(gravity);
                el.setVisible(visible);
                el.body.setVelocityY(setVelocityY);
            }
        }
    }


    function _losesLife() {

        if(losesLifeOverlap) {

            if(maximumHealth > 1 && !death) {

                maximumHealth = maximumHealth - 1;

                losesLifeOverlap = false;

                player.setTintFill('0xffffff');
                setTimeout(() => { player.clearTint(); }, 50);
                setTimeout(() => { player.setTintFill('0xffffff'); }, 150);
                setTimeout(() => { player.clearTint(); }, 200);
                setTimeout(() => { player.setTintFill('0xffffff'); }, 300);
                setTimeout(() => { player.clearTint(); }, 350);

                var healthIcon = playerHealth[maximumHealth];

                if(healthIcon) {
                    healthIcon.setVisible(false);
                }
            } else {

                death = true;

                maximumHealth = healthRestart;
                maximumBullets = bulletsReload;
                
                //Nincs több élet, a játék úra indul a pálya elejéről
                this.registry.destroy();
                this.events.off();
                this.scene.restart('game');
            }
        } else {

            setTimeout(()=> {
                losesLifeOverlap = true;
            }, 1000);
        }
    }


    function _enemyDestroy(enemy) {
        if(enemy.data.list[0].value != '') {

            //Ellenség eldob egy érmét
            enemyCoins = this.physics.add.sprite(enemy.x, enemy.y, '', '');

            if(enemy.data.list[0].value == 'gold') {

                enemyCoins.anims.play('coin-gold', true);

            } else if(enemy.data.list[0].value == 'silver') {

                enemyCoins.anims.play('coin-silver', true);

            } else if(enemy.data.list[0].value == 'bronz') {

                enemyCoins.anims.play('coin-bronz', true);
            }

            enemyCoins.body.setVelocityX(15);
            enemyCoins.body.width = 23;
            enemyCoins.body.height = 24;
            enemyCoins.body.setOffset(0, -2);
            enemyCoins.body.setAllowGravity(true);
            enemyCoins.body.setVelocityY(-200);
            enemyCoins.body.setBounceY(0.5);
            enemyCoins.setData('data-coin-name', enemy.data.list[0].value);
            enemyCoins.setData('data-coin-value', enemy.data.list[1].value);

            this.physics.add.collider(enemyCoins, wall);
            this.physics.add.collider(enemyCoins, ground, ()=> {
                enemyCoins.body.setVelocityX(0);
            });

            enemyCoinsArray.push(enemyCoins);
        }

        //Ellenség meghal
        _removeObjects.call(this, enemies, enemy, true);
        enemy.body.width = 26;
        enemy.body.height = 49;
        enemy.body.setOffset(0);
        enemy.destroy();
    }


    function _removeObjects(objects, object, animation) {
        objects.remove(object, false, false);
        object.body.setVelocityX(0);
        object.body.setAllowGravity(false);

        if(animation) {

            if(object.data.list[3].value == 'hell-gato' || object.data.list[3].value == 'skeleton') {

                object.anims.play('enemy-death', false);
                object.on('animationcomplete', () => {
                    object.destroy();
                }, this);

            } else if(object.data.list[3].value == 'hell-beast') {

                object.anims.play('enemy-death-beast', false);

                object.on('animationcomplete', () => {
                    object.destroy();
                }, this);
            }
        } else {
            object.destroy();
        }
    }
}