import React from 'react'
import { Link } from "react-router-dom";

function LoginFooter() {
    return (
        <div>
            <span className="footer_text">
                Still need an account?
            </span>
            <div className="container footer">
            <Link to="/register">SIGN UP</Link>
            </div>
        </div>
    )
}

export { LoginFooter }
