import React from 'react';
import './Paginate.css'

function Paginate({recipesPerPage, allRecipes, paginate}) {


  const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }
  
  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers?.map(number => {
                return (
                    <div key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>
                         <button className='page-btn'>
                            {number}
                         </button>
                        </a>
                    </div>
                )
            })}
        </ul>
    </nav>
  )
}

export default Paginate;