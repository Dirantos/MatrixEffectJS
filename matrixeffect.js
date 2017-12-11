function matrixEffect() {

  var $canvas = document.getElementsByClassName('matrix-effect-canvas')[0];
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;

  var ctx = $canvas.getContext('2d');

  var rows = [];
  for(var i = 0; i < $canvas.width/20; i++) {
    var size = random(9, 20);
    var green = random(50, 255);
    rows[i] = new Row(22*i + 10, -random(0,60)*20, size, 4, random(20,60), green);
  }

  (function render() {

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);

    for(var i in rows) {
      rows[i].render(ctx);
      if(rows[i].y > $canvas.height) {
        var size = random(9, 20);
        var green = random(50, 255);
        rows[i] = new Row(22*i + 10, -random(0,60)*20, size, 4, random(20,60), green);
      }
    };

    requestAnimationFrame(render);
  })();

}

function Letter(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.down = 0;
  this.letter = randomLetter();
  this.speed = speed;
  this.color = 'rgb(0,255,0)';
}
Letter.prototype.render = function(ctx) {
  if(++this.down > this.speed) {
    this.y += this.size;
    this.down = 0;
    this.letter = randomLetter();
  }

  ctx.shadowColor = this.color;
  ctx.shadowBlur = this.size;

  ctx.fillStyle = this.color;
  ctx.font = this.size + 'px monospace';
  ctx.fillText(this.letter, this.x, this.y);

}

function randomLetter() {
  var letters = "0123456789abcdef";
  return letters[Math.floor(Math.random() * letters.length)];
}

function Row(x, y, size, speed, height, green) {
  this.letters = [];
  this.x = x;
  this.y = y;
  for(var i = 0; i < height; i++) {
      this.letters[i] = new Letter(x, y - i*size, size, speed);
      this.letters[i].color = 'rgb(0,' + green + ',0)';
  }
}
Row.prototype.render = function(ctx) {
  for(var i in this.letters) {
    this.letters[i].render(ctx);
  }
  this.y = this.letters[this.letters.length - 1].y;
}

function random(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
