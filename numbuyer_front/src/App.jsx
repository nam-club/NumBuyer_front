import React from 'react';
import Router from './Router';
import Socket from './Socket';

function App() {
  return (
    <main>
      <Socket>
        <Router />
      </Socket>
    </main>
  );
}

export default App;
