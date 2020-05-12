import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    IconButton
} from '@material-ui/core';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {useStyles} from "../styles/LinksListStyles";

export const LinksList = ({links}) => {
    const classes = useStyles();
    if (!links.length) {
        return (
            <Typography
                variant='h6'>
                You don't have any links...
                <SentimentDissatisfiedIcon color='secondary'/>
            </Typography>
        )
    }

    const tableHead = ['№', 'Original', 'Shortened', 'Open'].map((title, index) => {
        return (
            <TableCell
                key={title + index}
                className={classes.tableHeadText}
                align='center'>
                {title}
            </TableCell>
        )
    });

    return (
        <Box component={Table} m={1} maxWidth={1000}>
            <TableHead>
                <TableRow className={classes.tableHead}>
                    {tableHead}
                </TableRow>
            </TableHead>
            <TableBody>
                {links.map((link, index) => (
                    <TableRow key={link._id}>
                        <TableCell
                            align='center'
                            component='th'
                            scope='row'
                            className={classes.tableBodyTextNumberAndLink}>
                            {index + 1}
                        </TableCell>
                        <TableCell
                            className={classes.tableBodyText}
                            title={link.from}>
                            {link.from}
                        </TableCell>
                        <TableCell
                            title={link.to}
                            className={classes.tableBodyText}>
                            {link.to}
                        </TableCell>
                        <TableCell
                            align='center'
                            className={classes.tableBodyTextNumberAndLink}>
                            <NavLink to={`/detail/${link._id}`}>
                                <IconButton
                                    size='small'
                                    color='secondary'
                                    title='Go to'>
                                    <OpenInNewIcon/>
                                </IconButton>
                            </NavLink>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Box>
    )
}
