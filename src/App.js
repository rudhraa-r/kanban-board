
import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
