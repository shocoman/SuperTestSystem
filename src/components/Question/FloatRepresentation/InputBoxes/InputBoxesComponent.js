import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputBox from './InputBox';

class InputBoxesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {characterArray: Array(props.amount).fill('0')}

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.inputElements = {}
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.inputElements['input0'].select()
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.amount !== nextProps.amount ||
            this.props.inputRegExp !== nextProps.inputRegExp;
    }

    renderItems() {
        let items = [];

        for (let i = 0; i < this.props.amount; i++) {
            items.push(
                <InputBox
                    id={i}
                    type={this.props.password ? 'password' : 'text'}
                    key={i}
                    handleKeyDown={this.handleKeyDown}
                    handleFocus={this.handleFocus}
                    handleChange={this.handleChange}
                    name={'input' + i}
                    inputProps={this.props.inputProps && this.props.inputProps[i]}
                    inputRef={el => {
                        if (!el) return;
                        this.inputElements[el.name] = el
                    }}
                />
            )
        }

        return items;
    }

    render() {
        return (<div style={{display: 'flex'}}>{this.renderItems()}</div>);
    }

    handleChange(id, digit) {
        this.setState(prevState => {
            let newChars = prevState.characterArray.map((char, i) => {
                    if (i === id) return digit;
                    return char || '0';
                }
            )
            return {characterArray: newChars};
        }, () => this.props.handleOutputString(this.state.characterArray.join('')));
    }

    handleKeyDown({target, key}) {
        // console.log('Key down', key);

        if (key === 'Backspace') {
            if (target.value === '' && target.previousElementSibling !== null) {
                target.previousElementSibling.value = ''
                this.focusPrevChar(target)
            } else {
                target.value = ''
            }
            this.setModuleOutput(target)
        } else if (key === 'ArrowLeft') {
            this.focusPrevChar(target);
        } else if (key === 'ArrowRight' || key === ' ') {
            this.focusNextChar(target);
        }
    }

    handleFocus({target}) {
        const el = target;
        // In most browsers .select() does not work without the added timeout.
        setTimeout(function () {
            el.select()
        }, 0)
    }

    focusPrevChar(target) {
        if (target.previousElementSibling !== null) {
            target.previousElementSibling.focus()
        }
    }

    focusNextChar(target) {
        if (target.nextElementSibling !== null) {
            target.nextElementSibling.focus()
        }
    }

    setModuleOutput() {
        this.setState(prevState => {
            let updatedCharacters = prevState.characterArray.map(
                (character, number) => {
                    if (this.inputElements['input' + number].value === '')
                        return this.inputElements['input' + number].placeholder;
                    return this.inputElements['input' + number].value
                }
            );
            return {characterArray: updatedCharacters};
        }, () => this.props.handleOutputString(this.state.characterArray.join('')))
    }
}

InputBoxesComponent.defaultProps = {
    amount: 5,
    autoFocus: false,
    inputRegExp: /^[0-1]$/,
    password: false
}
InputBoxesComponent.propTypes = {
    amount: PropTypes.number,
    autoFocus: PropTypes.bool,
    inputRegExp: PropTypes.instanceOf(RegExp),
    password: PropTypes.bool,
    handleOutputString: PropTypes.func.isRequired
}

export default InputBoxesComponent;
