
let digits,w,h,disp,disptyp,num,outamnum,outam,limit,blank;

function preload() {
  // Get the most recent earthquake in the database
  let url = 'https://cdn.glitch.com/2e6495af-9e7f-4870-ae35-b453eda3bafc%2FnumbersinamharicJSONdict.json?v=1628355492092';
  digits = loadJSON(url);
  w = windowWidth-25;
  h = windowHeight-25;
  limit = 999;
  blank = "";
  disptyp = 1
}

function setup() {
  
  createCanvas(w,h);
  textAlign(CENTER,CENTER);
  //num = int(random(125));
  //conversion(num);
  //prepareforthescreen(disptyp);
  change();
  let options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);
  //hammer.on("swiperight", prepareforthescreen(2));
  //hammer.on("swipeup", prepareforthescreen(3));
  //hammer.on("swipedown", newnumber());
  button = createButton('new number');
  button.position(0.8*w/2,16*h/18);
  button.mousePressed(change);
}
 
function draw() {
  textSize(22);
  text('swipe or arrowkeys to see numbers',w/2,17*h/18)
  textSize(15)
  text('western arabic',w/2,1*h/18)
  text("ge'ez \ndigits",w/16,3*h/5)
  text("amharic\nspoken",7*w/8,3*h/5)
  textSize(92); 
  text(disp,w/2,h/2);
  
}

function keyPressed() {
  if (keyCode === 37) {
    disptyp = 1;
  } else if (keyCode === 39) {
    disptyp = 2;
  } else if (keyCode === 38) {
    disptyp = 3;
  } else if (keyCode === 40) {
    newnumber();
  }
  prepareforthescreen(disptyp)
}

function change(){
  newnumber();
  prepareforthescreen(disptyp);
}

function newnumber(){
  let spread = random(10);
  if (spread>8){
    num = int(random(limit));
  }else {
    num = int(random(limit/5));
  }  
  conversion(num);
}

function prepareforthescreen(typ){
  switch(typ){
    case 1: disp = outamnum;  break;
    case 2: disp = outam; break;
    case 3: disp = String(num);  break;
  }
  background(random(255),random(255),random(255));

}

function conversion(num) {
  let leftover, hun, ten, one;
  outam = "";
  outamnum = "";
  hun = floor(num/100);
  leftover = num-(hun*100);
  ten = floor(leftover/10)*10;
  leftover = leftover-ten;
  one = leftover;
  lookupall(hun,ten,one);
}


function lookupall(h,t,o){
  if (h > 1) {
    plusdigit(h)
  } 
  if (h > 0) {
    plusdigit(100);
  }
  if (t > 0) {
    plusdigit(t);
  }
  if (o > 0) {
    plusdigit(o);
  }
}

function plusdigit(j){        
    looked = lookup(j)
    outamnum += looked.amharicnum;
    outam += looked.amharic+" ";
}

function lookup(d){
  for(let i=0;i<digits.digit.length;i++){
    if (digits.digit[i].latin == d){
      return digits.digit[i]
    }
  }
  
}

function swiped(event) {
  console.log(event);
  if (event.direction == 4) {
    disptyp = 2;
  } else if (event.direction == 8) {
    disptyp = 3;
  } else if (event.direction == 2) {
    disptyp = 1;
  } else if (event.direction == 16) {
    change();
  }
  prepareforthescreen(disptyp)
}

