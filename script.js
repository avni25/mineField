
var size = 10;
const canvas = document.createElement("canvas");
canvas.width = canvas.height = size *40;
var tileSize = canvas.width / size;
const ctx = canvas.getContext("2d");
ctx.font = "11px courier";
ctx.textBaseline = "top";
const status = document.createElement("pre");

let lastTile = -1;

var bombs = [];
var score =0;
var health=1;
var hh = health;
var vals=[];
var btn_newgame = document.getElementById("btn_newgame");
var canvas_size = document.getElementById("canvas_size");
var bomb_amount = document.getElementById("bomb_amount");

const drawGrid = (canvas, ctx, tileSize, highlightNum) => {
   // fill in squares
    for (let y = 0; y < canvas.width / tileSize; y++) {
      for (let x = 0; x < canvas.height / tileSize; x++) {
        const parity = (x + y) % 2;
        const tileNum = x + canvas.width / tileSize * y;
        const xx = x * tileSize;
        const yy = y * tileSize;  
       
        ctx.fillStyle = "#ddd";
        ctx.fillRect(xx, yy, tileSize, tileSize);
        
        
      }
    }
    //draw lines
    for(var i = .5; i < canvas.width || i < canvas.height; i += tileSize) {
      // draw horizontal lines
      ctx.moveTo( i, 0 );
      ctx.lineTo( i, canvas.height);
      // draw vertical lines
      ctx.moveTo( 0, i );
      ctx.lineTo( canvas.width, i);
  }
  ctx.strokeStyle = 'hsla(0, 0%, 40%, .5)';
  ctx.stroke();
  vals = createArray(size);
  
}

function createArray(size){
  var res = [];
  for (let i = 0; i < size * size; i++) {
      res.push(0);        
  }
  return res;
}
 
function generateBombs(amount){
    var bs =[];
    var i =0;
    
    do{
      var r = Math.floor(Math.random()*(size * size));         
      if(!bs.includes(r)){
        bs.push(r);                      
      } 
    }
    while(bs.length < amount);
    
    console.log("tiles of bombs");
    console.log(bs.sort((a,b)=> a-b));
    return bs;
}
  
  drawGrid(canvas, ctx, tileSize);
  
  document.body.style.display = "flex";
  document.body.style.alignItems = "flex-start";
  document.body.appendChild(canvas);
  document.body.appendChild(status);
   

function select_value(){
    size = parseInt(canvas_size.options[canvas_size.selectedIndex].textContent);
    canvas.width = canvas.height = size *40;
    tileSize = canvas.width / size;
    drawGrid(canvas, ctx, tileSize);
    bombs = generateBombs(size);
    vals = createArray(size);
    score = 0;
    health = 1;
}
  


  //-------------------------------EventListeners------------------------------------------------
canvas.addEventListener("mousemove", evt => {
    if(hh > 0 && isNaN(bombs)){
        event.target.style.cursor = "pointer";
    }else{
        event.target.style.cursor= "default";
    }
    
    const tileX = ~~(evt.offsetX / tileSize);
    const tileY = ~~(evt.offsetY / tileSize);
    const tileNum = tileX + canvas.width / tileSize * tileY;
    
    if (tileNum !== lastTile) {
      lastTile = tileNum;
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      //drawGrid(canvas, ctx, tileSize, tileNum);
    }
    
    status.innerText = `    mouse coords: {${evt.offsetX}, ${evt.offsetY}}
    tile coords : {${tileX}, ${tileY}}
    tile number : ${tileNum}
    score       : ${score}
    health      : ${hh}`;
});
  
canvas.addEventListener("click", event => {
    
    const tileX = ~~(event.offsetX / tileSize);
    const tileY = ~~(event.offsetY / tileSize);
    const xx = tileX* tileSize;
    const yy = tileY* tileSize;
    const tileNum = tileX + canvas.width / tileSize * tileY;
    //status.innerText += "\n \t tile num:" +tileNum;
    if(hh > 0 && isNaN(bombs)){      
        if(bombs.includes(tileNum)){
            
            ctx.fillStyle ="red"; 
            ctx.fillRect(xx, yy, tileSize, tileSize);
            hh--;
            console.log(`Boom!!! \nscore: ${score}`);
        }else{ 
          if(vals[tileNum] == 0){
            ctx.fillStyle = "blue";
            ctx.fillRect(xx, yy, tileSize, tileSize);
            score++;        
            vals[tileNum] = 1;
            
          }        
            
        }
    status.innerText = `    mouse coords: {${event.offsetX}, ${event.offsetY}}
    tile coords : {${tileX}, ${tileY}}
    tile number : ${tileNum}
    score       : ${score}
    health      : ${hh}`;
         
    }
    // what happens when it's over???
    
});
  
canvas.addEventListener("mouseout", event => {
    //drawGrid(canvas, ctx, tileSize);
    //status.innerText = "";
    lastTile = -1;
});

btn_newgame.addEventListener("click", ()=>{
    score = 0;
    hh = health;
    delete canvas;
    delete status;
     
    size =  parseInt(canvas_size.options[canvas_size.selectedIndex].textContent);
    var b = parseInt(bomb_amount.value);
      
    if(b > (size*size) || b <= 0 || isNaN(b)){
        b = size;
    }
    
    // console.log(b+ ": "+ size*size+": "+size);
    // console.log(isNaN(b));
    document.body.removeChild(canvas);
    document.body.appendChild(canvas);
    document.body.removeChild(status);
    document.body.appendChild(status);
     
    drawGrid(canvas, ctx, tileSize);    
    bombs = generateBombs(b);
    
    bomb_amount.value = "";
    
});


//--------------------------------------------------------------------------------------------------







