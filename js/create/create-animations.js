function _animations() {
    //Hős animációk
    this.anims.create({ 
        key: 'hero-idle', 
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-idle-', start: 1, end: 4 }),
        frameRate: 7,
        repeat: -1
    });


    this.anims.create({
        key: 'hero-run',
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-run-', start: 1, end: 6 }),
        frameRate: 12,
        repeat: -1
    });


    this.anims.create({
        key: 'hero-jump',
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-jump-', start: 1, end: 3 }),
        frameRate: 7
    });


    this.anims.create({
        key: 'hero-fall',
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-jump-', start: 3, end: 4 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'hero-attack',
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-attack-', start: 1, end: 5 }),
        frameRate: 10
    });


    this.anims.create({
        key: 'hero-attack-magic',
        frames: this.anims.generateFrameNames('atlas-hero', { prefix: 'hero-attack-', start: 1, end: 5 }),
        frameRate: 10
    });


    this.anims.create({
        key: 'fire-ball',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-', start: 5, end: 1 }),
        frameRate: 20,
        repeat: -1
    });


    /*
    this.anims.create({
        key: 'fire-ball-2',
        frames: this.anims.generateFrameNames('atlas-weapon', { prefix: 'fire-', start: 5, end: 1 }),
        frameRate: 20,
        repeat: -1
    });


    this.anims.create({
        key: 'fire-ball-3',
        frames: this.anims.generateFrameNames('atlas-weapon', { prefix: 'fire-', start: 5, end: 1 }),
        frameRate: 20,
        repeat: -1
    });
    */


    this.anims.create({
        key: 'fire-disappear',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-disappear-', start: 1, end: 3 }),
        frameRate: 35
    });


    this.anims.create({
        key: 'fire-bomb-enemy',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-bomb-', start: 1, end: 5 }),
        frameRate: 20,
        repeat: -1
    });


    this.anims.create({
        key: 'fire-bomb-enemy-disappear',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-bomb-disappear-', start: 1, end: 3 }),
        frameRate: 10
    });


    this.anims.create({
        key: 'fire-ball-enemy',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-ball-', start: 1, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    //Ellenségek
    this.anims.create({
        key: 'hell-gato',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'hell-gato-', start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'skeleton-rise-clothed',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'skeleton-rise-clothed-', start: 1, end: 6 }),
        frameRate: 7
    });


    this.anims.create({
        key: 'skeleton-clothed',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'skeleton-clothed-', start: 1, end: 8 }),
        frameRate: 8,
        repeat: -1
    });


    this.anims.create({
        key: 'hell-beast-idle',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'hell-beast-idle-', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'hell-beast-breath',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'hell-beast-breath-', start: 1, end: 4 }),
        frameRate: 20
    });


    this.anims.create({
        key: 'hell-beast-burn',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'hell-beast-burn-', start: 1, end: 6 }),
        frameRate: 7,
        repeat: -1
    });


    this.anims.create({
        key: 'fire-ball-enemy-disappear',
        frames: this.anims.generateFrameNames('atlas-weapons', { prefix: 'fire-ball-disappear-', start: 1, end: 3 }),
        frameRate: 35
    });


    this.anims.create({
        key: 'enemy-death',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'enemy-death-', start: 1, end: 5 }),
        frameRate: 7
    });


    this.anims.create({
        key: 'enemy-death-beast',
        frames: this.anims.generateFrameNames('atlas-enemies', { prefix: 'enemy-death-beast-', start: 1, end: 5 }),
        frameRate: 7
    });


    //Obijektumok
    this.anims.create({
        key: 'coin-gold',
        frames: this.anims.generateFrameNames('atlas-objects', { prefix: 'coin-gold-', start: 1, end: 6 }),
        frameRate: 14,
        repeat: -1
    });


    this.anims.create({
        key: 'coin-silver',
        frames: this.anims.generateFrameNames('atlas-objects', { prefix: 'coin-silver-', start: 1, end: 6 }),
        frameRate: 12,
        repeat: -1
    });


    this.anims.create({
        key: 'coin-bronz',
        frames: this.anims.generateFrameNames('atlas-objects', { prefix: 'coin-bronz-', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });


    //Egy képkockából animáció csinálása
    this.anims.create({
        key: 'hero-crouch',
        frames: [{
            frame: 'hero-crouch',
            key: 'atlas-hero'
        }]
    });


    this.anims.create({
        key: 'hero-hurt',
        frames: [{
            frame: 'hero-hurt',
            key: 'atlas-hero'
        }]
    });


    this.anims.create({
        key: 'potion',
        frames: [{
            frame: 'magic-potion',
            key: 'atlas-objects'
        }]
    });


    this.anims.create({
        key: 'barrel',
        frames: [{
            frame: 'barrel',
            key: 'atlas-objects'
        }]
    });


    this.anims.create({
        key: 'heart',
        frames: [{
            frame: 'heart-1',
            key: 'atlas-hud'
        }]
    });
}