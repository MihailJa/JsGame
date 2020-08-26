
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener('click', fclick);
var r = getRectangles(20, canvas.width, canvas.height);
var count = 0;
var start, end;

function getRandomNum(min, max)
 {
 return Math.floor(Math.random()*(max-min+1))+min;  
 }
 
 function toStringHEX(num)
 {
 var str = num.toString(16);
 if(str.length == 1)
 str = "0" + str;
 
 return str;
 }
 
 function getRGB()
 {   
 
 var re = toStringHEX(getRandomNum(1,255));
 var g = toStringHEX(getRandomNum(1,255));
 var b = toStringHEX(getRandomNum(1,255));
 
 return re + g + b;  
 }

 
function Rect(x,y,width,heigth,Color)
 {
 this.x = x;
 this.y = y;
 this.width = width;
 this.heigth=heigth;  
 this.color = Color; 
 }
 
 function getRectRandom(canvasWidth, canvasHeigth)
 { 
 var x = getRandomNum(5, canvasWidth/2);
 var y = getRandomNum(5, canvasHeigth/2);
 var width = getRandomNum(5, canvasWidth/2-10);
 var heigth = getRandomNum(5, canvasHeigth/2-10);
 return new Rect(x, y, width, heigth, getRGB());  
 }
 
 
 function getRectangles(num, canvasWidth, canvasHeigth)
 {
 var arr = [];
 for (i=0; i<num; i++)
 {
 arr[i]=getRectRandom(canvasWidth, canvasHeigth); 
 }
 return arr;
 }
 

 
 function IsCoordinateBetween(Rect1, Rect2)
 {
 var Rect1x2 = Rect1.x + Rect1.width;
 var Rect2x2 = Rect2.x + Rect2.width;
 var Rect1y2 = Rect1.y + Rect1.heigth;
 var Rect2y2 = Rect2.y + Rect2.heigth;
 var bool1 = (Rect1.x <= Rect2.x && Rect1x2 >= Rect2.x) || (Rect2.x <= Rect1.x && Rect2x2 >= Rect1.x);
 var bool2 = (Rect1.y <= Rect2.y && Rect1y2 >= Rect2.y) || (Rect2.y <= Rect1.y && Rect2y2 >= Rect1.y);
 if (bool1 && bool2) 
 {
 return true;
 } else return false;
 } 
  
 
 function IsCross(rectangles)
 {
 if(rectangles.length > 1)
 {
 var i;
 for(i=1; i<rectangles.length; i++)
 {
  var n;
  
  for(n=0; n<i; n++)
  {
    if (IsCoordinateBetween(rectangles[n],rectangles[i]))  
     return true;  
  }
 
  }  return false;
 } else return false;
 
}

 
 function RectOnScreen(rect)
 {
var i;
 for (i=0; i<rect.length; i++)
	{		  
	ctx.fillStyle = "#" + rect[i].color;
	ctx.strokeRect(rect[i].x,rect[i].y,rect[i].width,rect[i].heigth);
	ctx.fillRect(rect[i].x,rect[i].y,rect[i].width,rect[i].heigth);		
	}
	
 }
 
function fclick(e)
 {   
  var pixelData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  var pixColor = toStringHEX(pixelData[0]) + toStringHEX(pixelData[1]) + toStringHEX(pixelData[2]); 
 
   
 var i;
 for (i=0; i<20; i++)
 {
 if(r[i].color == pixColor)
 { 
  r.splice(i,1);  
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  RectOnScreen(r);  
  count++;
  if(count == 1)
  start = new Date();
 if(!IsCross(r))
 {
 end = new Date();
  setTimeout(time,100);
 }
  return;
	
  }
     
  }  
 
 }
 
 
 
	function time()
	{
	var time = ((end.getTime() - start.getTime())/1000).toFixed(2);
	alert(count + " rectangles removed" + "\n" + "time elapsed: " + time + "sec");
	}
	
	
	RectOnScreen(r);	

