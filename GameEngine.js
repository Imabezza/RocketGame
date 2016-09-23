var canvas;
var canvasWidth;
var canvasHeight;
var context;
var backgroundColourHTML;
var IMAGES = ['background_ground', 'background_day', 'background_dusk', 'background_night', 'background_hills',
    'player',
    'boulder_small', 'boulder_large',
    'cloud_white_small', 'cloud_white_whisp', 'cloud_grey_small',
    'star_yellow_small', 'star_white_blue_small',
    'flame', 'smoke', 'flame_blue',
    'anim_explosion',
    'coin', 'speed_boost',
    'balloon_green', 'balloon_red', 'balloon_blue',
    'alien_ship', 'aeroplane_white_left', 'aeroplane_white_right',
    'tree_deciduous',
    'spaceship',
];
var images;

var LEVEL = 1;
var SLOT_ID = 0;
var PAUSED = true;
var MENU = "FirstMenu";

var TIME_START;
var TIME_SECONDS_ELAPSED;
var TIME_SECONDS_ELAPSED_LEVEL;
var GAME_END_TIME = -1;

var options = {
    slow: 1,
    fps: 60,
    update: 0,
    render: 0,
    fpsmeter: 0,
    canvas: "gameCanvas"
}
var player = {
    input: { left: false, right: false, down: false, up: false, space: false }
}
var camera = {
    input: { left: false, right: false, down: false, up: false }
}
var entitiesList;
var cameraList;

var mouseClickX;
var mouseClickY;

$(document).ready(function () {
    canvas = document.getElementById(options.canvas);
    canvasHeight = parseInt(canvas.getAttribute("height"));
    canvasWidth = parseInt(canvas.getAttribute("width"));
    canvasLeft = canvas.offsetLeft,
    canvasTop = canvas.offsetTop,
    context = canvas.getContext('2d');

    loadImages(IMAGES, run);
    loadLevelData();

    TIME_START = timestamp();

    // Add event listener for `click` events.
    canvas.addEventListener('click', function (event) {
        mouseClickX = event.pageX - canvasLeft,
        mouseClickY = event.pageY - canvasTop;

        mouseClicked(mouseClickX, mouseClickY);
    }, false);

    var listener = new window.keypress.Listener();
    listener.register_combo({
        "keys": null,
        "on_keydown": null,
        "on_keyup": null,
        "on_release": null,
        "this": undefined,
        "prevent_default": false,
        "prevent_repeat": false,
        "is_unordered": false,
        "is_counting": false,
        "is_exclusive": false,
        "is_solitary": false,
        "is_sequence": false
    });
    var my_scope = this;
    var my_combos = listener.register_many([
        {
            "keys": "up",
            "is_exclusive": true,
            "on_keydown": function () {
                player.input.up = true;
            },
            "on_keyup": function (event) {
                player.input.up = false;
            },
            "this": my_scope
        },
        {
            "keys": "left",
            "is_exclusive": true,
            "on_keydown": function () {
                player.input.left = true;
            },
            "on_keyup": function (event) {
                player.input.left = false;
            },
            "this": my_scope
        },
        {
            "keys": "right",
            "is_exclusive": true,
            "on_keydown": function () {
                player.input.right = true;
            },
            "on_keyup": function (event) {
                player.input.right = false;
            },
            "this": my_scope
        },
                {
            "keys": "down",
            "is_exclusive": true,
            "on_keydown": function () {
                player.input.down = true;
            },
            "on_keyup": function (event) {
                player.input.down = false;
            },
            "this": my_scope
        },
        {
            "keys": "w",
            "is_exclusive": true,
            "on_keydown": function () {
                camera.input.up = true;
            },
            "on_keyup": function (event) {
                camera.input.up = false;
            },
            "this": my_scope
        },
        {
            "keys": "a",
            "is_exclusive": true,
            "on_keydown": function () {
                camera.input.left = true;
            },
            "on_keyup": function (event) {
                camera.input.left = false;
            },
            "this": my_scope
        },
        {
            "keys": "d",
            "is_exclusive": true,
            "on_keydown": function () {
                camera.input.right = true;
            },
            "on_keyup": function (event) {
                camera.input.right = false;
            },
            "this": my_scope
        },
        {
            "keys": "s",
            "is_exclusive": true,
            "on_keydown": function () {
                camera.input.down = true;
            },
            "on_keyup": function (event) {
                camera.input.down = false;
            },
            "this": my_scope
        },
        {
            "keys": "space",
            "is_exclusive": true,
            "on_keydown": function () {
                player.input.space = true;
            },
            "on_keyup": function (event) {
                player.input.space = false;
            },
            "this": my_scope
        }
    ]);

    

    //document.addEventListener('keydown', function (ev) { return onkey(ev, ev.keyCode, true); }, false);
    //document.addEventListener('keyup', function (ev) { return onkey(ev, ev.keyCode, false); }, false);

});
/*
function onkey(ev, key, pressed) {
    switch (key) {
        case KEY.UP: player.input.up = pressed; ev.preventDefault(); break;
        case KEY.LEFT: player.input.left = pressed; ev.preventDefault(); break;
        case KEY.RIGHT: player.input.right = pressed; ev.preventDefault(); break;
        case KEY.SPACE: player.input.jump = pressed; ev.preventDefault(); break;
    }
}
*/

function run(imgs) {		
    images = imgs;
    Game.run(options);
}
function loadImages(names, callback) {
    var n,name,
      result = {},
      count  = names.length,
      onload = function() { if (--count == 0) callback(result); };
  
    for(n = 0 ; n < names.length ; n++) {
        name = names[n];
        result[name] = document.createElement('img');
        result[name].addEventListener('load', onload);
        result[name].src = "Images/" + name + ".png";
    }
}

function loadLevelData() {
    GAME_END_TIME = -1;

    cameraList = new Array();
    nxtCD = 0;
    for (var cd = 0; cd < cameraData.length; cd++) {
        cameraList[cd] = new CameraEntity(cameraData[cd].x, cameraData[cd].y, cameraData[cd].z, cameraData[cd].type, cameraData[cd].lensX, cameraData[cd].lensY, cameraData[cd].zoom,
            cameraData[cd].followId, cameraData[cd].minX, cameraData[cd].minY, cameraData[cd].minZ, cameraData[cd].maxX, cameraData[cd].maxY, cameraData[cd].maxZ);
    }
    
    setGameData("Rocket Fuel Remaining", getGameData("Rocket Fuel Tank")); // Refuel Player
    setGameData("Booster Fuel Remaining", getGameData("Booster Fuel Tank")); // Refuel Player

    setGameData("Level Gold Collected", 0);
    setGameData("Level Balloons Collected", 0);

    entitiesList = new Array();
    nxtEL = 0;
    for (var ld = 0; ld < levelData.length; ld++) {
        if (levelData[ld].level == LEVEL) {

            levelData[ld].loaded = false;  // reset object loaded setting

            for (var sd = 0; sd < spriteData.length; sd++) {
                if (levelData[ld].name == spriteData[sd].name) {
                    if (levelData[ld].type == "static") {
                        var parentid = -1;
                        var health = spriteData[sd].health;
                        if (spriteData[sd].name == "player") {
                            health = getGameData("Health");
                        }
                        entitiesList[nxtEL] = new PhysicsEntity(nxtEL, parentid, levelData[ld].name, levelData[ld].uniqueName, spriteData[sd].collisionName, spriteData[sd].restitution, spriteData[sd].mass, spriteData[sd].type, levelData[ld].x, levelData[ld].y, levelData[ld].z,
                        spriteData[sd].width, spriteData[sd].height, spriteData[sd].depth, spriteData[sd].ExtInt, spriteData[sd].imageName, spriteData[sd].control, levelData[ld].vx, levelData[ld].vy, levelData[ld].vz, levelData[ld].ax, levelData[ld].ay, levelData[ld].az, health);
                        nxtEL++;
                    }
                }
            }
        }
    }

}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

Game = {
    run: function (options) {
        var now,
            dt = 0,
            last = timestamp(),
            slow = options.slow || 1, // slow motion scaling factor
            step = 1 / options.fps,
            slowStep = slow * step;
            //fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });

        function frame() {
        //fpsmeter.tickStart();
        now = timestamp();
        dt = dt + Math.min(1, (now - last) / 1000);
        while(dt > slowStep) {
            dt = dt - slowStep;
                Game.update(step);
            }
            Game.render(dt/slow);
            last = now;
            //fpsmeter.tick();
            requestAnimationFrame(frame, options.canvas);
        }
    
        requestAnimationFrame(frame);
    },
    render: function (value) {
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        var timeAtFrameStart = timestamp();

        for (var c = 0; c < cameraList.length; c++) {
            var camera = cameraList[c];

            var drawIdList = new Array();

           // var iname = new Array();
            //var iimage = new Array();
            //var iclipX = new Array();
            //var iclipY = new Array();
            //var iclipWidth = new Array();
            //var iclipHeight = new Array();
            //var ix = new Array();
            //var iy = new Array();
            //var iz = new Array();
            //var iwidth = new Array();
            //var iheight = new Array();
            //var idepth = new Array();
            //var irotxy = new Array();
            //var iparentid = new Array();
            

            var cZoomX = canvas.width / camera.lensX;
            var cZoomY = canvas.height / camera.lensY;

            var cLeft = camera.getLeft();
            var cTop = camera.getTop();
            var cRight = camera.getRight();
            var cBottom = camera.getBottom();

            var cMidX = camera.getMidX();
            var cMidY = camera.getMidY();
            
            for (var sl = 0; sl < entitiesList.length; sl++) {
                entity = entitiesList[sl];

                try {
                    var image = images[entity.imageName];
                }
                catch(err)
                {
                    alert(err);
                }

                //var image = images[entity.imageName];

                if (entity.name == "anim_explosion") {
                    var o = 0;
                }


                if (image != null) {
                    var eLeft = entity.x;
                    var eTop = entity.y;
                    var eRight = eLeft + entity.width;
                    var eBottom = eTop + entity.width;

                    var xDrawIt = false;
                    var yDrawIt = false;
                    if (cLeft <= eLeft && eLeft <= cRight){ // left side of entity is within camera
                        xDrawIt = true;
                    }
                    else if (cLeft <= eRight && eRight <= cRight) { // right side of entity is within camera
                        xDrawIt = true;
                    } 
                    else if (eLeft <= cLeft && cLeft <= eRight) { // left side of camera is within entity
                        xDrawIt = true;
                    }
                    else if (eLeft <= cRight && cRight <= eRight) { // right side of camera is within entity
                        xDrawIt = true;
                    }
                    if (cTop <= eTop && eTop <= cBottom) { // top side of entity is within camera
                        yDrawIt = true;
                    }
                    else if (cTop <= eBottom && eBottom <= cBottom) { // bottom side of entity is within camera
                        yDrawIt = true;
                    }
                    else if (eTop <= cTop && cTop <= eBottom) { // top side of camera is within entity
                        yDrawIt = true;
                    }
                    else if (eTop <= cBottom && cBottom <= eBottom) { // bottom side of camera is within entity
                        yDrawIt = true;
                    }
                    if (xDrawIt && yDrawIt) {
                        drawIdList.push(sl);

                        //iname.push(entity.name); iimage.push(image);
                        //iclipX.push(clipX); iclipY.push(clipY); iclipWidth.push(clipWidth); iclipHeight.push(clipHeight);
                        //ix.push(xDis); iy.push(yDis); iwidth.push(widthDis); iheight.push(heightDis);
                        //iz.push(entity.z); idepth.push(entity.depth);
                        //irotxy.push(entity.rotxy);
                        //iparentid.push(entity.parentid);
                    }
                    //xDrawIt = xDrawIt;
                }
            }
            var lowestZ = camera.z;
            for (var f = 0; f < drawIdList.length; f++) {
                var z = entitiesList[drawIdList[f]].z;
                if (z < lowestZ) {
                    lowestZ = z;
                }
            }

            drawBackground();


            for (var zz = lowestZ; zz < camera.z; zz++) {               
                for (var f = 0; f < drawIdList.length; f++) {
                    if (zz == entitiesList[drawIdList[f]].z) {

                        if (entitiesList[drawIdList[f]].name == "anim_explosion") {
                            var o = 0;
                        }

                        //var name = iname[f];
                        var image = images[entitiesList[drawIdList[f]].imageName];

                        var animNumbFrames = entitiesList[drawIdList[f]].animNumbFrames;
                        var frameNumber = 0;
                        var frameWidth = image.width / animNumbFrames
                        if (animNumbFrames > 1) {
                            var aliveTime = timeAtFrameStart - entitiesList[drawIdList[f]].creationTime;
                            var secondRemainder = aliveTime % 1000;
                            var animPerSecond = 10;
                            var millPerAnimFrame = Math.round(1000 / animPerSecond);
                            frameNumber = Math.round(secondRemainder / millPerAnimFrame);
                        }

                        var clipX = frameNumber * frameWidth;
                        var clipY = 0;
                        var clipWidth = frameWidth;
                        var clipHeight = image.height;

                        var tilesX = Math.ceil(entitiesList[drawIdList[f]].width / image.width);
                        var tilesY = Math.ceil(entitiesList[drawIdList[f]].height / image.height);

                        //context.drawImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height);

                        for (r = 0; r < tilesX; r++) {
                            for (c = 0; c < tilesY; c++) {

                                var xDis = entitiesList[drawIdList[f]].x + (image.width * r);
                                var yDis = entitiesList[drawIdList[f]].y + (image.height * c);

                                var x = xDis - camera.x;
                                var y = yDis - camera.y;
                                var width = 0;
                                if (tilesX == 1) {
                                    width = entitiesList[drawIdList[f]].width;
                                } else {
                                    width = image.width;
                                }
                                var height = 0;
                                if (tilesY == 1) {
                                    height = entitiesList[drawIdList[f]].height;
                                } else {
                                    height = image.height;
                                }
                                var rotxy = entitiesList[drawIdList[f]].rotxy;


                                //var parentid = iparentid[f];

                                context.save();

                                //if (parentid < 0) {
                                // move to the center of the canvas
                                var xCentre = x + (width / 2);
                                var yCentre = y + (height / 2);

                                context.translate(xCentre, yCentre);

                                // rotate the canvas to the specified degrees
                                context.rotate(rotxy * Math.PI / 180);

                                // translate back
                                context.translate(-xCentre, -yCentre);
                                //
                                /*
                                else { // has parent
                                    // move to the center of the canvas
                                    var xCentre = x - (width / 2) + (entitiesList[parentid].width / 2);
                                    var yCentre = y - (entitiesList[parentid].height / 2) ;
        
                                    context.translate(xCentre, yCentre);
        
                                    // rotate the canvas to the specified degrees
                                    context.rotate(irotxy[f] * Math.PI / 180);
        
                                    // translate back
                                    context.translate(-xCentre, -yCentre);
                                }
                                */
                                // draw the image
                                // since the context is rotated, the image will be rotated also
                                context.drawImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height);

                                // we’re done with the rotating so restore the unrotated context
                                context.restore();
                            }
                        }
                    }
                }
            }
            if (MENU == "InGame") {
                drawHUD(camera);
                drawPopupDisplay(camera);
                drawTargeter(camera);
            }
            drawMenus(camera, MENU);
        }
        
        
        //alert("render: " + value);
    },
    update: function (value) {
        TIME_SECONDS_ELAPSED = (timestamp() - TIME_START) / 1000;
        var physicsEngine = new PhysicsEngine(value, entitiesList, cameraList, player, camera);

        physicsEngine.step();
        updateGameData(SLOT_ID);        
    }
}

function drawBackground() {

    context.fillStyle = backgroundColourHTML;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
function setBackgroundColour(playerAltitude) {
    var red = 0;
    var green = 0;
    var blue = 0;

    if (playerAltitude < 5000) {
        green = setColorValue(154, 0, playerAltitude, 0, 5000);
        blue = 255;
    }
    else if(playerAltitude < 10000) {
        blue = setColorValue(255, 10, playerAltitude, 5000, 10000);
    }

    var redHex = componentToHex(red.toFixed(0));
    var greenHex = componentToHex(green.toFixed(0));
    var blueHex = componentToHex(blue.toFixed(0));

    backgroundColourHTML = "#" + redHex + greenHex + blueHex;

    //var redStr = addLeadingZero(red.toFixed(0));
    //var greenStr = addLeadingZero(green.toFixed(0));
    //var blueStr = addLeadingZero(blue.toFixed(0));

    //backgroundColourHTML = "#" + redStr + greenStr + blueStr;
}
/**
 * Sets the colour value between colourLow and colourHigh values
 * based on the ratio of the currentValue between valueLow and valueHigh
 * @param {int} colourLow
 * @param {int} colourHigh
 * @param {int} currentValue
 * @param {int} valueLow
 * @param {int} valueHigh
 */
function setColorValue(colourLow, colourHigh, currentValue, valueLow, valueHigh) {
    var valueRange = valueHigh - valueLow;
    var valueRatio = (currentValue - valueLow) / valueRange;

    var colourRange = colourHigh - colourLow;
    var colourValue = (valueRatio * colourRange) + colourLow;

    return colourValue;
}

function addLeadingZero(val) {
    var newVal = ('0' + val).slice(-2);
    return newVal;
}
function componentToHex(c) {
    var cint = parseInt(c);
    var hex = cint.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function mouseClicked(mouseClickX, mouseClickY) {
    output = detectMenuClick(MENU, SLOT_ID, mouseClickX, mouseClickY);
    MENU = output['menuName'];
    SLOT_ID = output['slot_id'];
}

function handlePlayerControls(entity) {
    var slot_id = SLOT_ID;
    if (!PAUSED) {
        var ROTATEAMOUNT = 2;

        var fuel = getGameData("Rocket Fuel Remaining");
        var boosterFuel = parseInt(getGameData("Booster Fuel Remaining"));

        if (player.input.left) {
            entity.rotxy -= ROTATEAMOUNT;
            if (fuel > 0) {
                //entity.vx -= playerData[0].thrustPower;
                //playerData[0].fuel = playerData[0].fuel - playerData[0].fuelConsumption;

            }
        }
        if (player.input.right) {
            entity.rotxy += ROTATEAMOUNT;
            if (fuel > 0) {
                //entity.vx += playerData[0].thrustPower;
                //playerData[0].fuel = playerData[0].fuel - playerData[0].fuelConsumption;
            }
        }
        if (player.input.up) {
            if (fuel > 0) {

                entity = playerThrust(entity);
            }
        }
        if (player.input.down) {
            if (fuel > 0) {
                //entity.vy += playerData[0].thrustPower;
                //playerData[0].fuel = playerData[0].fuel - playerData[0].fuelConsumption;
            }
        }
        if (player.input.space) {
            if (boosterFuel > 0) {
                entity = playerBoost(entity);
            }
        }
    }
    return entity;

 }

function playerThrust(entity) {
    var rotxyrad = entity.rotxy * Math.PI / 180;
    var hypot = getGameData("Rocket Power");
    entity.vy -= Math.cos(rotxyrad) * hypot;
    entity.vx += Math.sin(rotxyrad) * hypot;

    var fuel = getGameData("Rocket Fuel Remaining") - getGameData("Rocket Fuel Consumption");
    setGameData("Rocket Fuel Remaining", fuel);

    var parentHalfWidth = entity.width * .5;
    var parentHalfHeight = entity.height * .5;

    var sd = 0 // flame
    createObjects("", sd, entity, parentHalfWidth + (spriteData[sd].width * .5), parentHalfHeight + (spriteData[sd].height * .5), 0); // flame
    var sd = 1 // smoke
    createObjects("", sd, entity, parentHalfWidth + (spriteData[sd].width * .75), parentHalfHeight + (spriteData[sd].height * .75), -1); // smoke
    
    return entity;
}
function playerBoost(entity) {
    var rotxyrad = entity.rotxy * Math.PI / 180;
    var hypot = getGameData("Rocket Power");
    entity.vy -= Math.cos(rotxyrad) * hypot;
    entity.vx += Math.sin(rotxyrad) * hypot;

    var fuel = getGameData("Booster Fuel Remaining") - getGameData("Booster Fuel Consumption");
    setGameData("Booster Fuel Remaining", fuel);

    var parentHalfWidth = entity.width * .5;
    var parentHalfHeight = entity.height * .5;

    var sd = 3 // flame blue
    createObjects("", sd, entity, parentHalfWidth + (spriteData[sd].width * .5), parentHalfHeight + (spriteData[sd].height * .5), 0); // flame
    var sd = 1 // smoke
    createObjects("", sd, entity, parentHalfWidth + (spriteData[sd].width * .75), parentHalfHeight + (spriteData[sd].height * .75), -1); // smoke

    return entity;
}
function createObjects(uniqueName, sd, parent, xOffset, yOffset, zOffset) {
    //for (var sd = 0; sd < spriteData.length; sd++) {
        //if (spriteData[sd].name == objectName) {

            var parentMidX = parent.getMidX();
            var parentMidY = parent.getMidY();

            var rotxyrad = parent.rotxy * Math.PI / 180;
            var rotxysin = Math.sin(rotxyrad);
            var rotxycos = Math.cos(rotxyrad);

            var newObjMidX = spriteData[sd].width / 2;
            var newObjMidY = spriteData[sd].height / 2;

            var x = (parentMidX - newObjMidX) - (rotxysin * xOffset);
            var y = (parentMidY - newObjMidY) + (rotxycos * yOffset);
            //var y = parentMidY - newObjMidY + (rotxycos * newObjMidY) + (rotxycos * (parent.height / 2));
            var z = parent.z + zOffset;

            var vx = 0;
            var vy = 0;
            var vz = 0;
            var ax = 0;
            var ay = 0;
            var az = 0;

            var rotxy = parent.rotxy;
            var rotxz = parent.rotxz;
            var rotyz = parent.rotyz;


            var nxtEL = entitiesList.length;
            entitiesList[nxtEL] = new PhysicsEntity(nxtEL, parent.id, spriteData[sd].name, uniqueName, spriteData[sd].collisionName, spriteData[sd].restitution,
            spriteData[sd].mass, spriteData[sd].type, x, y, z, spriteData[sd].width, spriteData[sd].height, spriteData[sd].depth, spriteData[sd].ExtInt, spriteData[sd].imageName,
            spriteData[sd].control, vx, vy, vz, ax, ay, az, spriteData[sd].health, rotxy, rotxz, rotyz, spriteData[sd].lifetime, spriteData[sd].animNumbFrames);

        //}
    //}
}

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}

function playerDeath(entity) {
    entity.health = 0;
    entity.vx = 0;
    entity.vy = 0;

    entity.lifetime = 1;
    entity.deathTime = timestamp();
    var sd = 2; //anim_explosion
    createObjects("playerDeathExplosion", sd, entity, 0, 0, 0); // anim_explosion

    var currentTime = timestamp();
    GAME_END_TIME = currentTime + spriteData[sd].lifetime;

    return entity;
}