import React from 'react';

const Buttonbox = (props) => {
    return (
        <div className='box-container'>
            <button value='1' onMouseOver={props.hover} onClick={props.clicked}>{props.title1}</button>
            <button value='2' onMouseOver={props.hover} onClick={props.clicked}>{props.title2}</button>
            <button value='3' onMouseOver={props.hover} onClick={props.clicked}>{props.title3}</button>
            <button value='4' onMouseOver={props.hover} onClick={props.clicked}>{props.title4}</button>
        </div>
    )
};

export default Buttonbox;