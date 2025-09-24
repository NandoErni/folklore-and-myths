import os
import xml.etree.ElementTree as ET
from datetime import datetime

BASE_URL = "https://folkloreandmyths.com"  # Change to your domain
OUTPUT_FILE = "sitemap.xml"

def generate_sitemap(directory="."):
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                rel_path = os.path.relpath(os.path.join(root, file), directory)
                url = f"{BASE_URL}/{rel_path.replace(os.sep, '/')}"
                
                url_elem = ET.SubElement(urlset, "url")

                loc = ET.SubElement(url_elem, "loc")
                loc.text = url

                lastmod = ET.SubElement(url_elem, "lastmod")
                lastmod.text = datetime.utcnow().strftime("%Y-%m-%d")

                changefreq = ET.SubElement(url_elem, "changefreq")
                changefreq.text = "weekly"

                priority = ET.SubElement(url_elem, "priority")
                priority.text = "0.5" if file != "index.html" else "1.0"

    tree = ET.ElementTree(urlset)
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap written to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_sitemap(".")
