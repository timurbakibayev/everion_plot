import React, {Component} from 'react';
import {connect} from 'react-redux';
import Patient from './Patient';
import * as actions from '../../actions/patients';
import * as actionType from '../../actionTypes'
import {Switch, Route} from 'react-router-dom';
import PatientCardComponent from './PatientCard'
import Loading from '../Loading'
import Button from 'material-ui/Button';

class _PatientsComponent extends Component {

    constructor(e) {
        super(e);
        this.state = {};
    }

    renderPatient(patient) {
        return (
            <Patient key={patient.id} {...patient} settings={this.props}
            />
        )
    }

    updatePatients() {
        this.setState({loadMore: true})
        console.log("Patients.js params", this.props);
        let isPatientItem = (this.props.location.pathname.trim().match(/\/patients\/\d+/) !== null);
        if (isPatientItem) {
            let itemNo = parseInt(this.props.location.pathname.trim().toLowerCase().match(/patients\/(\d+)/)[1], 10);
            if (this.props.patient.id !== itemNo) {
                console.log("Loading current patient", itemNo);
                this.props.loadCurrentPatient(itemNo);
                //this.props.refreshReadings(itemNo);
            }
        } else {
            console.log("Loading all patients");
            let subPath = this.props.location.pathname.trim().toLowerCase().match(/patients\/(.*)$/);
            if (subPath === null) {
                subPath = "open";
            } else {
                subPath = subPath[1];
            }
            subPath = subPath.toLowerCase();
            console.log("Subpath is", subPath)
            this.props.refresh(subPath);
        }
    }

    handleRefresh(event) {
        event.preventDefault();
    }

    renderErrorMessage() {
        if (this.props.errorMessage) {
            return <div className="error">{this.props.errorMessage}</div>;
        } else {
            return <div></div>;
        }
    }

    patientsSet() {
        return this.props.patients.filter((item) => {
            let match = true;
            this.props.patientsFilterByText.toLowerCase().split(" ").forEach((txt) => {
                if (txt.length > 0)
                    if (!((item.name.toLowerCase() +
                            (item.number === null ? "" : item.number.toLowerCase())
                        ).indexOf(txt) > -1)) {
                        match = false;
                    }
            });
            return match;
        });
    }

    renderListOfPatients() {
        if (this.props.errorMessage)
            return (<div>
                {this.renderErrorMessage()}
            </div>);
        var the_counter = (this.props.location.pathname.toLowerCase() === "/patients/closed"?"closed":"open");
        var patients = this.patientsSet();

        return (<div>
            {patients.map(this.renderPatient.bind(this))}
        </div>)
    }


    renderPatientItem(values) {
        let patientNo = parseInt(values.match.params.patientNo, 10);
        if (this.props.patient !== undefined)
            return (
                <div>
                    <PatientCardComponent key={patientNo} id={patientNo} {...this.props}/>
                </div>
            );
        return (
            <div>
                <Loading/>
            </div>
        )
    }

    componentWillMount() {
        this.updatePatients();
        this.setState({previousLocation: this.props.location});
    }

    componentDidUpdate() {
        console.log("Did update", this.props);
        if (this.state !== null && (this.props.location !== this.state.previousLocation)) {
            this.updatePatients();
            this.setState({previousLocation: this.props.location});
        }
    }

    render() {
        console.log("Patients props", this.props);


        if (this.props.isLoadingCurrentPatient)
            return (
                <div style={{width: "100%", alignContent: "center"}}>
                    <Loading/>
                </div>
            );

        return (
            <Switch>
                <Route exact path='/' component={this.renderListOfPatients.bind(this)}/>
                <Route exact path='/patients' component={this.renderListOfPatients.bind(this)}/>
                <Route exact path='/patients/:patientNo' component={this.renderPatientItem.bind(this)}/>
            </Switch>
        );
    }
}
;

const mapStateToProps = (state) => ({
    patient: state.patients.currentPatient,
    patients: state.patients.list,
    isLoading: state.patients.isLoading,
    isLoadingCurrentPatient: state.patients.isLoadingCurrentPatient,
    errorMessage: state.patients.errorMessage,
    patientsFilterByText: state.patients.filterByText,
    settings: state.settings,
});

const mapDispatchToProps = {
    refresh: actions.refreshPatients,
    loadCurrentPatient: actions.loadCurrentPatient,
};

const PatientsComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PatientsComponent);

export default PatientsComponent;