// JavaScript source code
function objectCode() {
    var cam = cameraList[0];
    var cRight = cam.getRight();
    var cLeft = cam.getLeft();
    var cTop = cam.getTop();
    var cBottom = cam.getBottom();

    for (var i = 0, length = entitiesList.length; i < length; i++) {
        entity = entitiesList[i];
        switch (entity.uniqueName) {
            case "player":

                break;
            case "background_ground":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft < eLeft) {
                    entity.x = entity.x - image.width;
                    entity.width = image.width * 2;
                }
                if (cRight > eRight) {
                    entity.x = entity.x + image.width;
                    entity.width = image.width * 2;
                }
                /*
                if (cTop < eTop && eTop >-1700) {
                    entity.y = entity.y - image.height;
                    entity.height = image.height * 2;
                }
                if (cBottom > eBottom) {
                    entity.y = entity.y + image.height;
                    entity.height = image.height * 2;
                } 
                */
                break;
            case "background_hills":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft < eLeft) {
                    entity.x = entity.x - image.width;
                    entity.width = image.width * 2;
                }
                if (cRight > eRight) {
                    entity.x = entity.x + image.width;
                    entity.width = image.width * 2;
                }
                break;
            case "background_day":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft < eLeft) {
                    entity.x = entity.x - image.width;
                    entity.width = image.width * 2;
                }
                if (cRight > eRight) {
                    entity.x = entity.x + image.width;
                    entity.width = image.width * 2;
                }
                break;
            case "background_dusk":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft < eLeft) {
                    entity.x = entity.x - image.width;
                    entity.width = image.width * 2;
                }
                if (cRight > eRight) {
                    entity.x = entity.x + image.width;
                    entity.width = image.width * 2;
                }
                break;
            case "background_night":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft < eLeft) {
                    entity.x = entity.x - image.width;
                    entity.width = image.width * 3;
                }
                if (cRight > eRight) {
                    entity.x = entity.x + image.width;
                    entity.width = image.width * 3;
                }
                if (cTop < eTop) {
                    entity.y = entity.y - image.height;
                    entity.height = image.height * 3;
                }
                if (cBottom > eBottom && eBottom < -4100) {
                    entity.y = entity.y + image.height;
                    entity.height = image.height * 3;
                }
                break;
            case "ground":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                entity.x = cam.x;
                entity.width = cam.lensX;

                break;
        }
        var distanceOutOfCamera = 1 * cam.lensX;
        switch (entity.name) {
            case "cloud_white_small":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "cloud_grey_small":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "cloud_white_whisp":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "balloon_green":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "balloon_red":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "balloon_blue":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "star_yellow_small":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "boulder_small":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "boulder_large":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "alien_ship":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "aeroplane_white":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "coin":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "speed_boost":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
            case "tree_deciduous":

                var eLeft = entity.getLeft();
                var eRight = entity.getRight();
                var eTop = entity.getTop();
                var eBottom = entity.getBottom();

                var image = images[entity.imageName];

                if (cLeft - distanceOutOfCamera > eLeft) {
                    entity.x = cRight + distanceOutOfCamera - (entity.width);
                }
                if (cRight + distanceOutOfCamera < eRight) {
                    entity.x = cLeft - distanceOutOfCamera + (entity.width);
                }
                break;
        }
    }
}

function objectCode_Collision(collider, collidee) {
    if (collider.name == "player" && collidee.name == "coin") {
        collidee.lifetime = 1;
        collidee.deathTime = timestamp() + collidee.lifetime;
        var gold = parseInt(getGameData("Player Gold"));
        gold = gold + (1 * parseInt(getGameData("Cash Multiplier")));
        setGameData("Player Gold", gold);

        var levelGold = parseInt(getGameData("Level Gold Collected"));
        levelGold = levelGold + 1;
        setGameData("Level Gold Collected", levelGold);
    }
    else if (collider.name == "player" && collidee.name == "speed_boost") {
        //collidee.lifetime = 1;
        //collidee.deathTime = timestamp() + collidee.lifetime;

        collider.vy -= 50;
    }

    else if (collider.name == "player" && collidee.name == "balloon_green" || collidee.name == "balloon_blue" || collidee.name == "balloon_red") {
        collidee.lifetime = 1;
        collidee.deathTime = timestamp() + collidee.lifetime;

        var levelBalloons = parseInt(getGameData("Level Balloons Collected"));
        levelBalloons = levelBalloons + 1;
        setGameData("Level Balloons Collected", levelBalloons);
    }


    
}
