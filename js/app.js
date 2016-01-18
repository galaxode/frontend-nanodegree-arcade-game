// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.generateSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = this.x + this.speed * dt;

    if(this.x<505){
        this.x += dt * this.speed;

    }else{
        this.x = 0;
        this.speed = this.generateSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.generateSpeed = function() {
    return Math.floor((Math.random() * 450) + 40);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
};
Player.prototype.update = function() {
    this.checkCollisions();
};
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if (key === 'up') {
        this.y = this.y - 83;
        if (this.y < 20) {
            this.resetPlayerPosition();
        }
    } else if (key === 'down' && this.y + 83 < 473) {
        this.y = this.y + 83;
    } else if (key === 'left' && this.x - 101 > -3) {
        this.x = this.x - 101;
    } else if (key === 'right' && this.x + 101 < 403) {
        this.x = this.x + 101;
    }
};
// a method used to detect collisions. Magic numbers are trial and error. Need to be put in constants
Player.prototype.checkCollisions = function() {
    for (var i=0; i<allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 50 &&
            player.x + 100 > allEnemies[i].x + 50 &&
            player.y + 85 < allEnemies[i].y + 100 &&
            player.y + 145 > allEnemies[i].y + 100) {
            player.resetPlayerPosition();
        }
    }
};
Player.prototype.resetPlayerPosition = function() {
    player.x = 200;
    player.y = 390;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 220);
var enemy2 = new Enemy(0, 140);
var enemy3 = new Enemy(0, 55);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
