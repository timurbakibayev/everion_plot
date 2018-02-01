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
import * as actionsPatients from "../../actions/patients";
import Button from "material-ui/Button";

const debounce = require('lodash/debounce');

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
                "Пульс": localStorage.getItem("hr") === "1",
                "Дыхание": localStorage.getItem("rr") === "1",
                "Кислород": localStorage.getItem("spo2") === "1",
                "Активность": localStorage.getItem("activity") === "1",
                "Перфузия": localStorage.getItem("bperf") === "1",
                "Равномерность": localStorage.getItem("hrv") === "1",
            },
            body: {},
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
        let last_hr = 0
        let last_rr = 0
        let last_spo2 = 0
        let last_activity = 0
        let last_bperf = 0
        let last_hrv = 0

        const data = this.props.readings;
        for (let i = 0; i < data.length; i++) {

            if (data[i].value_hr !== 0) {
                data_hr.push({x: i, y: data[i].value_hr});
                last_hr = data[i].value_hr;
            } else
                data_hr.push({x: i, y: last_hr});

            if (data[i].value_rr !== 0) {
                data_rr.push({x: i, y: data[i].value_rr});
                last_rr = data[i].value_rr;
            } else
                data_rr.push({x: i, y: last_rr});

            if (data[i].value_bperf !== 0) {
                data_bperf.push({x: i, y: data[i].value_bperf});
                last_bperf = data[i].value_bperf;
            } else
                data_bperf.push({x: i, y: last_bperf});

            if (data[i].value_spo2 !== 0) {
                data_spo2.push({x: i, y: data[i].value_spo2});
                last_spo2 = data[i].value_spo2;
            } else
                data_spo2.push({x: i, y: last_spo2});

            if (data[i].value_activity !== 0) {
                data_activity.push({x: i, y: data[i].value_activity});
                last_activity = data[i].value_activity;
            } else
                data_activity.push({x: i, y: last_activity});

            if (data[i].value_hrv !== 0) {
                data_hrv.push({x: i, y: data[i].value_hrv});
                last_hrv = data[i].value_hrv;
            } else
                data_hrv.push({x: i, y: last_hrv});


            newLabels.push(data[i].time_iso.replace("T", ", "));
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

    saveData = (body) => {
        this.props.putPatient(this.props.patient.id, body);
        console.log("bounce");
    }

    render() {
        //console.log("PatientCard props", this.props);
        let data = this.getChart();
        let datasets = [];
        for (var i = 0; i < data.datasets.length; i++) {
            if (this.state.show[data.datasets[i].label])
                datasets.push(data.datasets[i]);
        }
        return (
            <div key={this.props.patient.id} onDragOver={this.preventDefault} onDrop={this.drop}>
                <div style={styles.root} >
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
                    }} />
                </div>
                <div style={{width: "100%"}}>
                    Нормы для пациента {this.props.patient.name}
                    <div style={{height: "2em"}}/>
                    <Grid container spacing={24}>

                        <Grid item sm={12} md={6}>Пульс:</Grid>
                        <Grid item sm={12} md={6}>
                            от <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_hr_min}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_hr_min: parseFloat(event.target.value)
                                               }
                                           })
                                       }}/> до <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_hr_max}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_hr_max: parseFloat(event.target.value)
                                               }
                                           })
                                       }}
                            />
                        </Grid>

                        <Grid item sm={12} md={6}>Насыщенность кислородом:</Grid>
                        <Grid item sm={12} md={6}>
                            от <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_spo2_min}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_spo2_min: parseFloat(event.target.value)
                                               }
                                           })
                                       }}/> до <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_spo2_max}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_spo2_max: parseFloat(event.target.value)
                                               }
                                           })
                                       }}
                            />
                        </Grid>

                        <Grid item sm={12} md={6}>Перфузия:</Grid>
                        <Grid item sm={12} md={6}>
                            от <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_bperf_min}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_bperf_min: parseFloat(event.target.value)
                                               }
                                           })
                                       }}/> до <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_bperf_max}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_bperf_max: parseFloat(event.target.value)
                                               }
                                           })
                                       }}
                            />
                        </Grid>

                        <Grid item sm={12} md={6}>Дыхание:</Grid>
                        <Grid item sm={12} md={6}>
                            от <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_rr_min}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_rr_min: parseFloat(event.target.value)
                                               }
                                           })
                                       }}/> до <span> </span>
                            <TextField style={{width: "5em"}}
                                       type="number"
                                       defaultValue={"" + this.props.patient.limits_rr_max}
                                       onChange={(event) => {
                                           this.setState({
                                               body: {
                                                   ...this.state.body,
                                                   limits_rr_max: parseFloat(event.target.value)
                                               }
                                           })
                                       }}
                            />
                        </Grid>
                    </Grid>
                    <div style={{height: "2em"}}/>
                    {Object.keys(this.state.body).length > 0 && <Button onClick={
                        (event) => {
                            this.saveData(this.state.body);
                        }
                    }>Сохранить</Button>}
                    <div style={{height: "2em"}}/>
                    <FileUpload/>
                    <div style={{height: "2em"}}/>
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
    putPatient: actionsPatients.putCurrentPatient,
};

const PatientCardComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PatientCardComponent);

export default PatientCardComponent;