let info = L.control()
info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info')
  this.update()
  return this._div
}
info.update = function(properties) {
  this._div.innerHTML =
    '<h4>Vote Distribution</h4>' +
    (properties
      ? '<b>' +
        '</b>' +
        'Electoral Votes : ' +
        '<b>' +
        properties.electoral_votes +
        '</b>' +
        '<br>' +
        '<b>' +
        properties.dem_perc +
        '%</b> Democrat votes<br />' +
        '<b>' +
        properties.rep_perc +
        '%</b> Republican votes'
      : 'Hover over a state')
}

info.addTo(map)
