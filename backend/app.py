from flask import Flask
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from markupsafe import escape

app = Flask(__name__)
CORS(app)

@app.route("/iherbbarcode/<barcode_num>")
def iherb_web_scrapper(barcode_num):
    URL = "https://hk.iherb.com/search?kw="+str(escape(barcode_num))
    r = requests.get(URL)

    soup = BeautifulSoup(r.content, "html.parser")
    product_title = soup.find("div", class_="product-title")
    product_price = soup.find("div", class_="product-price-top")

    if product_title is not None:

        product_title = product_title.text.strip()
        product_price = product_price.text.strip().partition('\n')[0]
        results = {product_title:product_price}
        print(results)
        return results

    else:
        print("Not found")
        return None