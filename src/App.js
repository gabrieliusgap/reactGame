import './App.css';
import Comp1 from "./Components/Comp1";
import Comp2 from "./Components/Comp2";
import Comp3 from "./Components/Comp3";
import Comp4 from "./Components/Comp4";
import Comp5 from "./Components/Comp5";
import Comp6 from "./Components/Comp6";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom"

import React, {useEffect, useRef, useState} from "react";

function App() {
    let [userSigned, setUserSigned] = useState("")
    let [image, setImage] = useState("")
    let [gold, setGold] = useState(0)
    let [health, setHealth] = useState(0)
    let [sword, setSword] = useState(0)
    let [bow, setBow] = useState(0)
    let [wand, setWand] = useState(0)
    let [shield, setShield] = useState(0)
    let [chainMail, setChainMail] = useState(0)
    let [fullArmor, setFullArmor] = useState(0)
    let [redPotion, setRedPotion] = useState(0)
    let [greenPotion, setGreenPotion] = useState(0)
    let [bluePotion, setBluePotion] = useState(0)
    let [imageModal, setImageModal] = useState(false)
    let [nameModal, setNameModal] = useState(false)
    let [currentWeapon, setCurrentWeapon] = useState(3)
    let [currentArmor, setCurrentArmor] = useState(3)
    let [currentEnemy, setCurrentEnemy] = useState(0)
    let [currentEnemyHealth, setCurrentEnemyHealth] = useState(100)
    let [trigger, setTrigger] = useState(false)


    useEffect(() => {
        if (!!localStorage.getItem("reactGameLoggedUser")) {
            console.log("autocheck")
            let info = {
                secret: localStorage.getItem("reactGameLoggedUser")
            }

            const options1 = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }

            fetch(`http://localhost:8082/checkUser`, options1).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setUserSigned(data.loggedUser)


                })


        } else {
            console.log("no autocheck")
        }
    }, [])

    function newGame(){
        setCurrentEnemy(0)
        setCurrentEnemyHealth(100)
        setCurrentArmor(3)
        setCurrentWeapon(3)
        setTrigger(false)

        let info = {
            secret: localStorage.getItem("reactGameLoggedUser"),
        }
        const options = {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(info)
        }
        fetch(`http://localhost:8082/newGame`, options).then(res => res.json())
            .then(data => {
                resetFun()
            })


    }
    function newUser(){
        setCurrentEnemy(0)
        setCurrentEnemyHealth(100)
        setCurrentArmor(3)
        setCurrentWeapon(3)
        setTrigger(false)
    }
    function changeModal(){
        setImageModal(!imageModal)
    }
    function changeModal2(){
        setNameModal(!nameModal)
    }
    function changTrigger(a){
        setTrigger(a)
    }
    function setLoggedToAppFun(a) {
        setUserSigned(a)
    }
    function logoutFun(a) {

        setUserSigned("")
        // history.push ('./home');
    }
    useEffect(()=> {
        resetFun()
    },[])
    function resetFun(){
        if(!!localStorage.getItem("reactGameLoggedUser")){
            let info = {
                secret: localStorage.getItem("reactGameLoggedUser"),
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }
            fetch(`http://localhost:8082/getUserData`, options).then(res => res.json())
                .then(data => {
                    let tempUser = data.data.dataByUser
                    setUserSigned(tempUser.name)
                    setGold(tempUser.gold)
                    setHealth(tempUser.health)
                    setImage(tempUser.image)
                    setSword(tempUser.sword)
                    setBow(tempUser.bow)
                    setWand(tempUser.wand)
                    setShield(tempUser.shield)
                    setChainMail(tempUser.chainMail)
                    setFullArmor(tempUser.fullArmor)
                    setRedPotion(tempUser.redPotion)
                    setGreenPotion(tempUser.greenPotion)
                    setBluePotion(tempUser.bluePotion)
                })
        }
    }
    function selectWeapon(w){
        setCurrentWeapon(w)
    }
    function selectArmor(a){
        setCurrentArmor(a)
    }
    function attack(a){
        if(currentEnemyHealth-a>0){
            setCurrentEnemyHealth(currentEnemyHealth-a)
        } else {
            setCurrentEnemy(Math.floor(Math.random()*3))
            setCurrentEnemyHealth(100)
        }
    }

    return (
        <Router>
            <div className="mainHolder">
                <Header loggedInApp={userSigned} logOut={(a) => logoutFun(a)}
                        modalInApp2={nameModal} changeModal2={changeModal2}
                        resetData={resetFun}/>
                <Switch>
                    <Route exact path="/">
                        <Comp1 loggedUser={userSigned}/>
                    </Route>
                    <Route path="/home">
                        <Comp1 loggedUser={userSigned}/>
                    </Route>
                    <Route path="/login">
                        <Comp2 setLoggedToApp={setLoggedToAppFun} newUser={newUser} resetData={resetFun}/>
                    </Route>
                    <Route path="/shop">
                        <Comp3 goldInApp={gold} healthInApp={health}
                               swordInApp={sword} bowInApp={bow} wandInApp={wand}
                               shieldInApp={shield} chainMailInApp={chainMail} fullArmorInApp={fullArmor}
                               redPotionInApp={redPotion} greenPotionInApp={greenPotion} bluePotionInApp={bluePotion}
                               resetData={resetFun}/>
                    </Route>
                    <Route path="/inventory">
                        <Comp4 goldInApp={gold} healthInApp={health}
                               swordInApp={sword} bowInApp={bow} wandInApp={wand}
                               shieldInApp={shield} chainMailInApp={chainMail} fullArmorInApp={fullArmor}
                               redPotionInApp={redPotion} greenPotionInApp={greenPotion} bluePotionInApp={bluePotion}
                               resetData={resetFun} currentWeaponInApp={currentWeapon} currentArmorInApp={currentArmor}
                               selectWeapon={selectWeapon} selectArmor={selectArmor}
                        />
                    </Route>
                    <Route path="/leaders">
                        <Comp5 goldInApp={gold} healthInApp={health}
                               swordInApp={sword} bowInApp={bow} wandInApp={wand}
                               shieldInApp={shield} chainMailInApp={chainMail} fullArmorInApp={fullArmor}
                               redPotionInApp={redPotion} greenPotionInApp={greenPotion} bluePotionInApp={bluePotion}
                               resetData={resetFun} loggedInApp={userSigned}
                        />
                    </Route>
                    <Route path="/arena">
                        <Comp6 goldInApp={gold} healthInApp={health} imageInApp={image}
                               swordInApp={sword} bowInApp={bow} wandInApp={wand}
                               shieldInApp={shield} chainMailInApp={chainMail} fullArmorInApp={fullArmor}
                               redPotionInApp={redPotion} greenPotionInApp={greenPotion} bluePotionInApp={bluePotion}
                               resetData={resetFun} modalInApp={imageModal} changeModal={changeModal}
                               currentWeaponInApp={currentWeapon} currentArmorInApp={currentArmor}
                               currentEnemyInApp={currentEnemy} currentEnemyHealthIApp={currentEnemyHealth}
                               selectWeapon={selectWeapon} selectArmor={selectArmor} attack={attack}
                               setTrigger={changTrigger} triggerInApp={trigger} newGame={newGame}
                        />
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

