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
                    maintainAspectRatio: true
                }}
            />
        )
    }
}