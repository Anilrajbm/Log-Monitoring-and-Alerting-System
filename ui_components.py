# ui_components.py

import streamlit as st

def sidebar_controls(df):
    st.sidebar.header("Controls")

    levels = st.sidebar.multiselect(
        "Filter Levels",
        options=df['level'].unique(),
        default=df['level'].unique()
    )

    services = st.sidebar.multiselect(
        "Filter Services",
        options=df['service'].unique(),
        default=df['service'].unique()
    )

    search_input = st.sidebar.text_input(
        "Smart Search (try: timeout, validation, database)"
    )

    time_window = st.sidebar.number_input(
        "Show logs from last X minutes",
        min_value=1,
        max_value=1440,
        value=5
    )

    return levels, services, search_input, time_window


def color_rows(row):
    if row.level == 'ERROR':
        return ['background-color: #f8d7da; color: black'] * len(row)
    if row.level == 'WARN':
        return ['background-color: #fff3cd; color: black'] * len(row)
    return [''] * len(row)
