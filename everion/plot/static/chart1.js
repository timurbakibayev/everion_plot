var globalChart1;
var globalChart2;
function plot(labels, data, which) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var globalChart = globalChart1;
    if (which === 2) {
        ctx = document.getElementById("myChart2").getContext('2d');
        globalChart = globalChart2;
    }
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
                    },{
                        id: 'D',
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
    if (which === 2)
        globalChart2 = globalChart;
    else
        globalChart1 = globalChart;
}