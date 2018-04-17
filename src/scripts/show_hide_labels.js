let show_hide_labels = () => {
  let cur_zoom = map.getZoom()

  if (cur_zoom < show_label_zoom) {
    labels_visible = false
    names_visible = false
    map.eachLayer(layer => {
      if (layer.options.icon) {
        layer.remove()
      }
    })
  } else if (cur_zoom >= show_label_zoom && cur_zoom < show_name_zoom) {
    labels_visible = true
    names_visible = false
    icons.map(icon => icon.addTo(map))
    map.eachLayer(layer => {
      if (layer.options.icon) {
        if (layer.options.icon.options.className === 'name') {
          layer.remove()
        }
      }
    })
  } else if (cur_zoom >= show_name_zoom) {
    names_visible = true
    labels_visible = false
    name_icons.map(icon => icon.addTo(map))
    map.eachLayer(layer => {
      if (layer.options.icon) {
        if (layer.options.icon.options.className === 'label') {
          layer.remove()
        }
      }
    })
  }
}
