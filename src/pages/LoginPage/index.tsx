import React, { BaseSyntheticEvent, useEffect, useState, useReducer, StrictMode } from 'react';
import './index.scss';
import { Box, TextField, Grid, Paper, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import _ from 'lodash';

function LoginPage() {
    interface inputLabelInterface {
        shrink: boolean;
    }
    interface loginFormInterface {
        id: string;
        label: string;
        value: string;
        variant: 'filled' | 'outlined' | 'standard';
        type: string;
        autoFocus: boolean;
        size: 'medium' | 'small';
        inputLabelProps: inputLabelInterface;
        error: boolean;
        required: boolean;
        helperText: string;
        startAdornment: any;
        endAdornment: any;
        state: any;
        sx?: any;
    }

    const initialLoginForm: Array<loginFormInterface> = [
        {
            id: 'username',
            label: '账号',
            value: '',
            variant: 'outlined',
            type: 'text',
            autoFocus: true,
            size: 'small',
            inputLabelProps: {
                shrink: true,
            },
            error: false,
            required: false,
            helperText: ' ',
            startAdornment: null,
            endAdornment: null,
            state: {},
            sx: {
                width: '25ch',
            },
        },
        {
            id: 'password',
            label: '密码',
            value: '',
            variant: 'outlined',
            type: 'password',
            autoFocus: false,
            size: 'small',
            inputLabelProps: {
                shrink: true,
            },
            error: false,
            required: false,
            helperText: ' ',
            startAdornment: null,
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                        {<Visibility fontSize="small" />}
                    </IconButton>
                </InputAdornment>
            ),
            state: {
                showPassword: false,
            },
            sx: {
                width: '25ch',
            },
        },
    ];
    const [loginBtnDisabled, setLoginBtnDisabled] = useState<boolean>(true);
    const loginFormReducer = (state: Array<loginFormInterface>, action: any) => {
        let currItem = state.find((item) => item.id === action.id);
        let errorItem = state.find((item) => item.error);
        setLoginBtnDisabled(errorItem ? true : false);
        if (currItem) {
            Object.assign(currItem, action.data);
            return [...state];
        }
        return state;
    };

    const [loginForm, setLoginForm] = useReducer(loginFormReducer, initialLoginForm);
    const [loginBtnLoading, setLoginBtnLoading] = useState<boolean>(false);
    // const [loginBtnDisabled, setLoginBtnDisabled] = useState<boolean>(true);

    // 登录
    function login(): void {
        setLoginBtnLoading(true);
        let textField = loginForm.find((item) => !item.value);
        if (textField) {
            setLoginForm({
                id: textField.id,
                data: {
                    error: true,
                    helperText: `${textField.label}必填`,
                },
            });
        }
        setLoginBtnLoading(false);
    }

    // 输入
    function loginChange(e: BaseSyntheticEvent, id: string): void {
        let value = e.target.value;
        let textField = loginForm.find((item) => item.id === id);
        if (textField) {
            setLoginForm({
                id,
                data: {
                    value,
                    error: value ? false : true,
                    helperText: value ? ' ' : `${textField.label}必填`,
                },
            });
        }
    }

    // 输入节流
    const LoginChangeDebounce = _.debounce(loginChange, 200);

    function handleClickShowPassword(): void {
        let id = 'password';
        let textField = loginForm.find((item) => item.id === id);
        if (textField) {
            let showPassword = !textField.state.showPassword;
            setLoginForm({
                id: 'password',
                data: {
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    state: Object.assign(textField.state, { showPassword }),
                },
            });
        }
    }

    useEffect(() => {}, []);

    return (
        <StrictMode>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                classes={{ root: 'login-container' }}
            >
                <Grid item md={6} xs={10}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Paper elevation={24} classes={{ root: 'login-card' }}>
                            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                                {loginForm.map((item: loginFormInterface) => {
                                    return (
                                        <Grid item md={10} xs={12} key={item.id}>
                                            <TextField
                                                id={item.id}
                                                label={item.label}
                                                variant={item.variant}
                                                type={item.type}
                                                size={item.size}
                                                autoFocus={item.autoFocus}
                                                error={item.error}
                                                required={item.required}
                                                helperText={item.helperText}
                                                InputProps={{
                                                    endAdornment: item.endAdornment,
                                                    startAdornment: item.startAdornment,
                                                }}
                                                sx={item.sx || {}}
                                                onChange={(e) => LoginChangeDebounce(e, item.id)}
                                            />
                                        </Grid>
                                    );
                                })}
                                <Grid item md={10} xs={10} key="loginBtn">
                                    <LoadingButton
                                        variant="contained"
                                        startIcon={<Login />}
                                        size="small"
                                        loading={loginBtnLoading}
                                        loadingPosition="start"
                                        disabled={loginBtnDisabled}
                                        onClick={login}
                                    >
                                        登录
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </StrictMode>
    );
}

export default LoginPage;
