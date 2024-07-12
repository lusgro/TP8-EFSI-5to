import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {

  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images").then((response) => {
      const randomCountry = response.data.data[Math.floor(Math.random() * response.data.data.length)];
      setCountry(randomCountry);
    }
  )} , []);


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>
    </main>
  );
}
