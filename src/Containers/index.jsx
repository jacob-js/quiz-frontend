import { useState } from "react";
import { Login } from "./Auth/login";
import { Register } from "./Auth/register";
import Quiz from "./Quiz";
import { QuizResult } from "./Quiz/result";


function Containers(){
    const [ current, setCurrent ] = useState("quiz");
    const [ result, setResult ] = useState({});

    return(
        <div className="container">
            {
                current === "login"? <Login setCurrent={setCurrent} />:
                current === "register"? <Register setCurrent={setCurrent} />:
                current === "quiz"? <Quiz setResult={setResult} setCurrent={setCurrent} />:
                current === "result"? <QuizResult result={result} setCurrent={setCurrent} />:null
            }
        </div>
    )
};

export default Containers;