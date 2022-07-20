import React from 'react';
import  ReactDOM  from 'react-dom';
import '../index.css';
import { useState, useRef, useEffect } from 'react';



export default function Modal({ open, closeModal, setHi, setLo, generate }) {
    const loRef = useRef(1);
    const hiRef = useRef(1);
    const [color, setColor] = useState('btn-primary');
    const [msg, setMsg] = useState('');
    useEffect(() => {
        setMsg('')
        setColor('btn-primary')
    }, [open])
    if (!open) return null;

    function checkRange(e){
        e.preventDefault();
        let lo = Number(loRef.current.value);
        let hi = Number(hiRef.current.value);
        if (Number.isNaN(lo) || Number.isNaN(hi) || loRef.current.value == '' || hiRef.current.value == ''){
            setMsg(<><strong>Invalid Input: </strong>Please enter numeric digits only</>);
            setColor('btn-danger');
            setTimeout(() => setColor('btn-warning'), 150)
            setTimeout(() => setColor('btn-danger'), 350)    
            setTimeout(() => setColor('btn-primary'), 500)    

        }
        else if (Math.round(hi) <= Math.round(lo)){
            setMsg(<><strong>Invalid Input: </strong>Please make sure low is less than high</>);
            setColor('btn-danger');
            setTimeout(() => setColor('btn-warning'), 150)
            setTimeout(() => setColor('btn-danger'), 350)    
            setTimeout(() => setColor('btn-primary'), 500)   
        }
        else{
            setMsg(<>Generating random number in range <strong>{Math.round(lo)}</strong> - <strong>{Math.round(hi)}</strong></>)
            setColor('btn-success')
            setLo(Math.round(lo))
            setHi(Math.round(hi))
            generate()
            setTimeout(() => {; closeModal()}, 1000);
        }

    }

    return ReactDOM.createPortal(
        <>
            <div className='overlay_style' onClick={()=> closeModal}></div>
            <div className='modal_style'>
                <h3><label>Enter Number Generation Range:</label></h3>
                
                    <><strong>Low:</strong><input ref={loRef} className='form-control' defaultValue='1'></input></>
                    <><strong>High:</strong><input ref={hiRef} className='form-control' defaultValue='20'></input></>
                
                <label>{msg}</label>
                <button className={'generate_button btn ' + color} onClick={checkRange}>Generate</button>
            </div>
        </>,

        document.getElementById('portal')
    )
}
