import React, { useState } from 'react';
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
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/auth';
import { ui_constants } from '../../constants/uiconstants';
import apiConfig from '../../configs/api';

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

const Registration = props => {

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({ formIsValid: false });

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
            const { dispatch } = props;
            dispatch(registerUser(apiConfig.baseUrl + 'Users',
                { ...formData, userType: ui_constants.userType.auditor }));
        }
    }

    const validateForm = () => {

        var errors = {};
        if (!formData.firstName || formData.firstName.length <= 0) {
            errors = { ...errors, firstName: { invalid: true } }
        }
        if (!formData.lastName || formData.lastName.length <= 0) {
            errors = { ...errors, lastName: { invalid: true } }
        }
        if (!formData.userName || formData.userName.length <= 0) {
            errors = { ...errors, userName: { invalid: true } }
        }
        if (!formData.password || formData.password.length <= 0) {
            errors = { ...errors, password: { invalid: true } }
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
    }

    const loginClickHandler = () => {
        props.history.push("/login");
    }

    const { signupError, isAuthenticated, apiError, isSigningUp } = props;

    if (isAuthenticated && !isSigningUp) {
        return <Redirect to="/" />;
    } else {
        return (
            <Card>
                <CardTitle>
                    <CardText style={styles.cardTitle}>
                        AUDITING SYSTEM REGISTRATION</CardText>
                    {signupError && (
                        <>                         
                            <CardText style={{ ...styles.cardTitle, ...styles.errorText }}>
                                {apiError?.message}
                            </CardText>
                        </>
                    )}
                </CardTitle>
                <CardBody>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="firstName">First name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="Enter first name."
                                        required
                                        invalid={formErrors.firstName?.invalid}
                                        onChange={(e) => inputChangeHandler(e)} />
                                    <FormFeedback>First name required.</FormFeedback>
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <Label for="userName">Username</Label>
                                    <Input type="email" name="userName" id="userName" placeholder="Enter email."
                                        required
                                        invalid={formErrors.userName?.invalid}
                                        onChange={(e) => inputChangeHandler(e)} />
                                    <FormFeedback>User name required.</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="lastName">Last name</Label>
                                    <Input type="text" name="email" id="lastName" placeholder="Enter last name."
                                        required
                                        invalid={formErrors.lastName?.invalid}
                                        onChange={(e) => inputChangeHandler(e)} />
                                    <FormFeedback>Last name required.</FormFeedback>
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Enter password."
                                        required
                                        invalid={formErrors.password?.invalid}
                                        onChange={(e) => inputChangeHandler(e)} />
                                    <FormFeedback>Password required.</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">City</Label>
                                    <Input type="text" name="city" id="city" placeholder="Enter city."
                                        onChange={(e) => inputChangeHandler(e)} />
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">State</Label>
                                    <Input type="select" name="state" id="state" onChange={(e) => inputChangeHandler(e)}>
                                        <option value='0'>Select</option>
                                        <option value='1' >Maharastra</option>
                                        <option value='3'>West Bengal</option>
                                        <option value='4'>Jharkhand</option>
                                        <option value='5'>Delhi</option>
                                        <option value='6'>Rajasthan</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button type="button" color="primary" onClick={submitHandler}>Register</Button>{' '}
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={loginClickHandler}
                            style={{ marginLeft: 20 }}
                        >Already member? Login here</Button>
                    </Form>
                </CardBody>
            </Card >)
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        isSigningUp: state.auth.isSigningUp,
        loginError: state.auth.loginError,
        signupError: state.auth.signupError,
        isAuthenticated: state.auth.isAuthenticated,
        apiError: state.auth.apiError
    };
}

export default withRouter(connect(mapStateToProps)(Registration));