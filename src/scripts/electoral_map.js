let electoralMode = false
// ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#005a32']
let getElecColor = d => {
  return d > 40
    ? '#00441b'
    : d > 35
      ? '#006d2c'
      : d > 30
        ? '#238b45'
        : d > 25
          ? '#41ab5d'
          : d > 20
            ? '#74c476'
            : d > 15
              ? '#a1d99b'
              : d > 10
                ? '#c7e9c0'
                : d > 5
                  ? '#e5f5e0'
                  : '#f7fcf5'
}
let elecStyle = feature => {
  return {
    fillColor: getElecColor(feature.properties.electoral_votes),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: 3,
    fillOpacity: 0.7,
    className: 'elec'
  }
}
let toggleElectoral = () => {
  map.eachLayer(layer => {
    if (layer.options.className === 'base' && electoralMode === false) {
      electoralMode = true
      layer.setStyle(elecStyle)
      map.removeControl(legend_base)
      legend_elec.addTo(map)
    } else if (layer.options.className === 'base' && electoralMode === true) {
      electoralMode = false
      layer.setStyle(statesStyle)
      map.removeControl(legend_elec)
      legend_base.addTo(map)
    }
  })
}
