import pandas as pd
import numpy as np
import sqlite3
import re


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
con = sqlite3.connect(filename+".db")
wb = pd.ExcelFile(filename+'.xlsx')
for sheet in wb.sheet_names:
    df = pd.read_excel(filename+'.xlsx', sheet_name=sheet)

    df["level"] = df["Value"].apply(extract)

    df["qrz"] = "https://www.qrz.com/db/" + df["Value"]
    df.to_sql("callsigns", con, index=False, if_exists="replace",
              dtype={'Value': 'STRING PRIMARY KEY'})
con.commit()
con.close()
