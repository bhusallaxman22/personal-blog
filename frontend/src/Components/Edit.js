// Component to edit blog
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Edit(props) {
    const { id } = useParams()
    const [blog, setBlog] = React.useState({});
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [image, setImage] = React.useState("");
    useEffect(() => {
        axios.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data)
                setTitle(res.data.title)
                setBody(res.data.body)
                setImage(res.data.image)
            })
            .catch(err => console.log(err))
    }, [id])
    function handleSubmit(e) {
        e.preventDefault();
        const uBlog = {
            id: blog._id,
            title,
            body,
            image,
            author: "Laxman Bhusal"
        }
        var config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "content-type": "application/json",
                "Access-Control-Allow-Headers": "Origin",
            },
        };
        axios.put(`/blogs/${id}`, uBlog, config)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    window.location.href = "/"
                    window.reload();
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
            <div className=" ui huge header">Edit {blog.title}</div>
            <form action={`/blogs/${blog._id}?_method=PUT`} onSubmit={e => handleSubmit(e)} className="ui form" method="POST">
                <div className="field">
                    <label for="title">Title</label>
                    <input
                        type="text"
                        name="blog[title]"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        id="title"
                    />
                </div>
                <div className="filed">
                    <label for="image">Image</label>
                    <input value={image} type="text" onChange={e => setImage(e.target.value)} name="blog[image]" placeholder="image" id="image" />
                </div>
                <div className="field">
                    <label for="body">Post Goes Here</label>
                    <textarea required name="blog[body]" value={body} onChange={e => setBody(e.target.value)} id="blog post here">
                    </textarea>
                </div>
                <input className="ui violet big inverted button" type="submit" />
            </form>
        </div>
    );
}

