import React, {useEffect, useState} from 'react';

function Comp5({
                   goldInApp, healthInApp,
                   swordInApp, bowInApp, wandInApp,
                   shieldInApp, chainMailInApp, fullArmorInApp,
                   redPotionInApp, greenPotionInApp, bluePotionInApp,
                   resetData, loggedInApp
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

    let [leaders, setLeaders] = useState(0)

    function getLeaders() {
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
        fetch(`http://localhost:8082/getLeaders`, options).then(res => res.json())
            .then(data => {
                resetData()
                let tempLeaders = data.data.leadersData.sort((a, b) => (a.gold > b.gold) ? -1 : 1)
                setLeaders(tempLeaders)
            })
    }

    useEffect(() => {
        getLeaders()
    }, [])


    return (
        <div className="lupaBackground">
            <div className="spacer"> </div>
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
            <div>LEADERS</div>
            <div>
                {!!leaders ?
                    leaders.map((x) =>
                        <div className="userCard" key={x.name}>
                            <div className={loggedInApp === x.name ? "bold" : null}>User Name: {x.name}</div>
                            <div>Gold: {x.gold}</div>
                        </div>
                    )
                    : null
                }
            </div>
        </div>
    );
}

export default Comp5;
