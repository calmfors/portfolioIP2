import React from 'react';

const Heading = (props) => {
    return (
        <div className='title-box' onClick={props.clicked}  >
            <h2
                key={props.id}
                style={{ color: props.color }}
                onMouseOver={props.clicked}
                data-value={props.data}
                className={props.classNameTitle} >
                {props.title}
            </h2>
            <p
                className={props.classNameContent}
                onMouseOut={props.clicked}>
                {props.content}
            </p>
        </div>
    )
};

export default Heading;