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
    FormFeedback
}
    from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { operationMode } from '../../../constants/uiconstants';
import { connect } from 'react-redux';
import {
    createPortfolio,
    getPortfolioById,
    updatePortfolio
} from '../../../store/actions/portfolio';
import apiConfig from '../../../configs/api';

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

const CreatePortfolio = props => {

    let portfolioId = props.match.params.portfolioId ? props.match.params.portfolioId : '';
    let mode = operationMode.CREATE;

    if (portfolioId && portfolioId.length === 36) {
        mode = operationMode.EDIT;
    }

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({ formIsValid: false });

    useEffect(() => {
        if (mode === operationMode.EDIT) {
            let dispatch = props.dispatch;
            dispatch(getPortfolioById(`${apiConfig.baseUrl}Portfolios/${portfolioId}`));
        }
    }, []);

    useEffect(() => {
        if (mode === operationMode.EDIT && props.portfolio && props.portfolio.id) {
            let portfolio = { ...props.portfolio };
            setFormData(prevState => {
                return {
                    ...prevState,
                    clientCode: portfolio.clientCode,
                    clientName: portfolio.clientName,
                    portfolioName: portfolio.portfolioName,
                    portfolioDescription: portfolio.portfolioDescription
                }
            })
        }
    }, [props.portfolio]);

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

    const submitHandler = () => {

        if (validateForm()) {
            let data = { ...formData }
            let action = createPortfolio;
            let url = apiConfig.baseUrl + 'Portfolios';
            if (mode == operationMode.EDIT) {
                data.id = portfolioId;
                data.createDate = props.portfolio.createDate;
                data.createdBy = props.portfolio.createdBy;
                data.modifiedBy = props.loggedInUser.id;
                action = updatePortfolio;
                url = url + "/" + portfolioId
            } else {
                data.createdBy = props.loggedInUser.id;
            }

            const { dispatch } = props;
            dispatch(action(url, data))
                .then(response => {
                    props.history.push("/portfolio");
                }).catch(eror => {

                });
        }
    };

    const validateForm = () => {

        var errors = {};
        if (!formData.clientCode || formData.clientCode.length <= 0) {
            errors = { ...errors, clientCode: { invalid: true } }
        }
        if (!formData.clientName || formData.clientName.length <= 0) {
            errors = { ...errors, clientName: { invalid: true } }
        }
        if (!formData.portfolioName || formData.portfolioName.length <= 0) {
            errors = { ...errors, portfolioName: { invalid: true } }
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
                    {mode === operationMode.CREATE ? 'CREATE' : 'EDIT'} PORTFOLIO
                    </CardText>
            </CardTitle>
            <CardBody>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="clientCode">Client code</Label>
                                <Input type="text" name="clientCode" id="clientCode" placeholder="Enter client code."
                                    required
                                    invalid={formErrors.clientCode?.invalid}
                                    value={formData.clientCode ? formData.clientCode : ''}
                                    onChange={(e) => inputChangeHandler(e)} />
                                <FormFeedback>Client code required.</FormFeedback>
                            </FormGroup></Col>
                        <Col>
                            <FormGroup>
                                <Label for="clientName">Client name</Label>
                                <Input type="email" name="clientName" id="clientName" placeholder="Enter client name."
                                    required
                                    invalid={formErrors.clientName?.invalid}
                                    value={formData.clientName ? formData.clientName : ''}
                                    onChange={(e) => inputChangeHandler(e)} />
                                <FormFeedback>Client name required.</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="portfolioName">Portfolio name</Label>
                                <Input type="text" name="portfolioName" id="portfolioName" placeholder="Enter portfolio name."
                                    required
                                    invalid={formErrors.portfolioName?.invalid}
                                    value={formData.portfolioName ? formData.portfolioName : ''}
                                    onChange={(e) => inputChangeHandler(e)} />
                                <FormFeedback>Portfolio name required.</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="portfolioDescription">Portfolio description</Label>
                                <Input type="text" name="portfolioDescription" id="portfolioDescription" placeholder="Enter portfolio description."
                                    onChange={(e) => inputChangeHandler(e)}
                                    value={formData.portfolioDescription ? formData.portfolioDescription : ''}
                                />
                                <FormFeedback>Portfolio name required.</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button type="button" color="primary" onClick={submitHandler}> {mode === operationMode.EDIT ? 'Update' : 'Create'} Portfolio</Button>{' '}
                </Form>
            </CardBody>
        </Card >)
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.dbUser.loggedInUser,
        portfolio: state.portfolio
    }
}

export default withRouter(connect(mapStateToProps)(CreatePortfolio));