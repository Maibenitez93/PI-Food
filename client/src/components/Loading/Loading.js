import React from 'react';
import gif from '../../shared/images/Spinner-3.gif';
import './Loading.css';

export default function Loading() {
  return (
    <div className='container-loading'>
      <div className='loading'>
        <h2>Loading</h2>
        <img src={gif} alt="loading" />
      </div>
    </div>
  );
}
