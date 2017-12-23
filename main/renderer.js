const {
  webFrame
} = require('electron');
const {
  remote
} = require('electron')
const mainProcess = remote.require('./main.js');
const os = require('os');
if (os.type() !== 'Darwin') {
  document.body.style.backgroundColor = '#4C4C4C'
}

webFrame.setZoomLevelLimits(1, 1);

const config = require('../config.json')
/*
console.log(config.textConfig.details)
console.log(config.textConfig.state)
console.log(config.imageConfig.smallText)*/
var text = "textContent" in document.body ? "textContent" : "innerText";
document.getElementById('customdetails')[text] = config.customConfig.textConfig.details
document.getElementById('state')[text] = config.customConfig.textConfig.state
document.getElementById('stext')[text] = config.customConfig.imageConfig.smallText
document.getElementById('ltext')[text] = config.customConfig.imageConfig.largeText
document.getElementById('skey')[text] = config.customConfig.imageConfig.smallKey
document.getElementById('lkey')[text] = config.customConfig.imageConfig.largeKey

function populateDropdown(){
  toReturn="<option>Not playing anything yet</option>"
  for (i in config.games){
    var ii=config.games[i];
    toReturn+="<option value='¦"+ii.code+"'>"+ii.name+"</option>"
  }
  toReturn+='<option value="¬custom">Set my own...</option>'
  return toReturn
}

document.getElementById('details').innerHTML = populateDropdown()
if (config.customConfig.imageConfig.showButton == false) {
  document.getElementById('button').style.display = 'none'
}
doToClass("custom",hide);
/*
if (config.customConfig.timeConfig.timeType !== 'none') {
  document.getElementById('time')[text] = config.customConfig.timeConfig.whatTime
} else {
  document.getElementById('divtime').style.display = 'none'
}
*/
function upload() {
  var open = require("open");
  open('https://canary.discordapp.com/developers/applications/me/' + config.clientID.toString());
}

function doToClass(matchClass,dothis){
  var elems = document.getElementsByTagName('*'),i;
  for (i in elems){
    if((" "+elems[i].className+" ").indexOf(" "+matchClass+" ") > -1) {
      dothis(elems[i]);
    }
  }
}

function show(elem){
  elem.style.display = 'unset';
}

function hide(elem){
  elem.style.display = 'none';
}

function dropdownChange(){
  if(document.getElementById("details").value == "¬custom"){
    doToClass("custom",show);
  }else{
    doToClass("custom",hide);
  }
}
