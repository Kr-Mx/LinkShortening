import makeStyles from "@material-ui/core/styles/makeStyles";
import red from '@material-ui/core/colors/red';

export const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        height: "100vh",
        backgroundColor:red["100"]
    },
    cardContent: {
        height: "180px",
        padding:"0 20px"
    },
    cardActions: {
        justifyContent: "center"
    },
}));
