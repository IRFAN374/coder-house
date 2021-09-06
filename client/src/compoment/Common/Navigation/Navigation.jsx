import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'
import { logout } from '../../../api';
import { useDispatch , useSelector} from 'react-redux';
import { setAuth } from '../../../store/authSlice'

const Navigation = () => {
    const dispatch = useDispatch();
    const { isAuth,user}= useSelector(state=> state.auth)
   const logoutUserHandler= async ()=>{
          try {
             const {data} = await logout();
             dispatch(setAuth(data));
          } catch (error) {
             console.log(error)
          }
   }
   return (
       <nav className= { `${styles.navbar} container` }>
          <Link to='/' className={`${styles.header}`}>
            <img src="/images/logo.png" alt="logo" />
            <span className={`${styles.headerText}`}>CoderHouse</span>
          </Link>
         { isAuth && <div className={styles.navRight}>
            <h3>{user.name}</h3>
            <Link to="/">
               <img className={styles.avatar} src={user.avatar} width="40" height="40" alt="avatar" />
            </Link>
            <button className={styles.logoutButton} onClick={logoutUserHandler}>
               <img src="/images/logout.png" alt="logout" />
            </button>
              
          </div>}
          
       </nav>
    )
}

export default Navigation
