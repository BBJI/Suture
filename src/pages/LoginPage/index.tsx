import React, { BaseSyntheticEvent, useEffect, useState, useReducer, StrictMode, useRef } from 'react';
import './index.scss';
import { Box, TextField, Grid, Paper, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import _ from 'lodash';
import { textFieldInterface } from '../../components/suture-form/interface';
import { loginFormData, loginFormKeys, baseConfig } from './data';
import SutureForm from '../../components/suture-form';

function LoginPage() {
    const sutureFormRef: any = useRef();
    // 密码是否可见按钮元素
    const visibilityElement = (showPassword: boolean) => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
            </InputAdornment>
        )
    }

    // 数据源配置追加
    loginFormData.password.endAdornment = visibilityElement(false);
    for(let k in loginFormData) {
        let loginFormItem = loginFormData[k];
        loginFormItem.onChange = (e: BaseSyntheticEvent, key: string, formData: any) => {
            console.log(e, key, formData);
        };
    }

    const [loginBtnDisabled, setLoginBtnDisabled] = useState<boolean>(true);


    const [loginBtnLoading, setLoginBtnLoading] = useState<boolean>(false);

    // 登录
    function login(): void {
        // setLoginBtnLoading(true);
        // let invalidKey: (string | undefined) = loginFormKeys.find((key: string) => {
        //     let textField = loginForm[key][0];
        //     return !textField.value;
        // });
        // if(invalidKey){
        //     let [textField, setTextField] = loginForm[invalidKey];
        //     let data = {
        //         error: true,
        //         helperText: `${textField.label}必填`,
        //     };
        //     setTextField(data);
        // }
        // setLoginBtnLoading(false);
    }

    function handleClickShowPassword(): void {
        let formData = sutureFormRef.current.getFormData();
        let [textField, setTextField] = formData.password;
        if (textField) {
            let showPassword = !textField.state.showPassword;
            setTextField({
                type: showPassword ? 'text' : 'password',
                endAdornment: visibilityElement(showPassword),
                state: Object.assign(textField.state, { showPassword }),
            });
        }
    }

    useEffect(() => {

    }, []);

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
                            <SutureForm data={loginFormData} config={baseConfig} ref={sutureFormRef}/>
                            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
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
