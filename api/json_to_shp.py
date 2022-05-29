from osgeo import gdal
def process_json(json_data):
    srcDS = gdal.OpenEx(json_data)
    #print(srcDS)
    ds = gdal.VectorTranslate('static/geo_data/shp/from_server.shp', srcDS, format='ESRI Shapefile')
    return ds