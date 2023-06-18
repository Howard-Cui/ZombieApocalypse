import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import ZombieImg from '../assets/Zombie.jpeg'
import CreatureImg from '../assets/Creature.jpeg'
import { useNavigate } from 'react-router-dom';
import { setDisplayState } from './DisplaySlice';

const Grid = styled.div`
    background-color: green;
    border: solid 1px black;
`

export default function Display() {
    const stateData = useSelector((state) => state.display.value);
    const { gridSize, data } = stateData
    console.log(gridSize);
    console.log(data);

    const arr = [...Array(gridSize * gridSize)].map(() => 1);

    const determindZombie = (index) => {
        if (data.zombies.length === 0) {
            return false;
        }
        for (let i = 0; i < data.zombies.length; i++) {
            if ((index % gridSize === data.zombies[i].x) &&
                (Math.floor(index / gridSize) === data.zombies[i].y)) {
                console.log("zombie ", true)
                return true;
            }
        }
        return false;
    }

    const determindCreature = (index) => {
        if (data.creatures.length === 0) {
            return false;
        }
        for (let i = 0; i < data.zombies.length; i++) {
            if ((index % gridSize === data.creatures[i].x) &&
                (Math.floor(index / gridSize) === data.creatures[i].y)) {
                console.log("creature ", true)
                return true;
            }
        }
        return false;
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleBack = () => {
        dispatch(setDisplayState(null));
        navigate('/');
    }

    return (
        <Fragment>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                width: `${100 * gridSize}px`,
                height: `${100 * gridSize}px`,
            }}>
                {
                    arr.map((currValue, index) => {
                        return (
                            <Grid key={index}>
                                {
                                    (determindZombie(index) && <Item type={'zombie'} />)
                                }
                                {
                                    (determindCreature(index) && <Item type={'creature'} />)
                                }
                            </Grid>
                        )
                    })
                }
            </div>
            <button onClick={handleBack}>re-start</button>
        </Fragment>

    )
}


const Item = ({ type }) => {
    let src = (type === 'zombie') ? ZombieImg : CreatureImg;

    return (
        <img src={src} alt={'zombie/creature'} style={{
            width: '100px',
            height: '100px'
        }} />
    )
}
