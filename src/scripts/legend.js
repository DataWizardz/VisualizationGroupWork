let legend_base = L.control({ position: 'bottomright' })
let legend_elec = L.control({ position: 'bottomright' })

legend_base.onAdd = map => {
  var div = L.DomUtil.create('div', 'legend'),
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
  div.innerHTML +=
    '<button type=' +
    'button' +
    ' onclick=' +
    'toggleElectoral()>' +
    'Show electoral votes ' +
    ' </button>'

  return div
}

legend_elec.onAdd = map => {
  var div = L.DomUtil.create('div', 'legend'),
    grades = [0, 5, 10, 15, 20, 25, 30, 35, 40]

  colors = [
    '#f7fcf5',
    '#e5f5e0',
    '#c7e9c0',
    '#a1d99b',
    '#74c476',
    '#41ab5d',
    '#238b45',
    '#005a32'
  ]
  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getElecColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
  }
  div.innerHTML +=
    '<br><button type=' +
    'button' +
    ' onclick=' +
    'toggleElectoral()>' +
    'Show base map ' +
    ' </button>'

  return div
}
legend_base.addTo(map)

/*
var populationLegend = L.control({position: 'bottomright'});
var populationChangeLegend = L.control({position: 'bottomright'});

populationLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="legend.png" alt="legend" width="134" height="147">';
return div;
};

populationChangeLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="change_legend.png" alt="legend" width="134" height="147">';
return div;
};

// Add this one (only) for now, as the Population layer is on by default
populationLegend.addTo(map);


*/
