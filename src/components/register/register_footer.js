import React from 'react'
import { Link } from "react-router-dom";

function SignupFooter() {
    return (
        <div>
            <span className="signup_footer_text">
                Already have an account?
            </span>
            <div className="container footer">
                <Link to="/login">LOGIN</Link>
            </div>
        </div>
    )
}

export default SignupFooter 