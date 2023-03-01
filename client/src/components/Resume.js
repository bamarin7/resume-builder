import React from 'react';
import ErrorPage from './ErrorPage';

const Resume = ({ result }) => {
  if (JSON.stringify(result) === '{}') {
    return <ErrorPage />;
  }

  const handlePrint = () => alert('Print Successful!');
  return (
    <>
      <button onClick={handlePrint}>Print it!</button>
      <main className='container'>
        <p>Hello!</p>
      </main>
    </>
  );
};