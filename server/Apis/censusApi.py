import requests
import pandas as pd

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