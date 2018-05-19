var socket;
let plants = [];
let positions = [];
let space = 100;
let x = 0;
let y = 0;
//let growthRate = .5;

function setup()
{
  createCanvas(window.innerWidth , window.innerHeight);
  //input = createInput(200);
  document.addEventListener("pointerdown", mouseClick);
  document.addEventListener("pointerup", mouseRelease);
  //socket = socket.io.connect('http://localhost:4040');
  socket = io();
  socket.on('mouse', newDrawing);
  //createCanvas(window.innerWidth, window.innerHeight);
  
  if (window.DeviceOrientationEvent)
  {
    window.addEventListener("deviceorientation", getOrientation, true); 
  }

  frameRate(30);

  buildGrid();
}

function polygon(x, y, radius, npoints)
{
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function buildGrid()
{
  for(let i = 0; i < 5; i++)
  {
    for(let i = 0; i < window.innerWidth; i += space)
    {
      x = i;
      y = 0;
      for(let i = 0; i < window.innerHeight; i += space)
      {
        y = i;
        plants.push(new plant(x + random(-10, 10), y + random(-10, 10)));
      }
    }
  }
 

}

function draw()
{
  clear();
  for(let i = 0; i < plants.length; i ++)
  {
    plants[i].update();
  }
}

function plant(locX, locY)
{
  let growthRate = random(.1, .5);
  let size = 1;
  let loc = {
    x: locX,
    y: locY
  }
 /*  let size = {
    x: 10,
    y: 10
  }; */
  this.update = function()
  {
    if(size < 70)
    {
      size += growthRate;
    }
    noStroke();
    fill(36, 109, 9);
    ellipse(loc.x, loc.y, size, size);
  }
}

function newDrawing(data)
{
  noStroke();
  fill(0);
  ellipse(data.x, data.y, 40, 40);
}

function mouseClick()
{
  
}

function mouseRelease()
{

}

function mouseDragged()
{
  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  //strokeWeight(10);
  // stroke(0);
  // line(mouseX, mouseY, pmouseX, pmouseY);
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, 40, 40);
}

function getOrientation(event)
{
  x = event.beta;
  y = event.gamma;
  z = event.alpha;
}