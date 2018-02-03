import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Chart extends Component {
    render() {
        return (
            <Line
                data={this.props.data}
                width={100}
                height={50}
                options={{
                    elements: {
                        point: {
                            pointStyle: 'rectRot',
                        }
                    },
                    tooltips: {
						mode: "index",
						intersect: false,
                        displayColors: true,
					},
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            id: 'A',
                            type: 'linear',
                            position: 'left',
                        }, {
                            id: 'D',
                            ticks: {
                                beginAtZero: true
                            },
                            type: 'linear',
                            position: 'left',
                        }, {
                            id: 'B',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                max: 30,
                                min: 0
                            }
                        }, {
                            id: 'C',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                max: 1,
                                min: 0
                            }
                        }]
                    },
                    maintainAspectRatio: true,
                }}
            />
        )
    }
}