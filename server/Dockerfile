FROM python:slim-buster

WORKDIR /app

COPY req.txt req.txt
RUN pip install -r req.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"] 