import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import PaginationControl from '../../common/Pagination';
import { getPortfolios } from '../../../store/actions/portfolio';
import apiConfig from '../../../configs/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const styles = {
    taskRow: {
        backgroundColor: '#E9ECEF',
        color: 'black',
        paddingTop: 10,
        paddingBottom: 10,
    },
    rightCol: {
        textAlign: 'right',
        float: 'right',
    },

    name: {

        cursor: 'pointer',
    }
}


const PortfolioItem = props => {

    const rowClickHandler = () => {
        props.onClick(props.id, props.portfolioName)
    };

    const editClickHandler = () => {
        props.onEditClick(props.id)
    }
    return (<Row style={{ ...styles.taskRow, backgroundColor: props.backgroundColor }}>
        <Col>
            <Row>
                <Col style={styles.name} onClick={rowClickHandler}><h4>{props.portfolioName}</h4></Col>
                <Col>
                    <Row>
                        <Col>{props.clientName}</Col>
                    </Row>
                </Col>
                <Col style={styles.rightCol} sm={2}>
                    {/* <Button type='button' onClick={viewClickHandler} type='button'>View</Button> */}
                    <Button type='button' onClick={editClickHandler} >Edit</Button>
                </Col>
            </Row>
            <Row>
                <Col>{props.portfolioDescription}</Col>
                <Col style={styles.rightCol} sm={2}>
                </Col>
            </Row>
        </Col>
    </Row>);
}

const PortfolioList = props => {

    // debugger;
    useEffect(() => {
        const { dispatch } = props;
        dispatch(getPortfolios(apiConfig.baseUrl + 'Portfolios/SearchPortfolio?searchText=' + props.searchText)).then(response => {
            console.log("Success");
        }).catch(eror => {
            console.log("Failed");
        });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10, totalItems = 120;

    const pageChangeHandler = (currentPage) => {
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        console.log(currentPage);
    };
    const rowClickHandler = (id, name) => {
        props.history.push("/portfolio/" + id, { portfolioName: name })
    };

    const editClickHandler = (id) => {
        props.history.push("/portfolio/edit/" + id)
    }

    const { portfolios } = props;
    return (
        <>
            <Container>
                {portfolios && portfolios.portfolios && portfolios.portfolios.length > 0 &&
                    portfolios.portfolios.map((item, index) => {
                        return <PortfolioItem
                            backgroundColor={index % 2 == 0 ? '#E9ECEF' : 'white'}
                            key={item.id} {...item}
                            onClick={rowClickHandler}
                            onEditClick={editClickHandler} />
                    })}

            </Container>
            {
                portfolios && portfolios.portfolios && portfolios.portfolios.length > 0 ?
                    <PaginationControl onPageChanged={pageChangeHandler} totalItems={portfolios.portfolios.length} pageSize={pageSize} /> :
                    <Row style={styles.taskRow}>
                        <Col style={{ textAlign: 'center' }}>No Data</Col>
                    </Row>
            }

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        portfolios: state.portfolios
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioList));