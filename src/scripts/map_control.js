let icons = []
let name_icons = []
map.eachLayer(layer => {
  if (layer.options.icon) {
    layer.options.icon.options.className === 'label' ? icons.push(layer) : layer
  }
})
map.eachLayer(layer => {
  if (layer.options.icon) {
    layer.options.icon.options.className === 'name'
      ? name_icons.push(layer)
      : layer
  }
})

console.log(icons)
show_label_zoom = 4
show_name_zoom = 6
let labels_visible = false
let names_visible = false

map.on('zoomend', show_hide_labels)
show_hide_labels()
