import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import API from '../utils/API';

const App = props => {
  const [fruit, setFruit] = useState('Banana');
  //Due to SSR we cannot access the window property so we are going to store it in state
  useEffect(() => {
    console.log(window.location);
  }, {});

  return (
    <div>
      {console.log(props)}
      <Head>
        <title>Albion Tools</title>
      </Head>
      <button onClick={() => setFruit('Banana')}>Banana</button>
      <button onClick={() => setFruit('Orange')}>Orange</button>
      <p>{fruit}</p>
    </div>
  );
};

App.getInitialProps = async context => {
  return API.getMe(context);
};

export default App;
