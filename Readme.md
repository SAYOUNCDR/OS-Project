# Process Monitor

## Overview
Process Monitor is a web-based application that provides real-time monitoring of system processes, CPU usage, memory usage, and other system statistics. Built using Flask, HTML, CSS, JavaScript, and Chart.js, the application visualizes system metrics dynamically.

## Features
- **Real-time System Monitoring**: Tracks CPU and memory usage dynamically.
- **Charts Visualization**: Uses Chart.js to represent data graphically.
- **Flask Backend**: Fetches system stats using `psutil`.
- **Responsive UI**: Styled using CSS for a user-friendly experience.

## Technologies Used
- **Backend**: Python (Flask), `psutil`
- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Data Fetching**: AJAX for dynamic updates


## Installation
### Prerequisites
- Python 3
- Flask
- psutil
- Chart.js (included via CDN in HTML)

### Steps
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/process-monitor.git
   cd process-monitor
   ```
2. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask application:  
   ```bash
   python app.py
   ```
4. Open in browser:  
   ```
   http://127.0.0.1:5000
   ```

## Future Enhancements
- Add process filtering
- Store historical data

