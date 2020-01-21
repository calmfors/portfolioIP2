import React from 'react';

const Popup = (props) => {
    return (
        <div className={props.className}>
            <p className='x' onClick={props.clicked}>CLOSE X</p>
            <div className='popup-content'>
                {props.content}
            </div>
        </div>
    )
};

export default Popup;