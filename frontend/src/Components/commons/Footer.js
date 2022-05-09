// Simple Footer Component
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        // footer
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <div className="ui stackable inverted divided grid">
                    <div className="2 wide column">
                        <h4 className="ui inverted header">Links</h4>
                        <div className="ui inverted link list">
                            <Link to="/" className="item">Home</Link>
                            <Link to="/login" className="item">About</Link>
                            <Link to="/register" className="item">Register</Link>

                        </div>
                    </div>
                    <div className="2 wide column">
                        <h4 className="ui inverted header">About</h4>
                        <p>
                            Made with <i className="heart icon"></i> by <a href="https://bhusallaxman.com.np" target="_blank" rel="noopener noreferrer">Bhusallaxman</a>
                        </p>
                        {/* copyright */}
                        <p>
                            <span>&copy;</span>
                            <span>{new Date().getFullYear()}</span>
                            <span>Bhusallaxman</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>


    );
}
