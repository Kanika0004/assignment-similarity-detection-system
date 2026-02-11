import streamlit as st
import requests
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

st.set_page_config(page_title="Assignment Similarity System", layout="wide")

# ---------- Custom Styling ----------
st.markdown("""
<style>
.main-title {
    font-size: 40px;
    font-weight: bold;
    color: #4A90E2;
}
.metric-card {
    padding: 20px;
    border-radius: 12px;
    background-color: #f5f7fa;
    text-align: center;
}
.risk-low {color: green; font-weight: bold;}
.risk-moderate {color: orange; font-weight: bold;}
.risk-high {color: red; font-weight: bold;}
.risk-very {color: darkred; font-weight: bold;}
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">Assignment Similarity Detection System</div>', unsafe_allow_html=True)

st.sidebar.header("Upload & Analyze")
folder = st.sidebar.text_input("Folder path containing assignments")

if st.sidebar.button("Run Analysis"):

    response = requests.get(f"http://127.0.0.1:8000/analyze/?folder={folder}")

    if response.status_code != 200:
        st.error("Backend error. Check API.")
        st.stop()

    data = response.json()
    df = pd.DataFrame(data)

    if df.empty:
        st.warning("No comparisons found.")
        st.stop()

    # ---------------- Dashboard Metrics ----------------
    st.subheader("Overview")

    col1, col2, col3 = st.columns(3)

    col1.metric("Total Comparisons", len(df))
    col2.metric("Average Similarity", f"{round(df['score'].mean()*100,2)}%")
    col3.metric("High Risk Cases", len(df[df['risk'] == "Very High"]))

    # ---------------- Risk Filter ----------------
    st.subheader("Similarity Results")

    risk_filter = st.selectbox("Filter by Risk Level", ["All", "Low", "Moderate", "High", "Very High"])

    if risk_filter != "All":
        df = df[df["risk"] == risk_filter]

    st.dataframe(df, use_container_width=True)

    # ---------------- Heatmap ----------------
    st.subheader("Similarity Heatmap")

    files = list(set(df["file1"]).union(set(df["file2"])))
    heatmap_matrix = pd.DataFrame(0.0, index=files, columns=files)

    for _, row in df.iterrows():
        heatmap_matrix.loc[row["file1"], row["file2"]] = row["score"]
        heatmap_matrix.loc[row["file2"], row["file1"]] = row["score"]

    fig, ax = plt.subplots(figsize=(8,6))
    sns.heatmap(heatmap_matrix, annot=True, cmap="Reds", fmt=".2f", ax=ax)
    st.pyplot(fig)

    # ---------------- Detailed Pair View ----------------
    st.subheader("Inspect Pair")

    pair_options = df.apply(lambda row: f"{row['file1']} vs {row['file2']}", axis=1)
    selected_pair = st.selectbox("Select comparison", pair_options)

    selected_row = df.iloc[pair_options.tolist().index(selected_pair)]

    st.write(f"### Final Similarity Score: {round(selected_row['score']*100,2)}%")

    risk_class = selected_row["risk"].lower().replace(" ", "-")
    st.markdown(f'<div class="risk-{risk_class}">Risk Level: {selected_row["risk"]}</div>', unsafe_allow_html=True)
