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
        this.state = {
            datasets: [], labels: [], show: {
                "Пульс": localStorage.getItem("hr")==="1",
                "Дыхание": localStorage.getItem("rr")==="1",
                "Кислород": localStorage.getItem("spo2")==="1",
                "Активность": localStorage.getItem("activity")==="1",
                "Перфузия": localStorage.getItem("bperf")==="1",
                "Равномерность": localStorage.getItem("hrv")==="1",
            }
        }
    }

    getChart() {
        let newLabels = [];
        let data_hr = [];
        let data_spo2 = [];
        let data_activity = [];
        let data_bperf = [];
        let data_rr = [];
        let data_hrv = [];
        const data = this.props.readings;
        for (let i = 0; i < data.length; i++) {
            data_hr.push({x: i, y: data[i].value_hr});
            data_spo2.push({x: i, y: data[i].value_spo2});
            data_activity.push({x: i, y: data[i].value_activity});
            data_bperf.push({x: i, y: data[i].value_bperf});
            data_rr.push({x: i, y: data[i].value_rr});
            data_hrv.push({x: i, y: data[i].value_hrv});
            newLabels.push(data[i].time_iso.replace("T",", "));
        }
        //console.log(newLabels);
        return ({
            labels: newLabels,
            datasets: [
                    {
                        label: "Пульс",
                        yAxisID: "A",
                        data: data_hr,
                        backgroundColor: [
                            'rgba(180,35,132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(180,35,132, 0.7)',

                        ],
                    },
                    {
                        yAxisID: "D",
                        label: "Кислород",
                        data: data_spo2,
                        backgroundColor: [
                            'rgba(35,35,132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(35,35,132, 0.4)',

                        ],
                    },
                    {
                        yAxisID: "B",
                        label: "Активность",
                        data: data_activity,
                        backgroundColor: [
                            'rgba(35,132,52, 0.2)',
                        ],
                        borderColor: [
                            'rgba(35,132,52, 0.4)',

                        ],
                    },
                    {
                        yAxisID: "C",
                        label: "Перфузия",
                        data: data_bperf,
                        backgroundColor: [
                            'rgba(85,132,52, 0.2)',
                        ],
                        borderColor: [
                            'rgba(85,132,52, 0.4)',

                        ],
                    },
                    {
                        yAxisID: "B",
                        label: "Дыхание",
                        data: data_rr,
                        backgroundColor: [
                            'rgba(85,132,252, 0.2)',
                        ],
                        borderColor: [
                            'rgba(85,132,252, 0.4)',

                        ],
                    },
                    {
                        yAxisID: "A",
                        label: "Равномерность",
                        data: data_hrv,
                        backgroundColor: [
                            'rgba(185,132,252, 0.2)',
                        ],
                        borderColor: [
                            'rgba(185,132,252, 0.4)',

                        ],
                    },
                ]
        })
    }

    componentWillMount() {
        //this.props.refreshCurrentCompany(this.props.patientItem.company);
        this.setState({mounted: true});
        //console.log("PatientCard Component Will Mount", this.props);
        this.props.refreshReadings(this.props.id).then(
            response => {
                t = false
            }
        );
    }


    componentWillUpdate() {
    }

    onBreakpointChange = (breakpoint) => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    render() {
        //console.log("PatientCard props", this.props);
        let data = this.getChart();
        let datasets = [];
        for (var i = 0; i < data.datasets.length; i++) {
            if (this.state.show[data.datasets[i].label])
                datasets.push(data.datasets[i]);
        }
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
                    <Chart data={{
                        datasets: datasets,
                        labels: data.labels
                    }}/>
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