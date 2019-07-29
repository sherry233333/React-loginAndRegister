import React from "react";
import "./css/button.css"

function Button(props){

    return(
        <a href='javascript:' className='button' onClick={props.click}>{props.name}</a>
    );
}

export default Button;