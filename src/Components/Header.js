import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

function Header({loggedInApp, logOut, modalInApp2, changeModal2,
                    resetData}) {
    let [userSigned, setUserSigned] = useState("")

    let [newNameFromInput, setNewNameFromInput] = useState("")
    const newNameText = useRef();

    useEffect(() => {
        setUserSigned(loggedInApp)
    }, [loggedInApp])

    function logOutFun() {
        localStorage.removeItem("reactGameLoggedUser")
        logOut(userSigned)

    }
    function changeName() {
        let info = {
            secret: localStorage.getItem("reactGameLoggedUser"),
            name: newNameFromInput,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:8082/changeName`, options).then(res => res.json())
            .then(data => {
                resetData()
                changeModal2()
            })
    }


    return (
        <div className="toolbar">
            <div className="logoHolder">
                <img src="https://codeacademy.lt/wp-content/themes/codeacademy/dist/images/codeacademy-black.svg"
                     alt="codeLogo"/>
            </div>
            <div className="linkHolder">
                {modalInApp2 === true ?
                    <div className="nameModal">
                        <input ref={newNameText} onChange={() => setNewNameFromInput(newNameText.current.value)}
                               type="text" placeholder="Enter New User Name"/>
                        <div className="modalButtonHolder">
                            <button onClick={changeName}>Change User Name</button>
                            <button onClick={changeModal2}>Cancel</button>
                        </div>

                    </div>
                    : null}
                <a onClick={localStorage.getItem("reactGameLoggedUser") ? changeModal2:null}>Logged User: {userSigned}</a>
                {localStorage.getItem("reactGameLoggedUser") ? <Link to="/" onClick={logOutFun}>LogOut</Link> :
                    <Link to="/login">Log In / Register</Link>}
            </div>
            <div className="linkHolder">
                <Link to="/">Home</Link>
                {loggedInApp ? <Link to="/shop">Shop</Link> : null}
                {loggedInApp ? <Link to="/inventory">Inventory</Link> : null}
                {loggedInApp ? <Link to="/leaders">High Scores</Link> : null}
                {loggedInApp ? <Link to="/arena">Arena</Link> : null}

            </div>


        </div>
    );
}

export default Header;