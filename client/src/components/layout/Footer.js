import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      	IPS &copy; {new Date().getFullYear()} Postavte5please
        <Link className="nav-link" to="/news">
        	News
        </Link>
        <Link className="nav-link" to="/addarticle">
        	Add article
        </Link>
    </footer>
  );
};