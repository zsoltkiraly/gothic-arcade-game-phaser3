function _background() {
    map = this.add.tilemap('map');

	var bgMoon = this.add.tileSprite(0, 0, 384, 224, 'bg-moon').setOrigin(0);

    //Teljes map szélességet megkapják a hátterek és egy kis szorzót is, hogy a parallax effekt utóhatásaként a háttérkép kitartson
	var bgMountains = this.add.tileSprite(0, 0, map.widthInPixels * 1.8, 224, 'bg-mountains').setOrigin(0, -0.5);
	var bgGraveyard = this.add.tileSprite(0, 0, map.widthInPixels * 1.8, 224, 'bg-graveyard').setOrigin(0, -0.5);

	//Háttér fixálása, ne mozogjon a kamerával
	bgMoon.setScrollFactor(0);

	//Parallax mozgatás
	bgMountains.setScrollFactor(0.8, 0.8);
	bgGraveyard.setScrollFactor(0.4, 0.7);
}