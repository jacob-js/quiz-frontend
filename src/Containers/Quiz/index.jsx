import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";

function Quiz(props){
    const [ numbers, setNumbers ] = useState([
        {
            num: 1,
            result: null
        },
        {
            num: 2,
            result: null
        },
        {
            num: 3,
            result: null
        },
        {
            num: 4,
            result: null
        },
        {
            num: 5,
            result: null
        },
        {
            num: 6,
            result: null
        },
        {
            num: 7,
            result: null
        },
        {
            num: 8,
            result: null
        },
        {
            num: 9,
            result: null
        },
        {
            num: 10,
            result: null
        }
    ])
    const { setCurrent, setResult } = props;
    const [ active, setActive ] = useState(1);
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ question, setQuestion ] = useState({ Options: [] });
    const [ viewed, setViewed ] = useState([]);
    const [ timer, setTimer ] = useState(120);

    const fetchData = async() =>{
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/questions/all`, {
                headers: {
                    "auth-token": localStorage.getItem("auth-token")
                }
            });
            if(res.status === 200){
                setData(res.data.data);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            if(error.response.status === 401){
                alert("Vous devez vous connecter");
                setCurrent("login");
            }
        }
    };

    useEffect(() =>{
        fetchData();
    }, [setCurrent]);

    useEffect(() =>{
        const quest = data.filter(data => data.id === active);
        if(quest[0]){
            setQuestion(quest[0]);
        }
    }, [active, data]);

    const next = async() =>{
        let arrayView = viewed;
        await arrayView.push(active);
        setViewed(arrayView);
        const random = Math.floor(Math.random()* data.length + 1);
        const matchRandom = viewed.filter(item => item === random);
        if(matchRandom[0] < data.length){
            setActive(matchRandom[0] + 1)
        }else{
            setActive(random);
        }
    };

    const onSelect = async(option) =>{
        let array = [];
        await numbers.forEach(num =>{
            if(num.num === active){
                const newNum = { num: num.num, result: option.isTrue || false };
                array.push(newNum);
                console.log(newNum);
            }else{ array.push(num) }
        });
        setNumbers(array);
        next();
    };

    //timer
    useEffect(() =>{
        const time = timer > 0 ?
        setInterval(() => {
            if(timer > 0){
                setTimer(timer-1)
            }
        }, 1000):finish()
        return () => clearInterval(time)
    }, [timer]);

    const finish = async() =>{
        const successArray = numbers.filter(num => num.result === true);
        const result = { point: successArray.length, max: data.length };
        setResult(result);
        setCurrent("result");
        console.log(successArray);
    };

    return(
        <div className="quiz">
            <div className="quiz-head">
                <div className="quiz-title">Questions</div>
                <div className="quiz-numbers">
                    {
                        numbers.map(number =>(
                            <div className={`quiz-number ${active === number.num && "active"} ${ number.result === true ? "success": number.result === false ?"fail":null }`}> { number.num } </div>
                        ))
                    }
                </div>
            </div>
            <div className="quiz-body">
                <div className="question"> {question.question} </div>
                <div className="options">
                    {
                        question.Options.map(option =>(
                            <div onClick={() =>onSelect(option)} className="option"> {option.value} </div>
                        ))
                    }
                </div>
            </div>
            <div className="timer"> {timer} </div>
            <div className="btn-finish">
                <Button onClick={finish} type="primary">Terminer</Button>
            </div>
        </div>
    )
};

export default Quiz;