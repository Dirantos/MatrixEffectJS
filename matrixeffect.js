  /************************/
  /*     MATRIX EFFECT    */
  /************************/

function MatrixEffect() {

  this.canvas = document.getElementsByClassName('matrix-effect-canvas')[0];
  this.width = this.canvas.width = window.innerWidth;
  this.height = this.canvas.height = window.innerHeight;

  this.ctx = this.canvas.getContext('2d');

  this.rows = [];
  for(var i = 0; i < this.width/20; i++) {
    this.rows[i] = generateRow(22*i + 10, -random(0,60)*20);
  }

}

MatrixEffect.prototype.render = function() {
  this.ctx.fillStyle = '#000';
  this.ctx.fillRect(0, 0, this.width, this.height);

  for(var i in this.rows) {
    this.rows[i].render(this.ctx);
    this.rows[i].update();
    if(this.rows[i].y > this.height) {
      this.rows[i] = generateRow(22*i + 10, -random(0,60)*20);
    }
  }
}

/****************/
/*    LETTER    */
/****************/

function Letter(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.down = 0;
  this.letter = randomLetter();
  this.speed = speed;
}

Letter.prototype.update = function() {
  if(++this.down > this.speed) {
    this.y += this.size;
    this.down = 0;
    this.letter = randomLetter();
  }
}

Letter.prototype.render = function(ctx) {
  ctx.fillText(this.letter, this.x, this.y);
}


/*************/
/*    ROW    */
/*************/

function Row(x, y, size, speed, height, green) {
  this.letters = [];
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = 'rgb(0,' + green + ',0)';
  for(var i = 0; i < height; i++) {
      this.letters[i] = new Letter(x, y - i*size, size, speed);
      this.letters[i].color = 'rgb(0,' + green + ',0)';
  }
}

Row.prototype.update = function() {
  this.y = this.letters[this.letters.length - 1].y;
}

Row.prototype.render = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.font = this.size + 'px monospace';
  ctx.shadowColor = this.color;
  ctx.shadowBlur = this.size;

  for(var i in this.letters) {
    this.letters[i].render(ctx);
    this.letters[i].update();
  }
}

/*************************/
/*    UTILS FUNCTIONS    */
/*************************/

function randomLetter() {
  var letters = "0123456789abcdef";
  return letters[Math.floor(Math.random() * letters.length)];
}

function random(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function generateRow(x, y) {
  var size = random(9, 20);
  var green = random(50, 255);
  return new Row(x, y, size, 4, random(20,60), green);
}
