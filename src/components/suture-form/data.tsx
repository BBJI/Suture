import { textFieldInterface } from './interface';
import _ from 'lodash';

const baseData: textFieldInterface = {
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
};

const baseConfig: object = {
    grid: {
        container: {
            direction: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            spacing: 2,
        },
        item: {
            md: 4,
            xs: 4,
        },
    },
};

const merge = (...args: Array<object>) => {
    return _.merge({}, ...args);
};

export { baseData, baseConfig, merge };
