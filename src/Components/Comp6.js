import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

function Comp6({
                   goldInApp, healthInApp, imageInApp,
                   swordInApp, bowInApp, wandInApp,
                   shieldInApp, chainMailInApp, fullArmorInApp,
                   redPotionInApp, greenPotionInApp, bluePotionInApp,
                   resetData, modalInApp, changeModal,
                   currentWeaponInApp, currentArmorInApp,
                   currentEnemyInApp, currentEnemyHealthIApp,
                   selectWeapon, selectArmor, attack, setTrigger, triggerInApp,
                   newGame
               }) {

    const weapons = [
        {
            name: "sword",
            damage: 8,
            price: 40,
            sellPrice: 5,
            image: "https://ae01.alicdn.com/kf/HTB1VYu9LFXXXXbWXFXXq6xXFXXXW/S1701-MEDIUM-GAME-WOW-LICH-KING-ARTHAS-MENETHIL-FROSTMOURNE-SWORD-W-3D-WALL-MOUNT-43.jpg_Q90.jpg_.webp",
            type: "weapon",
            special: "has 20% chance to block enemy attack",

        },
        {
            name: "bow",
            damage: 6,
            price: 300,
            sellPrice: 80,
            image: "https://www.outfit4events.com/runtime/cache/images/redesignProductFull/10304.png",
            type: "weapon",
            special: "has 30% chance to do double damage",
        },
        {
            name: "wand",
            damage: 5,
            price: 1000,
            sellPrice: 400,
            image: "https://www.medievalcollectibles.com/wp-content/uploads/2021/02/CC13054.jpg",
            type: "weapon",
            special: "has 40% chance to heal hero on enemy attack by 10hit points",
        },
        {
            name: "none",
            damage: 0,
            price: 0,
            sellPrice: 0,
            image: "https://files.hansgrohe.com/webspecial-2015/img/content/page/select-button.png",
            type: "weapon",
            special: "none",
        }
    ]
    const armors = [
        {
            name: "shield",
            defence: 3,
            price: 50,
            sellPrice: 10,
            image: "https://images-na.ssl-images-amazon.com/images/I/81S-q%2BeWoiL._AC_UL1500_.jpg",
            type: "armor"
        },
        {
            name: "chain mail",
            defence: 7,
            price: 250,
            sellPrice: 100,
            image: "https://images-na.ssl-images-amazon.com/images/I/61tvR9XWs9L._AC_UX679_.jpg",
            type: "armor"
        },
        {
            name: "full armor",
            defence: 8,
            price: 800,
            sellPrice: 300,
            image: "https://img1.exportersindia.com/product_images/bc-full/2019/1/4550593/medieval-wearable-knight-full-armor-suit-1546677906-4623178.jpeg",
            type: "armor"
        },

        {
            name: "none",
            defence: 0,
            price: 0,
            sellPrice: 0,
            image: "https://files.hansgrohe.com/webspecial-2015/img/content/page/select-button.png",
            type: "armor",

        }
    ]
    const potions = [
        {
            name: "red potion",
            heals: 20,
            price: 10,
            sellPrice: 5,
            image: "https://ashesofcreation.wiki/images/7/7a/Potion.png",
            type: "potions",
        },
        {
            name: "green potion",
            heals: 35,
            price: 30,
            sellPrice: 10,
            image: "https://www.clipartkey.com/mpngs/m/141-1411420_potion-of-deaths-postponement-dnd-potion-art.png",
            type: "potions",
        },
        {
            name: "blue potion",
            heals: 50,
            price: 60,
            sellPrice: 20,
            image: "https://i.pinimg.com/originals/a6/3d/57/a63d57a92465271c6f6fbf6899cc7b54.jpg",
            type: "potions",
        }


    ]
    const enemies = [
        {
            name: "Goblin",
            image: "https://thumbs.dreamstime.com/b/fantasy-goblin-mace-forest-dark-scene-fantasy-goblin-holding-mace-standing-tree-forest-200679214.jpg",
            damage: 12
        },
        {
            name: "Troll",
            image: "https://i.pinimg.com/originals/64/78/45/6478453cc808d0a204e0bc37657adaff.png",
            damage: 8
        },
        {
            name: "Witch",
            image: "https://static.wikia.nocookie.net/monster/images/d/d3/Beautiful-witch-1-.jpg",
            damage: 15
        }

    ]


    let [imageFromInput, setImageFromInput] = useState("")
    const imageText = useRef();

    function changeIMG() {
        let info = {
            secret: localStorage.getItem("reactGameLoggedUser"),
            image: imageFromInput,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:8082/changeImg`, options).then(res => res.json())
            .then(data => {
                resetData()
                changeModal()
            })
    }

    function drinkPotion(p) {
        let info = {
            secret: localStorage.getItem("reactGameLoggedUser"),
            name: potions[p].name,
            heals: potions[p].heals,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:8082/drinkPotion`, options).then(res => res.json())
            .then(data => {
                resetData()
            })
    }

    function DamageToMonsterFun() {
        setTrigger(true)
        const timeoutID = window.setTimeout(() => {
            let random1to10 = Math.ceil(Math.random() * 10)
            let bowFactor = 1
            if (random1to10 === 1 && currentWeaponInApp === 1 ||
                random1to10 === 2 && currentWeaponInApp === 1 ||
                random1to10 === 3 && currentWeaponInApp === 1) {
                bowFactor = 2
            }
            let damageToMonster = bowFactor * Math.ceil(Math.random() * weapons[currentWeaponInApp].damage)
            attack(damageToMonster)
            setTrigger(false)
        }, 3000);

        return () => window.clearTimeout(timeoutID);


    }

    function attackFun() {
        let random1to5 = Math.ceil(Math.random() * 5)
        let random1to10 = Math.ceil(Math.random() * 10)
        let wandFactor = 0
        let tempDamageToHero = Math.ceil(Math.random() *enemies[currentEnemyInApp].damage) - Math.ceil(Math.random() * armors[currentArmorInApp].defence);
        if (random1to5 === 3 && currentWeaponInApp === 0) {
            tempDamageToHero = 0
        }
        if (random1to10 === 1 && currentWeaponInApp === 2 ||
            random1to10 === 4 && currentWeaponInApp === 2 ||
            random1to10 === 3 && currentWeaponInApp === 2 ||
            random1to10 === 4 && currentWeaponInApp === 2) {
            wandFactor = 10
        }

        let info = {
            secret: localStorage.getItem("reactGameLoggedUser"),
            damage: tempDamageToHero - wandFactor,
            bonus: 10,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:8082/attack`, options).then(res => res.json())
            .then(data => {
                resetData()
            })
        DamageToMonsterFun()

    }

    function addHealth() {
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
        fetch(`http://localhost:8082/addHealth`, options).then(res => res.json())
            .then(data => {
                resetData()
            })
    }

    function newGameFun() {
        newGame()
    }

    function refuseArmorFun(){
        selectArmor(3)
    }

    return (
        <div className="lupaBackground">
            <div className="spacer">  </div>

            <div> STATISTICS</div>
            <div className="statHolder">
                <div>
                    <div className="bold" title={goldInApp}>Gold: {goldInApp}</div>
                    <div className="bold" title={healthInApp}>Health: {healthInApp}</div>
                </div>
                <div>
                    {swordInApp ? <div className="smallCircle" title={weapons[0].name}>
                        <img src={weapons[0].image} alt="smallCircle"/>
                    </div> : null}
                    {bowInApp ? <div className="smallCircle" title={weapons[1].name}>
                        <img src={weapons[1].image} alt="smallCircle"/>
                    </div> : null}
                    {wandInApp ? <div className="smallCircle" title={weapons[2].name}>
                        <img src={weapons[2].image} alt="smallCircle"/>
                    </div> : null}
                    {shieldInApp ? <div className="smallCircle" title={armors[0].name}>
                        <img src={armors[0].image} alt="smallCircle"/>
                    </div> : null}
                    {chainMailInApp ? <div className="smallCircle" title={armors[1].name}>
                        <img src={armors[1].image} alt="smallCircle"/>
                    </div> : null}
                    {fullArmorInApp ? <div className="smallCircle" title={armors[2].name}>
                        <img src={armors[2].image} alt="smallCircle"/>
                    </div> : null}
                    {redPotionInApp ? <div className="smallCircle" title={potions[0].name}>
                        <img src={potions[0].image} alt="smallCircle"/>
                    </div> : null}
                    {greenPotionInApp ? <div className="smallCircle" title={potions[1].name}>
                        <img src={potions[1].image} alt="smallCircle"/>
                    </div> : null}
                    {bluePotionInApp ? <div className="smallCircle" title={potions[2].name}>
                        <img src={potions[2].image} alt="smallCircle"/>
                    </div> : null}
                </div>


            </div>
            <div>ARENA</div>
            {/*<button className="addGold" onClick={addHealth}>Add Health</button>*/}

            <div className="gameHolder">
                <div className="heroHolder">
                    {modalInApp === true ?
                        <div className="imageModal">
                            <input ref={imageText} onChange={() => setImageFromInput(imageText.current.value)}
                                   type="text" placeholder="Enter New Image Address"/>
                            <div className="modalButtonHolder">
                                <button onClick={changeIMG}>Change Image</button>
                                <button onClick={changeModal}>Cancel</button>
                            </div>

                        </div>
                        : null}
                    <div className="imgHolderHolder">
                        <div className="heroImgHolder" title="Click To Upload New Image" onClick={changeModal}>
                            <img src={imageInApp} alt="heroIMG"/>

                        </div>
                    </div>
                    <div className="heroHealthBarHolder" title={healthInApp}>
                        <div className="heroHealthBar" style={{width: `${healthInApp}%`}}>{healthInApp}%</div>
                    </div>
                    <div className="weaponBlock">
                        <div>AVAILABLE WEAPONS:</div>
                        <div className="weaponHolder">
                            {swordInApp ? <div className="smallCircle2" title={weapons[0].special}
                                               onClick={() => selectWeapon(0)}>
                                <img src={weapons[0].image} alt="smallCircle2"/>
                            </div> : null}
                            {bowInApp ? <div className="smallCircle2" title={weapons[1].special}
                                             onClick={() => selectWeapon(1)}>
                                <img src={weapons[1].image} alt="smallCircle2"/>
                            </div> : null}
                            {wandInApp ? <div className="smallCircle2" title={weapons[2].special}
                                              onClick={() => selectWeapon(2)}>
                                <img src={weapons[2].image} alt="smallCircle2"/>
                            </div> : null}
                            {!swordInApp && !bowInApp && !wandInApp?
                                <div className="shopButton">
                                    <Link to="/shop">Shop Now!</Link>
                                </div>:null}
                        </div>
                    </div>
                    <div className="weaponBlock">
                        <div>AVAILABLE ARMORS:</div>
                        <div className="weaponHolder">
                            {shieldInApp ? <div className="smallCircle2" title={`Defence: ${armors[0].defence}`}
                                                onClick={() => selectArmor(0)}>
                                <img src={armors[0].image} alt="smallCircle2"/>
                            </div> : null}
                            {chainMailInApp ? <div className="smallCircle2" title={`Defence: ${armors[1].defence}`}
                                                   onClick={() => selectArmor(1)}>
                                <img src={armors[1].image} alt="smallCircle2"/>
                            </div> : null}
                            {fullArmorInApp ? <div className="smallCircle2" title={`Defence: ${armors[2].defence}`}
                                                   onClick={() => selectArmor(2)}>
                                <img src={armors[2].image} alt="smallCircle2"/>
                            </div> : null}
                            {!shieldInApp && !chainMailInApp && !fullArmorInApp?
                            <div className="shopButton">
                                <Link to="/shop">Shop Now!</Link>
                            </div>:null}
                        </div>
                    </div>
                    <div className="weaponBlock">
                        <div>AVAILABLE POTIONS:</div>
                        <div className="weaponHolder">
                            {redPotionInApp ? <div className="smallCircle2" title={`Heals: ${potions[0].heals}`}
                                                   onClick={() => drinkPotion(0)}>
                                <img src={potions[0].image} alt="smallCircle2"/>
                            </div> : null}
                            {greenPotionInApp ? <div className="smallCircle2" title={`Heals: ${potions[1].heals}`}
                                                     onClick={() => drinkPotion(1)}>
                                <img src={potions[1].image} alt="smallCircle2"/>
                            </div> : null}
                            {bluePotionInApp ? <div className="smallCircle2" title={`Heals: ${potions[2].heals}`}
                                                    onClick={() => drinkPotion(2)}>
                                <img src={potions[2].image} alt="smallCircle2"/>
                            </div> : null}
                            {!greenPotionInApp && !redPotionInApp && !bluePotionInApp?
                                <div className="shopButton">
                                    <Link to="/shop">Shop Now!</Link>
                                </div>:null}
                        </div>
                    </div>
                </div>
                <div className="centerHolder">
                    {healthInApp <= 0 ?
                        <div
                            className="lost" title="You Lost, Click To Start New Game" onClick={newGameFun}>
                            You Lost, Click To Start New Game
                        </div>
                        : null
                    }
                    {currentWeaponInApp === 3 || goldInApp <= 0 || triggerInApp || healthInApp <= 0 ?
                        <div
                            className="attackButton rotate" title="You Need A Weapon To Attack" style={{opacity: 0.25}}>
                            <img
                                src="https://thumbs.dreamstime.com/b/go-sign-white-background-144872030.jpg"
                                alt="go"/>
                        </div>
                        :
                        <div className="attackButton" onClick={attackFun} title="Attack">
                            <img
                                src="https://thumbs.dreamstime.com/b/go-sign-white-background-144872030.jpg"
                                alt="go"/>
                        </div>
                    }
                    <div className="selectedWeaponHolder" title="Select Weapon">
                        <img src={weapons[currentWeaponInApp].image} alt="select weapon"/>
                    </div>
                    <div className={currentArmorInApp!==3?"selectedArmorHolder transform":"selectedArmorHolder" } title={currentArmorInApp===3?"Select Armor":"Refuse Armor" }
                         onClick={currentArmorInApp!==3?refuseArmorFun:null} >
                        <img src={armors[currentArmorInApp].image} alt="select armor"/>
                    </div>
                </div>
                <div className="enemyHolder">
                    <div className="imgHolderHolder" title={enemies[currentEnemyInApp].name}>
                        <div className="enemyImgHolder"><img src={enemies[currentEnemyInApp].image} alt="enemyIMG"/>
                        </div>
                    </div>
                    <div className="enemyHealthBarHolder" title={currentEnemyHealthIApp}>
                        <div className="enemyHealthBar"
                             style={{width: `${currentEnemyHealthIApp}%`}}>{currentEnemyHealthIApp}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comp6;