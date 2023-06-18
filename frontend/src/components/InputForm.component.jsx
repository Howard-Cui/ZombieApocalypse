import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import { setDisplayState } from './DisplaySlice';
import { useDispatch } from 'react-redux';

import PositionForm from './PositionForm.component';
import './InputForm.style.scss'
import { InLineDiv } from '../util/frequentlyUsedStyledComponent';

const FormFrame = styled.div`
  text-align: center;
  border-radius: 15px;
  border: 3px solid
`;

// sub component use in multiple area
const InputPosition = (props) => {
  const [creatureNum, setCreatureNum] = useState(1);

  const addCreature = () => {
    props.position.push({id: creatureNum + 1, x: null, y: null});
    setCreatureNum(creatureNum + 1);
    
    // console.log(props.position)
  }

  const reduceCreature = () => {
    if (creatureNum > 1) {
      setCreatureNum(creatureNum - 1);
      props.position.pop();
      // console.log(props.position)
    }
  }

  // for generate the array for rendering input form

  return (
    <div>
      <InLineDiv>
        <h3>Initial Position of {props.type} (x and y need less than {props.dimension})</h3>
      </InLineDiv>
      {
        props.type === 'Creatures' &&
        (
          <div>
            Numbers of creaturees :  {creatureNum} 
            <button onClick={addCreature}>+</button>
            <button onClick={reduceCreature}>-</button>
          </div>

        )
      }
      {/* recursively render the position input form */}
      {
        props.position.map((currValue) => {
          return (
            <PositionForm
            position={currValue}
            key={currValue.id}/>
          )
        })
      }

    </div>
  )
}


// main input form
export default function InputForm() {
  const [dimension, setDimension] = useState(4);
  const [movement, setMovement] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [zombiePosition] = useState([{id:1, x: null, y: null}]);
  const [creaturePosition] = useState([{id:1, x: null, y: null}]);

  const handleDimensionChange = (event) => {
    setDimension(event.target.value);
  }

  const clickLeft = () => {
    setMovement(movement + "L");
  }

  const clickRight = () => {
    setMovement(movement + "R");
  }

  const clickUp = () => {
    setMovement(movement + "U");
  }

  const clickDown = () => {
    setMovement(movement + "D");
  }

  const clickPop = () => {
    setMovement(movement.substring(0, movement.length - 1))
  }

  const clickSubmit = async () => {
    let flag = true;

    // console.log(zombiePosition);
    const payload = {
      gridSize: dimension,
      zombie: {
        x: zombiePosition[0].x,
        y: zombiePosition[0].y
      },
      creature: [],
      commands: movement
    };

    // console.log(creaturePosition);

    for (let item in creaturePosition) {
      // console.log(creaturePosition[item])

      if (dimension - 1 < Number.parseInt(item.x)
      || dimension - 1 < Number.parseInt(item.y)) {
        flag = false;
        alert("x or y need less than " + dimension);
        break;
      } else {
        payload.creature.push({
          x: creaturePosition[item].x,
          y: creaturePosition[item].y
        });
      }
    }

    if (dimension - 1 < Number.parseInt(zombiePosition[0].x)
    || dimension - 1 < Number.parseInt(zombiePosition[0].y)) {
      flag = false;
      alert("x or y need less than " + dimension);
    }

    if (flag) {
      // console.log('payload:', payload);
      await axios.post("http://127.0.0.1:8000/zombie/direction", {
        title: "direction",
        body: payload
      }).then((data) => {
        dispatch(setDisplayState({
          gridSize: dimension,
          data: data.data
        }));
        navigate('/display');
      }, (error) => {
        alert('some error happened', error)
      });
    }
  }

  return (
    <div>
      <h1>Please enter some parameters</h1>
      <FormFrame>
        <InLineDiv>
          <h3>Dimension:</h3>
          <select value={dimension}
            onChange={handleDimensionChange}
            className="selector" name="dimension">
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </InLineDiv>

        {/* this is for assign a position for zombie */}
        <InputPosition type={"Zombie"} 
        position={zombiePosition}
        dimension={dimension} />

        {/* this is for assign a position for creatures */}
        <InputPosition type={"Creatures"} 
        position={creaturePosition}
        dimension={dimension} />

        <InLineDiv>
          <h3>Movement: {movement}</h3>

        </InLineDiv>
        <InLineDiv className='direction'>
          <button onClick={clickLeft}>Left</button>
          <button onClick={clickRight}>Right</button>
          <button onClick={clickUp}>Up</button>
          <button onClick={clickDown}>Down</button>
          <button onClick={clickPop}>Pop</button>
        </InLineDiv>
      </FormFrame>

      <InLineDiv>
        <button className='submitBtn'
        onClick={clickSubmit}>submit</button>
      </InLineDiv>
    </div>
  );
};

