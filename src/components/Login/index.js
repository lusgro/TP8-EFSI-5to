import React, { useState } from 'react';
import './Login.css';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      let users = JSON.parse(localStorage.getItem('users')) || {};
      if (!users[username]) {
        users[username] = 0;
        localStorage.setItem('users', JSON.stringify(users));
      }
      onLogin(username);
    }
  };

  return (
    <div className='loginContainer'>
      <div className='loginCard'>
        <h2 className='loginTitle'>Inicia sesion para jugar</h2>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='loginInput'
        />
        <button onClick={handleLogin} className='loginButton'>
          Iniciar Juego
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;