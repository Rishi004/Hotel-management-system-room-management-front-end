import React from "react";
import Button from "@material-ui/core/Button";

function ContainedButton({ variant, color, size, text, onclick, ...other }) {
    return (
        <div>
            <Button
                variant={variant}
                size={size}
                color={color}
                {...other}
                onclick={onclick}
            >
                {text}
            </Button>
        </div>
    );
}

export default ContainedButton;
