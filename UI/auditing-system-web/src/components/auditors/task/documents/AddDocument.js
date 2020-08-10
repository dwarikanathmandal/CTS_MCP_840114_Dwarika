import React, { useState } from 'react';
import { post } from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalFooter,
    Alert
}
    from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import apiConfig from '../../../../configs/api';
import { fileTypes } from '../../../../constants/uiconstants';

const AddDocument = props => {

    // let portfolioId = props.match.params.id ? props.match.params.id : '';
    // let taskId = props.match.params.taskId ? props.match.params.taskId : '';

    let portfolioId = props.portfolioId;
    let taskId = props.taskGuid;


    const { isModelOpen, toggleModel } = props;

    const [file, setFiles] = useState({});

    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);

    const setFileData = (e) => {
        let fileExtension = getFileNameWithExt(e).ext;
        if (fileTypes.includes(fileExtension))
            setFiles(e.target.files[0]);
        else
            setVisible(true);
    }

    const getFileNameWithExt = (event) => {

        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return {
                fileName: '',
                ext: ''
            };
        }

        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot);
        return {
            fileName: fileName,
            ext: ext
        }

    }
    const uploadFile = () => {

        const url = `${apiConfig.baseUrl}documents/Upload/${taskId}`;
        const formData = new FormData();
        formData.append('body', file);

        // let dispatch = props.dispatch;

        // dispatch(uploadDocument(url, formData,))
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'userid': props.loggedInUser.id,
                'portfolioId': portfolioId
            },
        };
        return post(url, formData, config).then(result => {
            props.toggleModel();
        }).catch(error => {
            console.log('Error in upload', error);
        });
    }


    return (
        <Modal isOpen={isModelOpen} toggle={toggleModel} className={''}>
            <ModalHeader toggle={toggleModel}>Upload Document</ModalHeader>
            <ModalBody>
                <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                    Invalid file type. Please select {fileTypes.join(',')}
                </Alert>
                <input type='file' id='file' accept={fileTypes.join(',')} onChange={e => setFileData(e)} />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleModel}>Cancel</Button>
                <Button color="primary" type='button' onClick={uploadFile}>Upload</Button>
            </ModalFooter>
        </Modal>
    )
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.dbUser.loggedInUser
    }
}
export default withRouter(connect(mapStateToProps)(AddDocument));