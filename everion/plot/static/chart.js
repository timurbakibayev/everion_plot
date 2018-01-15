var globalChart;
function plot(labels,data) {
    var ctx = document.getElementById("myChart").getContext('2d');
    if (globalChart === undefined) {
        globalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: data,
            },
            options: {}
        });
    } else {
        globalChart.datasets = data;
        globalChart.update();
    }
}