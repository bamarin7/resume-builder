import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='app'>
      <h3>
        You haven't provided your details. Please go back to the{" "}
        <Link to={'/'}>homepage</Link>.
      </h3>
    </div>
  );
};

export default ErrorPage;
