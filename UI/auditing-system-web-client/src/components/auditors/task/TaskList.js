import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import PaginationControl from '../../common/Pagination';

import { getTaskByPortfolioId, clearTasks } from '../../../store/actions/task';
import apiConfig from '../../../configs/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const styles = {
    taskRow: {
        backgroundColor: '#E9ECEF',
        color: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        cursor: 'pointer',
    },
    rightCol: {
        textAlign: 'right',
        float: 'right',
    }
}


const TaskListItem = props => {

    const rowClickHandler = () => {
        // if (props.taskStatusId !== 3)
        props.onClick(props.id, props.portfolioId)
    };

    return (
        <Row disabled={props.taskStatusId === 3} style={{ ...styles.taskRow, backgroundColor: props.backgroundColor }} onClick={rowClickHandler}>
            <Col>
                <Row>
                    <Col><h4>{props.taskTitle}</h4></Col>
                    <Col sm={2}> {["No", "Request recieved", "Responded", "Completed"][props.taskStatusId]} </Col>
                    <Col style={styles.rightCol} sm={4}>
                        <Row>
                            <Col>{new Date(props.ModifyDate != null ? props.modifyDate : props.createDate).toLocaleDateString()}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>{props.taskDescription}</Col>
                </Row>
            </Col>
        </Row>);
};


const TaskList = props => {

    let portfolioId = props.match.params.id ? props.match.params.id : '';

    useEffect(() => {
        const { dispatch } = props;
        dispatch(getTaskByPortfolioId(apiConfig.baseUrl + 'Tasks/GetTasksByUserId/' + props.loggedInUser.id)).then(response => {
            console.log("Success");
        }).catch(eror => {
            console.log("Failed");
        });
    }, [props.loggedInUser.id]);

    useEffect(() => {
        if (props.tasks && props.tasks.length >= 0) {
            setTaskList(prevState => applyPaging(props.tasks, 1))
        }

    }, [props.tasks]);

    const [currentPage, setCurrentPage] = useState(1);
    const [taskList, setTaskList] = useState([]);
    const pageSize = 4, totalItems = 120;

    const pageChangeHandler = (currentPage) => {
        console.log(currentPage);
        setTaskList(prevState => applyPaging(props.tasks, currentPage))
    };

    const rowClickHandler = (id, portfolioId) => {
        props.history.push("/portfolio/" + portfolioId + "/task/edit/" + id)
    };

    const applyPaging = (tasks, currentPage) => {
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, tasks.length - 1);
        let newList = [...tasks]
        newList = newList.slice(startIndex, endIndex + 1);
        return newList;
    }

    return (
        <>
            <Container>
                {taskList && taskList.length >= 0 &&
                    taskList.map((item, index) => {
                        return <TaskListItem
                            backgroundColor={index % 2 == 0 ? '#E9ECEF' : 'white'} key={item.id} {...item}
                            onClick={(id, portfolioId) => rowClickHandler(id, portfolioId)} />
                    })}

            </Container>
            {
                props.tasks && props.tasks.length > 0 ?
                    <PaginationControl onPageChanged={pageChangeHandler} totalItems={props.tasks.length} pageSize={pageSize} /> :
                    <Row style={styles.taskRow}>
                        <Col style={{ textAlign: 'center' }}>No request yet made by auditor for you.</Col>
                    </Row>
            }
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
        loggedInUser: state.dbUser.loggedInUser,
    }
}

export default withRouter(connect(mapStateToProps)(TaskList));