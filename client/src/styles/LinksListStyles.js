import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tableHead: {
        backgroundColor: 'black',
    },
    tableHeadText: {
        color: 'white',
        fontWeight: '600',
    },
    tableBodyText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        maxWidth: '10px'
    },
    tableBodyTextNumberAndLink: {
        width: '10px'
    }
}))
