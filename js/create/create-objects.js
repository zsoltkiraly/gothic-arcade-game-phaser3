function _objects() {

    //Mozgó platformok létrehozás a játéktérre
    var objectFloatPointArray = [];

    objectFloatsPoints = this.physics.add.group({ allowGravity: false });

    objectFloatsPoints.addMultiple(
      map.createFromObjects('objectFloatsPoints', 'objectFloatPoint', { key: '' })
    );

    objectFloatsPoints.getChildren().forEach((objectFloatPoint, index) => {

        objectFloatPoint.setVisible(false);
        objectFloatPointArray.push(objectFloatPoint);

        let objectImage;

        if(objectFloatPoint.data.list[0].value == 'small') {
            objectImage = 'float-object-small';

        } else if(objectFloatPoint.data.list[0].value == 'big') {
            objectImage = 'float-object-big';
        }

        objectFloat = this.physics.add.image(objectFloatPoint.x, objectFloatPoint.y, objectImage).setImmovable(true);
        objectFloat.body.setAllowGravity(false);

        _floatObjectTweens.call(this, objectFloat, objectFloatPoint.data.list[2].value, 0, objectFloatPoint.data.list[1].value);

        objectFloats.push(objectFloat);
    }, this);


    function _floatObjectTweens(object, x, y, time) {
        this.tweens.timeline({
            targets: object.body.velocity,
            loop: -1,
            tweens: [
                {
                    x: x,
                    y: y,
                    duration: time,
                    ease: 'Stepped'
                },
                {
                    x: -x,
                    y: y,
                    duration: time,
                    ease: 'Stepped'
                }
            ]
        });
    }

    for (var i = 0; i < objectFloatPointArray.length; i++) {
        objectFloatPointArray[i].destroy();
    }


    //Varázsital létrehozás a játéktérre
    potions = this.physics.add.group({ allowGravity: false });

    potions.addMultiple(
      map.createFromObjects('potions', 'potion', { key: '' })
    );

    potions.getChildren().forEach((potion, index) => {

        potion.anims.play('potion');
        potion.body.width = 10;
        potion.body.height = 15;
        potion.setOrigin(1.6, -0.75);
        potion.body.setBounceY(0.5);
        potionsArray.push(potion);
    }, this);


    //Hordó létrehozás a játéktérre
    barrels = this.physics.add.group({ allowGravity: false, immovable: true, moves: false });

    barrels.addMultiple(
      map.createFromObjects('barrels', 'barrel', { key: '' })
    );


    barrels.getChildren().forEach((barrel, index) => {

        barrel.setData('data-id', index);
        barrel.anims.play('barrel');
        barrel.body.width = 30;
        barrel.body.height = 32;
        barrel.setOrigin(1.3, 0.2);
        barrelsArray.push(barrel);
    }, this);


    //Érme létrehozás a játéktérre
    coins = this.physics.add.group({ allowGravity: false, immovable: true, moves: false });

    coins.addMultiple(
      map.createFromObjects('coins', 'coin', { key: '' })
    );

    coins.getChildren().forEach((coin, index) => {

        coin.setData('data-id', index);
        coin.body.width = 20;
        coin.body.height = 20;
        coin.body.setBounceY(0.5);
        coinsArray.push(coin);
    }, this);


    //Élet létrehozás a játéktérre
    hearts = this.physics.add.group({ allowGravity: false, immovable: true, moves: false });

    hearts.addMultiple(
      map.createFromObjects('hearts', 'heart', { key: '' })
    );

    hearts.getChildren().forEach((heart, index) => {

        heart.body.width = 18;
        heart.body.height = 18;
        heart.body.setBounceY(0.3);
        heart.setScale(0.8);
        heart.body.setOffset(-8, -15.5);

        this.tweens.add({
            targets: heart,
            duration: 300,
            delay: 0,
            scaleX: 1,
            scaleY: 1,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        heartsArray.push(heart);
    }, this);  


    //Ellenfelek hozzáadása a játéktérhez
    enemies = this.physics.add.group({allowGravity: true});

    enemies.addMultiple(
      map.createFromObjects('enemies', 'enemy', { key: '' })
    );

    enemies.getChildren().forEach((enemy, index) => {

        enemy.setData('data-id', index);
        enemy.body.setCollideWorldBounds(true);
        enemy.body.setBounceX(1);

        if(enemy.data.list[3].value == 'hell-gato') {

            enemy.body.width = 70;
            enemy.body.height = 35;
            enemy.body.setOffset(10, 17);
            enemy.body.setVelocityX(-100);
            enemy.anims.play('hell-gato', true);
            enemy.health = enemy.data.list[2].value;

        } else if(enemy.data.list[3].value == 'hell-beast') {

            enemy.body.setVelocityX(0);
            enemy.anims.play('hell-beast-idle', true);
            enemy.health = enemy.data.list[2].value;

        } else if(enemy.data.list[3].value == 'skeleton') {

            enemy.anims.play('skeleton-rise-clothed', true);
            enemy.setVisible(false);
            enemy.body.width = 36;
            enemy.body.height = 44;
            enemy.body.setOffset(4, 8);
            enemy.health = enemy.data.list[2].value;
        }
    }, this);


    //Játékos
    var hero = map.findObject('hero', obj => obj.name === 'hero',);

    player = this.physics.add.sprite(hero.x, hero.y, 'atlas-hero', 'hero-idle-1');
    player.setCollideWorldBounds(true);


    //Kulcs
    var keyPoint = map.findObject('key', obj => obj.name === 'key',);

    key = this.physics.add.sprite(keyPoint.x, keyPoint.y, 'atlas-objects', 'key-1');
    key.body.setAllowGravity(true);
    key.body.setVelocityX(0);
}