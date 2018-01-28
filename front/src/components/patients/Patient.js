import React, {Component} from 'react';
import Card, {CardHeader, CardMedia} from 'material-ui/Card';

import ActionDone from 'material-ui-icons/Done'
import ActionNegative from 'material-ui-icons/DoNotDisturbAlt'
import ActionWork from 'material-ui-icons/GroupWork'
import UnreadIcon from 'material-ui-icons/NewReleases'
import SomeoneUnreadIcon from 'material-ui-icons/Mail'
import './../general.css'
import {Link} from 'react-router-dom';


class PatientComponent extends Component {
    stringBirthday = this.props.settings.language === "russian" ? "Дата рождения:" : "Birth Date:";
    stringClosed = this.props.settings.language === "russian" ? "Закрыто" : "Closed";
    stringAtWork = this.props.settings.language === "russian" ? "В работе у " : "At work, current owner: ";
    stringProjectManager = this.props.settings.language === "russian" ? "Менеджер проекта: " : "Project Manager: ";


    render() {
        return (
            <Card className="CompanyCard" style={{fontWeight: this.props.emph ? "bolder" : "normal"}}>
                <div className="details" style={{display: "flex", flexDirection: "row", flex: 1}}>
                    <CardMedia className="avatar" style={{width: 20}}
                               image={this.props.img_url}
                    />
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
                    <div style={{flex: 0.7, backgroundColor: "#DDDDDD"}}>
                        Here will be a thumbnail of a chart
                    </div>
                </div>
            </Card>
        );
    }
}


export default PatientComponent;