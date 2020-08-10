import React, { useState, useEffect } from 'react';

// import apiConfig from '../../../../configs/api';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalFooter,
    FormGroup,
    FormFeedback,
    Label,
    Input
}
    from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
    addComment,
    updateComment,
    getCommentsByTaskId,
    getCommentbyId
} from '../../../../store/actions/comment';
import apiConfig from '../../../../configs/api';
import { operationMode } from '../../../../constants/uiconstants'
const AddComment = props => {

    let portfolioId = props.portfolioId;
    let taskId = props.taskGuid;
    let mode = props.commentId && props.commentId.length > 0 ? operationMode.EDIT : operationMode.CREATE;

    const [commentText, setCommentText] = useState('');
    const [commentTextError, setCommentTextError] = useState(false);

    const { isModelOpen, toggleModel } = props;

    useEffect(() => {
        if (props.commentId && props.commentId.length > 0) {
            props.dispatch(getCommentbyId(`${apiConfig.baseUrl}Comments/${props.commentId}`))
        }
    }, [props.commentId, props.dispatch])

    useEffect(() => {
        if (props.comment && props.comment.id) {
            setCommentText(props.comment.commentText)
        }
    }, [props.comment])
    const inputHandler = (e) => {
        setCommentText(e.target.value);
        if (e.target.value.trim().length <= 0)
            setCommentTextError(true);
        else
            setCommentTextError(false);
    }

    const saveClickHandler = () => {
        if (!commentTextError) {

            let data = {
                commentText: commentText
            };
            let action = addComment;
            let url = apiConfig.baseUrl + 'Comments';
            data.taskId = taskId;
            data.portfolioId = portfolioId;
            if (mode == operationMode.EDIT) {
                data.id = props.commentId;
                data.createDate = props.comment.createDate;
                data.portfolioId = props.comment.portfolioId;
                data.createdBy = props.comment.createdBy;
                data.modifiedBy = props.loggedInUser.id;
                action = updateComment;
                url = url + "/" + props.commentId
            } else {
                data.createdBy = props.loggedInUser.id;
            }

            console.log(data);
            const { dispatch } = props;
            dispatch(action(url, data))
                .then(response => {
                    props.toggleModel();
                }).catch(error => {
                    props.toggleModel();
                });
        }
    }

    return (
        <Modal isOpen={isModelOpen} toggle={toggleModel} className={''}>
            <ModalHeader toggle={toggleModel}>Add/Edit Comment</ModalHeader>
            <ModalBody>

                <FormGroup>
                    <Label for="taskTitle">Task title</Label>
                    <Input
                        type="textarea"
                        style={{ width: '100%', minHeight: 100 }}
                        name="commentText"
                        id="commentText"
                        placeholder="Enter comment here."
                        value={commentText}
                        invalid={commentTextError}
                        onChange={inputHandler} />
                    <FormFeedback>Enter comment</FormFeedback>
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleModel}>Cancel</Button>
                <Button color="primary" type='button' onClick={saveClickHandler}>Save</Button>
            </ModalFooter>
        </Modal>

    )
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.dbUser.loggedInUser,
        comment: state.comment
    }
}
export default withRouter(connect(mapStateToProps)(AddComment));
