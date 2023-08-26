import React from 'react';
import './App.css';
import PhaserGame from '../src/Entorno_Juego/PhaserGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Phaser 3</h1>
      </header>
      <main>
        <PhaserGame />
      </main>
    </div>
  );
}

export default App;

