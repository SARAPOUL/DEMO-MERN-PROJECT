import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditComponent = (props) => {
  const [data, setData] = useState({
    title: "",
    author: "",
  });
  const [content, setContent] = useState("");
  const { title, author } = data;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((res) => {
        setData({
          title: res?.data?.title,
          content: res?.data?.content,
          author: res?.data?.author,
        });
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },[]);

  const submitContent = (event) => {
    setContent(event);
  };
  const inputChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const smbitForm = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/blog/${props.match.params.slug}`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("Token")
            )}`,
          },
        }
      )
      .then((res) => {
        let data = res.data;
        setData({
          ...data,
          title: data?.title,
          author: data?.author,
        });
        setContent(data.content);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Fragment>
      <NavbarComponent />
      <div className="contairer p-5">
        <h1>Edit Blog</h1>
        {/* {JSON.stringify(data)} */}
        <form onSubmit={smbitForm}>
          <div className="form-group mt-2">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={inputChange("title")}
            />
          </div>
          <div className="form-group mt-2">
            <label>Content</label>
            {/* <textarea
              className="form-control"
              value={content}
              onChange={inputChange("content")}
            ></textarea> */}
            <ReactQuill
              value={content}
              onChange={submitContent}
              theme="snow"
              placeholder="content"
              style={{ height: "200px" }}
              className="mb-5"
            />
          </div>
          <div className="form-group mt-2">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={inputChange("author")}
            />
          </div>
          <input
            type="submit"
            value="Edit Blog"
            className="btn btn-warning mt-4 "
          />
          <button
            className="btn btn-outline-primary mt-4 mx-4"
            onClick={() => window.location.replace("/")}
          >
            Back
          </button>
        </form>
      </div>
    </Fragment>
  );
};
export default EditComponent;
