// initialize stats
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// initialize matrix-effect
var settings = new MatrixEffectSettings();
var matrixEffect = new MatrixEffect(settings);

// initialize dat.gui
var gui = new dat.GUI();
gui.add(settings, 'speed');
gui.add(settings, 'minSize');
gui.add(settings, 'maxSize');
gui.add(settings, 'minRowHeight');
gui.add(settings, 'maxRowHeight');

// animation task
function run() {
  stats.begin();
  matrixEffect.render();
  stats.end();
  requestAnimationFrame(run);
}
requestAnimationFrame(run);
