import React,{useState} from 'react'
import Card from '../../../Common/card/Card'
import Button from '../../../Common/Button/Button'
import TextInput from '../../../Common/TextInput/TextInput'
import styles from './Name.module.css'
import { useSelector, useDispatch} from 'react-redux'
import { setName } from '../../../../store/activateSlice'

const Name = ({nextHandler}) => {
    const {name} = useSelector(state => state.activate)
    const [fullName, setFullName] = useState(name);

     const dispatch = useDispatch();

    const clickHandler = ()=>{
        if(!fullName){
            return;
        }
        dispatch(setName(fullName));
        nextHandler();
    }
    return (
        <>
            <Card title="what's your full Name" icon='goggle-emoji'>
                  <TextInput value= {fullName} onChange={(e)=> setFullName(e.target.value)} />
                  <div>
                    <p className={styles.bottomParagraph}>
                      People use real names at codershouse :) 
                    </p>
                    <div className={styles.actionButtonWrap}>
                        <Button buttonHandler={clickHandler} text="next" />
                    </div>
                  </div>
               </Card>
        </>
    )
}

export default Name
