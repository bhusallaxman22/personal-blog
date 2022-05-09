// Register Component
import React from "react";
import axios from "axios";
export default function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        // check if the email is a valid email using regex and password length is greater than 6
         // eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length > 6) {
            axios.post("/user/register", { email, password, name })
                .then(res => {
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/#/login";
                }
                )
                .catch(err => {
                    setIsError(true);
                    if (err.response) {
                        setErrorMessage(err.response.data);
                    }
                    else {
                        setErrorMessage("Something went wrong");
                    }
                }
                );
        }
        else {
            setIsError(true);
            setErrorMessage("Please enter a valid email and password");
        }
    }

    return (
        <div style={{ marginTop: "7.0rem" }} className="container ui main text segment">
            <div className=" ui huge header">Register</div>
            {isError ?
                <div className="ui error message">Registration Error {errorMessage}</div>
                : null}
            <form onSubmit={e => handleSubmit(e)} className="ui form">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input value={name} required onChange={e => setName(e.target.value)} type="text" name="name" placeholder="name" id="name" />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input value={email} required onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="email" id="email" />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" required onChange={e => setPassword(e.target.value)} value={password} name="password" placeholder="password" id="password" />
                </div>
                <input className="ui violet big inverted button" type="submit" />
            </form>
        </div>
    )
}
