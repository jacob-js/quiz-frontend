import { useState } from "react";
import { Login } from "./Auth/login";
import { Register } from "./Auth/register";
import Quiz from "./Quiz";


function Containers(){
    const [ current, setCurrent ] = useState("quiz");

    return(
        <div className="container">
            {
                current === "login"? <Login setCurrent={setCurrent} />:
                current === "register"? <Register setCurrent={setCurrent} />:
                current === "quiz"? <Quiz setCurrent={setCurrent} />:null
            }
        </div>
    )
};

export default Containers;