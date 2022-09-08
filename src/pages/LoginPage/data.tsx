import {mergeBaseData, baseConfig} from '../../components/suture-form/data';




const loginFormData:any = {
    username: mergeBaseData({
        id: 'username',
        label: '账号',
        autoFocus: true,
        require: true,
    }),
    password: mergeBaseData({
        id: 'password',
        label: '密码',
        type: 'password',
        require: true,
        state: {
            showPassword: false,
        },
    })
}

const loginFormKeys = Object.keys(loginFormData);

export { loginFormData, loginFormKeys, baseConfig };