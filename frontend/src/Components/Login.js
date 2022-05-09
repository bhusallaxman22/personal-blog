import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
export default function Login(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    function handleSubmit(e) {
        e.preventDefault()
        axios.post("/user/login", { email, password })
            .then(res => {
                localStorage.setItem("token", res.data.token)
                props.setLoggedIn(true);
                window.location.href = "/#/"

            }
            )
            .catch(err => {
                setIsError(true)
                if (err.response) {
                    setErrorMessage(err.response.data)
                }
                else {
                    setErrorMessage("Something went wrong")
                }
            }
            )
    }

    return (
        <div style={{ marginTop: "7rem" }} className="container ui main text segment">
            <form action="/login" method="POST" onSubmit={e => handleSubmit(e)}>
                <div className="ui stacked ">
                    <h2>Hello, Content Creator! Thank you for visiting this site.</h2>
                    <p>Please Login to proceed.</p>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input value={email} type="email" onChange={e => setEmail(e.target.value)} name="email" placeholder="email" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    {isError ? <div className="ui error message">Login Error {errorMessage}</div> : null}
                    <button type="submit" className="ui button teal">Login</button>

                </div>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}
