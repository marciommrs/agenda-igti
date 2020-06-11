import React from "react";
import {TextField} from "@material-ui/core";


function InputText(props: any) {

    return (
        <TextField id={props.id} label={props.label} value={props.value} variant="outlined"
                   onChange={e=> props.change(e.target.value)}/>
    );
}

export default InputText;