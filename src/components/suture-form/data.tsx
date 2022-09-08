import { textFieldInterface } from "./interface";


const baseData: object = {
    id: 'id',
    label: 'label',
    value: '',
    variant: 'outlined',
    type: 'text',
    autoFocus: false,
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
}

const mergeBaseData = (data: object): any => {
    return Object.assign({}, baseData, data) as textFieldInterface
}

const getFormData = (formData: any):any => {
    return formData;
}

const baseConfig: object = {
    grid: {
        container: {
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
            spacing: 1
        },
        item: {
            md: 10,
            xs: 12
        }
    },
    func: {
        getFormData
    }
}

export { baseData, mergeBaseData, baseConfig };