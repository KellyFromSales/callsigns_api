import pandas as pd
from sqlalchemy import create_engine
import re
import os

DATABASE_URL = os.environ.get('DATABASE_URL')

full_list = re.compile('[G]\d|[M][015]')
intermediate_list = re.compile('21|20')
foundation_list = re.compile('[M][367]')


def extract(col):
    m = foundation_list.match(col)
    if m is not None:
        return "Foundation"
    else:
        m = intermediate_list.match(col)
        if m is not None:
            return "Intermediate"
        else:
            m = full_list.match(col)
            if m is not None:
                return "Full"
            else:
                return ''


filename = "callsigns"
engine = create_engine(DATABASE_URL, connect_args={'sslmode': 'require'})
wb = pd.ExcelFile(filename+'.xlsx')
for sheet in wb.sheet_names:
    df = pd.read_excel(filename+'.xlsx', sheet_name=sheet)

    df["level"] = df["Value"].apply(extract)
    df.rename(columns={"Value": "Callsign"}, inplace=True)
    df["qrz"] = "https://www.qrz.com/db/" + df["Callsign"]
    df.to_sql("callsigns", engine, index=False, if_exists="replace")
