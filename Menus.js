// JavaScript source code

var menuDisplay = [];

function drawMenus(camera, menuName) {
    while (menuDisplay.length > 0) {
        menuDisplay.pop();
    }
    if (menuName == "FirstMenu") {
        menuDisplay.push({ "menuName": "FirstMenu", "name": "NewGame", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "New Game", "font_colour": "white", "font": "12px Arial"  });
        menuDisplay.push({ "menuName": "FirstMenu", "name": "LoadGame", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Load Game", "font_colour": "white", "font": "12px Arial" });
    }
    else if (menuName == "NewGameMenu") {
        menuDisplay.push({ "menuName": "NewGameMenu", "name": "NewGameSlot1", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 1", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "NewGameMenu", "name": "NewGameSlot2", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 2", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "NewGameMenu", "name": "NewGameSlot3", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 3", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "NewGameMenu", "name": "BackToFirstMenu", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back", "font_colour": "white", "font": "12px Arial" });
    }
    else if (menuName == "OverwriteMenu") {
        menuDisplay.push({ "menuName": "OverwriteMenu", "name": "OverwriteYes", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Overwrite Data", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "OverwriteMenu", "name": "OverwriteNo", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Cancel", "font_colour": "white", "font": "12px Arial" });
    }

    else if (menuName == "LoadGameMenu") {
        menuDisplay.push({ "menuName": "LoadGameMenu", "name": "LoadGameSlot1", "Display": "None", "DisplayType": "Button", "x": 325, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 1", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "LoadGameMenu", "name": "LoadGameSlot2", "Display": "None", "DisplayType": "Button", "x": 325, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 2", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "LoadGameMenu", "name": "LoadGameSlot3", "Display": "None", "DisplayType": "Button", "x": 325, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Slot 3", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "LoadGameMenu", "name": "BackToFirstMenu", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "LoadGameMenu", "name": "EraseAllData", "Display": "Block", "DisplayType": "Button", "x": 640, "y": 550, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "red", "background_alpha": 0.5, "text": "Erase all data", "font_colour": "white", "font": "12px Arial" });

        var game1Loaded = localStorage.getItem("RocketGame_Slot1_GamePresent");
        var game2Loaded = localStorage.getItem("RocketGame_Slot2_GamePresent");
        var game3Loaded = localStorage.getItem("RocketGame_Slot3_GamePresent");

        for (var i = 0; i < menuDisplay.length; i++) {
            menuItem = menuDisplay[i];
            if (menuItem.name == "LoadGameSlot1") {
                if (game1Loaded == "true") {
                    menuItem.Display = "Block";
                }
                else {
                    menuItem.Display = "None";
                }
            }
            if (menuItem.name == "LoadGameSlot2") {
                if (game2Loaded == "true") {
                    menuItem.Display = "Block";
                }
                else {
                    menuItem.Display = "None";
                }
            }
            if (menuItem.name == "LoadGameSlot3") {
                if (game3Loaded == "true") {
                    menuItem.Display = "Block";
                }
                else {
                    menuItem.Display = "None";
                }
            }
        }
    }
    else if (menuName == "MissionsMenu") {

        var xPadding = 50;
        var yPadding = 50;

        var blockWidth = 48;
        var blockHeight = 48;

        var xCols = 5;
        var xr = 0;
        var yr = 0;

        menuDisplay.push({ "menuName": "MissionsMenu", "name": "Background", "Display": "Block", "DisplayType": "Rectangle", "x": 210, "y": 60, "width": 400, "height": 320, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "MissionsMenu", "name": "MissionsTitle", "Display": "Block", "DisplayType": "TextBlock", "x": 325, "y": 75, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Missions", "font_colour": "white", "font": "14px Arial" });
        menuDisplay.push({ "menuName": "MissionsMenu", "name": "BackToGameMenu", "Display": "Block", "DisplayType": "Button", "x": 425, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back", "font_colour": "white", "font": "12px Arial" });


        for (var m = 0; m < missionsArray.length; m++) {
            mission = missionsArray[m];
            
            if (xr >= xCols) {
                xr = 0;
                yr++;
            }
            var missionAchieved = getGameData("MissionAchieived-" + mission.name);
            if (missionAchieved == "true") {
                menuDisplay.push({ "menuName": "MissionsMenu", "name": mission.name, "Display": "Block", "DisplayType": "TextBlock", "x": 275 + (xr * xPadding), "y": 115 + (yr * yPadding), "width": blockWidth, "height": blockHeight, "xAlign": "left", "yAlign": "centre", "background_colour": "green", "background_alpha": 0.7, "text": "", "font_colour": "white", "font": "14px Arial", "image": mission.image });
            }
            else {
                menuDisplay.push({ "menuName": "MissionsMenu", "name": mission.name, "Display": "Block", "DisplayType": "TextBlock", "x": 275 + (xr * xPadding), "y": 115 + (yr * yPadding), "width": blockWidth, "height": blockHeight, "xAlign": "left", "yAlign": "centre", "background_colour": "red", "background_alpha": 0.7, "text": "", "font_colour": "white", "font": "14px Arial", "image": mission.image });
            }
            xr++;
        }
    }
    else if (menuName == "UpgradeMenu") {
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "Background", "Display": "Block", "DisplayType": "Rectangle", "x": 210, "y": 60, "width": 400, "height": 320, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "UpgradeTitle", "Display": "Block", "DisplayType": "TextBlock", "x": 325, "y": 75, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Upgrades", "font_colour": "white", "font": "14px Arial" });
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "UpgradeHeader", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 125, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Attribute", "font_colour": "white", "font": "13px Arial" });
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "UpgradeHeader", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 125, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Level", "font_colour": "white", "font": "13px Arial" });
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "UpgradeHeader", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 125, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Value", "font_colour": "white", "font": "13px Arial" });
        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "UpgradeHeader", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 125, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Price", "font_colour": "white", "font": "13px Arial" });

        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "PlayerGold", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "13px Arial" });

        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "BackToGameMenu", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 500, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back", "font_colour": "white", "font": "12px Arial" });

        menuDisplay.push({ "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Health", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 175, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Rocket Power", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Rocket Fuel Tank", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 225, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Booster Power", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Booster Fuel Tank", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 275, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Weight", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Control", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "TextBlock", "x": 225, "y": 325, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "Cash Multiplier", "font_colour": "white", "font": "12px Arial" },

            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Health", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Rocket Power", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 175, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Rocket Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Booster Power", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 225, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Booster Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Weight", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 275, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Control", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeLevel-Cash Multiplier", "Display": "Block", "DisplayType": "TextBlock", "x": 350, "y": 325, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },


            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Health", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Rocket Power", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 175, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Rocket Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Booster Power", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 225, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Booster Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Weight", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 275, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Control", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeValue-Cash Multiplier", "Display": "Block", "DisplayType": "TextBlock", "x": 400, "y": 325, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },

            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Health", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Rocket Power", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 175, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Rocket Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Booster Power", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 225, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Booster Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Weight", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 275, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Control", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradePrice-Cash Multiplier", "Display": "Block", "DisplayType": "TextBlock", "x": 500, "y": 325, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },

            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Health", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Rocket Power", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 175, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Rocket Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Booster Power", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 225, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Booster Fuel Tank", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 250, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Weight", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 275, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Control", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" },
            { "menuName": "UpgradeMenu", "name": "UpgradeBuy-Cash Multiplier", "Display": "Block", "DisplayType": "TextBlock", "x": 550, "y": 325, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.0, "text": "", "font_colour": "white", "font": "12px Arial" }
        );

        for (var i = 0; i < menuDisplay.length; i++) {
            menuItem = menuDisplay[i];
            
            if (menuItem.name.indexOf('UpgradeLevel') >= 0) {
                var res = menuItem.name.split("-");
                var upgradeName = res[1];
                var upgradeValue = getGameData("UpgradeValue-" + upgradeName);
                menuItem.text = upgradeValue;
            }
            if (menuItem.name.indexOf('UpgradeValue') >= 0) {
                var res = menuItem.name.split("-");
                var upgradeName = res[1];
                var upgradeValue = getGameData(upgradeName);
                menuItem.text = upgradeValue;
            }
            if (menuItem.name.indexOf('UpgradePrice') >= 0) {
                var res = menuItem.name.split("-");
                var upgradeName = res[1];
                var upgradeValue = getGameData("UpgradeValue-"+upgradeName);
                for (var ud = 0; ud < upgradeData.length; ud++) {
                    if (upgradeData[ud].level == upgradeValue) {
                        menuItem.text = "£ " + upgradeData[ud].Price;
                        break;
                    }
                }
            }
            
            if (menuItem.name == "PlayerGold") {
                menuItem.text = "Gold: " + getGameData("Player Gold");
            }
            if (menuItem.name.indexOf('UpgradeBuy') >= 0) {
                var upgradePrice = 0;
                var playerGold = parseInt(getGameData("Player Gold"));
                var res = menuItem.name.split("-");
                var upgradeName = res[1];
                var upgradeValue = parseInt(getGameData("UpgradeValue-" + upgradeName));
                for (var ud = 0; ud < upgradeData.length; ud++) {
                    if (upgradeData[ud].level == upgradeValue) {
                        upgradePrice = upgradeData[ud].Price;
                        break;
                    }
                }
                if (upgradeData.length <= upgradeValue) {
                    menuItem.text = "Max";
                }
                else if (playerGold >= upgradePrice) {
                    menuItem.text = "Buy";
                }
                else {
                    menuItem.text = "";
                }
            }
        }
    }
    else if (menuName == "GameMenu") {
        menuDisplay.push({ "menuName": "GameMenu", "name": "Launch", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 100, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Launch!", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "GameMenu", "name": "Upgrade", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 150, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Upgrades", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "GameMenu", "name": "Missions", "Display": "Block", "DisplayType": "Button", "x": 325, "y": 200, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Missions", "font_colour": "white", "font": "12px Arial" });
        menuDisplay.push({ "menuName": "GameMenu", "name": "BackToFirstMenu", "Display": "Block", "DisplayType": "Button", "x": 640, "y": 550, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back to main menu", "font_colour": "white", "font": "12px Arial" });
    }
    else if (menuName == "InGame") {
        menuDisplay.push({ "menuName": "InGame", "name": "AbortLaunch", "Display": "Block", "DisplayType": "Button", "x": 10, "y": 10, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Abort Launch", "font_colour": "white", "font": "12px Arial" });
    }
    else if (menuName == "EndLaunchMenu") {
        menuDisplay.push({ "menuName": "EndLaunchMenu", "name": "BackToGameMenu", "Display": "Block", "DisplayType": "Button", "x": 350, "y": 300, "width": 150, "height": 40, "xAlign": "left", "yAlign": "centre", "background_colour": "black", "background_alpha": 0.5, "text": "Back", "font_colour": "white", "font": "12px Arial" });
    }

    
    for (var i = 0; i < menuDisplay.length; i++) {
        menuItem = menuDisplay[i];
        if (menuItem.menuName == menuName) {
            if (menuItem.Display == "Block") {
                context.globalAlpha = menuItem.background_alpha;
                context.fillStyle = menuItem.background_colour;
                roundRect(context, menuItem.x, menuItem.y, menuItem.width, menuItem.height, 5, true, true);
                context.globalAlpha = 1;

                context.fillStyle = menuItem.font_colour;
                context.font = menuItem.font;

                var textX = 0;
                var textY = 0;
                var paddingLeft = 10;

                if (menuItem.xAlign == "centre") {
                    textX = menuItem.x + (menuItem.width / 2);
                }
                else if (menuItem.xAlign == "left") {
                    textX = menuItem.x + paddingLeft;
                }
                if (menuItem.yAlign == "centre") {
                    textY = menuItem.y + (menuItem.height / 2);
                }

                context.fillText(menuItem.text, textX, textY);

                if (menuItem.image != "") {
                    try{
                        var image = images[menuItem.image];
                        var clipX = 0;
                        var clipY = 0;
                        var clipWidth = image.width;
                        var clipHeight = image.height;
                        var x = menuItem.x;
                        var y = menuItem.y;
                        var width = menuItem.width;
                        var height = menuItem.height;
                        context.drawImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
                    }
                    catch (err) {

                    }
                }
            }
        }
    }
}
function detectMenuClick(menuName, slot_id, mouseClickX, mouseClickY) {
    //alert("click: (" + mouseClickX + "," + mouseClickY + ")");

    var output = new Array();
    output['menuName'] = menuName;
    output['slot_id'] = slot_id;

    for (var i = 0; i < menuDisplay.length; i++) {
        menuItem = menuDisplay[i];
        if (menuItem.menuName == menuName) {
            menuLeft = menuItem.x;
            menuRight = menuItem.x + menuItem.width;
            menuTop = menuItem.y;
            menuBottom = menuItem.y + menuItem.height;

            if (menuLeft < mouseClickX && mouseClickX < menuRight) {
                if (menuTop < mouseClickY && mouseClickY < menuBottom) {
                    if (menuItem.name == "NewGame") {
                        output['menuName'] = "NewGameMenu";
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "LoadGame") {
                        output['menuName'] = "LoadGameMenu";
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "BackToFirstMenu") {
                        output['menuName'] = "FirstMenu";
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "BackToGameMenu") {
                        output['menuName'] = "GameMenu";
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "AbortLaunch") {
                        for (var i = 0, length = entitiesList.length; i < length; i++) {
                            entity = entitiesList[i];
                            if (entity.uniqueName == "player") {
                                entity = playerDeath(entity);
                            }
                        }
                    }
                    if (menuItem.name == "NewGameSlot1") {
                        slot_id = 1;
                        output['slot_id'] = slot_id;
                        var exists = getGameData_slotid("GamePresent", slot_id);
                        if (exists == "false" || exists == "null" || exists == null) {
                            newGameData(slot_id);
                            output['menuName'] = "GameMenu";
                        }
                        else if (exists == "true"){
                            output['menuName'] = "OverwriteMenu";
                        }                       
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "NewGameSlot2") {
                        slot_id = 2;
                        output['slot_id'] = slot_id;
                        var exists = getGameData_slotid("GamePresent", slot_id);
                        if (exists == "false" || exists == "null" || exists == null) {
                            newGameData(slot_id);
                            output['menuName'] = "GameMenu";
                        }
                        else if (exists == "true") {
                            output['menuName'] = "OverwriteMenu";
                        }
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "NewGameSlot3") {
                        slot_id = 3;
                        output['slot_id'] = slot_id;
                        var exists = getGameData_slotid("GamePresent", slot_id);
                        if (exists == "false" || exists == "null" || exists == null) {
                            newGameData(slot_id);
                            output['menuName'] = "GameMenu";
                        }
                        else if (exists == "true") {
                            output['menuName'] = "OverwriteMenu";
                        }
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "OverwriteYes") {
                        output['menuName'] = "GameMenu";
                        output['slot_id'] = slot_id;
                        newGameData(slot_id);
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "OverwriteNo") {
                        output['menuName'] = "FirstMenu";
                        output['slot_id'] = slot_id;
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "LoadGameSlot1") {
                        output['menuName'] = "GameMenu";
                        slot_id = 1;
                        output['slot_id'] = slot_id;
                        updateGameData(slot_id);
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "LoadGameSlot2") {
                        output['menuName'] = "GameMenu";
                        slot_id = 2;
                        output['slot_id'] = slot_id;
                        updateGameData(slot_id);
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "LoadGameSlot3") {
                        output['menuName'] = "GameMenu";
                        slot_id = 3;
                        output['slot_id'] = slot_id;
                        updateGameData(slot_id);
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "EraseAllData") {
                        output['menuName'] = "FirstMenu";
                        localStorage.clear();
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "Launch") {
                        output['menuName'] = "InGame";
                        output['slot_id'] = slot_id;
                        loadLevelData();
                        PAUSED = false;
                        return output;
                    }
                    if (menuItem.name == "Upgrade") {
                        output['menuName'] = "UpgradeMenu";
                        output['slot_id'] = slot_id;
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name == "Missions") {
                        output['menuName'] = "MissionsMenu";
                        output['slot_id'] = slot_id;
                        PAUSED = true;
                        return output;
                    }
                    if (menuItem.name.indexOf('UpgradeBuy') >= 0) {
                        var upgradePrice = 0;
                        var playerGold = parseInt(getGameData("Player Gold"));
                        var res = menuItem.name.split("-");
                        var upgradeName = res[1];
                        var upgradeValue = parseInt(getGameData("UpgradeValue-" + upgradeName));
                        for (var ud = 0; ud < upgradeData.length; ud++) {
                            if (upgradeData[ud].level == upgradeValue) {
                                upgradePrice = upgradeData[ud].Price;
                                break;
                            }
                        }
                        if (menuItem.text == "Buy") {
                            playerGold -= upgradePrice;
                            upgradeValue += 1;
                            setGameData("Player Gold", playerGold);
                            setGameData("UpgradeValue-" + upgradeName, upgradeValue);
                            for (var ud = 0; ud < upgradeData.length; ud++) {
                                if (upgradeData[ud].level == upgradeValue) {
                                    var upgrade = upgradeData[ud];
                                    setGameData(upgradeName, upgrade[upgradeName]);
                                }
                            }
                        }


                        PAUSED = true;
                        return output;
                    }
                }
            }
        }
    }
    return output;
}
