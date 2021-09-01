import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'

const Navigation = () => {
    return (
       <nav className= { `${styles.navbar} container` }>
          <Link to='/' className={`${styles.header}`}>
            <img src="/images/logo.png" alt="logo" />
            <span className={`${styles.headerText}`}>CoderHouse</span>
          </Link>
       </nav>
    )
}

export default Navigation
