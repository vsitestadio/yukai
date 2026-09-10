var floor = document.getElementById("thisFloor");
var floorNum = document.getElementById("floorNum");
//var gif = '<img src="https://media.giphy.com/media/3oriNYMXEh2K5l4D9C/giphy.gif" alt="x" class="dsp">';
var dsp0 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=34&amp;end=41" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
var dsp1 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=51&amp;end=56" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
var dsp2 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=67&amp;end=95" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
var dsp3 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=118&amp;end=121" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
var dsp4 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=193&amp;end=210" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
var dsp5 = '<iframe class="dsp" src="https://www.youtube.com/embed/WUEKhVVv0b0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=233&amp;end=260" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

// Random Number generator
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function closeDoors(){
  $("#elevatorL").animate({width:"50%"},1000);
  $("#elevatorR").animate({width:"50%"},1000);  
}

function openDoors(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  var num = randomNumber(0,5);
  switch (num) {
    case 0:
      floor.innerHTML = dsp0;
      floorNum.innerHTML = 1;
      break;
    case 1:
      floor.innerHTML = dsp1;
      floorNum.innerHTML = 20;
      break;
    case 2:
      floor.innerHTML = dsp2;
      floorNum.innerHTML = 49;
      break;
    case 3:
      floor.innerHTML = dsp3;
      floorNum.innerHTML = 26;
      break;
    case 4:
      floor.innerHTML = dsp4;
      floorNum.innerHTML = 99;
      break;
    case 5:
      floor.innerHTML = dsp5;
      floorNum.innerHTML = 100;
      break;
  }
}

function newFloor(){
  closeDoors();
  setTimeout(openDoors,2000);
}

function floor100(){
  closeDoors();
  setTimeout(fl100,2000);
}
function fl100(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp5;
  floorNum.innerHTML = 100;
}

function floor99(){
  closeDoors();
  setTimeout(fl99,2000);
}
function fl99(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp4;
  floorNum.innerHTML = 99;
}

function floor49(){
  closeDoors();
  setTimeout(fl49,2000);
}
function fl49(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp3;
  floorNum.innerHTML = 49;
}

function floor26(){
  closeDoors();
  setTimeout(fl26,2000);
}
function fl26(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp2;
  floorNum.innerHTML = 26;
}

function floor20(){
  closeDoors();
  setTimeout(fl20,2000);
}
function fl20(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp1;
  floorNum.innerHTML = 20;
}

function floor1(){
  closeDoors();
  setTimeout(fl1,2000);
}
function fl1(){
  $("#elevatorL").animate({width:"0%"},1000);
  $("#elevatorR").animate({width:"0%"},1000);
  floor.innerHTML = dsp0;
  floorNum.innerHTML = 1;
}