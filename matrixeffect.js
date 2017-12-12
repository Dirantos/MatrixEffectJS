/************************/
/*     MATRIX EFFECT    */
/************************/

function MatrixEffect(settings) {

    this.settings = settings || new MatrixEffectSettings();

    this.canvas = document.getElementsByClassName('matrix-effect-canvas')[0];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.amount = this.settings.amount;

    this.ctx = this.canvas.getContext('2d');

    this.rows = [];
    this.updateEffect();

}

MatrixEffect.prototype.updateEffect = function() {

    if(this.rows && this.rows.length > this.amount) {
        this.rows = this.rows.slice(0, this.amount);
    }

    for(var i = 0; i < this.amount; i++) {
        this.rows[i] = this.settings.generateRow((this.width / this.amount) * i, -random(0, 60) * 20, false);
    }

};

MatrixEffect.prototype.render = function() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for(var i in this.rows) {
        this.rows[i].render(this.ctx);
        this.rows[i].update();

        if(this.settings.stepFactor > 0 && this.rows[i].y > this.height) {
            this.rows[i] = this.settings.generateRow(this.rows[i].x, -random(0, 60) * 20, false);
        }
        if(this.settings.stepFactor < 0 && this.rows[i].y + this.rows[i].height < 0) {
            this.rows[i] = this.settings.generateRow(this.rows[i].x, this.height + random(0, 60) * 20, true);
        }
    }

    if(this.amount !== this.settings.amount) {
        this.amount = this.settings.amount;
        this.updateEffect();
    }
};

/****************/
/*    LETTER    */
/****************/

function Letter(x, y, size, settings) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.letter = settings.randomLetter();
    this.settings = settings;

    this.cStep = 0;
    this.cLetter = 0;
}

Letter.prototype.update = function() {
    if(this.settings.step === true && this.cStep++ >= this.settings.stepSpeed) {
        this.cStep = 0;
        this.y += this.size * this.settings.stepFactor;
    }

    if(this.settings.smooth === true) {
        this.y += this.settings.smoothSpeed;
    }

    if(this.settings.letter === true && this.cLetter++ >= this.settings.letterSpeed) {
        this.cLetter = 0;
        this.letter = this.settings.randomLetter();
    }

};

Letter.prototype.render = function(ctx) {
    ctx.fillText(this.letter, this.x, this.y);
};


/*************/
/*    ROW    */
/*************/

function Row(x, y, size, height, green, settings, up) {
    this.letters = [];
    this.x = x;
    this.y = y;
    this.height = height * size;
    this.size = size;
    this.settings = settings;
    this.color = 'rgb(0,' + green + ',0)';
    for(var i = 0; i < height; i++) {
        if(up === true) {
            this.letters[i] = new Letter(x, y + i * size, size, settings);
        } else {
            this.letters[i] = new Letter(x, y - i * size - height, size, settings);
        }
        this.letters[i].color = 'rgb(0,' + green + ',0)';
    }
}

Row.prototype.update = function() {
    this.y = this.letters[this.letters.length - 1].y;
};

Row.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.size + 'px ' + this.settings.font;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.size;

    for(var i in this.letters) {
        this.letters[i].render(ctx);
        this.letters[i].update();
    }
};

/********************************/
/*    MATRIX EFFECT SETTINGS    */
/********************************/

function MatrixEffectSettings() {
    this.amount = 10;
    this.letters = '0123456789abcdef';
    this.font = 'monospace';
    this.minSize = 9;
    this.maxSize = 20;
    this.minRowHeight = 20;
    this.maxRowHeight = 60;

    this.step = true;
    this.stepSpeed = 4;
    this.stepFactor = 1;

    this.smooth = false;
    this.smoothSpeed = 10;

    this.letter = true;
    this.letterSpeed = 4;
}

MatrixEffectSettings.prototype.randomLetter = function() {
    return this.letters[Math.floor(Math.random() * this.letters.length)];
};

MatrixEffectSettings.prototype.generateRow = function(x, y, up) {
    var size = random(this.minSize, this.maxSize);
    var green = random(50, 255);
    var height = random(this.minRowHeight, this.maxRowHeight);
    return new Row(x, y, size, height, green, this, up);
};

/*************************/
/*    UTILS FUNCTIONS    */
/*************************/

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
