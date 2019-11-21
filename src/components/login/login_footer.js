import React from 'react'
import { Link } from "react-router-dom";

function LoginFooter() {
    return (
        <div>
            <span className="login_footer_text">
                Still need an account?
            </span>
            <div className="container login_footer">
            <Link to="/register">SIGN UP</Link>
            </div>
        </div>
    )
}

export { LoginFooter }
