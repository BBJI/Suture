import React, { useReducer, StrictMode, BaseSyntheticEvent, useImperativeHandle, forwardRef } from 'react';
import { TextField, Grid } from '@mui/material';
import './index.scss';
import {textFieldInterface} from './interface';
import {baseData, baseConfig} from './data';
import _ from 'lodash';

const SutureForm = forwardRef((props: {data: any, config: any}, ref: any) => {
    const { data=baseData, config=baseConfig } = props;
    const dataKeys = Object.keys(data);
    const formData: any = {};
    const formReducer = (state: textFieldInterface, action: object) => {
        let data = Object.assign({}, state, action);
        return data;
    };

    const formItemChange = (e: BaseSyntheticEvent, key: string) => {
        let value = e.target.value;
        let [textField, setTextField] = formData[key];
        let isRequired = (textField.require || textField.required) && !value;
        if (textField) {
            let data = {
                value,
                error: isRequired ? true : false,
                helperText: isRequired ? `${textField.label}必填` : ' ',
            };
            setTextField(data);
        }
        data[key].onChange(e, key, formData)
    }

    const formItemChangeDebounce = _.debounce(formItemChange, 200);
    
    const getFormData = () => {
        return formData;
    }
    useImperativeHandle(ref, () => ({
        getFormData
    }))

    return (
        <StrictMode>
            <Grid
                container
                direction={config.grid.container.direction}
                justifyContent={config.grid.container.justifyContent}
                alignItems={config.grid.container.alignItems}
                spacing={config.grid.container.spacing}>
                {
                    dataKeys.map((key: string) => {
                        let [loginFormItem, setLoginFormItem] = useReducer(formReducer, data[key]);
                        formData[key] = [loginFormItem, setLoginFormItem];
                        return (
                            <Grid item md={10} xs={12} key={key}>
                                <TextField
                                    id={loginFormItem.id}
                                    label={loginFormItem.label}
                                    variant={loginFormItem.variant}
                                    type={loginFormItem.type}
                                    size={loginFormItem.size}
                                    autoFocus={loginFormItem.autoFocus}
                                    error={loginFormItem.error}
                                    required={loginFormItem.required}
                                    helperText={loginFormItem.helperText}
                                    InputProps={{
                                        endAdornment: loginFormItem.endAdornment,
                                        startAdornment: loginFormItem.startAdornment,
                                    }}
                                    sx={loginFormItem.sx || {}}
                                    onChange={(e: BaseSyntheticEvent) => {formItemChangeDebounce(e, key)}}
                                />
                            </Grid>                                            
                        )
                    })
                }
            </Grid>
        </StrictMode>
    )
})

export default SutureForm;