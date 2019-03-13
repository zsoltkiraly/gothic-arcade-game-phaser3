//Hős mozgása
function _heroUpdate() {

    //Játékos animáció vége esetén
    player.on('animationcomplete', _playerAnimComplete, this);

    this.physics.add.collider(player, objectFloats, (objectFloat) => {
        sureGround = true;
    });


    //Kamera pozíció beállítása
    if(config.camreaOffset) {
        if(player.flipX) {
            cam.followOffset.x = 100;

        } else {
            cam.followOffset.x = -100;
        }
    }


    if(player.body !== undefined) {
        var bodyOnFloor = player.body.velocity.y == 0;

        if (player.body.onFloor()) { sureGround = true; }
        if (bodyOnFloor && sureGround) { jumpingFlag = false; }

    }


    //Ugráskor a levegőben
    if(jumpingFlag){
        
        _fall();

    } else {

        if(attackingflag) {

            //Földön
            if(bodyOnFloor) {
                    player.body.setVelocityX(0);

                if (cursors.left.isDown && !crouch) {

                    //Futás visszafelé
                    player.body.setVelocityX(-200);

                    player.anims.play('hero-run', true);
                    player.body.width = 63;
                    player.body.height = 49;
                    player.body.setOffset(0);
                    player.flipX = true;

                } else if (cursors.right.isDown && !crouch) {

                    //Futás előre
                    player.body.setVelocityX(200);

                    player.anims.play('hero-run', true);
                    player.body.width = 63;
                    player.body.height = 49;
                    player.body.setOffset(0);
                    player.flipX = false;
                } else {

                    player.body.setVelocityX(0);

                    //Guggolás
                    if (cursors.down.isDown && bodyOnFloor) {

                        player.anims.play('hero-crouch');
                        player.body.width = 60;
                        player.body.height = 32;
                        player.body.setOffset(0, 17);
                        crouch = true;
                    } else {

                        if(bodyOnFloor) {

                            player.anims.play('hero-idle', true);
                            player.body.width = 58;
                            player.body.height = 49;
                            player.body.setOffset(0);
                            crouch = false;
                        }
                    }
                }

            //Lezuhanás 
            } else {

                setTimeout(()=>{
                    _fall();
                }, 100)
            }
        }
    }


    //Ugrás
    if (cursors.up.isDown && bodyOnFloor && sureGround) {

        player.body.setVelocityY(-300);
        player.anims.play('hero-jump', true);
        player.body.width = 54;
        player.body.height = 49;
        jumpingFlag = true;
        groundFloat.setCollisionByProperty({collides: true}, false);
    }


    //Támadás
    if (bodyOnFloor && sureGround && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X))) {

        player.body.setVelocityX(0);
        attackingflag  = false;
        player.anims.play('hero-attack', true);

        //A támadás szélessége 92px, de 65px-re állítom, mert így élethűbb és egy kicsit kilóg a kard (offest 20)
        player.body.width = 68;
        player.body.height = 49;

        if(player.flipX) {
            player.body.setOffset(6, 0);

        } else {

            player.body.setOffset(17, 0);
        }
    }

    /*
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE))) {
        setWeapon = 'fire-ball-1';
    }

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO))) {
        setWeapon = 'fire-ball-2';
    }

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE))) {
        setWeapon = 'fire-ball-3';
    }
    */

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C))) {

        if(attackingflag) {

            maximumBullets = maximumBullets - 1;

            if(maximumBullets >= 0) {
                player.body.setVelocityX(0);

                _weapon(bullet, bullets, weapons, player, null, null);

                playerMagicAbility[maximumBullets].setVisible(false);

                player.anims.play('hero-attack-magic', true);
                player.body.width = 92;
                player.body.height = 49;
                attackingflag  = false;
            }
        }
    }

    //Függvény amiben definiálhatunk bármit, ha az animáció véget ért.
    function _playerAnimComplete(animation) {

        if (animation.key === 'hero-attack' || animation.key === 'hero-attack-magic') {
            attackingflag = true;
        }
    }


    //Zuhanás
    function _fall() {

        sureGround = false;
        jumpingFlag = true;

        if(player.body != undefined) {

            if(player.body.velocity.y > 0) {

                player.anims.play('hero-fall', true);
                player.body.width = 54;
                player.body.height = 49;
                groundFloat.setCollisionByProperty({collides: true});
                player.body.setVelocityX(0);
            }

            if (cursors.left.isDown) {

                player.body.setVelocityX(-100);
                player.flipX = true;

            } else if (cursors.right.isDown) {

                player.body.setVelocityX(100);
                player.flipX = false;
            }
        }
    }
}


function _bulletMaxDistance() {

    let camWordViewLeft = cam.worldView.x;
    let camWordViewRight = camWordViewLeft + camWidth;

    if(bulletDistance) {
        if(cam.worldView.x > bulletDistance.x) {

            bulletDistance.destroy();

        } else if(camWordViewRight < bulletDistance.x) {

            bulletDistance.destroy();
        }
    }
}


function _enemiesUpdate() {

    enemies.getChildren().forEach((enemy, index) => {
        if(enemy.body !== undefined) {
            if(enemy.data.list[3].value == 'hell-beast') {

                _enemyTurnPlayer(player, enemy);

                //Távolság az ellenség és a játékos között (kevesebb mint 200)
                if(Math.abs(player.x - enemy.x) < 170) {

                    if(enemyAttackingflag && hellBeastBurn > 0) {

                        hellBeastBurn--;

                        enemy.body.width = 44;
                        enemy.body.height = 60;
                        enemy.body.setOffset(0, 99);
                        enemy.anims.play('hell-beast-breath', true);
                        enemyAttackingflag = false;

                        enemy.on('animationcomplete', ()=> { enemy.anims.play('hell-beast-idle', true); }, this);

                        _weapon(bullet, bullets, weapons, enemy, 'hell-beast', enemy.data.list[4].value);

                        setTimeout(()=>{

                            enemyAttackingflag = true;
                        }, 2000);

                    } else {

                        if(enemyAttackingflag) {

                            hellBeastBurn = 3;
                            enemyAttackingflag = false;

                            enemy.anims.play('hell-beast-burn', true);
                            enemy.body.width = 69;
                            enemy.body.height = 159;
                            enemy.body.setOffset(-7, 0);

                            setTimeout(()=> {
                                enemyAttackingflag = true;
                            }, 2700);
                        }
                    }
                } else {

                    enemy.body.width = 48;
                    enemy.body.height = 60;
                    enemy.body.setOffset(0, 99);
                    enemy.anims.play('hell-beast-idle', true);
                }
            } else if(enemy.data.list[3].value == 'skeleton' && haveKey.visible == true) {

                enemy.body.setBounceX(1);

                if(Math.abs(player.x - enemy.x) < 170) {

                    if(skeletonRising) {

                        enemy.setVisible(true);
                        enemy.anims.play('skeleton-rise-clothed', true);

                        enemy.on('animationcomplete', ()=> {
                            skeletonRising = false;
                        }, this);
                    } else {

                        if(Math.abs(player.x - enemy.x) < 120) {

                            _enemyTurnPlayer(player, enemy);
                        }

                        _enemyMove(enemy, 'skeleton-clothed', 18);
                    }

                } else {
                    if(!skeletonRising) {

                        _enemyMove(enemy, 'skeleton-clothed', 18);
                    }
                }
            }
        }
    }, this);


    function _enemyTurnPlayer(player, enemy) {
        //Játékos felé fordul
        if(player.x - 60 > enemy.x) {

            enemy.flipX = true;
        } else if(player.x + 60 < enemy.x) {

            enemy.flipX = false;
        }
    }


    function _enemyMove(enemy, animation, speed) {
        enemy.anims.play(animation, true);

        if(enemy.flipX) {
            enemy.body.setVelocityX(speed);
        } else {
            enemy.body.setVelocityX(-speed);
        }
    }
}