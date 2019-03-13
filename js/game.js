var config = {
    type: Phaser.AUTO,
    width: camWidth,
    height: camHeight,
    backgroundColor: '#000000',
    pixelArt: true,
    camreaOffset: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 100,
            gravity: { y: 400 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {

    load.call(this);
}

function create () {

    screen();

    _animations.call(this);
    _background.call(this);
    _tilemap.call(this);
    _objects.call(this);
    _physics.call(this);
    _weapons.call(this);
    _hud.call(this);

    //Kamera követi a játékost
    if(config.camreaOffset) {

        cam = this.cameras.main.startFollow(player, false, 0.1, 0.1, -100, 0);
    } else {

        cam = this.cameras.main.startFollow(player, true);
    }

    //Átfedéssel indul a játék
    cam.fadeIn(1000, 0, 0, 0);

    //Irányítás
    cursors = this.input.keyboard.createCursorKeys();
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
}

function update (time, delta) {

    //Hős
    _heroUpdate.call(this);
    _bulletMaxDistance();

    //Ellenfelek
    _enemiesUpdate.call(this);
}