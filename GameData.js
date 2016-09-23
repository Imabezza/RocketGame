// JavaScript source code
var upgradeValues = new Array();
upgradeValues.push("Rocket Power");
upgradeValues.push("Rocket Fuel Tank");
upgradeValues.push("Rocket Fuel Consumption");
upgradeValues.push("Booster Power");
upgradeValues.push("Booster Fuel Tank");
upgradeValues.push("Booster Fuel Consumption");
upgradeValues.push("Health");
upgradeValues.push("Armour");
upgradeValues.push("Fuselage Type");
upgradeValues.push("Weight");
upgradeValues.push("Control");
upgradeValues.push("Cash Magnet");
upgradeValues.push("Cash Multiplier");

upgradeValues.push("Level Gold Collected");
upgradeValues.push("Level Balloons Collected");


var missionsArray = [
    { "name": "Reach 100 m", "variable": "altitude", "value": 100, "description": "Get a height of 1000m off the ground", "image": "balloon_green", "reward value": 500, "reward unit": "gold", },
    { "name": "Reach 1000 m", "variable": "altitude", "value": 1000, "description": "Get a height of 1000m off the ground", "image": "balloon_green", "reward value": 1000, "reward unit": "gold", },
    { "name": "Reach 5000 m", "variable": "altitude", "value": 5000, "description": "Get a height of 5000m off the ground", "image": "balloon_green", "reward value": 5000, "reward unit": "gold" },
    { "name": "Reach 50000 m", "variable": "altitude", "value": 50000, "description": "Get a height of 50000m off the ground", "image": "balloon_green", "reward value": 50000, "reward unit": "gold" },
    { "name": "Reach 100000 m", "variable": "altitude", "value": 100000, "description": "Get a height of 100000m off the ground", "image": "balloon_green", "reward value": 100000, "reward unit": "gold" },
    { "name": "Land on space station", "variable": "land", "value": 1, "description": "Land on space station", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Visit mountains", "variable": "visit", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Visit ocean", "variable": "visit", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Coin collect 10", "variable": "collect", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Balloon collect 10", "variable": "collect", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Destroy plane", "variable": "destroy", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Destroy asteroid", "variable": "destroy", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
    { "name": "Destroy alien", "variable": "destroy", "value": 1, "description": "", "image": "image.jpg", "reward value": 100000, "reward unit": "gold" },
];

var missionsUnachieved = [];


function newGameData(slot_id) {
    missionsUnachieved = Array.apply(this, missionsArray);

    var items = new Array();
    items['GamePresent'] = true;
    items['Player Gold'] = 0;

    items['Launch Max Altitude'] = 0;
    items['Launch Max Speed'] = 0;

    items['Record Height'] = 0;
    items['Record Speed'] = 0;

    items['Rocket Fuel Remaining'] = 0;
    items['Booster Fuel Remaining'] = 0;

    items['Targeter Active'] = "true";
    items['Targeter Target'] = -1;

    var level = 1;
    for (var i = 0; i < upgradeValues.length; i++) {
        items["UpgradeValue-" + upgradeValues[i]] = level;
        for (var ud = 0; ud < upgradeData.length; ud++) {
            upgrade = upgradeData[ud];
            if (upgrade.level == level) {
                items[upgradeValues[i]] = upgrade[upgradeValues[i]];
                break;
            }
        }
    }

    for (var m = 0; m < missionsArray.length; m++) {
        items["MissionAchieived-" + missionsArray[m].name] = "false";
    }

    for (var key in items) {
        itemString = "RocketGame_Slot" + slot_id + "_" + key;
        localStorage.setItem(itemString, items[key]);
    }
}
function updateGameData(slot_id) {
    handleMissionAchievements();

    var items = new Array();
    items['GamePresent'] = true;
    items['Player Gold'] = 500;

    items['Launch Max Altitude'] = 0;
    items['Launch Max Speed'] = 0;

    items['Record Height'] = 0;
    items['Record Speed'] = 0;

    items['Rocket Fuel Remaining'] = 0;
    items['Booster Fuel Remaining'] = 0;

    var level = 1;
    for (var i = 0; i < upgradeValues.length; i++) {
        items["UpgradeValue-" + upgradeValues[i]] = level;
        for (var ud = 0; ud < upgradeData.length; ud++) {
            upgrade = upgradeData[ud];
            if (upgrade.level == level) {
                items[upgradeValues[i]] = upgrade[upgradeValues[i]];
                break;
            }
        }
    }

    for (var key in items) {
        itemString = "RocketGame_Slot" + slot_id + "_" + key;
        items[key] = localStorage.getItem(itemString);
    }

    if (items['Record Height'] < playerAltitude) {
        items['Record Height'] = playerAltitude;
    }
    if (items['Launch Max Altitude'] < playerAltitude) {
        items['Launch Max Altitude'] = playerAltitude;
    }
    if (items['Record Speed'] < playerSpeed) {
        items['Record Speed'] = playerSpeed;
    }
    if (items['Launch Max Speed'] < playerSpeed) {
        items['Launch Max Speed'] = playerSpeed;
    }

    for (var key in items) {
        itemString = "RocketGame_Slot" + slot_id + "_" + key;
        localStorage.setItem(itemString, items[key]);
    }

    for (var i = 0, length = entitiesList.length; i < length; i++) {
        entity = entitiesList[i];
        if (entity.uniqueName == "player") {

            if (entity.health < 0) {
                entity = playerDeath(entity);
            }
            updateHUD(SLOT_ID, entity);
            setBackgroundColour(playerAltitude);
            handleObjectLoading(playerAltitude);
            break;
        }
    }
    if (GAME_END_TIME > 0) {
        currentTime = timestamp();
        if (currentTime > GAME_END_TIME) {
            var gold = parseInt(getGameData("Player Gold"));
            gold += parseInt(getGameData("Launch Max Altitude"));
            setGameData("Player Gold", gold);

            setGameData("Launch Max Altitude", 0);
            setGameData("Launch Max Speed", 0);

            MENU = "EndLaunchMenu";
            PAUSED = true;
            GAME_END_TIME = -1;
        }
    }
}
function getGameData(item) {
    var itemString = "RocketGame_Slot" + SLOT_ID + "_" + item;
    var value = localStorage.getItem(itemString);
    return value;
}
function getGameData_slotid(item, SLOT_ID) {
    var itemString = "RocketGame_Slot" + SLOT_ID + "_" + item;
    var value = localStorage.getItem(itemString);
    return value;
}
function setGameData(item, value) {
    var itemString = "RocketGame_Slot" + SLOT_ID + "_" + item;
    localStorage.setItem(itemString, value);
}
function setGameData_slotid(item, value, SLOT_ID) {
    var itemString = "RocketGame_Slot" + SLOT_ID + "_" + item;
    localStorage.setItem(itemString, value);
}
function handleMissionAchievements() {
    for (var m = 0; m < missionsUnachieved.length; m++) {
        mission = missionsUnachieved[m];
        if (mission.variable == "altitude") {
            if (playerAltitude > mission.value) {
                //alert(mission.name);
                addPopupDisplay(10, 400, mission.name + " achieved!", 5000);

                if (mission['reward unit'] == "gold") {
                    var gold = Number(getGameData("Player Gold"));
                    var newGold = gold + mission['reward value'];
                    setGameData("Player Gold", newGold);
                }

                setGameData("MissionAchieived-" + mission.name, "true");
                missionsUnachieved.splice(m, 1);

            }
        }
    }
}


function handleObjectLoading(altitude) {

    var c = 0;
    var altLow = altitude - (cameraList[c].lensY * 3);
    var altHigh = altitude + cameraList[c].lensY;

    for (var ld = 0; ld < levelData.length; ld++) {
        if (levelData[ld].level == LEVEL) {
            if (levelData[ld].type == "dynamic") {
                var ldYMin = levelData[ld].yMin;
                var ldYMax = levelData[ld].yMax;
                if (levelData[ld].loaded == false) {                   
                    if (ldYMin < altHigh && altLow < ldYMax) {
                        createDynamicObject(ld);
                        levelData[ld].loaded = true;
                    }
                }
                if (levelData[ld].loaded == true) {
                    if (ldYMin > altHigh || altLow > ldYMax) {
                        var deleteArray = new Array();
                        for (var e = 0; e < entitiesList.length; e++) {
                            if (entitiesList[e].name == levelData[ld].name) {
                                deleteArray.push(e);
                            }
                        }
                        deleteDynamicObjects(deleteArray);
                        levelData[ld].loaded = false;
                    } 
                }
            }
        }
    }
}

function createDynamicObject(ld){
    for (var sd = 0; sd < spriteData.length; sd++) {
        if (levelData[ld].name == spriteData[sd].name) {
            for (var f = 0; f < levelData[ld].frequency; f++) {
                var x = 0;
                var y = 0;
                var z = 0;
                var vx = 0;
                var vy = 0;
                var vz = 0;
                var ax = 0;
                var ay = 0;
                var az = 0;

                

                if (levelData[ld].xMin < 0 && levelData[ld].xMax >= 0) {
                    x = Math.floor(((Math.random() * levelData[ld].xMax) * 2) + levelData[ld].xMin);
                } else if (levelData[ld].xMin >= 0 && levelData[ld].xMax < 0) {
                    x = Math.floor((Math.random() * levelData[ld].xMax) + (levelData[ld].xMin * 2));
                } else {
                    x = Math.floor((Math.random() * (levelData[ld].xMax - levelData[ld].xMin)) + levelData[ld].xMin);
                }

                if (levelData[ld].yMin < 0 && levelData[ld].yMax >= 0) {
                    y = Math.floor(((Math.random() * levelData[ld].yMax) * 2) + levelData[ld].yMin);
                } else if (levelData[ld].yMin >= 0 && levelData[ld].yMax < 0) {
                    y = Math.floor((Math.random() * levelData[ld].yMax) + (levelData[ld].yMin * 2));
                } else {
                    y = Math.floor((Math.random() * (levelData[ld].yMax - levelData[ld].yMin)) + levelData[ld].yMin);
                }

                if (levelData[ld].vxMin < 0 && levelData[ld].vxMax >= 0) {
                    vx = Math.floor(((Math.random() * levelData[ld].vxMax) * 2) + levelData[ld].vxMin);
                } else if (levelData[ld].vxMin >= 0 && levelData[ld].vxMax < 0) {
                    vx = Math.floor((Math.random() * levelData[ld].vxMax) + (levelData[ld].vxMin * 2));
                } else {
                    vx = Math.floor((Math.random() * levelData[ld].vxMax) + levelData[ld].vxMin);
                }

                if (levelData[ld].vyMin < 0 && levelData[ld].vyMax >= 0) {
                    vy = Math.floor(((Math.random() * levelData[ld].vyMax) * 2) + levelData[ld].vyMin);
                } else if (levelData[ld].vyMin >= 0 && levelData[ld].vyMax < 0) {
                    vy = Math.floor((Math.random() * levelData[ld].vyMax) + (levelData[ld].vyMin * 2));
                } else {
                    vy = Math.floor((Math.random() * levelData[ld].vyMax) + levelData[ld].vyMin);
                }

                
                x = x + cameraList[0].getMidX();
                y = y * -1;

                var parentid = -1;
                entitiesList.push(new PhysicsEntity(nxtEL, parentid, levelData[ld].name, levelData[ld].uniqueName, spriteData[sd].collisionName, spriteData[sd].restitution, spriteData[sd].mass, spriteData[sd].type, x, y, z,
                spriteData[sd].width, spriteData[sd].height, spriteData[sd].depth, spriteData[sd].ExtInt, spriteData[sd].imageName, spriteData[sd].control, vx, vy, vz, ax, ay, az, spriteData[sd].health));
                nxtEL++;
            }
        }
    }
}

function deleteDynamicObjects(deleteArray) {
    entitiesList.splice(deleteArray[0], deleteArray.length);
}