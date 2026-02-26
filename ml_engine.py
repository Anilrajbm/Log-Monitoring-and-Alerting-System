# ml_engine.py

import re
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

class LogClassifier:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.model = LogisticRegression(max_iter=1000)
        self.is_trained = False

        self.patterns = {
            "Timeout/Latency": r"(longer than expected|duration=|timeout|latency|delayed)",
            "Resource Not Found": r"(404|not found|missing)",
            "Validation Error": r"(validation failed|status=400|invalid)",
            "Resource Conflict": r"(asset in use|409|conflict|already exists)",
            "Database Error": r"(db|connection|sql|query)",
            "Success": r"(successfully|ok|returned|health check)"
        }

    def _get_label_by_rule(self, msg):
        msg_l = msg.lower()
        for category, pattern in self.patterns.items():
            if re.search(pattern, msg_l):
                return category
        return "General System"

    def train_and_apply(self, df):
        if df.empty:
            return df

        labels = df['message'].apply(self._get_label_by_rule)
        X = self.vectorizer.fit_transform(df['message'])
        self.model.fit(X, labels)
        df['category'] = labels
        self.is_trained = True
        return df


# 🕒 Time Window Filter Logic (YOUR PART)
def apply_time_filter(df, minutes):
    current_time = df['time'].max()
    return df[df['time'] >= current_time - pd.Timedelta(minutes=minutes)]


# 📊 Pie Chart Logic (YOUR PART)
def plot_error_distribution(df, minutes, st):
    st.subheader(f"📊 Error Distribution (Last {minutes} Minutes)")
    error_only = df[df['level'] == 'ERROR']

    if not error_only.empty:
        category_counts = error_only['category'].value_counts()
        fig, ax = plt.subplots()
        ax.pie(category_counts, labels=category_counts.index, autopct='%1.1f%%')
        ax.set_ylabel("")
        st.pyplot(fig)
    else:
        st.info("No errors found in selected time window.")