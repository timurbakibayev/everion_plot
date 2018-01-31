import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';

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
                               this.setState({time_from: newVal});
                               localStorage.setItem("time_to", newVal);
                           }
                       }/>
        </div>)
        // if (this.props.path.toLowerCase().search(/patients\/(\d+)$/) > -1) {
        //     let itemNo = parseInt(this.props.path.toLowerCase().match(/patients\/(\d+)$/)[1],10);
        //     console.log("itemNo from regexp", itemNo, this.props);
        //     let patientItem = this.props.patient;
        //     if (patientItem !== null)
        //         return (<span>{ patientItem.patient_header }</span>)
        //     else
        //         return (this.props.settings.language === "russian"?
        //             <span>Загрузка...</span>:
        //             <span>Loading...</span>)
        //
        // }
        //
        //
        // if (this.props.path.toLowerCase().indexOf("patients") > -1)
        //     return (
        //         this.props.settings.language === "russian"?
        //         <span>Пациенты: {actionType.PATIENTS_ALL}</span>:
        //         <span>Patients: {actionType.PATIENTS_ALL_EN}</span>
        //     );
        // if (this.props.path.toLowerCase().indexOf("companies") > -1)
        //     return (
        //         this.props.settings.language === "russian"?
        //         <span>Организации</span>:
        //         <span>Companies</span>
        //     );
        // if (this.props.path.toLowerCase().indexOf("auth") > -1)
        //     return (
        //         this.props.settings.language === "russian"?
        //         <span>Учетная запись</span>:
        //         <span>Account</span>
        //     );
        // if (this.props.path.toLowerCase().indexOf("calendar") > -1)
        //     return (
        //         this.props.settings.language === "russian"?
        //         <span>Производственный календарь</span>:
        //         <span>Calendar</span>
        //     );
        // return (
        //     this.props.settings.language === "russian"?
        //     <span>Главная страница</span>:
        //     <span>Main Page</span>
        // )
    }
}


const mapStateToProps = (state) => ({
    patient: state.patients.currentPatient,
    settings: state.settings,
});

const mapDispatchToProps = {};

const HeaderCaptionComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HeaderCaptionComponent);

export default HeaderCaptionComponent;