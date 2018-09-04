// The enemy constructor/class that is used to create several enemy objects
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';// This sets the enemy image to this.sprite
        this.x = x;// Sets this.x to the value of the parameter x
        this.y = y + 73;//  Sets and centers this.y to the value of the parameter y
        this.moveX = 101;// This is the width of each block
        this.speed = speed;// Sets this.speed to the value of the speed parameter
        this.boundX = this.moveX * 5;// Sets boundaries on the x axis 
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // This set the boundaries for the enemy on the x axis
        if(this.x < this.boundX) {
            this.x += (this.speed * dt);// The dt parameter ensures the game runs at the same speed for all computers.
        // If it gets to the boundary initialize x
        } else {
            this.x = -this.moveX;// This starts the enemy a block offscreen
        }
    }
     
    // This draws the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }     
}

// The player class that is used to create a player object
class MyPlayer {
    constructor () {
        this.sprite = 'images/char-horn-girl.png';
        this.x = 101 * 2;
        this.y = 81 * 5; // 81 is used here in order to properly place the player in the block
        this.moveX = 101;// The width of each block
        this.moveY = 83;// The height of each block
        this.boundX = 101 * 4;// The player's boundary on the x-axis
        this.boundY = 81 * 5;// The player's boundary on the y-axis
        this.level = 1;
        this.resetPos = false;
    }

    //The player's methods
    render() {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // To handle the user's keyboard input
    handleInput(evt) {
        if(evt === 'left' && this.x !== 0) {
            this.x -= this.moveX;
        
        } else if(evt === 'right' && this.x !== this.boundX) {
            this.x += this.moveX;
       
        } else if(evt === 'up' && this.y !== -10) {
            this.y -= this.moveY;
       
        } else if(evt === 'down' && this.y !== this.boundY) {
            this.y += this.moveY;
        }
    }  

    update() {
        // Check for collision
        for(const enemy of allEnemies) {
            /*This checks if the player and the enemy's position on the y axis are the same,
              if the player is in front of the enemy on the x axis,
              and if the position of the player on the x axis is less than that of the enemy plus 50.(50 is added here in order to reduce the space of collision).
            */
            if (this.y === enemy.y &&(this.x > enemy.x && this.x < (enemy.x + 50))) {
                this.reset();
            }
        }

        // Return the player back to its original position if it gets to the water block.
        // The setTimeout allows a delay of 400 milliseconds before the player is returned to its initial position.
        if(this.y === -10) {
            setTimeout(function() {
            player.reset();
            player.resetPos = true;
           }, 400);

            // This conditional statement ensures that the setTimeout finish running before the game level is increased.
           if(this.resetPos) {
                this.level++;
                const span = document.querySelector('span');
                span.textContent = this.level;
                this.resetPos = false;
                // Increase the speed or number of enemies
                upgradeEnemy();
            } 
        }

        // Outputs a congratulatory modal when the player wins and sets the player at the water block
        if(this.level === 6) {
           this.y = -10;
           const modal = document.querySelector('.modal');
           modal.style.display = 'flex'; 
        }      
    }

    // This method returns the player to its initial position
    reset() {
        this.x = 101 * 2;//player's initial position on the x axis
        this.y = 81 * 5;// player's initial position on the y axis     
    }           
}

//This function increases the number of enemy and its speed as the game level increases.
// It also adds the new enemy object created to the allEnemies array.
function upgradeEnemy() {
    if(player.level === 2) {
        let enemy4 = new Enemy(-300, 83, 500);
        allEnemies.push(enemy4);

    } else if(player.level === 3) {
        enemy1 = new Enemy(-500, 0, 1000);

    } else if(player.level === 4) {
        enemy1 = new Enemy(0, 0, 300);
        let enemy5 = new Enemy(-500, 0, 500);
        allEnemies.push(enemy5);
    
    } else if(player.level === 5) {
        let enemy6 = new Enemy(-500, 166, 500);
        allEnemies.push(enemy6);
    }
}

// Instantiate the player and the enemy objects
const player = new MyPlayer();
let enemy1 = new Enemy(-100, 0, 250);
let enemy2 = new Enemy(-150, 83, 350);
let enemy3 = new Enemy(0, 166, 300);
// Store the enemy objects created in an array
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

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


    
