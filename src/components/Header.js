// import libraries
import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
    // return jsx
    return (
        <Link to="/">
            <h1 className='ui center aligned container'>To Do List</h1>
        </Link>
    );
};

export default Header;