import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../services/authorize";
const FormComponent = (props) => {
  const [data, setData] = useState({
    title: "",
    author: getUser(),
  });
  const [content, setContent] = useState("");
  const { title, author } = data;
  // useEffect(() => {
  //   getUser() || props.history.push("/login");
  // }, []);
  const inputChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const submitContent = (event) => {
    setContent(event);
  };

  const smbitForm = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, author },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("Token")
            )}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Blog Created",
          text: "You created Blog Successfully",
          icon: "success",
        });
        setData({ ...data, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        console.log(err.response);
        Swal.fire({
          icon: "error",
          title: "Create blog failed",
          text: err.response.data.error,
        });
      });
  };
  return (
    <Fragment>
      <NavbarComponent />
      <div className="contairer p-5">
        <h1>Create Blog</h1>
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
            value="Create Blog"
            className="btn btn-primary mt-4"
          />
        </form>
      </div>
    </Fragment>
  );
};
export default FormComponent;
