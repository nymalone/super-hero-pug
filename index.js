//_____________________________________GAME AREA_________________________________________________________________________//

let bg = new Image();
bg.src = "vector-bg.png";

var myMusic;

let obs1 = new Image();
obs1.src = "./images/bomb.png";
let obs2 = new Image();
obs2.src = "./images/missile.png";
let obs3 = new Image();
obs3.src = "./images/dynamite.png";

let food1 = new Image();
food1.src = "./images/apple.png";
let food2 = new Image();
food2.src = "./images/cake.png";
let food3 = new Image();
food3.src = "./images/cookie.png";
let food4 = new Image();
food4.src = "./images/cupcake.png";
let food5 = new Image();
food5.src = "./images/donut.png";
let food6 = new Image();
food6.src = "./images/meat.png";
let food7 = new Image();
food7.src = "./images/watermelon.png";

let myObstacles = [];
let myFoods = [];
let life = 3;
let points = 0;
let id = 0;
let pause = false;

let myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  //id: requestAnimationFrame(updateCanvas), ///// aqui - depois disso ficou mais rapido/////
  start: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //vai limpar a tela a cada 20milisec
  },
  stop: function () {
    cancelAnimationFrame(id); //// aqui ////
  },
  score: function () {
    let scoreImage = new Image();
    scoreImage.src = "./images/money.png";
    this.ctx.drawImage(scoreImage, 1280, 10);
    this.ctx.fillStyle = "green";
    (this.ctx.font = "45px sans-serif"),
    (this.ctx.lineWidth = 1.5),
    (this.ctx.textAlign = "center"),
    this.ctx.fillText(points, 1380, 47);
  },
  updateLife: function () {
    let lifeImage = new Image();
    lifeImage.src = "./images/valentines.png";
    for (let i = 1; i <= life; i += 1) {
      this.ctx.drawImage(lifeImage, -20 + i * 60, 10, 45, 45);
    }
  }
};
//_____________________________________BACKGROUND_________________________________________________________________________//

let backgroundImage = {
  ctx: myGameArea.canvas.getContext("2d"),
  img: bg,
  x: 0,
  speed: -3,
  move: function () {
    this.x += this.speed;
    this.x %= myGameArea.canvas.width;
    if (points >= 100) {
      this.x += this.speed + 1; //ARRUMAR!!
    } else if (points > 100 && points <= 200) {
      this.x += this.speed + 1.5;
    } else if (points > 200 && points <= 400) {
      this.x += this.speed + 2;
    }
  },
  draw: function () {
    this.ctx.drawImage(
      this.img,
      this.x,
      0,
      myGameArea.canvas.width,
      myGameArea.canvas.height
    );
    if (this.speed < 0) {
      this.ctx.drawImage(
        this.img,
        this.x + myGameArea.canvas.width,
        0,
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );
    } else {
      this.ctx.drawImage(
        this.img,
        this.x - this.img.width,
        0,
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );
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
  updateFoods();
  myGameArea.score();
  myGameArea.frames += 1;
  checkGainPoints();
  myGameArea.updateLife();
  id = requestAnimationFrame(updateCanvas);
  myMusic.play();
  checkGameOver();
}
myMusic = new sound("bg-sound3.mp3");

// start calling updateCanvas once the image is loaded
bg.onload = requestAnimationFrame(updateCanvas);

//_____________________________________COMPONENT_________________________________________________________________________//

class Component {
  constructor(width, height, num, x, y, type) {
    //parametros que determinam as caracteristicas desse componente
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = num;
    } else {
      this.num = num;
    }
    this.width = width;
    this.height = height;
    this.angle = 0;
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
    let ctx = myGameArea.canvas.getContext("2d");
    if (this.type === "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      if (this.num === 1) {
        ctx.drawImage(obs1, this.x, this.y, 45, 45);
      } else if (this.num === 2) {
        ctx.drawImage(obs2, this.x, this.y, 45, 45);
      } else if (this.num === 3) {
        ctx.drawImage(obs3, this.x, this.y, 45, 45);
      } else if (this.num === 4) {
        ctx.drawImage(food1, this.x, this.y, 45, 45);
      } else if (this.num === 5) {
        ctx.drawImage(food2, this.x, this.y, 45, 45);
      } else if (this.num === 6) {
        ctx.drawImage(food3, this.x, this.y, 45, 45);
      } else if (this.num === 7) {
        ctx.drawImage(food4, this.x, this.y, 45, 45);
      } else if (this.num === 8) {
        ctx.drawImage(food5, this.x, this.y, 45, 45);
      } else if (this.num === 9) {
        ctx.drawImage(food6, this.x, this.y, 45, 45);
      } else if (this.num === 10) {
        ctx.drawImage(food7, this.x, this.y, 45, 45);
      }
    }
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() - 40 < obstacle.left() ||
      this.left() + 40 > obstacle.right()
    );
  }
  crashWithFood(food) {
    return !(
      this.bottom() < food.top() ||
      this.top() > food.bottom() ||
      this.right() - 40 < food.left() ||
      this.left() + 40 > food.right()
    );
  }
}

//__________________________________________SOUND_________________________________________________________________________//

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
//________________________________________MOVING_________________________________________________________________________//

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 5;
      break;
    case 40: // down arrow
      player.speedY += 5;
      break;
    case 37: // left arrow
      player.speedX -= 5;
      break;
    case 39: // right arrow
      player.speedX += 5;
      break;
    case 32: // spacebar
      pause = !pause;
      if (pause) {
        myGameArea.stop();
        myMusic.stop();
      } else {
        requestAnimationFrame(updateCanvas);
      }
      break;
    case 13: //enter
      life = 3;  // fazer um IF pra se a vida for maior que 0 o enter nao funcionar 
      player.x = 0;
      requestAnimationFrame(updateCanvas);
      break;
  }
};

document.onkeyup = function (e) {
  player.speedX = 0;
  player.speedY = 0;
};

const player = new Component(253, 153, "hero.png", 0, 330, "image");
console.log(player);
myGameArea.start();

//_____________________________________OBSTACLES_________________________________________________________________________//

function updateObstacles() {
  for (let i = 0; i < myObstacles.length; i++) {
    if (points <= 40) {
      myObstacles[i].x += -4;
    } else if (points >= 50 && points <= 70) {
      myObstacles[i].x += -5;
    } else if (points > 70 && points <= 100) {
      myObstacles[i].x += -6;
    } else if (points > 100 && points <= 150) {
      myObstacles[i].x += -8;
    } else if (points > 150 && points <= 200) {
      myObstacles[i].x += -10;
    } else if (points > 200 && points <= 250) {
      myObstacles[i].x += -12;
    } else if (points > 250 && points <= 300) {
      myObstacles[i].x += -14;
    } else if (points > 300 && points <= 350) {
      myObstacles[i].x += -16;
    } else if (points > 350 && points <= 400) {
      myObstacles[i].x += -18;
    } else if (points > 400 && points <= 450) {
      myObstacles[i].x += -20;
    } else if (points > 450 && points <= 500) {
      myObstacles[i].x += -22;
    } else if (points > 500 && points <= 600) {
      myObstacles[i].x += -24;
    } else if (points > 600 && points <= 700) {
      myObstacles[i].x += -26;
    } else if (points > 700 && points <= 800) {
      myObstacles[i].x += -28;
    } else if (points > 800 && points <= 900) {
      myObstacles[i].x += -30;
    } else if (points > 900 && points <= 1000) {
      myObstacles[i].x += -32;
    }
    myObstacles[i].update();
  }
  if (myGameArea.frames % 100 === 0) {
    let x = myGameArea.canvas.width;
    let minHeight = 10;
    let maxHeight = myGameArea.canvas.height - 100;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let num = Math.floor(Math.random() * (3 - 1) + 1);
    myObstacles.push(new Component(30, 30, num, x, height));
  }
}

//__________________________________________FOODS_________________________________________________________________________//

function updateFoods() {
  for (let i = 0; i < myFoods.length; i++) {
    if (points <= 40) {
      myFoods[i].x += -4;
    } else if (points >= 50 && points <= 70) {
      myFoods[i].x += -5;
    } else if (points > 70 && points <= 100) {
      myFoods[i].x += -6;
    } else if (points > 100 && points <= 150) {
      myFoods[i].x += -7;
    } else if (points > 150 && points <= 200) {
      myFoods[i].x += -8;
    } else if (points > 200 && points <= 250) {
      myFoods[i].x += -9;
    } else if (points > 250 && points <= 300) {
      myFoods[i].x += -10;
    } else if (points > 300 && points <= 350) {
      myFoods[i].x += -11;
    } else if (points > 350 && points <= 400) {
      myFoods[i].x += -12;
    } else if (points > 400 && points <= 450) {
      myFoods[i].x += -13;
    } else if (points > 450 && points <= 500) {
      myFoods[i].x += -14;
    } else if (points > 500 && points <= 600) {
      myFoods[i].x += -15;
    } else if (points > 600 && points <= 700) {
      myFoods[i].x += -16;
    } else if (points > 700 && points <= 800) {
      myFoods[i].x += -17;
    } else if (points > 800 && points <= 900) {
      myFoods[i].x += -18;
    } else if (points > 900 && points <= 1000) {
      myFoods[i].x += -19;
    }
    myFoods[i].update();
  }
  if (myGameArea.frames % 50 === 0) {
    let x = myGameArea.canvas.width;
    let minHeight = 10;
    let maxHeight = myGameArea.canvas.height - 80;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let num = Math.floor(Math.random() * (10 - 4) + 4);
    myFoods.push(new Component(30, 30, num, x, height));
  }
}
//_________________________________________POINTS_________________________________________________________________________//

function checkGainPoints() {
  let crashedFood = myFoods.some(function (food) {
    return player.crashWithFood(food);
  });
  if (crashedFood) {
    points += 10;
    myFoods.forEach((e, idx) => {
      if (player.crashWithFood(e)) {
        myFoods.splice(idx, 1);
      }
    });
    myGameArea.score(points);
  }
  console.log(points);
}
//_____________________________________GAME OVER_________________________________________________________________________//

function checkGameOver() {
  let crashed = myObstacles.some(function (obstacle) {
    return player.crashWith(obstacle);
  });
  if (crashed && life === 1) {
    myGameArea.stop();
    myGameArea.ctx.fillStyle = "black",
    myGameArea.ctx.font = "47px sans-serif",
    myGameArea.ctx.textAlign = "center",
    myGameArea.ctx.fillText("Press ENTER to continue", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 65);
    myGameArea.ctx.fillStyle = "black",
    myGameArea.ctx.font = "120px sans-serif",
    myGameArea.ctx.textAlign = "center",
    myGameArea.ctx.fillText("GAME OVER", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2)
  } else if (crashed && life > 0) {
    life -= 1;
    myObstacles.forEach((e, idx) => {
      if (player.crashWith(e)) {
        myObstacles.splice(idx, 1);
      }
    });
    myGameArea.updateLife(life);
  }
  console.log(life);
}