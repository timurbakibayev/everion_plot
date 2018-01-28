import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';

function renderInput(inputProps) {
    const {classes, home, value, ref, ...other} = inputProps;

    return (
        <TextField
            autoFocus={home}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}


function renderSuggestion(suggestion, {query, isHighlighted}) {
    if (suggestion.img_url)
        return (
            <MenuItem selected={isHighlighted} component="div">
                <div style={{fontSize: this.props.fontSize}}>
                    <img alt="" src={suggestion.img_url} style={{width: "1em", maxHeight: "2em", marginRight: "2em"}}/>
                    {suggestion.caption}
                </div>
            </MenuItem>
        );
    return (
        <MenuItem selected={isHighlighted} component="div">
            <div style={{fontSize: this.props.fontSize}}>
                {suggestion.caption}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}


const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: "2em",
        margin: 'auto',
        width: "100%",
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 6,
    },
    suggestion: {
        display: 'block',
        zIndex: 6,
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: '100%',
    },
});

class IntegrationAutosuggest extends React.Component {
    state = {
        value: this.props.value,
        suggestions: [],
    };

    getSuggestionValue(suggestion) {
        console.log("getSuggestionValue props",this.props);
        this.props.selectionHandler(suggestion);
        return suggestion.caption
    }

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: this.props.options,
        });
    };

    handleChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });

        this.props.changeHandler({value: newValue});
    };


    getSuggestions(value) {
        if (value === undefined)
            return [];
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue?inputValue.length:0;
        let count = 0;

        if (!this.props.options)
            return [];
        if (this.props.options.length <= 7)
            return this.props.options;
        return inputLength === 0
            ? this.props.options.filter(suggestion => {
                const keep =
                    count < 10;
                if (keep) {
                    count += 1;
                }
                return keep;
            })
            :
            this.props.options.filter(suggestion => {
                const keep =
                    count < 10 && suggestion.caption.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

                if (keep) {
                    count += 1;
                }

                return keep;
            });

    }

    render() {
        const {classes} = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                style = {{fontSize: this.props.fontSize}}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                shouldRenderSuggestions={(value)=>true}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={renderSuggestion.bind(this)}
                inputProps={{
                    style: {fontSize: this.props.fontSize},
                    name: this.props.name,
                    classes,
                    placeholder: this.props.placeholder,
                    value: this.state.value?this.state.value:"",
                    onChange: this.handleChange,
                }}
            />
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
