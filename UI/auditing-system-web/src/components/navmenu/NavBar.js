import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText,
    Button,
    Alert
} from 'reactstrap';

import { Link } from 'react-router-dom';
import './NavBar.css';
import { clearApiErrors } from '../../store/actions/error';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [errorVisible, setErrorVisible] = useState(false);
    const onCloseError = () => {
        setErrorVisible(false);
        props.dispatch(clearApiErrors());
    }

    useEffect(() => {
        if (props.error != null) {
            setErrorVisible(true);
        } else {
            setErrorVisible(false);
        }
    }, [props.error])
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Audit Management System</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to={{ pathname: '/portfolio' }}>Portfolio</Link>{' '}
                        </NavItem>
                        <NavItem>
                            <Link to={{ pathname: '/portfolio/create' }}>Create Portfolio</Link>{' '}
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Button onClick={props.logoutHandler}>Logout </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>

            <Alert color="danger" isOpen={errorVisible} toggle={onCloseError}>
                {`Something went wrong with server. Please try after sometime or contact site owner.`}
            </Alert>
        </div>
    );
}


const mapStateToProps = (store) => {
    return {
        auth: store.auth,
        error: store.errors,
    };
};

export default connect(mapStateToProps)(NavBar);
