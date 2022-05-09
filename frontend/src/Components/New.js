// Component to add new blog
import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
export default function New(props) {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [image, setImage] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const blog = {
            title,
            body,
            image,
            author: props.user.name,
            uid: props.user._id

        }
        var config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "content-type": "application/json",
                "Access-Control-Allow-Headers": "Origin",
            },
        };
        console.log(blog)
        axios.post("/blogs", blog, config)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    window.location.href = "/"
                }
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }

    return (
        <div style={{ marginTop: "7.0rem" }} className="container ui main text segment">
            <div className=" ui huge header">New Blog</div>
            <form onSubmit={e => handleSubmit(e)} action="/blogs" className="ui form" method="POST">
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" name="blog[title]" placeholder="title" id="title" />
                </div>
                <div className="filed">
                    <label htmlFor="image">Image</label>
                    <input value={image} onChange={e => setImage(e.target.value)} type="text" name="blog[image]" placeholder="image" id="image" />
                </div>
                <div className="field">
                    <label htmlFor="body">Post Goes Here</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} required name="blog[body]" id="blog post here"></textarea>
                </div>
                <input className="ui violet big inverted button" type="submit" />
            </form>
        </div>
    )
}
