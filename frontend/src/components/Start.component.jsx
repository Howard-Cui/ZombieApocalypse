import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
const StartBtn = styled.button`
    margin-top: 100px;
    width: 60px;
    height: 30px;
    border-radius: 3px;
`;

const Start = () => {

    const navigate = useNavigate();

    const handleClickStart = () => {
        navigate('/input');
    };

    return (
        <div>
            <StartBtn onClick={handleClickStart}>
                Start
            </StartBtn>
        </div>
    );
};

export default Start;

