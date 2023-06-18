import React from 'react';

import './PositionForm.style.scss'
import { InLineDiv } from '../util/frequentlyUsedStyledComponent';

const PositionForm = (props) => {

    const handleX = (event) => {
        props.position.x = event.target.value;
    }

    const handleY = (event) => {
        props.position.y = event.target.value;
    }

    return (
        <InLineDiv>
            <h4>x:</h4> <input onChange={handleX} type="text"/>
            <h4>y:</h4> <input onChange={handleY} type="text"/>
        </InLineDiv>
    );
};

export default PositionForm;