from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import requests
import xml.etree.ElementTree as ET
# Create your views here.


@api_view(['GET'])
def get_latest_news(request):
  
    base_url = "https://www.mlb.com/feeds/news/rss.xml"
    response = requests.get(base_url)

    rss_xml = ET.fromstring(response.content)

    # Hardcoding the XML Namespaces
    namespaces = {
        "dc": "http://purl.org/dc/elements/1.1/",
        "content": "http://purl.org/rss/1.0/modules/content/",
        "atom": "http://www.w3.org/2005/Atom",
        "mlb": "https://www.mlb.com/rss/"
    }

    format_response = []

    for news in rss_xml.findall('.//item'):
        title = news.find('title').text
        link = news.find('link').text
        image = news.find('image').get('href')
        author = news.find('dc:creator', namespaces).text
        date = news.find('mlb:display-date', namespaces).text

        format_news = {
            "title": title,
            "link": link,
            "img": image,
            "author": author,
            "date": date
        }

        format_response.append(format_news)
    
    return Response(format_response)

        

    

