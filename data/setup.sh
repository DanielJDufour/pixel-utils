#!/bin/sh -e

# download from https://github.com/GeoTIFF/test-data/
wget https://github.com/GeoTIFF/test-data/archive/refs/heads/main.zip -O geotiff-test-data.zip
unzip -j -o geotiff-test-data.zip "test-data-*/files/*" -d .
rm geotiff-test-data.zip

gdal2xyz.py ./eu_pasture.tiff eu_pasture.txt && cat eu_pasture.txt | awk '{ print $3 }' > eu_pasture.csv
