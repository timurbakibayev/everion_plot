import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import * as actions from "../actions/readings";

import * as actionType from '../actionTypes';

class _HeaderCaptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_from: localStorage.getItem("date_from"),
            date_to: localStorage.getItem("date_to"),
            time_from: localStorage.getItem("time_from"),
            time_to: localStorage.getItem("time_to"),
        };
    };

    filterCaption() {
        console.log("HeaderCaptionComponent props", this.props);
        if (this.props.isPatients !== undefined)
            return !this.props.patientsFilter ? actionType.PATIENTS_ALL : this.props.patientsFilter;
        if (this.props.isPatientItem === "true") {
            let itemDescription = "";
            let patientItem = this.props.patient;
            if (patientItem !== null)
                itemDescription = patientItem.patient_header;
            return itemDescription;
        }
        else
            return this.props.caption
    }

    refreshChart() {
        this.props.refreshReadings(this.props.patient.id);
    }

    render() {
        console.log("headerCaptionComponent props", this.props);
        return (<div style={{flexDirection: "row"}}>
            <TextField id={"date_from"} defaultValue={this.state.date_from}
                       value={this.state.date_from}
                       style={{fontSize: "0.6em"}}
                       type={"date"}
                       onChange={
                           (event) => {
                               let newVal = event.target.value;
                               console.log(newVal);
                               this.setState({date_from: newVal});
                               localStorage.setItem("date_from", newVal);
                               this.refreshChart();
                           }
                       }/>
            <TextField id={"time_from"} defaultValue={this.state.time_from}
                       value={this.state.time_from}
                       style={{fontSize: "0.6em"}}
                       type={"time"}
                       onChange={
                           (event) => {
                               let newVal = event.target.value;
                               console.log(newVal);
                               this.setState({time_from: newVal});
                               localStorage.setItem("time_from", newVal);
                               this.refreshChart();
                           }
                       }/>
            <span> - </span>
            <TextField id={"date_to"} defaultValue={this.state.date_to}
                       value={this.state.date_to}
                       style={{fontSize: "0.6em"}}
                       type={"date"}
                       onChange={
                           (event) => {
                               let newVal = event.target.value;
                               console.log(newVal);
                               this.setState({date_to: newVal});
                               localStorage.setItem("date_to", newVal);
                               this.refreshChart();
                           }
                       }/>
            <TextField id={"time_to"} defaultValue={this.state.time_to}
                       value={this.state.time_to}
                       style={{fontSize: "0.6em"}}
                       type={"time"}
                       onChange={
                           (event) => {
                               let newVal = event.target.value;
                               console.log(newVal);
                               this.setState({time_to: newVal});
                               localStorage.setItem("time_to", newVal);
                               this.refreshChart();
                           }
                       }/>
        </div>)
    }
}


const mapStateToProps = (state) => ({
    patient: state.patients.currentPatient,
    settings: state.settings,
});

const mapDispatchToProps = {
    refreshReadings: actions.refreshReadings,
};

const HeaderCaptionComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HeaderCaptionComponent);

export default HeaderCaptionComponent;