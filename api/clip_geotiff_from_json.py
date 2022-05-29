from osgeo import gdal, ogr
def process_shp(shapeFileUrl, geoTiffUrl):
    OutTile = gdal.Warp(destNameOrDestDS="static/geo_data/tif/from_server.tif",
                        srcDSOrSrcDSTab=geoTiffUrl,
                        cutlineDSName=shapeFileUrl,
                        cropToCutline=True,
                        dstNodata = 0)

    OutTile = None