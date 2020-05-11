import React, {useState, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

import {
    Button, Grid, TextField, InputAdornment, Divider, Card,
    CardContent, CardActions, Typography, Snackbar, IconButton
} from "@material-ui/core";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MuiAlert from "@material-ui/lab/Alert";
import {useStyles} from "../styles/AuthPageStyles";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form});
        } catch (e) {
            console.error(e);
            return null
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        } catch (e) {
            console.error(e);
            return null
        }
    }

    return (
        <Grid
            container
            justify={"center"}
            alignItems={"center"}
            className={classes.cardWrapper}>
            <Card>
                <Typography
                    variant={"h6"}
                    align={"center"}>
                    Welcome
                </Typography>
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        direction={"column"}
                        justify={"space-evenly"}
                        className={classes.cardContent}>
                        <Typography
                            variant={"body1"}
                            align={"center"}>
                            Please enter your user credentials:
                        </Typography>
                        <TextField
                            name={"email"}
                            label="Email"
                            color="secondary"
                            type={"text"}
                            value={form.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={changeHandler}
                        />
                        <TextField
                            name={"password"}
                            label="Password"
                            color="secondary"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            size="small"
                                            onClick={() => {setShowPassword(!showPassword)}}>
                                            {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            onChange={changeHandler}
                        />
                    </Grid>
                </CardContent>
                <Divider/>
                <CardActions className={classes.cardActions}>
                    <Button
                        color="secondary"
                        variant="contained"
                        disabled={loading}
                        onClick={registerHandler}>
                        Registration
                    </Button>
                    <Button
                        color="secondary"
                        variant="outlined"
                        disabled={loading}
                        onClick={loginHandler}>
                        Login
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                autoHideDuration={2000}
                open={!!error}
                onClose={clearError}>
                <MuiAlert
                    variant="filled"
                    severity="error"
                    elevation={6}
                    onClose={clearError}>
                    {error}
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
};
