from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import os
from dotenv import load_dotenv

from Apis import censusApi

load_dotenv()

#missing districts
#nsa='https://geodata.baltimorecity.gov/egis/rest/services/CityView/Neighborhoods/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
app = Flask(__name__)
CORS(app)

@app.route('/')
def render():
    return "Loading Content"

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
                
# @app.route('/input', methods=['POST'])
# def userInput():
#     print("Request:",request)
#     # Check if text part exists
#     input_text = request.form.get('text')
#     if input_text:
#         print(input_text)

#     else:
#         return jsonify({'error': 'No text part'}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
