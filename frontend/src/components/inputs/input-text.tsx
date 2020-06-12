import React from "react";
import {TextField} from "@material-ui/core";

import './styles.css'

function InputText(props: any) {

    return (
        <div className="inputText">
            <TextField className={props.className} id={props.id} label={props.label} value={props.value} variant="outlined"
                       onChange={e=> props.change(e.target.value)} />
        </div>
    );
}

export default InputText;