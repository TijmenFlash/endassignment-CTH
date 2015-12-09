console.log("functions.js loaded");

'use strict';

var selectedCountry = 0;          
var selectedCountryName = "";
var inMenu = 0;                         //boolean for being in a menu
var haveBeen = [];
var wantToGo = [];

var map = L.map('worldmap',{            //initialize worldmap
    maxZoom:10,                         //set min and max zoom
    minZoom:2,
    maxBounds: [[100,-180],[-100,180]]   //make sure you cant scroll out of the world
})

var topoLayer = new L.TopoJSON(),
$countryName = $('.country-name'),

//make a color scale with chroma library
colorScale = chroma
    .scale(['#D5E3FF', '#003171'])
    .domain([0,1]);
  
//set initial value of map
map.setView([44,0], 2);

$.getJSON('data/countries2.topo.json').done(addTopoData);

function addTopoData(topoData){
    topoLayer.addData(topoData);
    topoLayer.addTo(map);
    topoLayer.eachLayer(handleLayer);
}
  
  
console.log(topoLayer.eachLayer);

function handleLayer(layer){
    var randomValue = Math.random(),
    fillColor = colorScale(randomValue).hex();
    
    layer.setStyle({
        fillColor : fillColor,
        fillOpacity: .3,
        color:'#555',
        weight:1,
        opacity:.3
    });
    layer.on({
        mouseover: enterLayer,
        mouseout: leaveLayer
    });
}


window.setInterval(function(){
    topoLayer.eachLayer(function (layer) { 
        if(wantToGo.indexOf(layer.feature.id) > -1) {
            layer.setStyle({
                fillColor :'red'
            });
        }
        if(haveBeen.indexOf(layer.feature.id) > -1) {
            layer.setStyle({
                fillColor :'blue'
            });
        }
        //make sure just one menu opens at a time
        inMenu = 0;
    });
}, 200);


function enterLayer(){
    var countryName = this.feature.properties.SOVEREIGNT;

    $(this).click( function() {
        if(inMenu===0){
            inMenu=1;                //bugfix: prevent multiple dialog windows to open
            selectedCountry = this.feature.id;
            selectedCountryName = this.feature.properties.ADMIN;
            countrySelected();
        }
    });
    
    $countryName.text(countryName).show();
    
    this.bringToFront();
    this.setStyle({
        weight:2,
        opacity: 1
    });
}


function leaveLayer(){
    $countryName.hide();
    this.bringToBack();
    this.setStyle({
        weight:1,
        opacity:.5
    });
}


//add the extra tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    continuousWorld: false,     //disable worldwrapping
    noWrap: true
}).addTo(map);

