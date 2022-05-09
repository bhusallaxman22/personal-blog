// Main Component
import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Home({ url }) {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("");
    const [filteredBlogs, setFilteredBlogs] = React.useState([]);
    const [error, setError] = React.useState(null);

    function handleSearch(e) {
        setSearch(e.target.value);
        setFilteredBlogs(blogs.filter(blog => blog.title.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);

            }
            )
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);

    return (
        <div className="ui main text container row centered grid" style={{ marginTop: "7.0rem" }}>
            <div className="ui ">
                <div className="ui huge header">Blogs</div>
                <div className="ui form">
                    <div className="field">
                        <label htmlFor="search">Search</label>
                        <input
                            value={search}
                            onChange={e => handleSearch(e)}
                            type="text"
                            name="search"
                            placeholder="search"
                            id="search"
                        />
                    </div>
                </div>
                <div className="ui divided segment items">
                    {!error && loading ? (
                        <div className="ui active centered inline loader"></div>
                    ) : error ? (
                        <div className="ui error message">
                            <div className="header"> Server Error {error.msg}</div>
                        </div>
                    ) : (
                        filteredBlogs.length > 0 ? (
                            filteredBlogs.map(blog => (
                                <div key={blog._id} className="item">
                                    <div className="image">
                                        <img src={blog.image} alt="blog" />
                                    </div>
                                    <div className="content">
                                        <Link to={`/blogs/${blog._id}`}>
                                            <div className="header">{blog.title}</div>
                                        </Link>
                                        <div className="meta">
                                            <span>{blog.author}</span>
                                        </div>
                                        <div className="description">
                                            <p>{blog.body.substring(0, 100)}...</p>
                                        </div>
                                        <div className="extra">
                                            <Link to={`/blogs/${blog._id}`} className="ui violet button">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (blogs.map(blog => (
                            <div key={blog._id} className="item ">
                                <div className="image">
                                    <img src={blog.image} alt="blog" />
                                </div>
                                <div className="content">
                                    <Link to={`/blogs/${blog._id}`}>
                                        <div className="header">{blog.title}</div>
                                    </Link>
                                    <div className="meta">
                                        <span>{blog.author}</span>
                                    </div>
                                    <div className="description">
                                        <p>{blog.body.substring(0, 100)}...</p>
                                    </div>
                                    <div className="extra">
                                        <Link to={`/blogs/${blog._id}`} className="ui violet button">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
}