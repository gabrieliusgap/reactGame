import React, {useEffect, useState} from 'react';

function Comp3({
                   goldInApp, healthInApp,
                   swordInApp, bowInApp, wandInApp,
                   shieldInApp, chainMailInApp, fullArmorInApp,
                   redPotionInApp, greenPotionInApp, bluePotionInApp,
                   resetData
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

    let [weaponsMessage, setWeaponsMessage] = useState("empty")
    let [armorsMessage, setArmorsMessage] = useState("empty")
    let [potionsMessage, setPotionsMessage] = useState("empty")

    function buyWeapon(a) {
        if (goldInApp >= weapons[a].price) {
            let info = {
                secret: localStorage.getItem("reactGameLoggedUser"),
                name: weapons[a].name,
                price: weapons[a].price,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }
            fetch(`http://localhost:8082/buyItem`, options).then(res => res.json())
                .then(data => {
                    setWeaponsMessage(data.message)
                    resetData()
                })
        }
    }

    function buyArmor(a) {
        if (goldInApp >= armors[a].price) {
            let info = {
                secret: localStorage.getItem("reactGameLoggedUser"),
                name: armors[a].name,
                price: armors[a].price,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }
            fetch(`http://localhost:8082/buyItem`, options).then(res => res.json())
                .then(data => {
                    setArmorsMessage(data.message)
                    resetData()
                })
        }
    }

    function buyPotion(a) {
        if (goldInApp >= potions[a].price) {
            let info = {
                secret: localStorage.getItem("reactGameLoggedUser"),
                name: potions[a].name,
                price: potions[a].price,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }
            fetch(`http://localhost:8082/buyItem`, options).then(res => res.json())
                .then(data => {
                    resetData()
                    setPotionsMessage(data.message)
                })
        }
    }

    function addGold() {
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
        fetch(`http://localhost:8082/addGold`, options).then(res => res.json())
            .then(data => {
                resetData()
            })
    }

    return (
        <div className="lupaBackground">
            <div className="spacer"></div>
            <div className="mt-50"> STATISTICS</div>
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
            <div className="row">
                <div> SHOP</div>
                {/*<button className="addGold" onClick={addGold}>Add Gold 100</button>*/}
            </div>
            <div className="productHolder">
                WEAPONS:
                <div className="cardHolder">
                    {weaponsMessage !== "empty" ? <h4 title="Click To Close Message" className="must"
                                                      onClick={() => setWeaponsMessage("empty")}>{weaponsMessage}</h4> : null}
                    <div className="card">
                        <h4>{weapons[0].name}</h4>
                        <div className="cardImgHolder">
                            <img src={weapons[0].image} alt="product"/>
                        </div>
                        <div>Damage: {weapons[0].damage}</div>
                        <p>Special: {weapons[0].special}</p>
                        <p>Price: {weapons[0].price}</p>
                        <div>
                            {
                                goldInApp >= weapons[0].price ?
                                    <button onClick={() => buyWeapon(0)}>
                                        Buy For: {weapons[0].price}
                                    </button>
                                    : <button style={{color: "red"}}
                                              onClick={() => setWeaponsMessage("Not Enough Gold")}>Not Enough
                                        Gold</button>
                            }
                        </div>


                    </div>
                    <div className="card">
                        <h4>{weapons[1].name}</h4>
                        <div className="cardImgHolder">
                            <img src={weapons[1].image} alt="product"/>
                        </div>
                        <div>Damage: {weapons[1].damage}</div>
                        <p>Special: {weapons[1].special}</p>
                        <p>Price: {weapons[1].price}</p>
                        <div>
                            {goldInApp >= weapons[1].price ?
                                <button onClick={() => buyWeapon(1)}>
                                    Buy For: {weapons[1].price}
                                </button>
                                :
                                <button style={{color: "red"}} onClick={() => setWeaponsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>
                            }


                        </div>


                    </div>
                    <div className="card">
                        <h4>{weapons[2].name}</h4>
                        <div className="cardImgHolder">
                            <img src={weapons[2].image} alt="product"/>
                        </div>
                        <div>Damage: {weapons[2].damage}</div>
                        <p>Special: {weapons[2].special}</p>
                        <p>Price: {weapons[2].price}</p>
                        <div>
                            {goldInApp >= weapons[2].price ?
                                <button onClick={() => buyWeapon(2)}>
                                    Buy For: {weapons[2].price}
                                </button>
                                :
                                <button style={{color: "red"}} onClick={() => setWeaponsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>
                            }


                        </div>


                    </div>
                </div>
            </div>
            <div className="productHolder">
                ARMORS:
                <div className="cardHolder">
                    {armorsMessage !== "empty" ? <h4 title="Click To Close Message" className="must"
                                                     onClick={() => setArmorsMessage("empty")}>{armorsMessage}</h4> : null}
                    <div className="card">
                        <h4>{armors[0].name}</h4>
                        <div className="cardImgHolder">
                            <img src={armors[0].image} alt="product"/>
                        </div>
                        <div>Defence: {armors[0].defence}</div>
                        <p>Price: {armors[0].price}</p>
                        <div>{
                            goldInApp >= armors[0].price ?
                                <button onClick={() => buyArmor(0)}>Buy For: {armors[0].price}</button>

                                : <button style={{color: "red"}} onClick={() => setArmorsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>

                        }
                        </div>


                    </div>
                    <div className="card">
                        <h4>{armors[1].name}</h4>
                        <div className="cardImgHolder">
                            <img src={armors[1].image} alt="product"/>
                        </div>
                        <div>Defence: {armors[1].defence}</div>
                        <p>Price: {armors[1].price}</p>
                        <div>{
                            goldInApp >= armors[1].price ?
                                <button onClick={() => buyArmor(1)}>Buy For: {armors[1].price}</button>
                                : <button style={{color: "red"}} onClick={() => setArmorsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>

                        }
                        </div>


                    </div>
                    <div className="card">
                        <h4>{armors[2].name}</h4>
                        <div className="cardImgHolder">
                            <img src={armors[2].image} alt="product"/>
                        </div>
                        <div>Defence: {armors[2].defence}</div>
                        <p>Price: {armors[2].price}</p>
                        <div>{
                            goldInApp >= armors[2].price ?
                                <button onClick={() => buyArmor(2)}>Buy For: {armors[2].price}</button>
                                : <button style={{color: "red"}} onClick={() => setArmorsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>


                        }
                        </div>


                    </div>
                </div>
            </div>
            <div className="productHolder">
                POTIONS:
                <div className="cardHolder">
                    {potionsMessage !== "empty" ? <h4 title="Click To Close Message" className="must"
                                                      onClick={() => setPotionsMessage("empty")}>{potionsMessage}</h4> : null}
                    <div className="card">
                        <h4>{potions[0].name}</h4>
                        <div className="cardImgHolder">
                            <img src={potions[0].image} alt="product"/>
                        </div>
                        <div>Heals: {potions[0].heals}</div>
                        <p>Price: {potions[0].price}</p>
                        <div>{
                            goldInApp >= potions[0].price ?
                                <button onClick={() => buyPotion(0)}>Buy For: {potions[0].price}</button>
                                :
                                <button style={{color: "red"}} onClick={() => setPotionsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>
                        }
                        </div>
                    </div>
                    <div className="card">
                        <h4>{potions[1].name}</h4>
                        <div className="cardImgHolder">
                            <img src={potions[1].image} alt="product"/>
                        </div>
                        <div>Heals: {potions[1].heals}</div>
                        <p>Price: {potions[1].price}</p>
                        <div>{
                            goldInApp >= potions[1].price ?
                                <button onClick={() => buyPotion(1)}>Buy For: {potions[1].price}</button>
                                :
                                <button style={{color: "red"}} onClick={() => setPotionsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>
                        }
                        </div>
                    </div>
                    <div className="card">
                        <h4>{potions[2].name}</h4>
                        <div className="cardImgHolder">
                            <img src={potions[2].image} alt="product"/>
                        </div>
                        <div>Heals: {potions[2].heals}</div>
                        <p>Price: {potions[2].price}</p>
                        <div>{
                            goldInApp >= potions[2].price ?
                                <button onClick={() => buyPotion(2)}>Buy For: {potions[2].price}</button>
                                :
                                <button style={{color: "red"}} onClick={() => setPotionsMessage("Not Enough Gold")}>Not
                                    Enough Gold</button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comp3;