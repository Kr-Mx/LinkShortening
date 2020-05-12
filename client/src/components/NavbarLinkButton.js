import React from 'react';
import {Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    link: {
        margin: '0 10px',
        color: 'white',
        textDecoration: 'none'
    }
}));

export const NavbarLinkButton = ({to, startIcon, text}) => {
    return (
        <NavLink
            className={useStyles().link}
            to={to}>
            <Button
                variant='contained'
                size='small'
                startIcon={startIcon}>
                {text}
            </Button>
        </NavLink>
    )
}
