let maxBounds = [
  [13.49955, -150], //Southwest
  [74, -43.23304] //
]

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

function whenClicked(e) {
  // e = event
  console.log(e['target']['feature']['properties']['pop_votes'])
  var popup = L.popup()
    .setLatLng([
      e['target']['feature']['properties']['state_coordinates'][0],
      -e['target']['feature']['properties']['state_coordinates'][1]
    ])
    .setContent(
      '<b><dt>State : ' +
        e['target']['feature']['properties']['NAME'] +
        '</dt></b>' +
        'Donald Trump : ' +
        '<b>' +
        e['target']['feature']['properties']['pop_votes'][0] +
        '</b>' +
        '<br>' +
        'Hillary Clinton : ' +
        '<b>' +
        e['target']['feature']['properties']['pop_votes'][1] +
        '</b>'
    )
    .openOn(map)
}

let zoomToState = e => {
  map.fitBounds(e.target.getBounds())
}
let map = L.map('map', {
  center: [0, 0],
  zoom: 0,
  maxBounds: maxBounds
}).fitBounds(maxBounds)
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
          html: feature.properties.ABBR
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
          html: feature.properties.NAME
        })
      }
    ).addTo(map)
    /*
      Add an mouse-over listener on each state polygon
    */
    layer.on({
      mouseover: highlightState,
      mouseout: resetHighlight,
      click: whenClicked
    })
  }
}).addTo(map)
