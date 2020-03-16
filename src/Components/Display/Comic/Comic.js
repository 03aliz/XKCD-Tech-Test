import React from 'react';

const comic = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <img src={props.src} alt={props.alt} title={props.alt} />
        </div> 
    )
}

export default comic;