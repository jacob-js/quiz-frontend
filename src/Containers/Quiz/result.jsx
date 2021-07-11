import { Button } from "antd";


export function QuizResult(props){
    const { setCurrent, result } = props;

    return(
        <div className="result">
            <div className="result-content">
                <div className="result-point">
                    <div className="result-value">{result.point}</div>
                    <div className="result-bar"></div>
                    <div className="result-max"> { result.max } </div>
                </div>
                <div className="retry-btn">
                    <Button onClick={() =>setCurrent("quiz")} type="primary">Récommencer</Button>
                </div>
            </div>
        </div>
    )
}