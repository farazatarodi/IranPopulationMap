import csv
import requests
import json
import os

cwd = os.getcwd()
read_f = cwd + '\\src\\amarCSV\\Data_master.csv'
write_f = cwd + '\\src\\amarCSV\\coords_ostan.csv'

# Open the input_file in read mode and output_file in write mode
with open(read_f, 'r', encoding='utf-8') as read_obj, \
        open(write_f, 'a', newline='', encoding='utf-8') as write_obj:
    # Create a csv.reader object from the input file object
    csv_reader = csv.reader(read_obj)
    # Create a csv.writer object from the output file object
    csv_writer = csv.writer(write_obj)
    # Read each row of the input csv file as list
    rowCount = 0

    # header data
    header = ['ostan', 'fam', 'pop', 'm', 'f', 'lat', 'lon']
    csv_writer.writerow(header)

    # get coords based on csv data
    for row in csv_reader:
        if rowCount > 0:
            if row[1].strip() == '':
                row = row[0:1] + row[5:]

                # constructing the request url
                url = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&country=Iran&state={}'.format(
                    row[0])
                r = requests.get(url)
                r_list = json.loads(r.content)

                # add coords to json row
                if len(r_list) > 0:
                    r_json = r_list[0]
                    row.append(r_json['lat'])
                    row.append(r_json['lon'])
                else:
                    row.append('#')
                    row.append('#')
                print(rowCount)

                # Add the updated row / list to the output file
                csv_writer.writerow(row)
        rowCount += 1
