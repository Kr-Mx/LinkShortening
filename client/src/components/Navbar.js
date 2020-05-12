import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

import {AppBar, Toolbar, Button, Container} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import {NavbarLinkButton} from './NavbarLinkButton';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <AppBar
            color={'secondary'}
            position='static'>
            <Toolbar>
                <Container disableGutters>
                    <NavbarLinkButton
                        to={'/links'}
                        startIcon={<LinkIcon/>}
                        text='Links'
                    />
                    <NavbarLinkButton
                        to={'/create'}
                        startIcon={<AddIcon/>}
                        text='Create'
                    />
                </Container>
                <Button
                    disableRipple
                    color='inherit'
                    onClick={logoutHandler}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};
