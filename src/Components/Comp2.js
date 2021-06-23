import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

function Comp2({setLoggedToApp, newUser, resetData}) {

    let [nameFromInput, setNameFromInput] = useState("")
    let [pass1FromInput, setPass1FromInput] = useState("")
    let [pass2FromInput, setPass2FromInput] = useState("")
    let [nameFromLoginInput, setNameFromLoginInput] = useState("")
    let [pass1FromLoginInput, setPassFromLoginInput] = useState("")
    let [messageRegister, setMessageRegister] = useState("")
    let [messageLogin, setMessageLogin] = useState("")

    const nameText = useRef();
    const pass1Text = useRef();
    const pass2Text = useRef();
    const loginNameText = useRef();
    const loginPassText = useRef();

    function setLoggedUserFun(name) {
        setLoggedToApp(name)
        newUser()
        resetData()
    }

    function registerFun() {
        let infoSetFromInputs = {
            name: nameFromInput,
            pass1: pass1FromInput,
            pass2: pass2FromInput
        }
        const options1 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoSetFromInputs)
        }
        fetch(`http://localhost:8082/createUser`, options1).then(res => res.json())
            .then(data => {
                setMessageRegister(data.message)
            })
    }

    function loginFun() {
        let infoSetFromInputs2 = {
            name: nameFromLoginInput,
            pass: pass1FromLoginInput
        }
        const options2 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoSetFromInputs2)
        }
        fetch(`http://localhost:8082/loginUser`, options2).then(res => res.json())
            .then(data => {
                setMessageLogin(data.message)
                if (data.message === "You Are Logged In") {
                    setLoggedUserFun(data.loggedUser)
                    localStorage.setItem("reactGameLoggedUser", data.secret.toString())
                }
            })
    }

    return (
        <div className="lupaBackground">
            <div className="spacer"> </div>
            <div className="content">
                <div className="registerHolder">
                    <h4>Register New User</h4>
                    <input ref={nameText} onChange={() => setNameFromInput(nameText.current.value)} type="text"
                           placeholder="Enter Username"/><br/>
                    <input ref={pass1Text} onChange={() => setPass1FromInput(pass1Text.current.value)} type="password"
                           placeholder="Enter Password"/><br/>
                    <input ref={pass2Text} onChange={() => setPass2FromInput(pass2Text.current.value)} type="password"
                           placeholder="Repeat Password"/><br/>
                    {/*<div className="reviewHolder">*/}
                    {/*    <h6>Review:</h6>*/}
                    {/*    <div>User Name: {nameFromInput}</div>*/}
                    {/*    <div>Password 1: {pass1FromInput}</div>*/}
                    {/*    <div>Password 2: {pass2FromInput}</div>*/}
                    {/*</div>*/}
                    <button onClick={registerFun}>Register</button>
                    <div className="error">{messageRegister}</div>
                </div>
                <div className="loginHolder">
                    <h4>Login</h4>
                    <input ref={loginNameText} onChange={() => setNameFromLoginInput(loginNameText.current.value)}
                           type="text"
                           placeholder="Enter Username"/><br/>
                    <input ref={loginPassText} onChange={() => setPassFromLoginInput(loginPassText.current.value)}
                           type="password"
                           placeholder="Enter Password"/><br/>
                    {/*<div className="reviewHolder">*/}
                    {/*    <h6>Review:</h6>*/}
                    {/*    <div>User Name: {nameFromLoginInput}</div>*/}
                    {/*    <div>Password: {pass1FromLoginInput}</div>*/}
                    {/*</div>*/}
                    <button onClick={loginFun}>Login</button>
                    <div className="error">{messageLogin}</div>
                    {messageLogin === "You Are Logged In" ?
                        <Link to="/"><h4 title="Click To Go To Home Page" className="must">
                            You Are Logged In
                        </h4></Link> : null}
                </div>
            </div>

        </div>

    );
}

export default Comp2;