import React from 'react';
import Router from './Router';
import Socket from './Socket';

function App() {
  console.log(process.env.REACT_APP_SOCKET_URL);
  return (
    <main>
      <Socket>
        <Router />
      </Socket>
    </main>
  );
}

export default App;
