'use strict'
  
  //initialize map
  var map = L.map('worldmap',{maxZoom:10,minZoom:2}),
  topoLayer = new L.TopoJSON(),
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
  function handleLayer(layer){
    var randomValue = Math.random(),
    fillColor = colorScale(randomValue).hex();
        
    layer.setStyle({
      fillColor : fillColor,
      fillOpacity: .5,
      color:'#555',
      weight:1,
      opacity:.5
    });
    layer.on({
      mouseover: enterLayer,
      mouseout: leaveLayer
    });
  }
  function enterLayer(){
    var countryName = this.feature.properties.SOVEREIGNT;

    console.log(this); //log the JSON file to see its structure

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

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // This map option disables world wrapping. by default, it is false.
      continuousWorld: false,
      // This option disables loading tiles outside of the world bounds.
      noWrap: true
    }).addTo(map);

