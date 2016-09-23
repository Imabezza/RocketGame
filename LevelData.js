// JavaScript source code

var cameraData = [
    { "x": 0, "y": 0, "z": 2, "type": "ortho", "lensX": 800, "lensY": 600, "zoom": 1, "followId": "player", "minX": null, "minY": null, "minZ": 0, "maxX": null, "maxY": 0, "maxZ": 10 }
]

var spriteData = [
    { "name": "flame", "imageName": "flame", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "none", "control": "none", "lifetime": 1 },
    { "name": "smoke", "imageName": "smoke", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "none", "control": "none", "lifetime": 250 },
    { "name": "anim_explosion", "imageName": "anim_explosion", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 100, "height": 100, "depth": 0, "ExtInt": "none", "control": "none", "lifetime": 1000, "animNumbFrames": 10 },
    { "name": "flame_blue", "imageName": "flame_blue", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "none", "control": "none", "lifetime": 1 },

    { "name": "player", "imageName": "player", "collisionName": PhysicsEntity_ELASTIC, "restitution": 0.9, "mass": 1, "type": PhysicsEntity_DYNAMIC, "width": 50, "height": 50, "depth": 0, "ExtInt": "external", "control": "player" },


    { "name": "coin", "imageName": "coin", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "external", "control": "none" },
    { "name": "speed_boost", "imageName": "speed_boost", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "external", "control": "none" },

    { "name": "background_hills", "imageName": "background_hills", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 4000, "height": 400, "depth": 0, "ExtInt": "none", "control": "none" },
    //{ "name": "background_ground", "imageName": "background_ground", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 2400, "height": 1700, "depth": 0, "ExtInt": "none", "control": "none" },
    //{ "name": "background_day", "imageName": "background_day", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 2400, "height": 1700, "depth": 0, "ExtInt": "none", "control": "none" },
    //{ "name": "background_dusk", "imageName": "background_dusk", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 2400, "height": 1700, "depth": 0, "ExtInt": "none", "control": "none" },
    //{ "name": "background_night", "imageName": "background_night", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 2400, "height": 1700, "depth": 0, "ExtInt": "none", "control": "none" },

    { "name": "ground", "imageName": "", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0.9, "mass": 1, "type": PhysicsEntity_KINEMATIC, "width": 2400, "height": 50, "depth": 0, "ExtInt": "external", "control": "none" },
    { "name": "boulder_small", "imageName": "boulder_small", "collisionName": PhysicsEntity_ELASTIC, "restitution": 0.9, "mass": 3, "type": PhysicsEntity_KINEMATIC, "width": 50, "height": 50, "depth": 0, "ExtInt": "external", "control": "AI", "health": 200  },
    { "name": "boulder_large", "imageName": "boulder_large", "collisionName": PhysicsEntity_ELASTIC, "restitution": 0.9, "mass": 9, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 75, "depth": 0, "ExtInt": "external", "control": "AI", "health": 200 },
    { "name": "cloud_white_small", "imageName": "cloud_white_small", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 75, "depth": 0, "ExtInt": "none", "control": "AI" },
    { "name": "cloud_white_whisp", "imageName": "cloud_white_whisp", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 150, "height": 75, "depth": 0, "ExtInt": "none", "control": "AI" },
    { "name": "cloud_grey_small", "imageName": "cloud_grey_small", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 75, "depth": 0, "ExtInt": "none", "control": "AI" },

    { "name": "balloon_green", "imageName": "balloon_green", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "external", "control": "none" },
    { "name": "balloon_blue", "imageName": "balloon_blue", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "external", "control": "none" },
    { "name": "balloon_red", "imageName": "balloon_red", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 25, "height": 25, "depth": 0, "ExtInt": "external", "control": "none" },

    { "name": "star_yellow_small", "imageName": "star_yellow_small", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 50, "height": 50, "depth": 0, "ExtInt": "none", "control": "AI" },
    { "name": "star_white_blue_small", "imageName": "star_white_blue_small", "collisionName": PhysicsEntity_NONE, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 50, "height": 50, "depth": 0, "ExtInt": "none", "control": "AI" },

    { "name": "alien_ship", "imageName": "alien_ship", "collisionName": PhysicsEntity_ELASTIC, "restitution": 0.9, "mass": 9, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 75, "depth": 0, "ExtInt": "external", "control": "AI", "health": 200 },
    { "name": "aeroplane_white", "imageName": "aeroplane_white_left", "collisionName": PhysicsEntity_ELASTIC, "restitution": 0.9, "mass": 9, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 75, "depth": 0, "ExtInt": "external", "control": "AI", "health": 200 },

    { "name": "tree_deciduous", "imageName": "tree_deciduous", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 75, "height": 125, "depth": 0, "ExtInt": "external", "control": "none" },

    { "name": "spaceship", "imageName": "spaceship", "collisionName": PhysicsEntity_STATIONARY, "restitution": 0.9, "mass": 0, "type": PhysicsEntity_KINEMATIC, "width": 125, "height": 125, "depth": 0, "ExtInt": "external", "control": "none" },


];


var levelData = [

    //{ "level": 1, "type": "static", "uniqueName": "background_ground", "name": "background_ground", "x": 0, "y": -1700, "z": -1, "vx": 0, "vy": 0, "vz": 0 },
    //{ "level": 1, "type": "static", "uniqueName": "background_day", "name": "background_day", "x": 0, "y": -2400, "z": -1, "vx": 0, "vy": 0, "vz": 0 },
    //{ "level": 1, "type": "static", "uniqueName": "background_dusk", "name": "background_dusk", "x": 0, "y": -4100, "z": -1, "vx": 0, "vy": 0, "vz": 0 },
    //{ "level": 1, "type": "static", "uniqueName": "background_night", "name": "background_night", "x": 0, "y": -5800, "z": -1, "vx": 0, "vy": 0, "vz": 0 },
    { "level": 1, "type": "static", "uniqueName": "player", "name": "player", "x": 100, "y": -51, "z": 1, "vx": 0, "vy": 0, "vz": 0 },
    { "level": 1, "type": "static", "uniqueName": "background_hills", "name": "background_hills", "x": 0, "y": -400, "z": -1, "vx": 0, "vy": 0, "vz": 0 },
    { "level": 1, "type": "static", "uniqueName": "ground", "name": "ground", "x": 0, "y": 0, "z": 0, "vx": 0, "vy": 0, "vz": 0 },

    { "level": 1, "type": "static", "uniqueName": "spaceship", "name": "spaceship", "x": 1000, "y": -16000, "z": 0, "vx": 0, "vy": 0, "vz": 0 },
    /*
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "coin", "xMin": -1500, "xMax": 1500, "vxMin": -0, "vxMax": 0, "yMin": 500, "yMax": 3000, "vyMin": 0, "vyMax": 0, "frequency": 15 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "speed_boost", "xMin": -1500, "xMax": 1500, "vxMin": -0, "vxMax": 0, "yMin": 500, "yMax": 2500, "vyMin": 0, "vyMax": 0, "frequency": 15 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "balloon_green", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 500, "yMax": 2500, "vyMin": 0, "vyMax": 0, "frequency": 10 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "balloon_red", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 1500, "yMax": 3500, "vyMin": 0, "vyMax": 0, "frequency": 10 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "balloon_blue", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 2500, "yMax": 4500, "vyMin": 0, "vyMax": 0, "frequency": 10 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "cloud_white_small", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 2000, "yMax": 4000, "vyMin": 0, "vyMax": 0, "frequency": 20 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "cloud_grey_small", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 4000, "yMax": 7000, "vyMin": 0, "vyMax": 0, "frequency": 20 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "cloud_white_whisp", "xMin": -1500, "xMax": 1500, "vxMin": -25, "vxMax": 25, "yMin": 7000, "yMax": 10000, "vyMin": 0, "vyMax": 0, "frequency": 20 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "aeroplane_white", "xMin": -1500, "xMax": 1500, "vxMin": -100, "vxMax": 100, "yMin": 7000, "yMax": 10000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "star_yellow_small", "xMin": -1500, "xMax": 1500, "vxMin": -5, "vxMax": 5, "yMin": 10000, "yMax": 15000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "star_white_blue_small", "xMin": -1500, "xMax": 1500, "vxMin": -5, "vxMax": 5, "yMin": 10000, "yMax": 15000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "boulder_small", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 10000, "yMax": 15000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "boulder_large", "xMin": -1500, "xMax": 1500, "vxMin": -50, "vxMax": 50, "yMin": 10000, "yMax": 15000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "alien_ship", "xMin": -1500, "xMax": 1500, "vxMin": -100, "vxMax": 100, "yMin": 15000, "yMax": 20000, "vyMin": 0, "vyMax": 0, "frequency": 25 },
    { "level": 1, "type": "dynamic", "loaded": false, "uniqueName": "", "name": "tree_deciduous", "xMin": -1500, "xMax": 1500, "vxMin": 0, "vxMax": 0, "yMin": 125, "yMax": 125, "vyMin": 0, "vyMax": 0, "frequency": 5 },
    */

    
];


var upgradeData = [
    { "level": 1, "Price": 500, "Rocket Power": 4, "Rocket Fuel Tank": 100, "Rocket Fuel Consumption": 1, "Armour": 100, "Health": 100, "Booster Power": 0, "Booster Fuel Tank": 0, "Booster Fuel Consumption": 1, "Fuselage Type": "normal_grey", "Weight": 100, "Control": 1, "Cash Magnet": 20, "Cash Multiplier": 1 },
    { "level": 2, "Price": 1000, "Rocket Power": 5, "Rocket Fuel Tank": 200, "Rocket Fuel Consumption": 2, "Armour": 1000, "Health": 150, "Booster Power": 4, "Booster Fuel Tank": 20, "Booster Fuel Consumption": 1, "Fuselage Type": "normal_grey", "Weight": 70, "Control": 2, "Cash Magnet": 40, "Cash Multiplier": 2 },
    { "level": 3, "Price": 2000, "Rocket Power": 10, "Rocket Fuel Tank": 300, "Rocket Fuel Consumption": 3, "Armour": 2000, "Health": 200, "Booster Power": 8, "Booster Fuel Tank": 40, "Booster Fuel Consumption": 1, "Fuselage Type": "normal_grey", "Weight": 50, "Control": 3, "Cash Magnet": 60, "Cash Multiplier": 3 },
    { "level": 4, "Price": 5000, "Rocket Power": 15, "Rocket Fuel Tank": 400, "Rocket Fuel Consumption": 4, "Armour": 3500, "Health": 250, "Booster Power": 12, "Booster Fuel Tank": 60, "Booster Fuel Consumption": 1, "Fuselage Type": "normal_grey", "Weight": 35, "Control": 4, "Cash Magnet": 80, "Cash Multiplier": 4 },
    { "level": 5, "Price": "-", "Rocket Power": 20, "Rocket Fuel Tank": 5000, "Rocket Fuel Consumption": 5, "Armour": 5000, "Health": 30000, "Booster Power": 16, "Booster Fuel Tank": 80, "Booster Fuel Consumption": 1, "Fuselage Type": "normal_grey", "Weight": 20, "Control": 5, "Cash Magnet": 100, "Cash Multiplier": 5 },
];

