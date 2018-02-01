import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Chart extends Component {
    render() {
        return (
            <Line
                data={this.props.data}
                width={400}
                height={40}
                options={{
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    scales: { xAxes: [{ display: false, }], yAxes: [{ display: true, }], },
                }}
            />
        )
    }
}