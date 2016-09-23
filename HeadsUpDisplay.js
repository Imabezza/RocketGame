// JavaScript source code

var popupArray = [];

var playerAltitude = 0;
var playerRecordHeight = 0;
var playerSpeed = 0;
var playerRecordSpeed = 0;

var playerRocketFuel = 0;
var playerBoosterFuel = 0;
var playerHealth = 0;
var playerGold = 0;

var balloonsCollected = 0;
var goldCollected = 0;

var achievement = "";
var targeterUniqueName = "";
var targeterX = 0;
var targeterY = 0;

var headsUpDisplay = [
    { "name": "Altitude: ", "text": playerAltitude, "x": 650, "y": 15, },
    { "name": "Record Altitude: ", "text": playerRecordHeight, "x": 650, "y": 35, },
    { "name": "Speed: ", "text": playerSpeed, "x": 650, "y": 55, },
    { "name": "Record Speed: ", "text": playerRecordSpeed, "x": 650, "y": 75, },

    { "name": "Rocket Fuel: ", "text": playerRocketFuel, "x": 650, "y": 95, },
    { "name": "Booster Fuel: ", "text": playerBoosterFuel, "x": 650, "y": 115, },

	{ "name": "Health: ", "text": playerHealth, "x": 650, "y": 135, },
    { "name": "Gold: ", "text": playerGold, "x": 650, "y": 155, },

    { "name": "Balloons Popped: ", "text": balloonsCollected, "x": 10, "y": 555, },
    { "name": "Gold Collected: ", "text": goldCollected, "x": 10, "y": 575, },

];

function updateHUD(slot_id, entity) {

    playerAltitude = (entity.y + 50) * -1;
    playerSpeed = Math.sqrt((entity.vx * entity.vx) + (entity.vy * entity.vy));
    playerHealth = Number(entity.health);

    playerRecordHeight = Number(getGameData("Record Height"));
    playerRecordSpeed = Number(getGameData("Record Speed"));
    playerBoosterFuel = Number(getGameData("Booster Fuel Remaining"));
    playerRocketFuel = Number(getGameData("Rocket Fuel Remaining"));
    playerGold = Number(getGameData("Player Gold"));

    goldCollected = Number(getGameData("Level Gold Collected"));
    balloonsCollected = Number(getGameData("Level Balloons Collected"));

    for (var i = 0; i < headsUpDisplay.length; i++) {
        hud = headsUpDisplay[i];
        switch (hud.name) {
            case "Altitude: ":
                hud.text = playerAltitude.toFixed(0);
                break;
            case "Record Altitude: ":
                hud.text = playerRecordHeight.toFixed(0);
                break;           
            case "Speed: ":
                hud.text = playerSpeed.toFixed(0);
                break;
            case "Record Speed: ":
                hud.text = playerRecordSpeed.toFixed(0);
                break;
            case "Booster Fuel: ":
                hud.text = playerBoosterFuel.toFixed(0);
                break;
            case "Rocket Fuel: ":
                hud.text = playerRocketFuel.toFixed(0);
                break;
            case "Health: ":
                hud.text = playerHealth.toFixed(0);
                break;
            case "Gold: ":
                hud.text = playerGold.toFixed(0);
                break;
            case "Balloons Popped: ":
                hud.text = balloonsCollected.toFixed(0);
                break;
            case "Gold Collected: ":
                hud.text = goldCollected.toFixed(0);
                break;
        }
    }
}

function drawHUD(camera) {
    if (LEVEL > 0) {
        context.globalAlpha = 0.2;
        context.fillStyle = "black";

        roundRect(context, 635, -10, 175, 175, 10, true, true);
        //context.fillRect(625, 0, 800, 120);
        context.globalAlpha = 1;

        context.fillStyle = 'white';
        context.font = "14px Arial";
        var offsetNameToText = 110;

        for (var i = 0; i < headsUpDisplay.length; i++) {
            hud = headsUpDisplay[i];
            context.fillText(hud.name, hud.x, hud.y);
            context.fillText(hud.text, hud.x + offsetNameToText, hud.y);
        }
    }
}

function addPopupDisplay(x, y, text, time) {
    var startTime = timestamp();
    var endTime = startTime + time;
    popupArray.push({ "x": x, "y": y, "text": text, "startTime": startTime, "endTime": endTime });
}
function drawPopupDisplay(camera) {
    for (var p = 0; p < popupArray.length; p++) {
        var popup = popupArray[p];
        if (timestamp() > popup.endTime) {
            popupArray.splice(p, 1);
        }
        else
        {
            context.globalAlpha = 1;

            context.fillStyle = 'white';
            context.font = "14px Arial";

            
            var timeElapsed = timestamp() - popup.startTime;
            var y = popup.y + (timeElapsed / 50);

            var elapsedRatio = 1 - (timeElapsed / (popup.endTime - popup.startTime));

            context.globalAlpha = elapsedRatio;

            context.fillText(popup.text, popup.x, y);
        }
        context.globalAlpha = 1;
    }
}
function handleTargeter(uniqueName, x, y) {
    targeterUniqueName = uniqueName;
    targeterX = x;
    targeterY = y;
}

function drawTargeter(camera) {
    context.fillStyle = 'green';
    context.globalAlpha = 0.4;

    var path = new Path2D();
    path.moveTo(400, 200);
    path.lineTo(425, 225);
    path.lineTo(375, 225);
    context.fill(path);

    context.globalAlpha = 1;

    var pathw = new Path2D();
    pathw.moveTo(400, 300);
    pathw.lineTo(targeterX, targeterY);
    pathw.lineTo(401, 301);
    context.fill(pathw);
}