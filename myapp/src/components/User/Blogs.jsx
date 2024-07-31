import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import userApis from "../apis/UserApis";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    document.title = "Play Ways - Blogs";
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await userApis.fetchBlogs();
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching blogs :", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="position-relative">
        <img
          src={require("../imgs/Blogs.avif")}
          alt="Feedback"
          className="img-fluid w-100 h-50"
          style={{
            minHeight: "60vh",
            aspectRatio: "16/3",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1
            className="text-white animate__animated animate__fadeInDown"
            style={{ fontSize: "60px", fontFamily: "satisfya" }}
          >
            Blogs
          </h1>
          <p className="text-white mt-4 animate__animated animate__fadeInDown ">
            Explore our latest blogs and stay updated with exciting gaming news,
            tips, and more!
          </p>
        </div>
      </div>

      {/* Sitemap Path */}
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb ms-4 mt-2">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-warning">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Blogs
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      </div>

      <div className="container py-2 mt-3">
        {loading ? (
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="col-md-1 text-center justify-content-center">
              <GridLoader type="Oval" color="#FFD700" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3">
            {blogs.map((blog, index) => (
              <div key={index} className="col mb-4">
                <div className="card h-100 border-0 ">
                  <img
                    src={`${process.env.REACT_APP_baseUrl}${blog.image}`}
                    alt={blog.title}
                    className="card-img-top img-fluid border shadow rounded"
                    style={{
                      aspectRatio: "4/3",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body ">
                    <h3 className="card-title text-golden">{blog.title}</h3>
                    <p className="card-text text-muted">{blog.content}</p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <small className="text-muted ">
                      - {new Date(blog.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
