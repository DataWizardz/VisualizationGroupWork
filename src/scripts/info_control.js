var info = L.control()
info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info')
  console.log(this._div)
  this.update()
  return this._div
}

info.update = function(properties) {
  this._div.innerHTML =
    '<h4>Vote Distribution</h4>' +
    (properties
      ? '<b>' +
        properties.dem_perc +
        '%</b> Democrat votes<br />' +
        '<b>' +
        properties.rep_perc +
        '%</b> Republican votes'
      : 'Hover over a state')
}

info.addTo(map)
