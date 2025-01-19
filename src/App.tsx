import React from 'react';
import { Converter } from './components/Converter/Converter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4caf50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
      />
      <Converter />
    </div>
  );
}

export default App;
