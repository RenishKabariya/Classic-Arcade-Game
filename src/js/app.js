let level = document.querySelector('#level');
let highScore = document.querySelector('#HighScore');
let lives = document.querySelector('#lives');

var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * (40 - 30 + 1) + 30);
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x >= 500) {
        this.x = -100;
    }

    // check for collision
    if (player.x > this.x - 75 && player.x < this.x + 75 && player.y > this.y - 60 && player.y < this.y + 60) {
        player.x = 200;
        player.y = 300;
        if (lives.innerHTML != 0) {
            lives.innerHTML -= 1;
        }
        if (lives.innerHTML == 0) {
            swal({
                title: "Game Over",
                text: `Your high score is ${highScore.innerHTML}`,
                icon: "error",
                button: "OK",
                className: "alert",
            });
            player.x = 200;
            player.y = 300;
            enemy1.x = -150;
            enemy2.x = -130;
            enemy3.x = -180;
            level.innerHTML = 1;
            setTimeout(() => {
                lives.innerHTML = 3;
            }, 500);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-horn-girl.png';
    }
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        if (key === 'up' && this.y >= 60) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y -= 80);
        }
        if (key === 'down' && this.y <= 300) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y += 80);
        }
        if (key === 'left' && this.x >= 100) {
            ctx.drawImage(Resources.get(this.sprite), this.x -= 100, this.y);
        }
        if (key === 'right' && this.x <= 300) {
            ctx.drawImage(Resources.get(this.sprite), this.x += 100, this.y);
        }

        // check for winning
        setTimeout(() => {
            if (player.y === -20) {
                player.x = 200;
                player.y = 300;

                enemy1.speed += 30;
                enemy2.speed += 35;
                enemy3.speed += 20;

                if (parseInt(highScore.innerHTML) < parseInt(level.innerHTML)) {
                    highScore.innerHTML = parseInt(highScore.innerHTML) + 1;
                }
                if (lives.innerHTML > 0) {
                    level.innerHTML = parseInt(level.innerHTML) + 1;
                }
            }
        }, 999);
    }
}

let allEnemies = [];

let enemy1 = new Enemy(-20, 60);
let enemy2 = new Enemy(0, 145);
let enemy3 = new Enemy(-5, 230);

allEnemies.push(enemy1, enemy2, enemy3);

let player = new Player(200, 300);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});