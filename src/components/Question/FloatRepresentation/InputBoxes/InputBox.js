import React, {useState} from 'react';

import './digitInput.css';

const InputBox = ({id, type, handleKeyDown2, handleChange, handleFocus, name, inputRef, inputProps}) => {
	const minDigit = 0, maxDigit = 1;

	const [digit, setDigit] = useState('0');

	const digitChange = (val) => {
		if (val < minDigit) val = maxDigit;
		else if (val > maxDigit) val = minDigit;
		let d = val.toString();
		setDigit(d);
		handleChange(id, d);
	}

	const onDigitIncrement = (operation) => {
		let num = Number.parseInt(digit) || 0;
		if (operation === '+') {
			num++;
		} else if (operation === '-') {
			num--;
		}
		digitChange(num);
	};

	const handleKeyDown = (e) => {
		const {key} = e;
		if (key >= '0' && key <= '1') {
			digitChange(Number.parseInt(key));
		} else if (key === 'ArrowUp') {
			onDigitIncrement('+');
		} else if (key === 'ArrowDown') {
			onDigitIncrement('-');
		}
	}

	return (
		<div {...inputProps} className={'digitInputField'}>
			{/*<span onClick={() => onDigitIncrement('+')} className={'plusButton'}>+</span>*/}
			<span onClick={() => onDigitIncrement('+')} className={'plusButton'}>x</span>
			<input className={'digitInput'}
				   type={type}
				   onKeyDown={handleKeyDown}
				   onChange={handleChange}
				   onFocus={handleFocus}
				   maxLength='1'
				   name={name}
				   ref={inputRef}
				   value={digit}
			/>

			{/*<span onClick={() => onDigitIncrement('-')} className={'minusButton'}>-</span>*/}
		</div>
	)

}


export default InputBox;
