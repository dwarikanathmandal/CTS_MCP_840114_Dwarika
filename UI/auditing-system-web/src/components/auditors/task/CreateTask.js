import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    FormFeedback,
}
    from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { operationMode, taskStatus } from '../../../constants/uiconstants';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
    createTask,
    getTaskById,
    updateTask
} from '../../../store/actions/task';
import { getUsers } from '../../../store/actions/user';
import apiConfig from '../../../configs/api';
import DocumentsAndCommentsLayout from './DocumentsAndCommentsLayout';

const styles = {

    cardTitle: {
        textAlign: 'center',
        fontSize: 20
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    }
};

const formatUserData = (users) => {
    let userList = [];
    if (users && users.length > 0) {
        users.forEach(item => {
            userList.push({ label: item.firstName + ' ' + item.lastName, value: item.id })
        })
    }
    return userList;
}

const createNewGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const CreateTask = props => {

    let portfolioId = props.match.params.id ? props.match.params.id : '';
    let taskId = props.match.params.taskId ? props.match.params.taskId : '';
    let mode = operationMode.CREATE;

    if (taskId && taskId.length === 36) {
        mode = operationMode.EDIT;
    }

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({ formIsValid: false });
    const [taskGuid, setTaskGuid] = useState(taskId ? taskId : createNewGuid());

    useEffect(() => {
        props.dispatch(getUsers(`${apiConfig.baseUrl}users`))
    }, [portfolioId, mode])

    useEffect(() => {
        if (mode === operationMode.EDIT) {
            let dispatch = props.dispatch;
            dispatch(getTaskById(`${apiConfig.baseUrl}tasks/${taskId}`));
        }
    }, [portfolioId, taskId, mode]);

    useEffect(() => {
        if (mode === operationMode.EDIT && props.task && props.task.taskTitle && props.users && props.users.length > 0) {
            let task = { ...props.task };
            setFormData(prevState => {
                return {
                    ...prevState,
                    taskTitle: task.taskTitle,
                    taskDescription: task.taskDescription,
                    userIds: mapSelectedUserIds(task.userIds)
                }
            })
        }
    }, [props.task]);

    const mapSelectedUserIds = (selectedIds) => {

        return props.users.filter(user => selectedIds.includes(user.value))
    }
    const inputChangeHandler = (e) => {
        var element = e.target;
        var obj = {};
        obj[element.id] = element.value;

        setFormData(prevState => {
            return {
                ...prevState,
                ...obj
            }
        });

        var errorObj = {};
        if (element.required && element.value.trim().length <= 0) {
            errorObj[element.id] = { invalid: true }
        } else {
            errorObj[element.id] = { invalid: false }
        }

        setFormErrors(prevState => {
            return {
                ...prevState,
                ...errorObj
            }
        })
    }

    const dropdownHandler = (option) => {
        setFormData(prevState => {
            return {
                ...prevState,
                userIds: option
            }
        });
        let isValid = true;
        if (!(option && option.length > 0)) {
            isValid = false;
        }

        setFormErrors(prevState => {
            return {
                ...prevState,
                userIds: { invalid: !isValid }
            }
        })

    }

    const submitHandler = () => {

        if (validateForm()) {

            let data = { ...formData }
            let action = createTask;
            let url = apiConfig.baseUrl + 'Tasks';
            data.userIds = data.userIds ? data.userIds.map(item => item.value) : [];
            data.id = taskGuid;

            if (mode == operationMode.EDIT) {
                // data.id = taskId;
                data.createDate = props.task.createDate;
                data.portfolioId = props.task.portfolioId;
                data.createdBy = props.task.createdBy;
                data.modifiedBy = props.loggedInUser.id;
                data.taskStatusId = props.task.taskStatusId === 3 ? taskStatus.Completed : taskStatus.Sent
                action = updateTask;
                url = url + "/" + taskId
            } else {
                data.createdBy = props.loggedInUser.id;
                data.portfolioId = portfolioId;
                data.taskStatusId = taskStatus.Sent
            }
          
            const { dispatch } = props;
            dispatch(action(url, data))
                .then(response => {
                    props.history.push("/portfolio/" + portfolioId);
                }).catch(error => {

                });
        }
    }

    const validateForm = () => {

        var errors = {};
        if (!formData.taskTitle || formData.taskTitle.length <= 0) {
            errors = { ...errors, taskTitle: { invalid: true } }
        }

        if (!formData.userIds || formData.userIds.length <= 0) {
            errors = { ...errors, userIds: { invalid: true } }
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(prevState => {
                return {
                    ...prevState,
                    ...errors
                }
            })

            return false;
        }
        else {
            return true;
        }
    };

    return (
        <Card>
            <CardTitle>
                <CardText style={styles.cardTitle}>
                    {mode === operationMode.CREATE ? 'CREATE' : 'EDIT'} TASK
                </CardText>
            </CardTitle>
            <CardBody>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="taskTitle">Assign users (s)</Label>                              
                                <Select
                                    options={props.users}
                                    isMulti
                                    onChange={(option) => dropdownHandler(option)}
                                    value={formData.userIds}
                                />
                                <Input
                                    style={{ display: "none" }}
                                    invalid type="select"
                                    invalid={formErrors.userIds?.invalid}
                                >
                                    <option value='0'>Select</option>
                                </Input>
                                <FormFeedback>User(s) must be assigned.</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="taskTitle">Task title</Label>
                                <Input type="text" name="taskTitle" id="taskTitle" placeholder="Enter task title."
                                    required
                                    value={formData.taskTitle ? formData.taskTitle : ''}
                                    invalid={formErrors.taskTitle?.invalid}
                                    onChange={(e) => inputChangeHandler(e)} />
                                <FormFeedback>Client code required.</FormFeedback>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="taskDescription">Task description name</Label>                               
                                <textarea style={{ width: '100%', minHeight: 100 }} type="text"
                                    name="taskDescription" id="taskDescription" placeholder="Enter task description."
                                    value={formData.taskDescription ? formData.taskDescription : ''}
                                    onChange={(e) => inputChangeHandler(e)} />
                            </FormGroup>
                        </Col>

                    </Row>

                </Form>
                <br />
                {/* {
                    mode === operationMode.EDIT && <DocumentsAndCommentsLayout />
                } */}

                <DocumentsAndCommentsLayout taskId={taskGuid} portfolioId={portfolioId} />

                <br />

                <Button type="button" color="primary" onClick={submitHandler}> {mode === operationMode.EDIT ? 'Update' : 'Create'} Task</Button>{' '}

            </CardBody>
        </Card >)
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.dbUser.loggedInUser,
        task: state.task.task,
        users: formatUserData(state.dbUser.allusers)
    }
}

export default withRouter(connect(mapStateToProps)(CreateTask));