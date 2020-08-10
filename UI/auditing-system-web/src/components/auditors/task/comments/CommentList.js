import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import AddComment from './AddComment';
import apiConfig from '../../../../configs/api';
import {
    getCommentbyId,
    deleteComment,
    clearComments,
    getCommentsByTaskId
} from '../../../../store/actions/comment';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const styles = {
    actionColumn: {
        width: 200
    },

    textAlignRight: {
        textAlign: 'right'
    },
    addButtonCol: {
        paddingRight: '1.75rem',
        paddingTop: 10,
        paddingBottom: 10
    },
    deleteButton: {
        marginLeft: 10
    }
}
const CommentList = props => {

    let taskId = props.taskGuid;

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [commentToRemove, setCommentToRemove] = useState('');
    const [commentToEdit, setCommentToEdit] = useState('');
    const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
    const toggleRemoveModel = () => {
        setIsRemoveModelOpen(!isRemoveModelOpen);
    }

    const toggleModel = () => {
        setIsModelOpen(!isModelOpen);
        if (isModelOpen)
            setCommentToEdit('')
        let dispatch = props.dispatch;
        if (taskId && taskId.length === 36) {
            dispatch(getCommentsByTaskId(`${apiConfig.baseUrl}Comments/GetCommentsByTaskId`, taskId));
        }
        else {
            dispatch(clearComments());
        }
    }

    useEffect(() => {
        let dispatch = props.dispatch;
        if (taskId && taskId.length === 36) {
            dispatch(getCommentsByTaskId(`${apiConfig.baseUrl}Comments/GetCommentsByTaskId`, taskId));
        } else {
            dispatch(clearComments());
        }
    }, [props.dispatch, taskId]);

    useEffect(() => {
        if (props.comments && props.comments.length > 0) {
            props.setCommentsCount(props.comments.length);
        } else {
            props.setCommentsCount(0);
        }
    }, [props.comments]);

    const removeComment = () => {
        if (commentToRemove && commentToRemove.length > 0) {
            let dispatch = props.dispatch;
            dispatch(deleteComment(`${apiConfig.baseUrl}Comments/${commentToRemove}`)).then(() => {
                dispatch(getCommentsByTaskId(`${apiConfig.baseUrl}Comments/GetCommentsByTaskId`, taskId));
                setIsRemoveModelOpen(false);
            })
        }

    }
    const commentList = [...props.comments];

    return (
        <Container>
            <Row>
                <Col style={{ ...styles.textAlignRight, ...styles.addButtonCol }}>
                    <Button type='button' onClick={() => toggleModel()}>Add Comment</Button>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th style={{ ...styles.actionColumn, ...styles.textAlignRight }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (commentList && commentList.length > 0) ?
                            commentList.map(com => {
                                return <tr key={com.id}>
                                    <td>{com.commentText}</td>
                                    <td style={{ ...styles.actionColumn, ...styles.textAlignRight }}>
                                        <Button type="button" onClick={() => {
                                            toggleModel();
                                            setCommentToEdit(com.id)
                                        }} >Edit</Button>
                                        <Button style={styles.deleteButton} type='button' onClick={() => {
                                            toggleRemoveModel();
                                            setCommentToRemove(com.id);
                                        }}>Delete</Button>
                                    </td>
                                </tr>
                            })
                            : null
                    }

                </tbody>
            </Table>
            <AddComment
                isModelOpen={isModelOpen}
                toggleModel={toggleModel}
                taskGuid={props.taskGuid}
                portfolioId={props.portfolioId}
                commentId={commentToEdit}
            />
            <Modal isOpen={isRemoveModelOpen} toggle={toggleRemoveModel} className={''}>
                <ModalHeader toggle={toggleRemoveModel}>Delete Comment</ModalHeader>
                <ModalBody>
                    <div> {`Are you sure you want to delete?`}</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleRemoveModel}>Cancel</Button>
                    <Button color="primary" type='button' onClick={removeComment}>Delete</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default withRouter(connect(mapStateToProps)(CommentList));
