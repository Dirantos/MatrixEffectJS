// initialize stats
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// initialize matrix-effect
var settings = new MatrixEffectSettings();
var matrixEffect = new MatrixEffect(settings);

// initialize dat.gui
var gui = new dat.GUI();
gui.add(settings, 'font');
gui.add(settings, 'letters');
gui.add(settings, 'amount').min(1).step(1).max(200);

var fSpeed = gui.addFolder('speed');
fSpeed.add(settings, 'step');
fSpeed.add(settings, 'stepSpeed').min(0).max(20).step(1);
fSpeed.add(settings, 'stepFactor').min(-1).max(1).step(0.001);
fSpeed.add(settings, 'smooth');
fSpeed.add(settings, 'smoothSpeed').min(-100).max(100).step(0.01);
fSpeed.add(settings, 'letter');
fSpeed.add(settings, 'letterSpeed').min(0).max(100).step(0.01);

var fSize = gui.addFolder('size');
fSize.add(settings, 'minSize').min(1).max(300).step(1);
fSize.add(settings, 'maxSize').min(1).max(300).step(1);

var fRowHeight = gui.addFolder('rowHeight');
fRowHeight.add(settings, 'minRowHeight').min(1).max(300).step(1);
fRowHeight.add(settings, 'maxRowHeight').min(1).max(300).step(1);

// animation task
function run() {
    stats.begin();
    matrixEffect.render();
    stats.end();
    requestAnimationFrame(run);
}
requestAnimationFrame(run);
