import logo from './logo.svg';
import './index.css';
import Modal from './Modal/Modal';
import { useState, useRef, useEffect } from 'react';


function App() {

    const guessRef = useRef();
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('black');
    const [modalState, setModalState] = useState(true);
    let loRange = 1
    let hiRange = 20;
    const [loState, setLoState] = useState(loRange);
    const [hiState, setHiState] = useState(hiRange);    
    const [ans, setAns] = useState(new Set());
    const [num, setNum] = useState(() => {
       return Math.floor(Math.random() * loRange) + hiRange;
    });
    useEffect(() => {
        guessRef.current.value = ''
        setMsg('');
        setColor('black')
    }, [modalState]);
    function generate_num(){
        let val = Math.floor(Math.random()*(hiRange-loRange+1)) + loRange;
        setNum(val)
    }
    
    function process_guess(e) {
        e.preventDefault();
        let val = Math.round(Number(guessRef.current.value));
        if (Number.isNaN(val) || guessRef.current.value == '') {
            setColor('red');
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Invalid Input:</strong> Please enter a number</>);

        }
        else if (val < loState) {
            setColor('red');
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Invalid Input:</strong> Please enter a number greater than <strong>{loState}</strong></>);

        }
        else if (val > hiState) {
            setColor('red');
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Invalid Input:</strong> Please enter a number less than <strong>{hiState}</strong></>);
        }
        else if (ans.has(val)){
            setColor('red');
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Duplicate Guess:</strong> You have already guessed this number before</>);
        }
        else if (val < num) {
            setColor('red');
            setAns((prev) => {
                prev.add(val);
                return prev
            })
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Incorrect Guess:</strong> Try a higher number</>);

        }
        else if (val > num) {
            setColor('red');
            setAns((prev) => {
                prev.add(val);
                return prev
            })
            setTimeout(() => setColor('gold'), 150);
            setTimeout(() => setColor('red'), 350);
            setMsg(<><strong>Incorrect Guess:</strong> Try a smaller number</>);
        }
        else{
            setColor('green');    
            if (ans.size){
                let guess_history = [...ans, val].join(', ')
                setMsg(<>Correctly guessed in <strong>{ans.size + 1}</strong> attempts!<br/>You guessed these numbers: <strong>{guess_history}</strong></>)
                
            }   
            else{
                setMsg(<strong>Correctly guessed on the first attempt!!</strong>)
            }   
        }

    }

    function regenerate(e){
        e.preventDefault();
        setAns(new Set());
        setModalState(true);
    }

    function setHi(val){
        hiRange = val
        setHiState(val)
    }
    function setLo(val){
        loRange= val;
        setLoState(val)
    }

    return (
        <div className="container centerpiece">
            <div className="center">
                <h1>Higher Lower</h1>
                <Modal open={modalState} closeModal={() => setModalState(!modalState)} generate={generate_num} setHi={setHi} setLo={setLo}></Modal>
                <p>Guess a number between <strong>[{loState} {'<->'} {hiState}]</strong></p>
                <div className="form-group">
                    <label><strong>Your guess:</strong></label>
                    <input ref={guessRef} type="text" className='form-control' style={{ borderWidth: '.2em', borderColor: color }} />
                    <p style={{margin: '1.25em'}}>{msg}</p>
                    <button type='button' className="vmarg btn btn-success" onClick={(e) => regenerate(e)}>Regenerate</button>
                    <button type='button' className="vmarg btn btn-primary" onClick={(e) => process_guess(e)}>Guess</button>
                    <button type='button' className="vmarg btn btn-info" onClick={() => window.location.href = 'https://github.com/rblis/HigherLower'}>View Code</button>
                </div>        
                
            </div>
        </div>
    );
}

export default App;
