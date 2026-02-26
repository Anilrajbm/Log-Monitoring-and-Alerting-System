import json
import pandas as pd
import re

def load_logs(file_path, clf_tool):
    with open(file_path, 'r') as f:
        data = json.load(f)

    df = pd.DataFrame(data)
    df['time'] = pd.to_datetime(df['time'])

    def get_service(msg):
        match = re.search(r'\]\s+([\w\.]+)\s+:', msg)
        return match.group(1).split('.')[-1] if match else "System"

    df['service'] = df['message'].apply(get_service)

    df = clf_tool.train_and_apply(df)
    return df
