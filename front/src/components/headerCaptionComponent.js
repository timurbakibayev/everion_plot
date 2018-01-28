import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionType from '../actionTypes';

class _HeaderCaptionComponent extends Component {
    filterCaption() {
        console.log("HeaderCaptionComponent props", this.props);
        if (this.props.isPatients !== undefined)
            return !this.props.patientsFilter?actionType.PATIENTS_ALL:this.props.patientsFilter;
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
        if (this.props.path.toLowerCase().search(/patients\/(\d+)$/) > -1) {
            let itemNo = parseInt(this.props.path.toLowerCase().match(/patients\/(\d+)$/)[1],10);
            console.log("itemNo from regexp", itemNo, this.props);
            let patientItem = this.props.patient;
            if (patientItem !== null)
                return (<span>{ patientItem.patient_header }</span>)
            else
                return (this.props.settings.language === "russian"?
                    <span>Загрузка...</span>:
                    <span>Loading...</span>)

        }
        if (this.props.path.toLowerCase().search(/patients\/(\d+)\/clone$/) > -1) {
            let itemNo = parseInt(this.props.path.toLowerCase().match(/patients\/(\d+)\/clone$/)[1],10);
            console.log("itemNo from regexp", itemNo, this.props);
            let patientItem = this.props.patient;
            if (patientItem !== null)
                return (
                    this.props.settings.language === "russian"?
                    <span>Клонирование: { patientItem.patient_header }</span>:
                    <span>Clone: { patientItem.patient_header }</span>
                );
            else
                return (
                    this.props.settings.language === "russian"?
                    <span>Загрузка...</span>:
                    <span>Loading...</span>
                )

        }
        if (this.props.path.toLowerCase().search(/patients\/(\d+)\/forward$/) > -1) {
            let itemNo = parseInt(this.props.path.toLowerCase().match(/patients\/(\d+)\/forward$/)[1],10);
            console.log("itemNo from regexp", itemNo, this.props);
            let patientItem = this.props.patient;
            if (patientItem !== null)
                return (this.props.settings.language === "russian"?
                    <span>Назначение: { patientItem.patient_header }</span>:
                    <span>Send patient: { patientItem.patient_header }</span>
                );
            else
                return (this.props.settings.language === "russian"?
                    <span>Загрузка...</span>:
                    <span>Loading...</span>)

        }

        if (this.props.path.toLowerCase().indexOf("reports/1") > -1)
            return (
                this.props.settings.language === "russian"?
                    <span>Отчет: {actionType.REPORT1}</span>:
                    <span>Report: {actionType.REPORT1_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("reports/2") > -1)
            return (
                this.props.settings.language === "russian"?
                    <span>Отчет: {actionType.REPORT2}</span>:
                    <span>Report: {actionType.REPORT2_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("patients/to_me") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Пациенты: {actionType.PATIENTS_TO_ME}</span>:
                <span>Patients: {actionType.PATIENTS_TO_ME_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("patients/from_me") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Пациенты: {actionType.PATIENTS_FROM_ME}</span>:
                <span>Patients: {actionType.PATIENTS_FROM_ME_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("patients/closed") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Пациенты: {actionType.PATIENTS_CLOSED}</span>:
                <span>Patients: {actionType.PATIENTS_CLOSED_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("/patients/new") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>{actionType.PATIENT_NEW}</span>:
                <span>{actionType.PATIENT_NEW_EN}</span>
            );

        if (this.props.path.toLowerCase().indexOf("patients") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Пациенты: {actionType.PATIENTS_ALL}</span>:
                <span>Patients: {actionType.PATIENTS_ALL_EN}</span>
            );
        if (this.props.path.toLowerCase().indexOf("companies") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Организации</span>:
                <span>Companies</span>
            );
        if (this.props.path.toLowerCase().indexOf("auth") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Учетная запись</span>:
                <span>Account</span>
            );
        if (this.props.path.toLowerCase().indexOf("calendar") > -1)
            return (
                this.props.settings.language === "russian"?
                <span>Производственный календарь</span>:
                <span>Calendar</span>
            );
        return (
            this.props.settings.language === "russian"?
            <span>Главная страница</span>:
            <span>Main Page</span>
        )
    }
}


const mapStateToProps = (state) => ({
    patient: state.patients.currentPatient,
    settings: state.settings,
});

const mapDispatchToProps = {
};

const HeaderCaptionComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HeaderCaptionComponent);

export default HeaderCaptionComponent;