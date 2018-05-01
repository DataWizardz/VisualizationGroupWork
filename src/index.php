<!DOCTYPE html>
<html>

<head>
	<meta charset='UTF-8' />
	<meta name='viewport' content="width = device-width, initial-scale = 1/">
	<title>
		My Map
	</title>
	<!--Leaflet-->
	<link rel="stylesheet" href="lib/leaflet/leaflet.css" />
	<script src="lib/leaflet/leaflet.js"></script>
	<script src="data/states_edited.geojson"></script>
	<script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
	<link rel="stylesheet" href="./index.css">
	</style>
</head>

<body>
	<div id='map'></div>
	<script src="./scripts/base_map.js"></script>
	<script src="./scripts/info_control.js"></script>
	<script src="./scripts/electoral_map.js"></script>
	<script src="./scripts/legend.js"></script>
	<script src="./scripts/show_hide_labels.js"></script>
	<script src="./scripts/map_control.js"></script>
	<script console.log(document.getElementById( 'electoral')) />

</body>

</html>
