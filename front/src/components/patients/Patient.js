import React, {Component} from 'react';
import Card, {CardHeader, CardMedia} from 'material-ui/Card';

import ActionDone from 'material-ui-icons/Done'
import ActionNegative from 'material-ui-icons/DoNotDisturbAlt'
import ActionWork from 'material-ui-icons/GroupWork'
import UnreadIcon from 'material-ui-icons/NewReleases'
import SomeoneUnreadIcon from 'material-ui-icons/Mail'
import './../general.css'
import {Link} from 'react-router-dom';
import Chart from '../Thumbnail'


class PatientComponent extends Component {
    stringBirthday = this.props.settings.language === "russian" ? "Дата рождения:" : "Birth Date:";
    stringClosed = this.props.settings.language === "russian" ? "Закрыто" : "Closed";
    stringAtWork = this.props.settings.language === "russian" ? "В работе у " : "At work, current owner: ";
    stringProjectManager = this.props.settings.language === "russian" ? "Менеджер проекта: " : "Project Manager: ";


    render() {
        //let data_str = this.props.patient.thumbnail.split(",");
        var data_hr_str = this.props.thumbnail.split(",");
        let data_hr = [];
        let labels = [];
        for (var i = 0; i < data_hr_str.length; i++) {
            if (parseInt(data_hr_str[i]) !== 0) {
                data_hr.push({x: i, y: parseInt(data_hr_str[i])});
                labels.push(i);
            } else {
                data_hr.push({x: i, y: NaN});
                labels.push(i);
            }
        }
        let hr = {label:"Пульс",data:data_hr, pointRadius: 0, borderColor: [
                        'rgba(180,35,35, 0.7)',
                    ],backgroundColor: [
                        'rgba(180,35,35, 0.1)',
                    ],fill:false};
        return (
            <Card className="CompanyCard" style={{fontWeight: this.props.emph ? "bolder" : "normal"}}>
                <div className="details" style={{display: "flex", flexDirection: "row", flex: 1}}>
                    {/*<CardMedia className="avatar" style={{width: 20}}*/}
                               {/**/}
                    {/*/>*/}
                    <div style={{flex: 0.3}}>
                        <Link to={`/patients/${this.props.id}`}><CardHeader
                            title={<h1>{this.props.name}</h1>}
                            avatar={this.props.closed ? (this.props.positive ? <ActionDone color="green"/> :
                                <ActionNegative color="red"/>) : <ActionWork/>}
                        /></Link>
                        <div
                            style={{marginLeft: "4em", marginTop: "-1em"}}>{this.props.birthday?this.stringBirthday:""} {this.props.birthday}
                            {
                                this.props.technology ? <span style={{
                                    fontWeight: "bolder",
                                    color: "green"
                                }}> Технология {this.props.technology}</span> : ""
                            }</div>
                    </div>
                    <div style={{flex: 0.7, backgroundColor: "F4F4F5"}}>
                        <Chart data = {{
                            datasets: [hr],
                            labels: labels,
                        }}/>
                    </div>
                </div>
            </Card>
        );
    }
}


export default PatientComponent;