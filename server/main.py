from flask import Flask,send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from Apis import censusApi

load_dotenv()

app = Flask(__name__, static_folder='dist')
CORS(app)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder,path)

@app.route('/api')
def  home():
    url_list=[{
        'name':'calls_for_service',
        'url':'https://services1.arcgis.com/UWYHeuuJISiGmgXx/ArcGIS/rest/services/911_2013_2022/FeatureServer/9/query?outFields=*&where=1%3D1&f=geojson'
    }]

    for index,item in enumerate(url_list):
        url=item['url']
        data= list(map(lambda data:data['properties'],censusApi.make_req(url)['features']))
        return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)