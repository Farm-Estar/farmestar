import Validator from 'validator'
import isEmpty from 'is-empty'

export function validateForgotPasswordEmail(data) {
    let errors = {}

    //Convert String for Validator
    data.email = !isEmpty(data.email) ? data.email : ""

    //Checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}