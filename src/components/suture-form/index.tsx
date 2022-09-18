import React, {
    useState,
    useReducer,
    StrictMode,
    BaseSyntheticEvent,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from 'react';
import { TextField, Grid } from '@mui/material';
import './index.scss';
import { textFieldInterface } from './interface';
import { baseData, baseConfig } from './data';
import _ from 'lodash';

const SutureForm = forwardRef((props: { data: any; config: any }, ref: any) => {
    const { data = baseData, config = baseConfig } = props;

    const formConfig = useState<any>(config);

    const dataKeys = Object.keys(data);
    const formData: any = {};
    const formReducer = (state: textFieldInterface, action: object) => {
        let data = Object.assign({}, state, action);
        console.log(data, 'data');
        return data;
    };

    for (let key in data) {
        formData[key] = useReducer(formReducer, data[key]);
        let textField = formData[key][0];
        useEffect(() => {
            textField.onChange && textField.onChange(textField.value, key, formData);
        }, [textField.value]);
    }

    const formItemChange = (e: BaseSyntheticEvent, key: string) => {
        let value = e.target.value;
        let [textField, setTextField] = formData[key];
        let isRequired = (textField.require || textField.required) && !value;
        console.log(textField, 'ff');
        if (textField) {
            let data = {
                value,
                error: isRequired ? true : false,
                helperText: isRequired ? `${textField.label}必填` : ' ',
            };
            setTextField(data);
        }
        console.log(222);
    };

    const formItemChangeDebounce = _.debounce(formItemChange, 200);

    const getFormData = () => {
        return formData;
    };
    const getFormConfig = () => {
        return formConfig;
    };
    const getFormState = () => {
        for (let key in formData) {
            let textField = formData[key][0];
            if (((textField.require || textField.required) && !textField.value) || textField.error) {
                return 'invalid';
            }
        }
        return 'valid';
    };
    // 对父组件暴露可调用方法
    useImperativeHandle(ref, () => ({
        getFormData, // 获取表单数据
        getFormConfig, // 获取表单配置
        getFormState, // 获取是否可提交表单状态
    }));

    // useEffect(() => {
    //     console.log(111);
    // }, [formData]);

    return (
        <StrictMode>
            <Grid
                container
                direction={formConfig[0].grid.container.direction}
                justifyContent={formConfig[0].grid.container.justifyContent}
                alignItems={formConfig[0].grid.container.alignItems}
                spacing={formConfig[0].grid.container.spacing}
            >
                {dataKeys.map((key: string) => {
                    let textField = formData[key][0];
                    return (
                        <Grid item md={formConfig[0].grid.item.md} xs={formConfig[0].grid.item.xs} key={key}>
                            <TextField
                                id={textField.id || key}
                                label={textField.label || key}
                                variant={textField.variant || 'outlined'}
                                type={textField.type || 'text'}
                                size={textField.size || 'small'}
                                autoFocus={textField.autoFocus || false}
                                error={textField.error || false}
                                required={textField.required || false}
                                helperText={textField.helperText || ' '}
                                InputProps={{
                                    endAdornment: textField.endAdornment || null,
                                    startAdornment: textField.startAdornment || null,
                                }}
                                sx={textField.sx || {}}
                                onChange={(e: BaseSyntheticEvent) => {
                                    formItemChangeDebounce(e, key);
                                }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </StrictMode>
    );
});

export default SutureForm;
