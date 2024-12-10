from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
#import the requestFucntion
from Apis import censusApi

load_dotenv()

app = Flask(__name__, static_folder='dist')
CORS(app)


#for future url additions 
url_list = [
    {
        'name': 'calls_for_service',
        'url': 'https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/police_CallsForService_PreviousYear/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
    },
]

for num in range(0,9):
    serverStr=str(num)
    url_list.append(
        {
        'name':'calls_for_service',
        'url':f'https://services1.arcgis.com/UWYHeuuJISiGmgXx/ArcGIS/rest/services/911_2013_2022/FeatureServer/{serverStr}/query?outFields=*&where=1%3D1&f=geojson'
        }
)


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)


@app.route('/api')
def home():
    data = []
    for item in url_list:
        url = item['url']
        response = censusApi.make_req(url)
        
        if 'features' in response:
            features = response['features']
            processed_data = list(
                map(lambda d: d['properties'], features)
                )
            #send the contents of the response to the data array
            if item['name']== 'calls_for_service':
                data.extend(processed_data)
            else:
                print(processed_data)    
        else:
            print('Error: "features" key not found in API response')

    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
