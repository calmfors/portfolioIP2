import React from 'react';

const Buttonbox = (props) => {
    return (
        <div className="box-container">
            <button value="1" onClick={props.clicked}>{props.title1}</button>
            <button value="2" onClick={props.clicked}>{props.title2}</button>
            <button value="3" onClick={props.clicked}>{props.title3}</button>
        </div>
    )
};

export default Buttonbox;