import React, {Component} from 'react';
//import {Responsive, WidthProvider} from 'react-grid-layout';
//import _ from 'lodash';

//import Card, {CardActions, CardHeader, CardContent} from 'material-ui/Card';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';

import Paper from 'material-ui/Paper';
import AutoSuggest from '../input/AutoSuggest'

import './../general.css'
import {Link} from 'react-router-dom';

import Chart from "../Chart";
import Loading from "../Loading";
import Typography from 'material-ui/Typography';
import FileUpload from '../input/FileUpload'
import Grid from 'material-ui/Grid';
import Collapse from 'material-ui/transitions/Collapse';

import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

import * as actions from "../../actions/readings";

const styles = {
    root: {
        padding: "1em",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        marginTop: "1%",
        width: "95%",
        overflowY: 'auto',
    },
};

var t;

class _PatientCardComponent extends Component {
    loading = this.props.settings.language === "russian" ? "Загружается..." : "Loading...";
    t = false;

    constructor(e) {
        super(e);
        this.state = {data: {}}
    }

    drawChart() {
        let newLabels = [];
        let data_hr = [];
        const data = this.props.readings;
        for (let i = 0; i < data.length; i++) {
            data_hr.push({x: i, y: data[i].value_hr});
            newLabels.push(data[i].time_iso);
        }
        console.log(newLabels);
        this.setState({
            data: {
                labels: newLabels,
                yAxis: "A",
                datasets: [
                    {
                        label: "heart rate",
                        data: data_hr,
                        backgroundColor: [
                            'rgba(180,35,132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(180,35,132, 1)',

                        ],
                    },
                ]
            }
        })
    }

    componentWillMount() {
        //this.props.refreshCurrentCompany(this.props.patientItem.company);
        this.setState({mounted: true});
        console.log("PatientCard Component Will Mount", this.props);
        this.props.refreshReadings(this.props.id).then(
            response => {
                t = false
            }
        );
    }


    componentWillUpdate() {
        if (!t) {
            t = true;
            this.drawChart();
        }
    }

    onBreakpointChange = (breakpoint) => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    render() {
        console.log("PatientCard props", this.props);
        return (
            <div key={this.props.patient.id}>
                <div style={styles.root}>
                    {this.props.patient.name}
                    <Grid container spacing={24}>
                        <Grid item sm={12} md={6}>
                        </Grid>
                        <Grid item sm={12} md={6}>
                        </Grid>
                    </Grid>
                    <Chart data={this.state.data}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    patient: state.patients.currentPatient,
    readings: state.readings.list,
});

const mapDispatchToProps = {
    refreshReadings: actions.refreshReadings,
};

const PatientCardComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PatientCardComponent);

export default PatientCardComponent;