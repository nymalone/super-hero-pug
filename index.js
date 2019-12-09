//_____________________________________GAME AREA_________________________________________________________________________//

var bg = new Image();
bg.src = "https://img.itch.zone/aW1hZ2UvMjI0NzUzLzEwNjE2NDYucG5n/original/rjUbXS.png";

var myObstacles = [];

var myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = window.innerWidth * 0.9;
    this.canvas.height = window.innerHeight * 0.9;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //vai limpar a tela a cada 20milisec
  },
  stop: function () {
    clearInterval(this.interval);
  },
  score: function () {
    var points = Math.floor(this.frames / 50);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '28px sans-serif';
    this.ctx.lineWidth = 1.5,
    this.ctx.textAlign = "center";
    this.ctx.strokeText("SCORE: " + points, this.canvas.width/2, 30);
  }
};

//_____________________________________BACKGROUND_________________________________________________________________________//

var backgroundImage = {
  ctx: myGameArea.canvas.getContext("2d"),
  img: bg,
  x: 0,
  speed: -2,
  move: function () {
    this.x += this.speed;
    this.x %= myGameArea.canvas.width;
  },
  draw: function () {
    this.ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      this.ctx.drawImage(this.img, this.x + myGameArea.canvas.width, 0);
    } else {
      this.ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
};

//__________________________________________MOTOR_________________________________________________________________________//

function updateCanvas() {
  backgroundImage.move();
  myGameArea.clear();
  backgroundImage.draw();
  player.newPos();
  player.update();
  updateObstacles();
  myGameArea.score();
  myGameArea.frames += 1;
  checkGameOver();
  requestAnimationFrame(updateCanvas);
}
// start calling updateCanvas once the image is loaded
bg.onload = updateCanvas;

//_____________________________________COMPONENT_________________________________________________________________________//

class Component {
  constructor(width, height, color, x, y) {
    //parametros que determinam as caracteristicas desse componente
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    //speed properties
    this.speedX = 0;
    this.speedY = 0;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  newPos() {
    this.x += this.speedX;
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x + this.width > myGameArea.canvas.width) {
      this.x = myGameArea.canvas.width - this.width;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y + this.height > myGameArea.canvas.height) {
      this.y = myGameArea.canvas.height - this.height;
    }
    this.y += this.speedY;
  }
  update() {
    //vai pintar componentes na tela e em diferentes posiçpes
    var ctx = myGameArea.canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    ); 
  }
}

//________________________________________MOVING_________________________________________________________________________//

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 3;
      break;
    case 40: // down arrow
      player.speedY += 3;
      break;
    case 37: // left arrow
      player.speedX -= 3;
      break;
    case 39: // right arrow
      player.speedX += 3;
      break;
  }
};

document.onkeyup = function (e) {
  player.speedX = 0;
  player.speedY = 0;
};

const player = new Component(50, 50, "blue", 0, 330);
console.log(player);
myGameArea.start();

//_____________________________________OBSTACLES_________________________________________________________________________//

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -2;
    myObstacles[i].update();
  }
  if (myGameArea.frames % 90 === 0) {
    var x = myGameArea.canvas.width;
    var minHeight = 50;
    var maxHeight = myGameArea.canvas.height - 50;
    var height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    myObstacles.push(new Component(10, 50, "green", x, height));
  }
}

//_____________________________________GAME OVER_________________________________________________________________________//

function checkGameOver() {
  var crashed = myObstacles.some(function(obstacle) {
    return player.crashWith(obstacle);
  });
  if (crashed) {
    myGameArea.canvas.stop();
  }
}

//criaar outra function "chackgain point" 
// criar outro "crash with" pra ganhar pontos se relar 
//criar array vazia pros pontos ganhos 

//diferenreciar as imagens 
//criar uma função pra gerar as imagens 