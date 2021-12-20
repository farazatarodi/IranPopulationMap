# What is this?
The goal of this project is to visualise the population distribution in Iran.

# Build
This is a react app. Build it accordingly.
```
npm run build
```

# Data
Main population data source is amar.org.ir . The coordinates are gathered using python, Nominatim and OpenStreetMap. The data ws initially formatted into a csv file (Data_master.csv) and then different scripts were used to extract the coordinates form Nominatim. The output is a csv which is then converted to json using the convert-csv-to-json.
```
cd src/amarCSV
node convert
```

# Presentaion
The data is presented using deck.gl layers (ColumnLayer to be exact).

# Deploy
The code uses gh-pages package. run ```npm run deploy```.
