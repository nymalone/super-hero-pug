var myObstacles = [];

var myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = window.innerWidth * 0.9;
    this.canvas.height = window.innerHeight * 0.9;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updateGameArea, 20); //will be called later
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //vai limpar a tela a cada 20milisec
  }
};

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
    this.y += this.speedY;
  }
  update() { //vai pintar componentes na tela e em diferentes posiçpes
    var ctx = myGameArea.canvas.getContext('2d');
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 2;
      break;
    case 40: // down arrow
      player.speedY += 2;
      break;
    case 37: // left arrow
      player.speedX -= 2;
      break;
    case 39: // right arrow
      player.speedX += 2;
      break;
  }
};

document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;
};

const player = new Component(50, 50, "blue", 0, 330);
console.log(player);
myGameArea.start();

//update game area é a minha call back q acontece a cada 20 milissegundos
function updateGameArea() {
  myGameArea.clear();
  player.newPos();
  player.update(); 
  updateObstacles();
}
