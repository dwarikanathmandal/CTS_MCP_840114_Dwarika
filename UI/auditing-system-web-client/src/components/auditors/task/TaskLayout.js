import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Input, Container } from 'reactstrap';
import { connect } from 'react-redux';
import TaskList from './TaskList';
const styles = {
    row: {
        marginTop: 20,
        marginBottom: 20,
    },
    createTaskButton: {
        textAlign: 'right'
    },
    portfolioName: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: 'lightblue'
    }
}
const PortfolioLayout = props => {

    const [searchText, setSearchText] = useState('');
    const [reloadList, setReloadList] = useState(1);

    let portfolioId = props.match.params.id ? props.match.params.id : '';
    let portfolioName = props?.history?.location?.state?.portfolioName ? props.history.location?.state?.portfolioName : ''; 

    const createTaskHandler = () => {
        props.history.push('/portfolio/' + portfolioId + '/task/create')
    }

    const searcClickHandler = () => {
        setReloadList(prevSate => prevSate + 1);
    };

    const searchTextChangehandler = (e) => {
        setSearchText(e.target.value)
        if (e.target.value.trim().length <= 0) {
            setReloadList(prevSate => prevSate + 1);
        }
    }

    // console.log(loggedInUser);
    return (
        <>
            <Container>
                <Row style={styles.portfolioName}>
                    <Col>{portfolioName}</Col>
                </Row>
            </Container>

            <Row style={styles.row}>
                <Col>
                    <Input type='search' onChange={searchTextChangehandler} />
                </Col>

                <Col>
                    <Button type='button' onClick={searcClickHandler}>Search</Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col style={styles.createTaskButton}>
                   
                </Col>
            </Row>
            <TaskList portfolioId={portfolioId} key={reloadList} searchText={searchText} />
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.dbUser.loggedInUser
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioLayout));