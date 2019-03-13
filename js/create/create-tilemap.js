function _tilemap() {

    var tilesObjects = map.addTilesetImage('gothic-vania-object');
    var tilesTileset = map.addTilesetImage('gothic-vania-tileset');


    //z-index betöltési sorrend szerint
    map.createStaticLayer('buildingWall', tilesTileset, 0, 0);
    building = map.createStaticLayer('building', tilesTileset, 0, 0);
    objects = map.createStaticLayer('objects', tilesObjects, 0, 0);


    //Ajtók (egyenlőre egy van)
    doors = this.physics.add.group({ allowGravity: false, immovable: true, moves: false });

    doors.addMultiple(
      map.createFromObjects('doors', 'door', { key: '' })
    );

    doors.getChildren().forEach((door, index) => {
        
        door.body.setAllowGravity(false);
        door.setVisible(false);
        door.body.width = door.data.list[1].value;
        door.body.height = door.data.list[0].value;
        door.setOrigin(0.5, -0.5);

        doorOpen = this.add.image(door.x - 25, door.y + 18, 'atlas-objects', 'door-open-1').setOrigin(0).setDepth(0);
        doorClose = this.add.image(door.x - 25, door.y + 18, 'atlas-objects', 'door-close-1').setOrigin(0).setDepth(0);
    }, this);

    impalement = map.createStaticLayer('impalement', tilesTileset, 0, 0);
    ground = map.createStaticLayer('ground', tilesTileset, 0, 0);
    wall = map.createStaticLayer('wall', tilesTileset, 0, 0);
    groundFloat = map.createStaticLayer('groundFloat', tilesTileset, 0, 0);

    //Bal és jobb oldali láthatatlan fal
    invisibleWallLeft = map.createStaticLayer('invisibleWallLeft', tilesTileset, 0, 0);
    invisibleWallRight = map.createStaticLayer('invisibleWallRight', tilesTileset, 0, 0);


    //Azok az elemek, amelyeknek a collides property-je true, azokkal ütközni lehet.
    ground.setCollisionByProperty({ collides: true });
    wall.setCollisionByProperty({ collides: true });
    impalement.setCollisionByProperty({ collides: true });
    building.setCollisionByProperty({ collides: true });


    //Ütközés a bal és jobb oldali láthatatlan fallal
    invisibleWallLeft.setCollisionByProperty({ collidesLeft: true });
    invisibleWallRight.setCollisionByProperty({ collidesRight: true });

    if(!config.physics.arcade.debug) {
        invisibleWallLeft.setVisible(false);
        invisibleWallRight.setVisible(false);
    }


    //Kamera követés kezdő és végpont között ütközésig
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}