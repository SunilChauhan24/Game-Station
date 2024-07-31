import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import adminApis from "../apis/AdminApis";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";
import CustomModal from "../Modal";
import ToastMessages from "../ToastMessages";

const Blogs = () => {
  const { adminId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    document.title = "PlayWays Admin - Blogs";
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await adminApis.getAllBlogs();
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching blogs :", error);
      setLoading(false);
    }
  };

  const handleAddBlog = async () => {
    try {
      await adminApis.createBlog(adminId, newBlog);
      setModalOpen(false);
      fetchBlogs();
      setToast({
        show: true,
        type: "success",
        message: "Blog created successfully.",
      });
    } catch (error) {
      console.log("Error adding blog:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to create blog.",
      });
    }
  };

  const handleUpdateBlog = async () => {
    try {
      await adminApis.updateBlog(adminId, blogToEdit._id, newBlog);
      setModalOpen(false);
      fetchBlogs();
      setToast({
        show: true,
        type: "success",
        message: "Blog updated successfully.",
      });
    } catch (error) {
      console.log("Error updating blog:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update blog.",
      });
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await adminApis.deleteBlog(adminId, blogId);
      fetchBlogs();
      setDeleteModalOpen(false);
      setToast({
        show: true,
        type: "success",
        message: "Blog deleted successfully.",
      });
    } catch (error) {
      console.log("Error deleting blog:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete blog.",
      });
    }
  };

  const handleOpenModal = (editBlog) => {
    if (editBlog) {
      setBlogToEdit(editBlog);
      setIsEditing(true);
      setNewBlog({ ...editBlog });
    } else {
      setIsEditing(false);
      setNewBlog({ title: "", content: "", image: null });
    }
    setModalOpen(true);
  };

  const handleCancelModal = () => {
    setModalOpen(false);
    setBlogToEdit(null);
    setIsEditing(false);
  };

  const handleDeleteConfirmation = (blogId) => {
    setBlogToDelete(blogId);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Blogs
            </li>
          </ol>
        </nav>

        <h1 className="text-center mb-4">Blogs</h1>
        <button
          className="btn btn-golden mb-3"
          title="Add new blogs"
          onClick={() => handleOpenModal(null)}
        >
          <FaPlus /> Add Blog
        </button>
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
          <div className="row row-cols-1 row-cols-md-4">
            {blogs.map((blog, index) => (
              <div key={index} className="col mb-4">
                <div className="card h-100 border">
                  <img
                    src={`${process.env.REACT_APP_baseUrl}${blog.image}`}
                    alt={blog.title}
                    className="card-img-top img-fluid border  rounded"
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
                    <div className="d-flex justify-content-around mt-2">
                      <button
                        className="btn btn-sm btn-outline-primary ms-2"
                        onClick={() => handleOpenModal(blog)}
                      >
                        <FaPencilAlt /> Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() => handleDeleteConfirmation(blog._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CustomModal
        showModal={modalOpen}
        handleClose={handleCancelModal}
        handleSubmit={isEditing ? handleUpdateBlog : handleAddBlog}
        title={isEditing ? "Update Blog" : "Add Blog"}
        fields={[
          {
            label: "Title",
            type: "text",
            value: newBlog.title,
            onChange: (value) => setNewBlog({ ...newBlog, title: value }),
          },
          {
            label: "Content",
            type: "text",
            value: newBlog.content,
            onChange: (value) => setNewBlog({ ...newBlog, content: value }),
          },
          {
            label: "Image",
            type: "file",
            onChange: (e) =>
              setNewBlog({ ...newBlog, image: e.target.files[0] }),
          },
        ]}
        buttonText={isEditing ? "Update" : "Add"}
      />
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={() => handleDeleteBlog(blogToDelete)}
        message="Are you sure you want to delete this blog?"
      />
      <ToastMessages
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type={toast.type}
        message={toast.message}
      />
    </>
  );
};

export default Blogs;
