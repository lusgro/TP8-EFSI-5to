'use client';

import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Flag from "../components/Flag";
import GuessInput from "../components/GuessInput";
import GuessButton from "../components/GuessButton";
import Points from "../components/Points";

export default function Home() {
  const PUNTOS_BASE = 10;
  const PUNTOS_PENALIZACION = 1;
  const [response, setResponse] = useState(null);
  const [country, setCountry] = useState(null);
  const [guess, setGuess] = useState([]);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(15);


  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images").then((response) => {
      setResponse(response);
    });
  }, []);

  useEffect(() => {
    if (!response) return;
    const randomCountry = response.data.data[Math.floor(Math.random() * response.data.data.length)];
    setCountry(randomCountry);
    setGuess(Array(randomCountry.name.length).fill(''));
    setTimer(15);
    let interval = setInterval(() => {
      setTimer(timer => {
        if (timer > 0) return timer - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [response, points]);



  const handleGuess = () => {
    const guessWithoutSpaces = guess.join('').replace(/\s/g, '').toLowerCase();
    const countryNameWithoutSpaces = country.name.replace(/\s/g, '').toLowerCase();
  
    if (guessWithoutSpaces === countryNameWithoutSpaces) {
      setPoints(points + PUNTOS_BASE + timer);
      alert(`¡Adivinaste! Ganaste ${PUNTOS_BASE + timer} puntos`);
    } else {
      setPoints(points - PUNTOS_PENALIZACION);
      alert('¡Fallaste! Perdiste 1 punto');
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Points points={points} />
        {country && <Flag country={country} />}
        {country && (
          <GuessInput 
            guess={guess} 
            setGuess={setGuess} 
            countryName={country.name}
          />
        )}
        <GuessButton onClick={handleGuess} />
      </div>
    </main>
  );
}