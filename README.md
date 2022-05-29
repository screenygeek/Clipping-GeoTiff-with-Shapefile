### Author:	    Saksham Singh
### Email:	    screenygeek@gmail.com
### Project:	Clipping-GeoTiff-with-Shapefile

# Introduction
## Problem Statement
Clipping GeoTiff data file using polygons defined in the shapefile such that it produces a separate output for each polygon
GeoTiff data used as an example: 50m Natural Earth | (`https://www.naturalearthdata.com/downloads/50m-raster-data/50m-natural-earth-2/`)  

## Dependencies
### Python Version Used: 3.7.3 
#### Python Version depends on your environment setup (GDAL depends heavily on this)
### Python Packages Used:
1. Flask
2. Numpy
3. Pillow
4. GDAL (`https://www.lfd.uci.edu/~gohlke/pythonlibs/#gdal`)
5. Shapley
### Getting the sample GeoTiff file
1. Please download and move the GeoTiff file from (`https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/raster/NE2_50M_SR.zip`) to (api\static\geo_data\tif\) as (NE2_50M_SR.tif)
2. Sample JSON Shapefile for this sample GeoTiff file is already present in (api\static\geo_data\json\) as (mygeodata_merged.json)

## Usage
1. (`pip install -r requirements.txt`)
2. (`pip install gdal_file.whl`) # Setup the appropriate version

# Javascript Libraries Used
1. openstreetmap
2. jQuery
3. leafletjs
4. plotty
5. GeoRaster | (`https://unpkg.com/georaster-layer-for-leaflet/dist/georaster-layer-for-leaflet.min.js`)
6. GeoBlaze | (`https://cdn.jsdelivr.net/npm/geoblaze@1.1.0/dist/geoblaze.web.min.js`)

## Working
1. Run the Flask Server using (`python api/server.py`)
2. Locate localhost:5000 on a web browser
3. MouseClick on a region of interest. This will result in map zooming over that region and highlighting it in red color
4. You can now locate the Clipped GeoTiff Data at the location: (api/static/geo_data/tif/from_server.tif)
5. The Clipped JSON Shapefile can similarly be located at api\static\geo_data\shp\from_server.shp

# Other Information
1. If you want to run the Flask server on a different port, please change the port number in js/map.js file (Under POST Request)
2. To use other GeoTiff Data and its appropriate JSON Shapefile, you can replace api\static\geo_data\tif\NE2_50M_SR.tif and api\static\geo_data\json\mygeodata_merged.json as per your requirements

# References
1. geotiff.js | (`https://github.com/geotiffjs/geotiff.js/`)
2. Google JavaScript Maps API | (`https://simplemaps.com/resources/shapes-google-maps`)
3. Sample Shape File | (`https://www.naturalearthdata.com/downloads/110m-physical-vectors/`) | Land
4. (`https://github.com/GeoTIFF/georaster-layer-for-leaflet-example/blob/master/examples/load-via-script-tag.html`)
5. (`https://github.com/onaci/leaflet-geotiff-2`)
6. (`https://codesandbox.io/s/react-leaflet-v-4-x-click-a-geojson-district-and-change-its-style-and-all-the-other-districts-at-the-same-time-kbuujs?file=/src/districts.json:0-80416`)
7. (`https://gist.github.com/ThomasG77/c38e6b0ecfd014342aad`)
8. Zooming to Specific Shape | (`https://stackoverflow.com/questions/46767950/zoom-to-clicked-feature`)
9. Changing Properties of selected Feature from a given Shape | (`https://stackoverflow.com/questions/33380035/leaflet-clicking-on-features`)
10. Rasterio | (`https://rasterio.readthedocs.io/en/latest/installation.html`)
11. Algorithm | (`https://medium.com/@DanielJDufour/calculating-intersection-of-polygon-with-a-raster-89c2624d78a2`)
12. GeoBlaze | (`https://docs.geoblaze.io/#get`)
13. Dataset | (`https://www.naturalearthdata.com/downloads/50m-raster-data/50m-natural-earth-2/`)
14. (`https://mygeodata.cloud/converter/json-to-shp`)
15. (`https://gis.stackexchange.com/questions/397718/converting-geojson-to-shapefile`)
