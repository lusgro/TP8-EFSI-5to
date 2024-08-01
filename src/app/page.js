'use client';

import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Flag from "../components/Flag";
import GuessInput from "../components/GuessInput";
import GuessButton from "../components/GuessButton";
import Points from "../components/Points";
import Hint from "../components/Hint";
import Login from "../components/Login";

export default function Juego() {
  const PUNTOS_BASE = 10;
  const PUNTOS_PENALIZACION = 1;
  const TIEMPO_TIMER = 15;
  const MAX_PISTAS = 3;
  const PUNTOS_PENALIZACION_PISTA = 2;
  const [response, setResponse] = useState(null);
  const [country, setCountry] = useState(null);
  const [guess, setGuess] = useState([]);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(TIEMPO_TIMER);
  const [hintIndexs, setHintIndexs] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images").then((response) => {
      setResponse(response);
    });
  }, []);

  useEffect(() => {
    if (!response || !user) return;
    const randomCountry = response.data.data[Math.floor(Math.random() * response.data.data.length)];
    setCountry(randomCountry);
    setGuess(Array(randomCountry.name.length).fill(''));
    setTimer(15);
    setHintIndexs([]);
    setHintsUsed(0);
    let interval = setInterval(() => {
      setTimer(timer => {
        if (timer > 0) return timer - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [response, points, user]);

  const handleGuess = () => {
    const guessWithoutSpaces = guess.join('').replace(/\s/g, '').toLowerCase();
    const countryNameWithoutSpaces = country.name.replace(/\s/g, '').toLowerCase();
  
    if (guessWithoutSpaces === countryNameWithoutSpaces) {
      const newPoints = points + PUNTOS_BASE + timer - hintsUsed * PUNTOS_PENALIZACION_PISTA;
      setPoints(newPoints);
      updateUserPoints(newPoints);
      alert(`¡Adivinaste! Ganaste ${PUNTOS_BASE + timer - hintsUsed * PUNTOS_PENALIZACION_PISTA} puntos`);
    } else {
      const newPoints = points - PUNTOS_PENALIZACION - hintsUsed * PUNTOS_PENALIZACION_PISTA;
      setPoints(newPoints);
      updateUserPoints(newPoints);
      alert(`¡Fallaste! Perdiste ${Math.abs(PUNTOS_PENALIZACION + hintsUsed * PUNTOS_PENALIZACION_PISTA)} puntos`);
    }
  }

  const handleHint = () => {
    if (hintsUsed >= MAX_PISTAS) return;
    
    const availableIndexs = country.name.split('').reduce((accum, char, index) => {
      if (char !== ' ' && !hintIndexs.includes(index)) {
        accum.push(index);
      }
      return accum;
    }, []);

    if (availableIndexs.length === 0) return;
    const randomIndex = availableIndexs[Math.floor(Math.random() * availableIndexs.length)];
    const newGuess = [...guess];
    newGuess[randomIndex] = country.name[randomIndex].toUpperCase();
    setGuess(newGuess);
    setHintIndexs([...hintIndexs, randomIndex]);
    setHintsUsed(hintsUsed + 1);
  }

  const handleLogin = (username) => {
    setUser(username.toLowerCase());
    const users = JSON.parse(localStorage.getItem('users')) || {};
    setPoints(users[username] || 0);
  }

  const updateUserPoints = (newPoints) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[user] = newPoints;
    localStorage.setItem('users', JSON.stringify(users));
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2>Hola, {user}!</h2>
        <Points points={points} />
        {country && <Flag country={country} />}
        {country && (
          <GuessInput 
            guess={guess} 
            setGuess={setGuess} 
            countryName={country.name}
          />
        )}
        <div className='buttonContainer'>
          <GuessButton onClick={handleGuess} />
          {country && <Hint onHint={handleHint} hintsUsed={hintsUsed} maxHints={MAX_PISTAS} />}
        </div>
      </div>
    </main>
  );
}