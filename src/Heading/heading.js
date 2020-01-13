import React from 'react';

const Heading = (props) => {
    return (
        <div onClick={props.clicked}>
            <h2 key={props.id} style={{ color: props.color }} data-value={props.data} className={props.className} >{props.title}</h2>
        </div>
    )
};

export default Heading;