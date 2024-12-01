# import os
# import io
# import tempfile
# import mimetypes
# import pandas as pd
# from dotenv import load_dotenv
# import google.generativeai as genai

# load_dotenv()
# genai.configure(api_key=os.environ["API_KEY"])
# model = genai.GenerativeModel("gemini-1.5-flash")


# class FileHandlers:
#     def __init__(self,userInput):
#         self.userInput=userInput

#     def conversation(self):
#         try:
#             chat = model.start_chat(
#                 history=[
#                     {"role": "user", "parts": f'Analyze the data{self.userInput},  and provide a detailed response and return a table. and perform the "task:" given by the user.'},
#                 ]
#             )
#             response=chat.send_message(f'task:{self.user_task}')

#             return  response.text
#         except Exception as e:
#             return f"Error handling Excel file: {e}"