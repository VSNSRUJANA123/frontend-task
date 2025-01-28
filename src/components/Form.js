import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axios from "axios";
// import "../app.css";
const Form = () => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const handleUser = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    setEdit(false);
    setUserDetails({ id: "", name: "", email: "", company: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${userDetails.id}`,
          {
            body: { userDetails },
          }
        );
        let updateData = data.map((items) => {
          if (items.id === response.data.id) {
            return response.data.body.userDetails;
          }
          return items;
        });
        setData(updateData);
        setEdit(false);
        setUserDetails({ id: "", name: "", email: "", company: "" });
        toast("data edited", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        setEdit(false);
        toast("oops Invalid ID", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUserDetails({ id: "", name: "", email: "", company: "" });
        console.log(err);
      }
    } else if (
      userDetails.id &&
      userDetails.name &&
      userDetails.email &&
      userDetails.company
    ) {
      if (!isNaN(userDetails.id)) {
        const trueId = data.find((eachData) => {
          return eachData.id === parseInt(userDetails.id);
        });
        if (!trueId) {
          try {
            const response = await axios.post(
              "https://jsonplaceholder.typicode.com/users",
              {
                method: "POST",
                body: { userDetails },
              }
            );

            setData([...data, response.data.body.userDetails]);
            setUserDetails({ id: "", name: "", email: "", company: "" });
            toast("data added successfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          toast("enter unique id in number format", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      toast("fill the fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setLoading(false);
      setData(response.data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };
  useEffect(() => {
    handleData();
  }, []);
  const handleEditBtn = (id) => {
    setEdit(true);
    const dataObject = data.find((eachData) => eachData.id === id);
    setUserDetails({
      id: dataObject.id,
      name: dataObject.name,
      email: dataObject.email,
      company: dataObject.company.name || dataObject.company,
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const filterData = data.filter((eachData) => eachData.id !== id);
      setData(filterData);
      toast("delete data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast("error to delete data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          text="number"
          placeholder="Enter unique id"
          value={userDetails.id}
          onChange={handleUser}
        />
        <input
          name="name"
          text="name"
          placeholder="Enter fullname"
          value={userDetails.name}
          onChange={handleUser}
        />
        <input
          name="email"
          placeholder="Enter email"
          value={userDetails.email}
          onChange={handleUser}
        />
        <input
          name="company"
          placeholder="Enter company"
          value={userDetails.company}
          onChange={handleUser}
        />
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px",
            marginRight: "10px",
          }}
        >
          {edit ? "EDIT" : "ADD"}
        </button>
        {edit && (
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px",
              marginRight: "10px",
            }}
            onClick={handleCancel}
          >
            cancel
          </button>
        )}
      </form>
      <p
        style={{
          color: "#FFBD11",
          fontFamily: "Roboto, 'Poppins', sans-serif",
        }}
      >
        Note : *Enter unique id in number format
      </p>
      {loading && (
        <div className="loading">
          <Oval
            visible={true}
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {!loading && !error && (
        <div className="table-div">
          <table style={{ fontFamily: " Poppins, sans-serif" }}>
            <thead>
              <tr style={{ color: "#17a2b8" }}>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items.id}</td>
                    <td>{items.name.split(" ")[0] || "-"}</td>
                    <td>{items.name.split(" ")[1] || "-"}</td>
                    <td>{items.email}</td>
                    <td>{items.company.name || items.company}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          marginRight: "10px",
                        }}
                        onClick={() => handleEditBtn(items.id)}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          marginRight: "10px",
                        }}
                        onClick={() => handleDelete(items.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {error && (
        <div style={{ color: "#dc3545" }}>
          <h1>Failed to fetch data</h1>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Form;
