import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {LinksList} from '../components/LinksList';
import {LinearProgress, Grid} from '@material-ui/core';
import {useStyles} from "../styles/styleVariables";


export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const classes = useStyles();
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        } catch (e) {
            console.error(e);
            return null
        }
    }, [token, request])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks]);
    if (loading) {
        return <LinearProgress color='secondary'/>
    }
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.wrapperFullHeight}>
            {!loading && <LinksList links={links}/>}
        </Grid>
    );
}
