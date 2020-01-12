//<editor-fold desc="React">
import React from "react";
//</editor-fold>
//<editor-fold desc="Validator">
import validator from "validator";
//</editor-fold>

//<editor-fold desc="Business Logic">
export const required = (value) => {
    if (validator.isEmpty(value)) {
        // noinspection JSLint
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
//</editor-fold>

