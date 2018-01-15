var globalChart;
function plot(labels, data) {
    var ctx = document.getElementById("myChart").getContext('2d');
    if (globalChart === undefined) {
        globalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: data,
            },
            options: {
                scales: {
                    yAxes: [{
                        id: 'A',
                        type: 'linear',
                        position: 'left',
                    }, {
                        id: 'B',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            max: 20,
                            min: 0
                        }
                    }, {
                        id: 'C',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            max: 1,
                            min: 0
                        }
                    }]
                }
            }
        });
    } else {
        globalChart.datasets = data;
        globalChart.update();
    }
}