import React from 'react';
import {Typography, Card, CardContent, Divider, Grid, Box} from '@material-ui/core';
import {LinkCardItem} from './LinkCardItem';
import {useStyles} from "../styles/styleVariables";

export const LinkCard = ({link}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className={classes.wrapperFullHeight}>
            <Card elevation={5}>
                <Box
                    component={Typography}
                    align='center'
                    variant='h5'
                    m={1}>
                    Link
                </Box>
                <Divider/>
                <CardContent>
                    <LinkCardItem
                        value={link.to}
                        type='link'
                        text='Your Link:'/>
                    <LinkCardItem
                        value={link.from}
                        type='link'
                        text='Get From:'/>
                    <LinkCardItem
                        value={link.clicks}
                        text='Clicks amount:'/>
                    <LinkCardItem
                        value={new Date(link.date).toLocaleDateString()}
                        text='Creation date:'/>
                </CardContent>
            </Card>
        </Grid>
    )
};
