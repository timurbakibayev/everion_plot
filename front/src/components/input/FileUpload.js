import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/fileUpload';
import '../general.css'
import TextField from 'material-ui/TextField';
import Saving from '../Saving'

class _FileUploadComponent extends Component {
    constructor(e) {
        super(e);
        this.state = {success: false, changed: false}
    }

    uploadFile = (e, values) => {
        e.preventDefault();
        if (e.target.file.files[0]) {
            console.log("Submitting", e.target.file.files[0]);
            this.props.uploadFile(this.props.orderNo, e.target.file.files[0])
                .then(response => {
                    this.props.refreshFiles(this.props.orderNo)
                })
                .then(response => {
                    this.props.refreshJactions(this.props.orderNo)
                }).then(response => {
                this.setState({success: true})
            });
        } else
            console.log("No file selected.");
    };

    render() {
        console.log("UploadFile component props", this.props);
        return (
            <div>
                <form onSubmit={ this.uploadFile.bind(this) } className="formUpload">
                    <TextField type="file" name="file" onChange={(e) => {
                        this.setState({changed: true})
                    }}/>
                    <Saving
                        type="submit"
                        handleButtonClick={() => {}}
                        success={this.state.success}
                        loading={this.props.isUploading}
                        changed={this.state.changed}
                    />
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    orderNo: state.jactions.orderNo,
    isUploading: state.fileUpload.isUploading,
    errorMessage: state.fileUpload.errorMessage,
});

const mapDispatchToProps = {
    uploadFile: actions.requestUploadFile,
};

const FileUploadComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_FileUploadComponent);


export default FileUploadComponent