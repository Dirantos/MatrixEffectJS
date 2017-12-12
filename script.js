// initialize stats
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// initialize matrix-effect
var matrixEffect = new MatrixEffect();

// initialize dat.gui
var gui = new dat.GUI();
gui.add(matrixEffect.settings, 'speed');
gui.add(matrixEffect.settings, 'minSize');
gui.add(matrixEffect.settings, 'maxSize');
gui.add(matrixEffect.settings, 'minRowHeight');
gui.add(matrixEffect.settings, 'maxRowHeight');

// animation task
function run() {
  stats.begin();
  matrixEffect.render();
  stats.end();
  requestAnimationFrame(run);
}
requestAnimationFrame(run);
