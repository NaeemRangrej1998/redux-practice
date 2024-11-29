import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Suspense, useState} from "react";
import Layout from "./app/Layout";
import Login from "./component/Login/Login";

function App() {
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();
    // const [amount, setAmount] = useState('');
    const {token, role} = useSelector(state => state.auth)
    return (
        // <div>
        //     <div className="container">
        //         <button
        //             aria-label="Increment value"
        //             onClick={() => dispatch(increment())}
        //         >
        //             Increment
        //         </button>
        //         <span>Count : {count}</span>
        //
        //         <button
        //             aria-label="Decrement value"
        //             onClick={() => dispatch(decrement())}
        //         >
        //             Decrement
        //         </button>
        //         <br/>
        //         <br/>
        //         <input
        //             type='Number'
        //             value={amount}
        //             placeholder='Enter Amount'
        //             onChange={(e) => setAmount(e.target.value)}
        //         />
        //         <br/>
        //         <br/>
        //         <button
        //             aria-label="Increment value"
        //             onClick={() => dispatch(incrementByAmount(amount))}
        //         >
        //             Increment By Amount
        //         </button>
        //     </div>
        // </div>
        <>
            {
                token ? (<Suspense fallback={<div className="loading">Loading...</div>}>
                    <Layout/>
                </Suspense>) : (<Login/>)
            }
        </>


    )
}

export default App;
