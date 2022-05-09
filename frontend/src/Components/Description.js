// Component to display blog
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Description(props,{ url }) {
    const [blog, setBlog] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { id } = useParams();
    if (url === undefined) url = `/blogs/${id}`;
    function handleDelete(e, id) {
        e.preventDefault()
        var config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "content-type": "application/json",
                "Access-Control-Allow-Headers": "Origin",
            },
        };
        axios.post(url, { id }, config)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    window.location.href = "/"
                }
            }
            )
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        axios.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [id]);


    return (
        <div>
            <div>
                <div style={{ marginTop: "7rem" }} className="container ui main text segment">
                    {!error && loading ? (
                        <div className="ui active centered inline loader"></div>
                    ) : error ? (
                        <div className="ui error message">
                            <div className="header"> Server Error {error.msg}</div>
                        </div>
                    ) : (
                        <div>
                            <div className="ui huge header">{blog.title}</div>
                            <div className="ui top attached">
                                <div className="item">
                                    <img
                                        className="ui centered rounded image"
                                        src={blog.image}
                                        alt="asdfa" />
                                    <div className="content">
                                        <span><i className="id badge outline icon"></i> {blog.author}</span>
                                    </div>
                                </div>
                                <div className="content">
                                    <i className="calendar alternate outline icon"></i>
                                    <span>{new Date(blog.created).toDateString()}</span>
                                </div>
                                <br />
                                <div className="description">
                                    <p dangerouslySetInnerHTML={{ __html: blog.body }}></p>
                                </div>

                                {props.isLoggedIn && blog.uid === props.user._id ? <div>
                                    <Link className="ui button basic blue" to={`/blogs/${blog._id}/edit`}>Edit </Link>
                                    <form
                                        style={{
                                            display: "inline"
                                        }}
                                        onSubmit={e => handleDelete(e, blog._id)}
                                    >
                                        <button className="ui red basic button">Delete</button>
                                    </form>
                                </div>
                                    :
                                    null}
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <h2>Share It on:</h2>
                                <a
                                    className="resp-sharing-button__link"
                                    href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                >
                                    <div
                                        className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z" />
                                            </svg>
                                        </div>
                                        Facebook
                                    </div>
                                </a>

                                <a
                                    className="resp-sharing-button__link"
                                    href={`https://twitter.com/intent/tweet/?text=Blogs by Laxman Bhusal.&amp;url=${window.location.href}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Twitter"
                                >
                                    <div
                                        className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z" />
                                            </svg>
                                        </div>
                                        Twitter
                                    </div>
                                </a>

                                <a
                                    className="resp-sharing-button__link"
                                    href={`https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Blogs By Laxman Bhusal.&amp;caption=Blog App Developed by Laxman Bhusal and Blogs By Laxman Bhusal&amp;content=${window.location.href}&amp;canonicalUrl=${window.location.href}&amp;shareSource=tumblr_share_button`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Tumblr"
                                >
                                    <div
                                        className="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--medium"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
                                        >
                                            <svg
                                                version="1.1"
                                                x="0px"
                                                y="0px"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                enableBackground="new 0 0 24 24"
                                            >
                                                <path
                                                    d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M15.492,17.616C11.401,19.544,9.5,17,9.5,14.031 V9.5h-2V8.142c0.549-0.178,1.236-0.435,1.627-0.768c0.393-0.334,0.707-0.733,0.943-1.2c0.238-0.467,0.401-0.954,0.49-1.675H12.5v3h2 v2h-2v3.719c0,2.468,1.484,2.692,2.992,1.701V17.616z" />
                                            </svg>
                                        </div>
                                        Tumblr
                                    </div>
                                </a>

                                <a
                                    className="resp-sharing-button__link"
                                    href={`mailto:?subject=Blogs App by Laxman Bhusal and Blogs By laxman Bhusal.&amp;body=${window.location.href}`}
                                    target="_self"
                                    rel="noreferrer"
                                    aria-label="E-Mail"
                                >
                                    <div
                                        className="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z" />
                                                <path
                                                    d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z" />
                                            </svg>
                                        </div>
                                        E-Mail
                                    </div>
                                </a>

                                <a
                                    className="resp-sharing-button__link"
                                    href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&amp;media=${window.location.href}&amp;description=Blogs App by Laxman Bhusal and Blogs by Laxman Bhusal`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Pinterest"
                                >
                                    <div
                                        className="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--medium"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm1.4 15.56c-1 0-1.94-.53-2.25-1.14l-.65 2.52c-.4 1.45-1.57 2.9-1.66 3-.06.1-.2.07-.22-.04-.02-.2-.32-2 .03-3.5l1.18-5s-.3-.6-.3-1.46c0-1.36.8-2.37 1.78-2.37.85 0 1.25.62 1.25 1.37 0 .85-.53 2.1-.8 3.27-.24.98.48 1.78 1.44 1.78 1.73 0 2.9-2.24 2.9-4.9 0-2-1.35-3.5-3.82-3.5-2.8 0-4.53 2.07-4.53 4.4 0 .5.1.9.25 1.23l-1.5.82c-.36-.64-.54-1.43-.54-2.28 0-2.6 2.2-5.74 6.57-5.74 3.5 0 5.82 2.54 5.82 5.27 0 3.6-2 6.3-4.96 6.3z" />
                                            </svg>
                                        </div>
                                        Pinterest
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
            )
}


