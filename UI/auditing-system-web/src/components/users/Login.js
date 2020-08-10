import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../store/actions/auth";
import { Button, Form, Label, Input, FormGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import Registration from "./Registration";

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

class Login extends Component {
    state = { email: "", password: "" };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(loginUser(email, password));
    };

    handleRegisterClick = () => {
        this.props.history.push("/register");
    }

    render() {
        const { loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {           
            return <Redirect to="/" />;
        } else {
            return (
                <Card>
                    <CardTitle>
                        <CardText style={styles.cardTitle}>
                            AUDITING SYSTEM LOGIN</CardText></CardTitle>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="password">User name (email)</Label>
                                <Input
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    // fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={this.handleEmailChange}
                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    variant="outlined"
                                    margin="normal"
                                    // fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handlePasswordChange}
                                />

                            </FormGroup>
                            {loginError && (
                                <div style={styles.errorText}>
                                    Incorrect email or password.
                                </div>
                            )}
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >Sign In</Button>
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={this.handleRegisterClick}
                                style={{ marginLeft: 20 }}
                            >New to the system? Signup here</Button>
                        </Form>
                    </CardBody>
                </Card>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Login);

