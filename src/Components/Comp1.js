import React, {useEffect, useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";

function Comp1({loggedUser}) {
    let [owner, setOwner] = useState("")

    useEffect(() => {
        setOwner(loggedUser)
    }, []);

    useEffect(() => {
        setOwner(loggedUser)
    }, [loggedUser]);

    let history = useHistory ();

    function goToShop() {

        history.push ('./shop');
    }

    function goToInventory() {
        history.push ('./inventory');
    }
    function goToLeaders() {
        history.push ('./leaders');
    }
    function goToArena() {
        history.push ('./arena');
    }

    return (
        <div className="lupaBackground">
            <div className="spacer"> </div>
            <div className="content">
                <div className="lupaBackground">
                    <div className="linkBoxBlock">
                        {owner === "" ?
                            <Link to="/login"><h4 title="Click To Login" className="must" >
                                You Need To Login To Start Game
                            </h4></Link>
                             : null}
                        <div className="linkBoxHolder">
                            <div className="linkBox"
                                 onClick={localStorage.getItem("reactGameLoggedUser") ? goToShop : null}>Shop
                            </div>
                            <div className="linkBox"
                                 onClick={localStorage.getItem("reactGameLoggedUser") ? goToInventory : null}>Inventory
                            </div>
                        </div>
                        <div className="linkBoxHolder">
                            <div className="linkBox"
                                 onClick={localStorage.getItem("reactGameLoggedUser") ? goToLeaders : null}>High Scores
                            </div>
                            <div className="linkBox"
                                 onClick={localStorage.getItem("reactGameLoggedUser") ? goToArena : null}>Arena
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Comp1;