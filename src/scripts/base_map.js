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
let map = L.map('map').setView([-108.619726, 45.000284], 13)
let countriesLayer = L.geoJson(states, {
  className: 'base',
  style: statesStyle,
  /*
      Adds an icon containing state name and another icon containing state abbreviation on each polygon center
      */
  onEachFeature: (feature, layer) => {
    
    let label = L.marker(
      L.latLng({
        lat: feature.properties.state_coordinates[0],
        lng: -feature.properties.state_coordinates[1]
      }),
      {
        interactive: false,
        icon: L.divIcon({
          className: 'label',
          html: feature.properties.ABBR,
          iconSize: [0, 0]
        })
      }
    ).addTo(map)

    let full_label = L.marker(
      L.latLng({
        lat: feature.properties.state_coordinates[0],
        lng: -feature.properties.state_coordinates[1]
      }),
      {
        interactive: false,
        icon: L.divIcon({
          className: 'name',
          html: feature.properties.NAME,
          iconSize: [0, 0]
        })
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

map.fitBounds(countriesLayer.getBounds())
