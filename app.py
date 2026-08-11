import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import numpy as np

st.set_page_config(
    page_title="Retail Social Intelligence Dashboard",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
    <style>
    .metric-card {
        background-color: #f0f2f6;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-title {
        color: #1f77b4;
        font-size: 2.5em;
        font-weight: bold;
        margin-bottom: 10px;
    }
    </style>
    """, unsafe_allow_html=True)

from data_generator import (
    get_dashboard_summary,
    get_platform_metrics,
    get_trending_topics,
    get_sentiment_data,
    get_social_posts,
    get_brand_intelligence,
    get_competitor_data,
    get_alerts_data
)

def show_executive_dashboard():
    st.markdown("<div class='header-title'>📊 Executive Dashboard</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    summary = get_dashboard_summary()
    
    col1, col2, col3, col4, col5, col6 = st.columns(6)
    
    with col1:
        st.metric("Total Mentions", f"{summary['total_mentions']:,}", "+12.5%")
    with col2:
        st.metric("Sentiment Score", f"{summary['sentiment_score']:.2f}", "+5.2%", delta_color="normal")
    with col3:
        st.metric("Brand Health", f"{summary['brand_health']}%", "+2.1%")
    with col4:
        st.metric("Engagement Rate", f"{summary['engagement_rate']:.1f}%", "+3.4%")
    with col5:
        st.metric("Viral Posts", summary['viral_posts'], "+2")
    with col6:
        st.metric("Competitor Score", f"{summary['competitor_score']:.2f}", "-1.2%", delta_color="inverse")
    
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Platform Performance")
        platform_data = get_platform_metrics()
        platform_df = pd.DataFrame(platform_data)
        
        fig = go.Figure(data=[
            go.Bar(name='Mentions', x=platform_df['platform'], y=platform_df['mentions'], marker_color='#1f77b4'),
            go.Bar(name='Engagement', x=platform_df['platform'], y=platform_df['engagement'], marker_color='#ff7f0e')
        ])
        fig.update_layout(height=400, hovermode='x unified')
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("😊 Sentiment Breakdown")
        sentiment_data = get_sentiment_data()
        sentiment_df = pd.DataFrame(sentiment_data['breakdown'])
        
        fig = go.Figure(data=[go.Pie(
            labels=sentiment_df['sentiment'],
            values=sentiment_df['percentage'],
            marker=dict(colors=['#2ecc71', '#95a5a6', '#e74c3c'])
        )])
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("---")
    
    st.subheader("🔥 Top Trending Topics")
    trending = get_trending_topics()
    trending_df = pd.DataFrame(trending)
    
    fig = px.bar(trending_df, x='mentions', y='topic', orientation='h', color='growth', color_continuous_scale='Viridis')
    fig.update_layout(height=300, showlegend=False)
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("---")
    
    st.subheader("📊 Sentiment Trend (Last 7 Days)")
    sentiment_trend = get_sentiment_data()['trend']
    trend_df = pd.DataFrame(sentiment_trend)
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=trend_df['date'], y=trend_df['positive'], name='Positive', mode='lines+markers', line=dict(color='#2ecc71')))
    fig.add_trace(go.Scatter(x=trend_df['date'], y=trend_df['neutral'], name='Neutral', mode='lines+markers', line=dict(color='#95a5a6')))
    fig.add_trace(go.Scatter(x=trend_df['date'], y=trend_df['negative'], name='Negative', mode='lines+markers', line=dict(color='#e74c3c')))
    fig.update_layout(height=400, hovermode='x unified')
    st.plotly_chart(fig, use_container_width=True)
    
    st.subheader("🚨 Recent Alerts")
    alerts = get_alerts_data()['active_alerts'][:3]
    for alert in alerts:
        severity_color = {'critical': '🔴', 'high': '🟠', 'medium': '🟡', 'low': '🟢'}
        st.info(f"{severity_color.get(alert['severity'], '⚪')} **{alert['title']}** - {alert['platform']}\n{alert['description']}")

def show_social_media():
    st.markdown("<div class='header-title'>📱 Social Media Monitoring</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    platform = st.selectbox("Select Platform:", ["All", "Twitter", "Instagram", "Facebook", "YouTube"])
    posts = get_social_posts(platform)
    posts_df = pd.DataFrame(posts)
    
    st.subheader(f"Recent Posts ({len(posts_df)})")
    
    for idx, row in posts_df.iterrows():
        sentiment_emoji = {'positive': '😊', 'negative': '😞', 'neutral': '😐'}
        with st.expander(f"{sentiment_emoji.get(row['sentiment'])} {row['author']} - {row['platform']}"):
            st.write(f"**Content:** {row['content']}")
            col1, col2, col3, col4 = st.columns(4)
            col1.metric("Likes", row['likes'])
            col2.metric("Shares", row['shares'])
            col3.metric("Comments", row['comments'])
            col4.metric("Engagement", f"{row['engagement_rate']:.1f}%")
            st.caption(f"Sentiment Score: {row['sentiment_score']:.2f}")

def show_customer_voice():
    st.markdown("<div class='header-title'>💬 Customer Voice Analytics</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    sentiment_data = get_sentiment_data()
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Positive Sentiment", f"{sentiment_data['breakdown'][0]['percentage']}%", "+5.2%")
    with col2:
        st.metric("Neutral Sentiment", f"{sentiment_data['breakdown'][1]['percentage']}%", "0.1%")
    with col3:
        st.metric("Negative Sentiment", f"{sentiment_data['breakdown'][2]['percentage']}%", "-2.1%")
    
    st.markdown("---")
    
    st.subheader("✅ Top Positive Mentions")
    for item in sentiment_data['by_sentiment'][0]['top_posts']:
        st.success(f"💬 **{item['author']}** - ❤️ {item['likes']} likes\n{item['content']}")
    
    st.markdown("---")
    
    st.subheader("⚠️ Top Negative Mentions")
    for item in sentiment_data['by_sentiment'][1]['top_posts']:
        st.error(f"💬 **{item['author']}** - 👎 {item['likes']} reactions\n{item['content']}")
    
    st.markdown("---")
    
    st.subheader("🏷️ Top Themes")
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("**Positive Themes:**")
        for theme in sentiment_data['by_sentiment'][0]['top_themes']:
            st.write(f"• {theme}")
    
    with col2:
        st.write("**Negative Themes:**")
        for theme in sentiment_data['by_sentiment'][1]['top_themes']:
            st.write(f"• {theme}")

def show_trends():
    st.markdown("<div class='header-title'>🔥 Trends & Topics</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    tab1, tab2, tab3, tab4 = st.tabs(["Trending Topics", "Emerging Trends", "Hashtag Analysis", "Product Trends"])
    
    with tab1:
        st.subheader("Top Trending Topics")
        trending = get_trending_topics()
        trending_df = pd.DataFrame(trending)
        
        for idx, row in trending_df.iterrows():
            with st.expander(f"#{idx + 1} {row['topic']} - {row['growth']}% growth"):
                col1, col2, col3 = st.columns(3)
                col1.metric("Mentions", f"{row['mentions']:,}")
                col2.metric("Growth", f"{row['growth']}%")
                col3.metric("Sentiment", f"{row['sentiment']:.2f}")
    
    with tab2:
        st.subheader("🌟 Emerging Trends")
        emerging = [
            {"name": "AI-Powered Shopping", "mentions": 450, "growth": 156, "week_growth": 245},
            {"name": "Virtual Try-On", "mentions": 320, "growth": 142, "week_growth": 189},
            {"name": "Sustainable Packaging", "mentions": 280, "growth": 128, "week_growth": 167},
            {"name": "Voice Commerce", "mentions": 210, "growth": 115, "week_growth": 142}
        ]
        
        for trend in emerging:
            st.info(f"**{trend['name']}**\nMentions: {trend['mentions']} | Growth: {trend['growth']}% | Weekly Growth: +{trend['week_growth']}%")
    
    with tab3:
        st.subheader("#️⃣ Hashtag Performance")
        hashtags = [
            {"tag": "#retail", "usage": 8900, "engagement": 67500},
            {"tag": "#shopping", "usage": 7650, "engagement": 58300},
            {"tag": "#fashion", "usage": 6200, "engagement": 51800},
            {"tag": "#brandnew", "usage": 5400, "engagement": 42100}
        ]
        
        hashtag_df = pd.DataFrame(hashtags)
        fig = px.scatter(hashtag_df, x='usage', y='engagement', size='engagement', hover_name='tag', color='engagement', color_continuous_scale='Viridis')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        st.subheader("📦 Product Trends")
        products = [
            {"product": "Sustainable Clothing", "mentions": 1250, "sentiment": 0.80},
            {"product": "Smart Home Devices", "mentions": 890, "sentiment": 0.72},
            {"product": "Eco Packaging", "mentions": 756, "sentiment": 0.85},
            {"product": "Premium Basics", "mentions": 680, "sentiment": 0.75}
        ]
        
        product_df = pd.DataFrame(products)
        fig = px.bar(product_df, x='mentions', y='product', color='sentiment', color_continuous_scale='RdYlGn', orientation='h')
        st.plotly_chart(fig, use_container_width=True)

def show_brand_intelligence():
    st.markdown("<div class='header-title'>🏷️ Brand Intelligence</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    brand_data = get_brand_intelligence()
    col1, col2, col3, col4, col5 = st.columns(5)
    
    with col1:
        st.metric("Brand Mentions", f"{brand_data['mentions']['total']:,}", "+12.5%")
    with col2:
        st.metric("Brand Health", f"{brand_data['health']['score']}", "+2.1%")
    with col3:
        st.metric("Awareness", f"{brand_data['health']['awareness']}%", "+4.2%")
    with col4:
        st.metric("Consideration", f"{brand_data['health']['consideration']}%", "+3.1%")
    with col5:
        st.metric("Loyalty", f"{brand_data['health']['loyalty']}%", "+1.8%")
    
    st.markdown("---")
    
    st.subheader("📍 Mentions by Source")
    sources_df = pd.DataFrame(brand_data['sources'])
    fig = px.pie(sources_df, values='mentions', names='source', hole=0.3)
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("---")
    
    st.subheader("🛍️ Top Product Mentions")
    products_df = pd.DataFrame(brand_data['products'])
    fig = px.bar(products_df, x='mentions', y='product', color='sentiment', color_continuous_scale='RdYlGn', orientation='h')
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("---")
    
    st.subheader("📢 Campaign Performance")
    for campaign in brand_data['campaigns']:
        with st.expander(f"🎯 {campaign['name']}"):
            col1, col2, col3, col4 = st.columns(4)
            col1.metric("Mentions", f"{campaign['mentions']:,}")
            col2.metric("Engagement", f"{campaign['engagement']:,}")
            col3.metric("Sentiment", f"{campaign['sentiment']:.2f}")
            col4.metric("Reach", f"{campaign['reach']:,}")
            st.caption(f"Duration: {campaign['start_date']} to {campaign['end_date']}")

def show_competitor_intelligence():
    st.markdown("<div class='header-title'>🥊 Competitor Intelligence</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    competitor_data = get_competitor_data()
    tab1, tab2, tab3, tab4 = st.tabs(["Competitor Overview", "Share of Voice", "Sentiment Comparison", "Market Trends"])
    
    with tab1:
        st.subheader("Competitor Profiles")
        for comp in competitor_data['competitors']:
            with st.expander(f"🏢 {comp['name']}"):
                col1, col2, col3, col4 = st.columns(4)
                col1.metric("Mentions", f"{comp['mentions']:,}")
                col2.metric("Sentiment", f"{comp['sentiment']:.2f}")
                col3.metric("Engagement", f"{comp['engagement_rate']:.1f}%")
                col4.metric("Market Share", f"{comp['market_share']}%")
    
    with tab2:
        st.subheader("Share of Voice")
        sov_df = pd.DataFrame(competitor_data['share_of_voice'])
        fig = px.pie(sov_df, values='percentage', names='brand')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab3:
        st.subheader("Sentiment Comparison")
        sentiment_df = pd.DataFrame(competitor_data['sentiment_comparison'])
        fig = px.bar(sentiment_df, x='competitor', y='sentiment', color='sentiment', color_continuous_scale='RdYlGn')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        st.subheader("Market Trends (Last 7 Days)")
        trends_df = pd.DataFrame(competitor_data['market_trends'])
        fig = go.Figure()
        for col in trends_df.columns:
            if col != 'date':
                fig.add_trace(go.Scatter(x=trends_df['date'], y=trends_df[col], name=col, mode='lines+markers'))
        fig.update_layout(height=400, hovermode='x unified')
        st.plotly_chart(fig, use_container_width=True)

def show_alerts():
    st.markdown("<div class='header-title'>🚨 Alerts & Monitoring</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    alerts_data = get_alerts_data()
    col1, col2, col3, col4 = st.columns(4)
    
    severity_counts = {s['severity']: s['count'] for s in alerts_data['by_severity']}
    
    with col1:
        st.metric("🔴 Critical", severity_counts.get('critical', 0))
    with col2:
        st.metric("🟠 High", severity_counts.get('high', 0))
    with col3:
        st.metric("🟡 Medium", severity_counts.get('medium', 0))
    with col4:
        st.metric("🟢 Low", severity_counts.get('low', 0))
    
    st.markdown("---")
    
    tab1, tab2, tab3 = st.tabs(["Active Alerts", "Alert Trends", "Alert Analytics"])
    
    with tab1:
        st.subheader("Active Alerts")
        for alert in alerts_data['active_alerts']:
            severity_color_map = {'critical': '🔴', 'high': '🟠', 'medium': '🟡', 'low': '🟢'}
            alert_type_map = {'viral_post': '🔥', 'negative_sentiment': '😞', 'emerging_issue': '⚠️', 'competitor_mention': '🥊', 'brand_mention': '🏷️'}
            color_map = {'critical': 'error', 'high': 'warning', 'medium': 'info', 'low': 'success'}
            getattr(st, color_map.get(alert['severity'], 'info'))(f"{severity_color_map.get(alert['severity'])} {alert_type_map.get(alert['type'])} **{alert['title']}**\nPlatform: {alert['platform']}\n{alert['description']}")
    
    with tab2:
        st.subheader("Alert Trends (Last 7 Days)")
        trends_df = pd.DataFrame(alerts_data['alert_trends'])
        fig = go.Figure()
        fig.add_trace(go.Bar(name='Total', x=trends_df['date'], y=trends_df['total'], marker_color='lightblue'))
        fig.add_trace(go.Bar(name='Negative', x=trends_df['date'], y=trends_df['negative'], marker_color='#e74c3c'))
        fig.add_trace(go.Bar(name='Viral', x=trends_df['date'], y=trends_df['viral'], marker_color='#f39c12'))
        fig.update_layout(barmode='stack', height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with tab3:
        col1, col2 = st.columns(2)
        with col1:
            st.subheader("Alerts by Type")
            type_df = pd.DataFrame(alerts_data['by_type'])
            fig = px.pie(type_df, values='count', names='type')
            st.plotly_chart(fig, use_container_width=True)
        with col2:
            st.subheader("Alerts by Severity")
            severity_df = pd.DataFrame(alerts_data['by_severity'])
            fig = px.pie(severity_df, values='count', names='severity', color='severity', color_discrete_map={'critical': '#e74c3c', 'high': '#f39c12', 'medium': '#3498db', 'low': '#2ecc71'})
            st.plotly_chart(fig, use_container_width=True)

def show_settings():
    st.markdown("<div class='header-title'>⚙️ Settings & Configuration</div>", unsafe_allow_html=True)
    st.markdown("---")
    
    st.subheader("📊 Dashboard Settings")
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("**Data Refresh**")
        refresh_interval = st.slider("Refresh interval (minutes)", 1, 60, 15)
        st.write("**Display Settings**")
        chart_theme = st.selectbox("Chart Theme", ["plotly", "plotly_dark", "plotly_white"])
    
    with col2:
        st.write("**Notification Settings**")
        notify_critical = st.checkbox("Alert on Critical Events", value=True)
        notify_viral = st.checkbox("Alert on Viral Posts", value=True)
        notify_sentiment = st.checkbox("Alert on Sentiment Spike", value=True)
        st.write("**Filter Settings**")
        min_mentions = st.slider("Minimum mentions threshold", 10, 1000, 100)
    
    st.markdown("---")
    st.subheader("📱 Platform Configuration")
    platforms = st.multiselect("Monitor these platforms:", ["Twitter", "Instagram", "Facebook", "YouTube", "TikTok"], default=["Twitter", "Instagram", "Facebook", "YouTube"])
    
    st.markdown("---")
    st.subheader("🎯 Brand & Competitor Configuration")
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("**Your Brand**")
        brand_name = st.text_input("Brand Name", "Your Brand")
        brand_keywords = st.text_area("Brand Keywords (comma-separated)", "retail, shopping, brand")
    
    with col2:
        st.write("**Competitors to Track**")
        competitors = st.text_area("Competitor Names (one per line)", "Competitor A\nCompetitor B\nCompetitor C")
    
    st.markdown("---")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("💾 Save Settings", use_container_width=True):
            st.success("✅ Settings saved successfully!")
    with col2:
        if st.button("🔄 Reset to Default", use_container_width=True):
            st.info("⚙️ Settings reset to default")
    with col3:
        if st.button("📥 Export Configuration", use_container_width=True):
            st.download_button("Download Config", "config.json", file_name="config.json")

def main():
    st.sidebar.markdown("# 🏠 Retail Social Intelligence")
    page = st.sidebar.radio("Select Dashboard:", ["📊 Executive Dashboard", "📱 Social Media", "💬 Customer Voice", "🔥 Trends & Topics", "🏷️ Brand Intelligence", "🥊 Competitor Intelligence", "🚨 Alerts", "⚙️ Settings"])
    
    if page == "📊 Executive Dashboard":
        show_executive_dashboard()
    elif page == "📱 Social Media":
        show_social_media()
    elif page == "💬 Customer Voice":
        show_customer_voice()
    elif page == "🔥 Trends & Topics":
        show_trends()
    elif page == "🏷️ Brand Intelligence":
        show_brand_intelligence()
    elif page == "🥊 Competitor Intelligence":
        show_competitor_intelligence()
    elif page == "🚨 Alerts":
        show_alerts()
    elif page == "⚙️ Settings":
        show_settings()

if __name__ == "__main__":
    main()
