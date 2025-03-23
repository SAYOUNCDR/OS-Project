// Initialize Chart.js
const ctx = document.getElementById("performanceChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "CPU Usage",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Memory Usage",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Update metrics function
async function updateMetrics() {
  try {
    const metricsResponse = await fetch("/api/metrics");
    const metrics = await metricsResponse.json();

    // Update metric cards
    document.getElementById(
      "cpuUsage"
    ).textContent = `${metrics.cpu_percent.toFixed(1)}%`;
    document.getElementById(
      "memoryUsage"
    ).textContent = `${metrics.memory_percent.toFixed(1)}%`;
    document.getElementById(
      "diskUsage"
    ).textContent = `${metrics.disk_percent.toFixed(1)}%`;
    document.getElementById("processCount").textContent = metrics.process_count;

    // Update chart
    const now = new Date().toLocaleTimeString();
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(metrics.cpu_percent);
    chart.data.datasets[1].data.push(metrics.memory_percent);

    // Keep last 10 data points
    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets.forEach((dataset) => dataset.data.shift());
    }

    chart.update();

    // Update timestamp
    document.getElementById("updateTime").textContent = now;
  } catch (error) {
    console.error("Error fetching metrics:", error);
  }
}

// Update process list function
async function updateProcessList() {
  try {
    const processResponse = await fetch("/api/processes");
    const processes = await processResponse.json();
    const tableBody = document.getElementById("processTable");
    const searchTerm = document
      .getElementById("processSearch")
      .value.toLowerCase();

    // Filter processes based on search
    const filteredProcesses = processes.filter((process) =>
      process.name.toLowerCase().includes(searchTerm)
    );

    // Update table
    tableBody.innerHTML = filteredProcesses
      .map(
        (process) => `
            <tr>
                <td>${process.pid}</td>
                <td>${process.name}</td>
                <td>${process.cpu_percent.toFixed(1)}%</td>
                <td>${process.memory_percent.toFixed(1)}%</td>
                <td>${process.status}</td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching processes:", error);
  }
}

// Set up search functionality
document
  .getElementById("processSearch")
  .addEventListener("input", updateProcessList);

// Update data every 2 seconds
setInterval(updateMetrics, 2000);
setInterval(updateProcessList, 2000);

// Initial update
updateMetrics();
updateProcessList();
