import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Witamy w Task Manager</h1>
        <p className="text-lg">
          Witaj użytkownik!
          Oto program stworzony by ułatwić ci organizacje swojej pracy w danym projekcie.
          
        </p>
      </main>
    </div>
  );
};

export default Home;
