import './GuessInput.css';
import React, { useEffect, useRef } from 'react';

const GuessInput = ({ guess, setGuess, countryName }) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        const newGuess = [...guess];
        newGuess[index] = value.toUpperCase();
        setGuess(newGuess);

        if (value && index < countryName.length - 1) {
            const nextNonSpaceIndex = findNextInputIndex(index);
            if (nextNonSpaceIndex !== -1) {
                inputRefs.current[nextNonSpaceIndex].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !guess[index] && index > 0) {
            const prevNonSpaceIndex = findPrevInputIndex(index);
            if (prevNonSpaceIndex !== -1) {
                inputRefs.current[prevNonSpaceIndex].focus();
            }
        }
    };

    const findNextInputIndex = (currentIndex) => {
        for (let i = currentIndex + 1; i < countryName.length; i++) {
            if (countryName[i] !== ' ') return i;
        }
        return -1;
    };

    const findPrevInputIndex = (currentIndex) => {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (countryName[i] !== ' ') return i;
        }
        return -1;
    };

    return (
        <div className="inputContainer">
            {countryName.split('').map((char, index) => (
                char === ' ' ? (
                    <span key={index} className="espacio"></span>
                ) : (
                    <input
                        key={index}
                        ref={(element) => (inputRefs.current[index] = element)}
                        type='text'
                        maxLength={1}
                        value={guess[index] || ''}
                        onChange={(element) => handleChange(index, element.target.value)}
                        onKeyDown={(element) => handleKeyDown(index, element)}
                        className={`input ${guess[index] ? 'filled' : ''}`}
                    />
                )
            ))}
        </div>
    );
}

export default GuessInput;