import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav() {
  return (
    <header>
        <div>
          <SearchBar/>
        </div>
    </header>
  )
}
