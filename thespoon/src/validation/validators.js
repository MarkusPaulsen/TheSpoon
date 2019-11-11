import React from "react";
import validator from "validator";

export const required = (value) => {
    if (validator.isEmpty(value)) {
        return (
            <span className="error">
                All fields must be fields out!
            </span>
        );
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return (
            <span className="error">
               E-mail is incorrect!
            </span>
        );
    }
};

