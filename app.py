from flask import Flask, render_template, jsonify
import psutil
import time

app = Flask(__name__)


def get_system_metrics():
    return {
        "cpu_percent": psutil.cpu_percent(),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage("/").percent,
        "process_count": len(psutil.pids()),
    }


def get_processes():
    processes = []
    for proc in psutil.process_iter(
        ["pid", "name", "cpu_percent", "memory_percent", "status"]
    ):
        try:
            processes.append(
                {
                    "pid": proc.info["pid"],
                    "name": proc.info["name"],
                    "cpu_percent": proc.info["cpu_percent"],
                    "memory_percent": proc.info["memory_percent"],
                    "status": proc.info["status"],
                }
            )
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    return processes


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/metrics")
def metrics():
    return jsonify(get_system_metrics())


@app.route("/api/processes")
def processes():
    return jsonify(get_processes())


if __name__ == "__main__":
    app.run(debug=True)
