function load() {

    //Fontok
    this.load.script('webfont', 'js/lib/webfont.js');
    var element = document.createElement('style');

    document.head.appendChild(element);

    var sheet = element.sheet;
    var styles = '@font-face { font-family: "pixel"; src: url("assets/fonts/ttf/pixel.otf") format("opentype"); }\n';
    sheet.insertRule(styles, 0);


    //Betöltések atlas
    this.load.atlas('atlas-hero', 'assets/hero/atlas-hero.png', 'assets/hero/atlas-hero.json');
    this.load.atlas('atlas-enemies', 'assets/enemies/atlas-enemies.png', 'assets/enemies/atlas-enemies.json');
    this.load.atlas('atlas-weapons', 'assets/weapons/atlas-weapons.png', 'assets/weapons/atlas-weapons.json');
    this.load.atlas('atlas-objects', 'assets/objects/atlas-objects.png', 'assets/objects/atlas-objects.json');
    this.load.atlas('atlas-hud', 'assets/hud/atlas-hud.png', 'assets/hud/atlas-hud.json');

    //Betöltés map
    this.load.tilemapTiledJSON('map', 'assets/levels/level1/level1.json');

    //Betöltés image
    this.load.image('gothic-vania-tileset', 'assets/levels/tileset/gothic-vania-tileset.png');
    this.load.image('gothic-vania-object', 'assets/levels/objects/gothic-vania-object.png');

    this.load.image('bg-moon', 'assets/background/bg-moon.png');
    this.load.image('bg-mountains', 'assets/background/bg-mountains.png');
    this.load.image('bg-graveyard', 'assets/background/bg-graveyard.png');
    this.load.image('float-object-small', 'assets/float-objects/float-object-1.png');
    this.load.image('float-object-big', 'assets/float-objects/float-object-2.png');

    //Betöltés spritesheet
    this.load.spritesheet('blend', 'assets/effect/blend.png', { frameWidth: 40, frameHeight: 40 });
}

function resize() {

    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }

}

function screen() {
    window.addEventListener('resize', resize);
    resize();
}