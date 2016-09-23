// debug

function debug(entities)
{
    debugOutput = TIME_SECONDS_ELAPSED.toFixed(1);
    debugOutput += "<br />";

    debugOutput += "SLOT_ID=" + SLOT_ID;
    debugOutput += " MENU=" + MENU;
    debugOutput += "<br />";

    for (var i = 0, length = entities.length; i < length; i++) {
        var entity = entities[i];
        debugOutput += " id=" + entity.id;
        debugOutput += " uname=" + entity.uniqueName;
        debugOutput += " name=" + entity.name;
        debugOutput += " coord= (" + entity.x.toFixed(0) + "," + entity.y.toFixed(0) + ")(" + entity.getRight().toFixed(0) + "," + entity.getBottom().toFixed(0) + ")";
        debugOutput += " vel= (" + entity.vx.toFixed(2) + "," + entity.vy.toFixed(2) + ")";
        debugOutput += " mom= (" + entity.momentumX.toFixed(2) + "," + entity.momentumY.toFixed(2) + ")";
        debugOutput += " acc= (" + entity.ax.toFixed(2) + "," + entity.ay.toFixed(2) + ")";
        debugOutput += " rot= (" + entity.rotxy.toFixed(2) + "," + entity.rotxz.toFixed(2) + "," + entity.rotyz.toFixed(2) + ")";
        
        var rotxyrad = entity.rotxy * Math.PI / 180;
        debugOutput += " rotxrrrad= (" + rotxyrad.toFixed(2) + ")";

        var rotxysin = Math.sin(rotxyrad); 
        debugOutput += " rotxysin= (" + rotxysin.toFixed(2) + ")";

        var rotxycos = Math.cos(rotxyrad);
        debugOutput += " rotxycos= (" + rotxycos.toFixed(2) + ")";

        debugOutput += "<br />";       
    }
    for (var i = 0, length = cameraList.length; i < length; i++) {
        var camera = cameraList[i];
        debugOutput += " cid=" + camera.id;
        debugOutput += " uname=" + camera.uniqueName;
        debugOutput += " coord= (" + camera.x.toFixed(0) + "," + camera.y.toFixed(0) + ")(" + camera.getRight().toFixed(0) + "," + camera.getBottom().toFixed(0) + ")";
        debugOutput += "<br />";

    }

    document.getElementById("output").innerHTML = debugOutput;
}

// Constants

var PhysicsEntity_KINEMATIC = 'kinematic';
var PhysicsEntity_DISPLACE = 'displace';
var PhysicsEntity_STATIONARY = 'stationary';
var PhysicsEntity_ELASTIC = 'elastic';
var PhysicsEntity_DYNAMIC = 'dynamic';
var PhysicsEntity_NONE = 'none';
var STICKY_THRESHOLD = 0.0004;
var HEALTH_MOMENTUM_THRESHOLD = 50;


GRAVITY_X = 0;
GRAVITY_Y = 100;
PLAYER_INPUT_VALUE = 5;
COLLISION_ELASTICITY_PERCENT = 0.05;

function PhysicsEngine(elapsed, entities, cameraList, player, camera) {
    this.elapsed = elapsed;
    this.entities = entities;
    this.cameraList = cameraList;
    this.player = player;
    this.camera = camera;
}

PhysicsEngine.prototype.step = function () {
    

    var elapsed = this.elapsed;
    var gx = GRAVITY_X * elapsed;
    var gy = GRAVITY_Y * elapsed;
    var entity;
    var entities = this.entities;

    debug(entities);

    objectCode();

    for (var c = 0; c < cameraList.length; c++) {
        var cam = cameraList[c];

        if (cam.followId != "") {
            var fid = -1;
            for(var e=0; e<entities.length; e++){
                if (cam.followId == entities[e].uniqueName) {
                    fid = e;
                }
            }
            if (fid >= 0) {
                var entityMidX = entities[fid].getMidX();
                var entityMidY = entities[fid].getMidY();

                cam.x = entityMidX - cam.halfLensX;
                cam.y = entityMidY - cam.halfLensY;
            }
        } else {
            if (camera.input.left) {
                cam.x -= PLAYER_INPUT_VALUE;
            }
            if (camera.input.right) {
                cam.x += PLAYER_INPUT_VALUE;
            }
            if (camera.input.up) {
                cam.y -= PLAYER_INPUT_VALUE;
            }
            if (camera.input.down) {
                cam.y += PLAYER_INPUT_VALUE;
            }
        }

        var cRight = cam.getRight();
        var cLeft = cam.getLeft();
        var cTop = cam.getTop();
        var cBottom = cam.getBottom();

        if (cam.maxX != null) {
            if (cRight > cam.maxX) {
                cam.x = cam.maxX - cam.lensX;
            }
        }
        if (cam.minX != null) {
            if (cLeft < cam.minX) {
                cam.x = cam.minX;
            }
        }
        if (cam.minY != null) {
            if (cTop < cam.minY) {
                cam.y = cam.minY;
            }
        }
        if (cam.maxY != null) {
            if (cBottom > cam.maxY) {
                cam.y = cam.maxY - cam.lensY;
            }
        }


    }
    
    for (var i = 0, length = entities.length; i < length; i++) {
        entity = entities[i];
        if (entity) {
            var now = timestamp();
            if (entity.lifetime > 0) {
                if (entity.deathTime < now) {
                    entities.splice(i, 1);
                    continue;
                }
            }

            switch (entity.type) {
                case PhysicsEntity_DYNAMIC:
                    entity.vx += entity.ax * elapsed + gx;
                    entity.vy += entity.ay * elapsed + gy;
                    entity.x += entity.vx * elapsed;
                    entity.y += entity.vy * elapsed;
                    break;
                case PhysicsEntity_KINEMATIC:
                    entity.vx += entity.ax * elapsed;
                    entity.vy += entity.ay * elapsed;
                    entity.x += entity.vx * elapsed;
                    entity.y += entity.vy * elapsed;
                    break;
            }

            if (entity.control == 'player') {
                entity = handlePlayerControls(entity);
            }

            entity.forceX = entity.mass * entity.vx;
            entity.forceY = entity.mass * entity.vy;

            entity.momentumX = entity.mass * entity.vx;
            entity.momentumY = entity.mass * entity.vy;
        }

    }

    for (var cr = 0; cr < entities.length; cr++) {
        var collider = entities[cr];
        for (var ce = 0; ce < entities.length; ce++) {
            var collidee = entities[ce];

            if (cr != ce) {
                collisionDetector = new CollisionDetector(collider, collider.ExtInt, collidee, collidee.ExtInt);
                var collisions = collisionDetector.collideRect();

                if (collisions) {
                    Collision.resolver(collider, collidee);
                    
                    //this.solver.resolve(collider, collisions);
                }
            }
        }
    }
    /*
    var collisions = this.collider.detectCollisions(
        this.collider, 
        this.collidables
    );
    */    
};

var Collision = {

    // Elastic collisions refer to the simple cast where
    // two entities collide and a transfer of energy is
    // performed to calculate the resulting speed
    // We will follow Box2D's example of using
    // restitution to represent "bounciness"

    elastic: function (restitution) {
        this.restitution = restitution || .2;
    },

    displace: function () {
        // While not supported in this engine
        // the displacement collisions could include
        // friction to slow down entities as they slide
        // across the colliding entity
    },

    stationary: function () {
        // While not supported in this engine
        // the displacement collisions could include
        // friction to slow down entities as they slide
        // across the colliding entity
    },
    none: function (collider, collidee) {
        //objectCode_Collision(collider, collidee);
    },
    health: function (collider, collidee, deltaMomentum) {
        if (deltaMomentum > HEALTH_MOMENTUM_THRESHOLD) {
            collider.health -= deltaMomentum;
        }
	},
    resolver: function (collider, collidee) {
        if(collider.collision == PhysicsEntity_ELASTIC && collidee.collision == PhysicsEntity_ELASTIC){
            if (collider.ExtInt == "external" && collidee.ExtInt == "external"){
                Resolver.elastic_ext_ext(collider, collidee);   
            }
            else if (collider.ExtInt == "internal" && collidee.ExtInt == "external") {
                Resolver.elastic_int_ext(collider, collidee);
            }
            else if (collider.ExtInt == "external" && collidee.ExtInt == "internal") {
                Resolver.elastic_ext_int(collider, collidee);
            }
        }
        else if (collider.collision == PhysicsEntity_ELASTIC && collidee.collision == PhysicsEntity_STATIONARY) {
            if (collider.ExtInt == "external" && collidee.ExtInt == "external") {
                Resolver.elastic_ext_ext(collider, collidee);
            }
            else if (collider.ExtInt == "internal" && collidee.ExtInt == "external") {
                Resolver.elastic_int_ext(collider, collidee);
            }
            else if (collider.ExtInt == "external" && collidee.ExtInt == "internal") {
                Resolver.elastic_ext_int(collider, collidee);
            }
        }
       else  if (collider.collision == PhysicsEntity_ELASTIC && collidee.collision == PhysicsEntity_NONE) {
           objectCode_Collision(collider, collidee);
           
        }
    }
};

var Resolver = {
    elastic_ext_ext: function (collider, collidee) {
        
        // Find the mid points of the collidee and collider
        var pMidX = collider.getMidX();
        var pMidY = collider.getMidY();
        var aMidX = collidee.getMidX();
        var aMidY = collidee.getMidY();

        // To find the side of entry calculate based on
        // the normalized sides
        var dx = (aMidX - pMidX) / collidee.halfWidth;
        var dy = (aMidY - pMidY) / collidee.halfHeight;

        // Calculate the absolute change in x and y
        var absDX = Math.abs(dx);
        var absDY = Math.abs(dy);

        var totalMomentumX = (collider.momentumX + collidee.momentumX);
        var totalMomentumY = (collider.momentumY + collidee.momentumY);

        var massRatio = collider.mass / (collider.mass + collidee.mass);

        var newMomentumX = massRatio * totalMomentumX;
        var newMomentumY = massRatio * totalMomentumY;

        var deltaMomentumX = newMomentumX - collider.momentumX;
        var deltaMomentumY = newMomentumY - collider.momentumY;

        deltaMomentumX = deltaMomentumX * (1 + COLLISION_ELASTICITY_PERCENT);
        deltaMomentumY = deltaMomentumY * (1 + COLLISION_ELASTICITY_PERCENT);

        var deltaMomentum = Math.sqrt((deltaMomentumX * deltaMomentumX) + (deltaMomentumY * deltaMomentumY));

        Collision.health(collider, collidee, deltaMomentum);

        newMomentumX = deltaMomentumX + collider.momentumX;
        newMomentumY = deltaMomentumY + collider.momentumY;

        // If the distance between the normalized x and y
        // position is less than a small threshold (.1 in this case)
        // then this object is approaching from a corner
        if (Math.abs(absDX - absDY) < .05) {

            // If the collider is approaching from positive X
            if (dx < 0) {

                // Set the collider x to the right side
                collider.x = collidee.getRight();

                // If the collider is approaching from negative X
            } else {

                // Set the collider x to the left side
                collider.x = collidee.getLeft() - collider.width;
            }

            // If the collider is approaching from positive Y
            if (dy < 0) {

                // Set the collider y to the bottom
                collider.y = collidee.getBottom();

                // If the collider is approaching from negative Y
            } else {

                // Set the collider y to the top
                collider.y = collidee.getTop() - collider.height;
            }

            // Randomly select a x/y direction to reflect velocity on
            if (Math.random() < .5) {

                //collidee.vx = colliderForceX;

                // Reflect the velocity at a reduced rate
                collider.vx = (newMomentumX / collider.mass);
                //collider.vx = -collider.vx * collider.restitution;
                

                // If the object's velocity is nearing 0, set it to 0
                // STICKY_THRESHOLD is set to .0004
                if (Math.abs(collider.vx) < STICKY_THRESHOLD) {
                    collider.vx = 0;
                }
            } else {

                //collidee.vy = colliderForceY;
                //collider.vy = -collider.vy * collider.restitution;
                collider.vy = (newMomentumY / collider.mass);

                if (Math.abs(collider.vy) < STICKY_THRESHOLD) {
                    collider.vy = 0;
                }
            }

            // If the object is approaching from the sides
        } else if (absDX > absDY) {

            // If the collider is approaching from positive X
            if (dx < 0) {
                collider.x = collidee.getRight();

            } else {
                // If the collider is approaching from negative X
                collider.x = collidee.getLeft() - collider.width;
            }

            //collidee.vx = colliderForceX;

            // Velocity component
            collider.vx = (newMomentumX / collider.mass);
            //collider.vx = -collider.vx * collider.restitution;
            

            if (Math.abs(collider.vx) < STICKY_THRESHOLD) {
                collider.vx = 0;
            }

            // If this collision is coming from the top or bottom more
        } else {

            // If the collider is approaching from positive Y
            if (dy < 0) {
                collider.y = collidee.getBottom();

            } else {
                // If the collider is approaching from negative Y
                collider.y = collidee.getTop() - collider.height;
            }

            //collidee.vy = colliderForceY;
            // Velocity component
            //collider.vy = -collider.vy * collider.restitution;
            collider.vy = (newMomentumY / collider.mass);
            if (Math.abs(collider.vy) < STICKY_THRESHOLD) {
                collider.vy = 0;
            }
        }
    },
    elastic_int_ext: function (collider, collidee) {

    },
    elastic_ext_int: function (collider, collidee) {
        // Find the mid points of the collidee and collider
        var pMidX = collider.getMidX();
        var pMidY = collider.getMidY();
        var aMidX = collidee.getMidX();
        var aMidY = collidee.getMidY();

        // To find the side of entry calculate based on
        // the normalized sides
        var dx = (aMidX - pMidX) / collidee.halfWidth;
        var dy = (aMidY - pMidY) / collidee.halfHeight;

        // Calculate the absolute change in x and y
        var absDX = Math.abs(dx);
        var absDY = Math.abs(dy);

        if (collider.x < collidee.getLeft()) {
            collider.x = collidee.getLeft();
            // Velocity component
            collider.vx = -collider.vx * collider.restitution;

            if (Math.abs(collider.vx) < STICKY_THRESHOLD) {
                collider.vx = 0;
            }
        }
        else if (collider.x > collidee.getRight() - collider.width) {
            collider.x = collidee.getRight() - collider.width;
            // Velocity component
            collider.vx = -collider.vx * collider.restitution;

            if (Math.abs(collider.vx) < STICKY_THRESHOLD) {
                collider.vx = 0;
            }
        }
        if (collider.y < collidee.getTop()) {
            collider.y = collidee.getTop();
            // Velocity component
            collider.vy = -collider.vy * collider.restitution;

            if (Math.abs(collider.vy) < STICKY_THRESHOLD) {
                collider.vy = 0;
            }
        }
        else if (collider.y > collidee.getBottom() - collider.width) {
            collider.y = collidee.getBottom() - collider.width;
            // Velocity component
            collider.vy = -collider.vy * collider.restitution;

            if (Math.abs(collider.vy) < STICKY_THRESHOLD) {
                collider.vy = 0;
            }
        }
    }
}

var CameraEntity = function (x, y, z, type, lensX, lensY, zoom, followId, minX, minY, minZ, maxX, maxY, maxZ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.type = type || 0;
    this.lensX = lensX || 0;
    this.lensY = lensY || 0;
    this.zoom = zoom || 0;
    this.followId = followId || -1;
    this.minX = minX;
    this.minY = minY;
    this.minZ = minZ;
    this.maxX = maxX;
    this.maxY = maxY;
    this.maxZ = maxZ;

    // Store a half size for quicker calculations
    this.halfLensX = this.lensX * .5;
    this.halfLensY = this.lensY * .5;
}
// Camera entity calculations
CameraEntity.prototype = {

    // Update bounds includes the rect's
    // boundary updates
    updateBounds: function () {
        this.halfLensX = this.lensX * .5;
        this.halfLensY = this.lensY * .5;
    },

    // Getters for the mid point of the rect
    getMidX: function () {
        return this.halfLensX + this.x;
    },

    getMidY: function () {
        return this.halfLensY + this.y;
    },
    getTop: function () {
    return this.y;
    },
    getLeft: function () {
        return this.x;
    },
    getRight: function () {
        return this.x + this.lensX;
    },
    getBottom: function () {
        return this.y + this.lensY;
}
}

// The physics collidee will take on a shape, collision
// and type based on its parameters. These entities are
// built as functional objects so that they can be
// instantiated by using the 'new' keyword.

var PhysicsEntity = function (id, parentid, name, uniqueName, collisionName, restitution, mass, type, x, y, z, width, height, depth, ExtInt, imageName, control,
    vx, vy, vz, ax, ay, az, health, rotxy, rotxz, rotyz, lifetime, animNumbFrames) {

    this.creationTime = timestamp();
    this.deathTime = this.creationTime + lifetime;

    this.id = id;
    this.parentid = parentid;
    this.name = name;
    this.uniqueName = uniqueName;

    // Setup the defaults if no parameters are given
    // Type represents the collision detector's handling
    this.type = type || PhysicsEntity_DYNAMIC;

    // Collision represents the type of collision
    // another object will receive upon colliding
    this.collision = collisionName || PhysicsEntity_ELASTIC;
    this.mass = mass || 0;
    this.restitution = restitution || 0.2;
    this.health = health || 1;

    this.lifetime = lifetime || -1;
    this.animNumbFrames = animNumbFrames || 1;

    this.ExtInt = ExtInt || 'external';

    // Take in a width and height
    this.width = width || 0;
    this.height = height || 0;
    this.depth = depth || 0;

    this.imageName = imageName;
    this.control = control || "none";

    // Store a half size for quicker calculations
    this.halfWidth = this.width * .5;
    this.halfHeight = this.height * .5;

    var collision = Collision[this.collision];
    collision.call(this);

    // Position
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    // Rotation
    this.rotxy = rotxy || 0;
    this.rotxz = rotxz || 0;
    this.rotyz = rotyz || 0;

    // Velocity
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.vz = vz || 0;

    // Acceleration
    this.ax = ax || 0;
    this.ay = ay || 0;
    this.az = az || 0;

    this.forceX = mass * this.ax;
    this.forceY = mass * this.ay;

    this.momentumX = mass * this.vx;
    this.momentumY = mass * this.vy;

    // Update the bounds of the object to recalculate
    // the half sizes and any other pieces
    this.updateBounds();
};

// Physics entity calculations
PhysicsEntity.prototype = {

    // Update bounds includes the rect's
    // boundary updates
    updateBounds: function () {
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
    },

    // Getters for the mid point of the rect
    getMidX: function () {
        return this.halfWidth + this.x;
    },

    getMidY: function () {
        return this.halfHeight + this.y;
    },

    // Getters for the top, left, right, and bottom
    // of the rectangle
    getTop: function () {
        return this.y;
    },
    getLeft: function () {
        return this.x;
    },
    getRight: function () {
        return this.x + this.width;
    },
    getBottom: function () {
        return this.y + this.height;
    }
};

function CollisionDetector(collider, colliderIntExt, collidee, collideeIntExt) {
    this.collider = collider;
    this.collidee = collidee;
    this.colliderIntExt = colliderIntExt;
    this.collideeIntExt = collideeIntExt;
}

// Rect collision tests the edges of each rect to
// test whether the objects are overlapping the other
CollisionDetector.prototype.collideRect = function () {

    var collider = this.collider;
    var collidee = this.collidee;
    var colliderIntExt = this.colliderIntExt;
    var collideeIntExt = this.collideeIntExt;

    // Store the collider and collidee edges
    var l1 = collider.getLeft();
    var t1 = collider.getTop();
    var r1 = collider.getRight();
    var b1 = collider.getBottom();

    var l2 = collidee.getLeft();
    var t2 = collidee.getTop();
    var r2 = collidee.getRight();
    var b2 = collidee.getBottom();

    if (colliderIntExt == 'external' && collideeIntExt == 'external'){
        if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
            return false;
        }
    } 
    else if (colliderIntExt == 'external' && collideeIntExt == 'internal'){
        if (b1 < b2 && t1 > t2 && r1 < r2 && l1 > l2) {
            return false;
        }
    } 
    else if (colliderIntExt == 'internal' && collideeIntExt == 'external') {
        if (b1 > b2 && t1 < t2 && r1 > r2 && l1 < l2) {
            return false;
        }
    } 
    else if (colliderIntExt == 'internal' && collideeIntExt == 'internal') {
        return false;
    } 

    // If the algorithm made it here, it had to collide
    return true;
};

