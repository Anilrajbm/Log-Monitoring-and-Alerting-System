# alert_engine.py

def get_alerts(df):
    alerts = []

    err_count = len(df[df['level'] == 'ERROR'])
    if err_count > 10:
        alerts.append({
            "name": "Critical Error Spike",
            "severity": "HIGH",
            "reason": f"System has {err_count} errors."
        })

    keyword_count = len(df[df['message'].str.contains("Asset in use", case=False)])
    if keyword_count > 5:
        alerts.append({
            "name": "Resource Contention",
            "severity": "LOW",
            "reason": f"'Asset in use' seen {keyword_count} times."
        })

    return alerts
