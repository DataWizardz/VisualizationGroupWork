let getStateColor = (vote_perc_dem, vote_perc_rep) => {
  if (vote_perc_dem > vote_perc_rep) {
    if (vote_perc_dem > vote_perc_rep + 5) {
      return '#000080'
    }
    return 'blue'
  } else if (vote_perc_dem < vote_perc_rep) {
    if (vote_perc_rep > vote_perc_dem + 5) {
      return '#ff0000'
    }
    return '#ff4d4d'
  }
}

let statesStyle = feature => {
  return {
    fillColor: getStateColor(
      feature.properties.dem_perc,
      feature.properties.rep_perc
    ),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: 3,
    fillOpacity: 0.7,
    className: 'states'
  }
}
let highlightState = e => {
  var layer = e.target
  layer.bringToFront()
  info.update(layer.feature.properties)
  layer.setStyle({
    weight: 3,
    color: 'black',
    dashArray: '',
    fillOpacity: 0.5
  })
}
let resetHighlight = e => {
  info.update()
  if (e.target.options.className === 'elec') {
    e.target.setStyle(elecStyle(e.target.feature))
    return
  }
  countriesLayer.resetStyle(e.target)
}
let zoomToState = e => {
  map.fitBounds(e.target.getBounds())
}

var mapboxAccessToken =
  'pk.eyJ1IjoibWVyc2FtZXJzYSIsImEiOiJjamdmb3IwdjAzaWM4MnFzMGNsNmVtNmM5In0.W0OtmsNr41_Mbym4hBGLdg'
var map = L.map('map').setView([37.8, -96], 4)

let countriesLayer = L.geoJson(states, {
  className: 'base',
  style: statesStyle,

  /*
        Adds an icon containing state name and another icon containing state abbreviation on each polygon center
        */
  onEachFeature: (feature, layer) => {
    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' +
        mapboxAccessToken,
      {
        id: 'mapbox.light'
      }
    ).addTo(map)

    /*
        Add an mouse-over listener on each state polygon
      */
    layer.on({
      mouseover: highlightState,
      mouseout: resetHighlight,
      click: zoomToState
    })
  }
}).addTo(map)

//L.geoJson(states).addTo(map);
