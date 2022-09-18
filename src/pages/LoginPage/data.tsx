import { merge, baseConfig, baseData } from '../../components/suture-form/data';

const loginFormData: any = {
    username: merge(baseData, {
        id: 'username',
        label: '账号',
        autoFocus: true,
        require: true,
        sx: {
            width: '25ch',
        },
    }),
    password: merge(baseData, {
        id: 'password',
        label: '密码',
        type: 'password',
        require: true,
        state: {
            showPassword: false,
        },
        sx: {
            width: '25ch',
        },
    }),
};

const loginFormKeys = Object.keys(loginFormData);

const loginConfig = merge(baseConfig, {
    grid: {
        container: {
            direction: 'column',
            spacing: 1,
        },
        item: {
            md: 10,
            xs: 12,
        },
    },
});

export { loginFormData, loginFormKeys, loginConfig };
