import React,{useState,useEffect} from 'react'
import Card from '../../../Common/card/Card';
import Button from '../../../Common/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Avatar.module.css'
import { setAvatar } from '../../../../store/activateSlice'
import { setAuth } from '../../../../store/authSlice'
import { activate } from '../../../../api/index'
import Loader from '../../../Common/Loader/Loader';


const Avatar = ({nextHandler}) => {
    const {name, avatar} = useSelector((state)=> state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('/images/monkey-avatar.png');
    const [unMounted, setUnMounted] = useState(false);
    const[loading, setLoading] = useState(false);


    const captureImage = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        };
    }
    const clickHandler= async()=>{
        //console.log('I am called')
        if(!name || !avatar) return;
        setLoading(true);
        try {
           
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                if(!unMounted){
                    dispatch(setAuth(data));
                }
            }
           // console.log(data);
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false)
        }
        nextHandler();
    }
   
    
    useEffect(()=>{
        return()=>{
            setUnMounted(true);
        }
    },[]);
    if(loading) return <Loader message="Activation in Progress..." />
    
    return (
        <>
           <Card title={`Okay, ${name}`} icon='monkey-emoji'>
                <p className={styles.subHeading}>How’s this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button buttonHandler={clickHandler} text="next" />
                </div>
            </Card>
        </>

    )
}

export default Avatar
