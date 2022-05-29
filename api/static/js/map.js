$(document).ready(function(){
    let JSON_SHAPE_URL = "static/geo_data/json/mygeodata_merged.json"
    let GEOTIFF_DATA_URL = "static/geo_data/tif/NE2_50M_SR.tif"

    let target;

    var map_init = L.map('map',{
        //center: [9.0820, 8.6753],
        //zoom:8
    });
    var osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo (map_init);

    // var marker = L.marker([9.0820, 8.6753]).addTo(map_init);
    var Basemaps = {
        "OSM": osm
    }
    // var Overlaymaps = {
    //     "Marker": marker,
    // }
    L.control.layers(Basemaps).addTo(map_init);
    async function getClippedTiff () {
        var response = fetch(GEOTIFF_DATA_URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            parseGeoraster(arrayBuffer).then(georaster => {
                //console.log("georaster:", georaster);
                var pixels = geoblaze.get(georaster,target.stringify);
                console.log("stats:",geoblaze.stats(georaster, target.stringify));
                
                //console.log("pixels:", pixels);
                const values = pixels;
                const noDataValue = 3;
                const projection = 4326;
                const xmin = geoblaze.min(georaster,target.stringify);
                const ymax = geoblaze.max(georaster,target.stringify);
                const pixelWidth = 0.05;
                const pixelHeight = 0.05;
                const metadata = { noDataValue, projection, xmin, ymax, pixelWidth, pixelHeight };
                console.log("metadata:", metadata);
                parseGeoraster(values, metadata).then(georaster => {
                    console.log("georaster updated:", georaster);
                    var layer = new GeoRasterLayer({
                    georaster: georaster,
                    opacity: 0.5,
                    pixelValuesToColorFn: values => values[0] === 0 ? '#fff' : '#000',
                    //resolution: 64 // optional parameter for adjusting display resolution
                    });
                    layer.addTo(map_init);
                    map_init.fitBounds(layer.getBounds());
                });
            });
            
        });
    }

    $.getJSON(JSON_SHAPE_URL,function(data){
        geometry_ = data;
        console.log("JSON Data:", data);
        target = JSON.parse(JSON.stringify(data));
        // L.geoJson function is used to parse geojson file and load on to map
        var layer = L.geoJson(data,{
        }).addTo(map_init);
        var selected;
        layer.on('click', function (e) {
            console.log(e);
            // Check for selected
            if (selected) {
                // Reset selected to default style
                e.target.resetStyle(selected)
            }
            // Assign new selected
            selected = e.layer
            // Bring selected to front
            selected.bringToFront()
            // Style selected
            selected.setStyle({
                'color': 'red'
            })
            
            target.features = [selected.feature];
            console.log("target",target);
            map_init.setView(e.latlng, 3);
                   
            // Posting the JSON Shape File //
            $.ajax({
                type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify(target),
               dataType: 'json',
               url: 'http://localhost:5000/post_json',
               success: function (e) {
                   //alert(e);
               },
               error: function(error) {
               console.log(error);
           }
           });

        });
        map_init.fitBounds(layer.getBounds());
    });


    var response = fetch(GEOTIFF_DATA_URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            parseGeoraster(arrayBuffer).then(georaster => {
            console.log("georaster original:", georaster);

            var layer = new GeoRasterLayer({
                georaster: georaster,
                opacity: 0.5,
            });
            layer.addTo(map_init);
            map_init.fitBounds(layer.getBounds());
        });
        });

    $("#map").height($(window).height());   
    setTimeout(function () {
    window.dispatchEvent(new Event('resize'));
    }, 1000);

});
