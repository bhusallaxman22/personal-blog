// Simple Navigation Bar Component using Semantic-ui
import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setLoggedIn(false);
    }
    
    return (
        <div className="ui fixed inverted menu ">
            <div className="ui container">
                <div className="header item">
                    <i style={{ fontSize: "2em" }} className="code icon"></i> Blog Site
                </div>
                <Link to="/" className="item">Home</Link>
                {!props.isLoggedIn ? <Link to="/login" className="item">Login</Link> : <>
                    <Link to="/blogs/new" className="item">New Blog</Link>
                    <button onClick={e => handleLogout(e)} className="item right">Logout</button>
                </>}
            </div>
        </div>
    );
}
