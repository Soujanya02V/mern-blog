import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        alert("Failed to fetch blogs");
      }
    };
    fetchAllBlogs();
  }, []);

  // Delete blog handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/delete/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Remove deleted blog from state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully");
      } catch (error) {
        alert("Failed to delete blog");
      }
    }
  };

  return (
    <main className="my-5">
      <div className="container shadow-lg">
        <section className="text-center">
          <h2 className="mb-5 my-3">
            <strong>Latest Posts</strong>
          </h2>

          <div className="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-12 mb-4">
                  <div className="card">
                    <div
                      className="bg-image hover-overlay ripple"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={`http://localhost:9000/${item.thumbnail}`}
                        alt="blog"
                        className="img-fluid"
                      />
                      <Link to="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251,251,251,0.15)" }}
                        ></div>
                      </Link>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <Link to={`blog/${item._id}`} className="btn btn-primary me-2">
                        Read More
                      </Link>

                      {/* Delete button */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>Loading..</h2>
            )}
          </div>
        </section>
        <footer className="bg-primary text-lg-start">
          <div
            className="text-center p-3 text-white"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            &copy; 2025 Copyright :
            <Link className="text-white mx-2" to="">
              Soujanya
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};
