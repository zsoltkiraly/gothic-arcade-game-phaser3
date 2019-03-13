function _hud() {

	var health, magic;

	playerHealth = [];
	playerMagicAbility = [];

	for(var i = 0; i <= 2; i++) {

		this.add.image(5 + (i*22), 5, 'atlas-hud', 'heart-2').setOrigin(0).setScrollFactor(0);
		this.add.image(7 + (i*22), 25, 'atlas-hud', 'magic-2').setOrigin(0).setScrollFactor(0);

		health = this.add.image(5 + (i*22), 5, 'atlas-hud', 'heart-1').setOrigin(0).setScrollFactor(0);
		health.setDataEnabled();
		health.data.set('data-id', i);
		//health.setScale(0.5);

		magic = this.add.image(7 + (i*22), 25, 'atlas-hud', 'magic-1').setOrigin(0).setScrollFactor(0);
		magic.setDataEnabled();
		magic.data.set('data-id', i);
		//magic.setScale(0.5);

		playerHealth.push(health);
		playerMagicAbility.push(magic);

	}


	//Kulcs
	this.add.image(80, 6, 'atlas-objects', 'key-2').setOrigin(0).setScrollFactor(0);
	haveKey = this.add.image(80, 6, 'atlas-objects', 'key-1').setOrigin(0).setScrollFactor(0).setVisible(false);

	//Érme
	this.add.image(355, 5, 'atlas-objects', 'coin-gold-1').setOrigin(0).setScrollFactor(0);

    let addFont = this.add;

    WebFont.load({
        custom: {
            families: [ 'pixel' ]
        },
        active: function () {
            scoreText = addFont.text(350, 2.5, '0', {fontFamily: 'pixel', fontSize: '20px', fill: '#fff',	align: 'right'}).setOrigin(1, 0).setScrollFactor(0);
        }
    });

}