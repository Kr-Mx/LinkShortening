import React, {useContext, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

import LinkIcon from '@material-ui/icons/Link';
import MuiAlert from '@material-ui/lab/Alert';
import {Typography, Grid, TextField, Snackbar, InputAdornment, Box, Button} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh'
    }
}));

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const [link, setLink] = useState('');
    const pressHandler = async event => {
        if (event.key === 'Enter' || event.type === 'click') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    };
    const classes = useStyles();

    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className={classes.root}>
            <Grid
                 container
                 justify='center'
                 direction='row'
                 alignItems='center'>
                <Typography variant='h6'>
                    Paste your link here:&nbsp;
                </Typography>
                <TextField
                    variant='outlined'
                    autoFocus
                    size='small'
                    name='link'
                    value={link}
                    color='secondary'
                    onKeyPress={pressHandler}
                    onChange={(e) => {
                        setLink(e.target.value)
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LinkIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box
                    component={Button}
                    variant='outlined'
                    color='secondary.main'
                    size='large'
                    m={2}
                    onClick={pressHandler}>
                    Submit
                </Box>
            </Grid>
            <Snackbar
                autoHideDuration={1000}
                open={!!error}
                onClose={clearError}>
                <MuiAlert
                    elevation={6}
                    variant='outlined'
                    severity={'error'}
                    onClose={clearError}>
                    {error}
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
}
