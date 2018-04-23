let legend = L.control({ position: 'bottomright' })

legend.onAdd = map => {
  var div = L.DomUtil.create('div', 'info legend'),
    parties = [
      'decisive democrat',
      'democrat',
      'decisive republican',
      'republican'
    ]
  colors = ['#000080', 'blue', '#ff0000', '#ff4d4d']
  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < parties.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '"></i> ' + parties[i] + '<br><br> '
  }

  return div
}

legend.addTo(map)
