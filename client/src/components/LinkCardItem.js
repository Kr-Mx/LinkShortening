import React from 'react';
import {Box, Grid, makeStyles, Typography, Link} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    sectionValue: {
        marginLeft: theme.spacing(1),
        width:'max-content',
        maxWidth:'250px',
        textOverflow:'ellipsis',
        overflow:'hidden',
        whiteSpace: 'nowrap',
    },
    cardWrapper: {
        height: '90vh'
    },
}))

const LinkCardItemValue = ({value, type})=>{
    const classes = useStyles();
    if(type === 'link'){
        return (
            <Link
                href={value}
                target={'_blank'}
                color='secondary'
                title={value}
                className={classes.sectionValue}>
                {value}
            </Link>
        )
    }
   return (
       <Typography
           variant='body1'
           color='textSecondary'
           className={classes.sectionValue}>
           {value}
       </Typography>
   )
}

export const LinkCardItem = ({value, type, text}) => {
   return (
       <Box
           component={Grid}
           container
           alignItems='center'
           p={1}>
           <Typography variant='body1'>
               {text}
           </Typography>
           <LinkCardItemValue
               value={value}
               type={type}/>
       </Box>
   )
};
