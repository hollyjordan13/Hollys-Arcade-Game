// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x; //x pos
    this.y = y + 55;//center y pos
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy is not passed boundary
    if(this.x < this.boundary) {
        //Move forward
        //Increment x by speed * dt(delta time)
        this.x += this.speed * dt;
    }
    else {
        //reset pos to start 
        this.x = this.resetPos;   
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Hero {//hero
    constructor() {//constructor
        this.sprite = 'images/char-boy.png';//sprite image
        this.step = 101;//distance on x axis
        this.jump = 83;//distance on y axis
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;//x pos
        this.y = this.startY;//y pos
        this.victory = false;
    }
    
    //Update position
    update() { 
        //check collision
        for(let enemy of allEnemies) {
            //did player x any y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
                && enemy.x < this.x + this.step/2)) {
                this.reset();
            }    

            //Check win
                    //did player x and y reach river?
            if(this.y === 55) {
                this.victory = true;
                setTimeout(function() {alert('Congratulations! You made it to safety!')}, 200);

            }        
            
    }}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }        //Render
                //Draw player sprite on current x and y coord pos
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                this.x -= this.step;
            }
                break;
            case 'up':
                if (this.y > this.jump) {
                this.y -= this.jump;
            }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                this.y += this.jump;
            }
                break;            
        }

    }        //Handle keyboard input
                //Update players x and y property according to input
//Reset hero
reset() {
    //set x and y to starting x and y 
    this.y = this.startY;
    this.x = this.startX;
}
                                   
}

const player = new Hero();//store hero object in a variable
const bug1 = new Enemy(-101, 0, 350);//store enemy in a variable
const bug2 = new Enemy(-101, 83, 200);
const bug3 = new Enemy((-101*2.5), 166, 300);
const bug4 = new Enemy((-101*2.5), 83, 150);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);
console.log(allEnemies);


// This class requires an update(), render() and
// a handleInput() method.



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
