export interface inputLabelInterface {
    shrink: boolean;
}

export interface textFieldInterface {
    id: string;
    label: string;
    value: string;
    variant: 'filled' | 'outlined' | 'standard';
    type: string;
    autoFocus: boolean;
    size: 'medium' | 'small';
    inputLabelProps: inputLabelInterface;
    error: boolean;
    required: boolean; // 必输，有星号显示
    require: boolean; // 必输，没星号显示
    helperText: string;
    startAdornment: any;
    endAdornment: any;
    state: any;
    sx?: any;
    onChange?: any;
}