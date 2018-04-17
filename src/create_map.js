let getStateColor = (vote_perc_dem, vote_perc_rep) => {
  if (vote_perc_dem > vote_perc_rep) {
    return 'blue'
  } else if (vote_perc_dem < vote_perc_rep) {
    return 'red'
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
    fillOpacity: 0.7
  }
}
let map = L.map('map').setView([-108.619726, 45.000284], 13)
let countriesLayer = L.geoJson(states, {
  style: statesStyle,
  /*
      Adds an icon containing state name on each polygon center
  
      Turf centroid solution (Doesnt work ????????)
      turf.center(turf.multiPolygon(feature.geometry.coordinates)).geometry.coordinates
      */
  onEachFeature: (feature, layer) => {
    let label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'label',
        html: feature.properties.ABBR,
        iconSize: [0, 0]
      })
    }).addTo(map)
    let full_label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'name',
        html: feature.properties.NAME,
        iconSize: [0, 0]
      })
    }).addTo(map)
  }
}).addTo(map)
map.fitBounds(countriesLayer.getBounds())
