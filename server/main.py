from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests

#make api request dynamically 
def make_req(url:str):
        try:
            response=requests.get(url=url)
            if response.status_code==200:
                json_data =response.json()
                return json_data
            else: 
                errors=f'''Error:
    status_code {response.status_code},
    reason: {response.reason},
    headers: {response.headers},
    body: {response.text}'''
                return errors
        except Exception as e:
            return f'error:{e}'

load_dotenv()

app = Flask(__name__)
CORS(app)


#for future url additions 
url_list = [
    {
        'name': 'callData',
        'url': 'https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/police_CallsForService_PreviousYear/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
    },
    {'name':'crimeData',
    'url':'https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/Part1_Crime_Beta/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
    }
]

for num in range(0,9):
    serverStr=str(num)
    url_list.append(
        {
        'name':'callData',
        'url':f'https://services1.arcgis.com/UWYHeuuJISiGmgXx/ArcGIS/rest/services/911_2013_2022/FeatureServer/{serverStr}/query?outFields=*&where=1%3D1&f=geojson'
        }
)


# @app.route('/')
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')


# @app.route('/<path:path>')
# def static_proxy(path):
#     return send_from_directory(app.static_folder, path)

@app.route('/')
def serve():
    return'Hello work'

@app.route('/api')
def home():
    # data = []
    data={}
    for item in url_list:
        url = item['url']
        response = make_req(url)
        
        if 'features' in response:
            features = response['features']
            processed_data = list(
                map(lambda d: d['properties'], features)
                )
            #send the contents of the response to the data array
            if item['name'] not in data: 
                data[item['name']] = processed_data
            else:
                data[item['name']].extend(processed_data)
        else:
            print('Error: "features" key not found in API response')

    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
