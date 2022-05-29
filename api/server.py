from flask import Flask, request, render_template, jsonify
import json
import os
import json_to_shp
import clip_geotiff_from_json

template_dir = os.path.abspath('views/')
app = Flask(__name__,  template_folder=template_dir, static_folder='static/')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/post_json', methods=['POST'])
def process_json():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        jsonD = request.json
        #print(type(json))
        json_to_shp.process_json(json.dumps(jsonD))
        clip_geotiff_from_json.process_shp("static/geo_data/shp/from_server.shp", "static/geo_data/tif/NE2_50M_SR.tif")
        return jsonD
    else:
        return 'Content-Type not supported!'

if __name__ == "__main__":
    app.run(debug=True)