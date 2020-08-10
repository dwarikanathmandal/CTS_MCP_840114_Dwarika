import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PortfolioList from './PortfolioList';
const styles = {
    row: {
        marginTop: 20,
        marginBottom: 20,
    },
    createTaskButton: {
        textAlign: 'right'
    }
}
const PortfolioLayout = props => {   

    const [searchText, setSearchText] = useState('');
    const [reloadList, setReloadList] = useState(1);
    const createPortfolioHandler = () => {
        props.history.push('/portfolio/create')
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
    return (
        <div>

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
                    <Button type='button' onClick={createPortfolioHandler}>Create Portfolio</Button>
                </Col>
            </Row>
            <PortfolioList key={reloadList} searchText={searchText} />
        </div>

    )
}

export default withRouter(PortfolioLayout);