import React from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
//import { RadioButtonGroup } from 'material-ui/RadioButton'
//radioButton to be implemented

export const renderTextField = ({
                                    input,
                                    label,
                                    meta: {touched, error},
                                    ...custom
                                }) =>
    <TextField
        required
        margin="normal"
        {...input}
        {...custom}
    />

export const renderSearchField = ({
                                    input,
                                    label,
                                    meta: {touched, error},
                                    ...custom
                                }) =>
    <TextField
        {...input}
        {...custom}
    />

export const renderCheckbox = ({input, label}) =>
    <Checkbox
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
    />

