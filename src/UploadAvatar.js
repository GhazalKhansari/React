import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import "./uploadAvatar.css";
const UploadAvatar = () => {
  const [drag, setDrag] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const { token } = useSelector((state) => state.user);
  const changeAvatar = async () => {
    const formData = new FormData();
    formData.append("profile-image", avatar);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "your profile image has been successfully changed ",
        showConfirmButton: false,
        timer: 2000,
      });
      setDrag(0)
      setAvatar(null)
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="upload-avatar-container">
        <form
          className="upload-form-container"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="upload-files-container">
            <div
              className="drag-file-area"
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDrag(1);
              }}
              onDrop={(e) => {
                // e.preventDefault();
                // e.stopPropagation();
                setDrag(2);
              }}
            >
              {/* <span className="material-icons-outlined upload-icon">file_upload</span> */}

              {drag === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  classNameName="upload-icon"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              ) : drag === 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  classNameName="upload-icon"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              ) : (
                drag === 2 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="black"
                    classNameName="upload-icon"
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )
              )}
              <h3 className="dynamic-message">
                {drag === 0
                  ? "Drag & drop any image here"
                  : drag === 1
                  ? "Drop your image here!"
                  : drag === 2 && "File Dropped Successfully!"}
              </h3>
              <label
                className="label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                or
                <span className="browse-files">
                  <input
                    type="file"
                    className="default-file-input"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  <span className="browse-files-text">browse file </span>
                  <span>from device</span>
                </span>
              </label>
            </div>
            <span className="cannot-upload-message">
              <span className="material-icons-outlined">error</span> Please
              select a file first
              <span className="material-icons-outlined cancel-alert-button">
                cancel
              </span>
            </span>
            <div className="file-block">
              <div className="file-info">
                <span className="material-icons-outlined file-icon">
                  description
                </span>
                <span className="file-name"> </span> |
                <span className="file-size"> </span>
              </div>
              <span className="material-icons remove-file-icon">delete</span>
              <div className="progress-bar"> </div>
            </div>
            <button
              type="button"
              className="upload-button"
              onClick={() => {
                if (!avatar) {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "please select your image",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                } else if (avatar.size > 2 * 1024 * 1024) {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "your image size shouldn't be more than 2Mbs",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                } else if (
                  !["png", "jpg", "jpeg", "gif", "webp"].includes(
                    avatar.type.split("/")[1]
                  )
                ) {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title:
                      "your image's type should be one of png , jpg , jpeg , gif or webp ",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                } else {
                  changeAvatar();
                }
              }}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAvatar;
