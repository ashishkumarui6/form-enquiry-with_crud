import React, { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [formData, setFromData] = useState({
    Uname: "",
    Uemail: "",
    Uphone: "",
    Umessage: "",
    index: "",
  });

  const onGetVall = (e) => {
    let OldData = { ...formData };
    let InputName = e.target.name;
    let InputValue = e.target.value;
    OldData[InputName] = InputValue;
    setFromData(OldData);
  };

  const [userData, setUserData] = useState([]);

  const onGetSubmitData = (e) => {
    e.preventDefault();

    const OnuserCurrentData = {
      Uname: formData.Uname,
      Uemail: formData.Uemail,
      Uphone: formData.Uphone,
      Umessage: formData.Umessage,
    };

    if (formData.index === "") {
      const checkFilteruser = userData.filter(
        (V, i) => V.Uemail == formData.Uemail || V.Uphone == formData.Uphone
      );

      if (checkFilteruser.length == 1) {
        toast.error("Email or Phone Allready Exit!");
      } else {
        const oldUserData = [...userData, OnuserCurrentData];

        setUserData(oldUserData);
        setFromData({
          Uname: "",
          Uemail: "",
          Uphone: "",
          Umessage: "",
          index: "",
        });
      }
    } else {
      toast.success("Data Update Success");
      let edditIndex = formData.index;
      let olddata = userData;

      let checkFilteruser = userData.filter(
        (v, i) =>
          (v.Uemail == formData.Uemail || v.Uphone == formData.Uphone) &&
          i != edditIndex
      );
      olddata[edditIndex]["Uname"] = formData.Uname;
      olddata[edditIndex]["Uemail"] = formData.Uemail;
      olddata[edditIndex]["Uphone"] = formData.Uphone;
      olddata[edditIndex]["Umessage"] = formData.Umessage;

      setUserData(olddata);

      setFromData({
        Uname: "",
        Uemail: "",
        Uphone: "",
        Umessage: "",
        index: "",
      });
    }
  };

  let DeletRow = (indexNumber) => {
    const filterDeleteItem = userData.filter((VV, ii) => ii != indexNumber);
    toast.success("Data Delete Success");
    setUserData(filterDeleteItem);
  };

  let editRow = (indexNumber) => {
    let edittData = userData.filter((v, i) => i == indexNumber)[0];
    edittData["index"] = indexNumber;
    setFromData(edittData);
    console.log(edittData);
  };

  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="container">
          <h1 className="my-5 text-center">Enquiry Now</h1>
          <div className="row">
            <div className="col-md-5">
              {userData.length}
              <form onSubmit={onGetSubmitData}>
                <div className="pb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="Uname"
                    id=""
                    className="form-control"
                    value={formData.Uname}
                    onChange={onGetVall}
                  />
                </div>
                <div className="pb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="Uemail"
                    id=""
                    className="form-control"
                    value={formData.Uemail}
                    onChange={onGetVall}
                  />
                </div>
                <div className="pb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="Uphone"
                    id=""
                    className="form-control"
                    value={formData.Uphone}
                    onChange={onGetVall}
                  />
                </div>
                <div className="pb-3">
                  <label className="form-label">message</label>
                  <textarea
                    type="text"
                    name="Umessage"
                    id=""
                    rows={3}
                    className="form-control"
                    value={formData.Umessage}
                    onChange={onGetVall}
                  />
                </div>
                <button className="btn btn-primary">
                  {formData.index !== "" ? "Update" : "Save"}
                </button>
              </form>
            </div>
            <div className="col-md-7">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Message</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length >= 1 ? (
                    userData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.Uname}</td>
                          <td>{item.Uemail}</td>
                          <td>{item.Uphone}</td>
                          <td>{item.Umessage}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="px-3 py-1 border bg-danger rounded-1"
                                onClick={() => DeletRow(index)}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => editRow(index)}
                                className="px-3 py-1 border bg-success rounded-1"
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6}>No Data Found !</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
