import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

const SingleBlogComponent = (props) => {
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((res) => {
        setBlog(res.data);
      });
  });

  return (
    <Fragment>
      <NavbarComponent />
      <div className="container p-5">
        <div className="row">
          <div className="col pt-2 pb-3"></div>
          <h2>{blog.title}</h2>
          <div
              dangerouslySetInnerHTML={{
                __html: blog?.content,
              }}
            />
          <p className="text-muted">
            Author: {blog.author} , date :{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleBlogComponent;
