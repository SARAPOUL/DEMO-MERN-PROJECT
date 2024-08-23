import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import NavbarComponent from "./components/NavbarComponent";
import Swal from "sweetalert2";
import { getUser } from "./services/authorize";
function App(props) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = () => {
    axios.get(`${process.env.REACT_APP_API}/blogs`).then((res) => {
      setBlogs(res.data);
    });
  };
  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            sessionStorage.getItem("Token")
          )}`,
        },
      })
      .then((res) => {
        Swal.fire("Deleted!", res.data.message, "success");
        fetchDate();
      })
      .catch((err) => Swal.fire("Error", err.response.data.message, "error"));
  };

  return (
    <Fragment>
      <NavbarComponent />
      <div className="App contairer p-5">
        <h1>Blogs</h1>
        {blogs.length > 0 &&
          blogs?.map((blog, index) => (
            <div
              className="row"
              key={index}
              style={{ borderBottom: "1px solid silver" }}
            >
              <div className="col pt-2 pb-3"></div>
              <a href={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </a>
              <div
                dangerouslySetInnerHTML={{
                  __html: blog?.content.substring(0, 250),
                }}
              />
              <p className="text-muted">
                Author: {blog.author} , date :{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getUser() && (
                <Fragment>
                  <button
                    className="btn btn-outline-info  my-4"
                    style={{ width: "150px" }}
                    onClick={() => props.history.push(`blog/edit/${blog.slug}`)}
                  >
                    Update
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger my-4"
                    style={{ width: "150px" }}
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    Delete
                  </button>
                </Fragment>
              )}
            </div>
          ))}
        <a className="btn btn-primary mt-5" href="/create">
          Create Blog
        </a>
      </div>
    </Fragment>
  );
}

export default App;
