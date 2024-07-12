import './Input.css';
import React, { useEffect, useRef } from 'react';

const Input = ({ guess, setGuess, countryLength }) => {
    const handleChange = (index, value) => {
        const newGuess = guess.split('');
        newGuess[index] = value;
        setGuess(newGuess.join(''));

        if (value && index < dashCount - 1) {
            inputRefs.current[index + 1].focus();
          }
    }

}