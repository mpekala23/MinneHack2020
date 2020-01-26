import csv
import requests
from pathlib import Path

data = Path('.')  # should refer to directory with csv files
url = "http://hot-bills.herokuapp.com/insert_bill"


def read_file(file):
    with open(file, newline='', encoding='utf-8') as csvfile:
        topic = file.split(".")[0]
        reader = csv.DictReader(csvfile)
        for row in reader:
            obj = {"body": row['\ufeffBody'],
                   "bill_status": row['Bill\nStatus'],
                   "author": row['Chief\nAuthor'],
                   "last_action": row['Last\nAction'],
                   "summary": row['Short Description'],
                   "topic": topic}
            requests.post(url, data=obj)
            # print(obj)
            # break;


def main():
    # for each csv file in data folder, parse the data
    for file in data.iterdir():
        n = file.name;
        if n.split(".")[-1] == "csv":
            read_file(n)
            # print(read_file(n))
            # break;


if __name__ == "__main__":
    main()
