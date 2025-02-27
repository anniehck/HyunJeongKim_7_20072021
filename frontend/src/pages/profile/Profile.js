import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  let navigate = useNavigate();
  let { id: userId } = useParams();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          JWToken: user.token,
        },
      });
      setProfileData(res.data);
    };
    fetchUserProfile();
  }, [userId]);
  //Upload profile picture
  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    axios
      .put(`http://localhost:3000/api/user/update/${userId}`, data, {
        headers: {
          JWToken: user.token,
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage(res.data);
          window.location.replace(`/profile/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Update information (firstname, lastname, email)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const updateInfo = () => {
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    axios
      .put(`http://localhost:3000/api/user/update/${userId}`, data, {
        headers: {
          JWToken: user.token,
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setEmail({ ...email, email: email });
          setLastname({ ...lastname, lastname: lastname });
          setFirstname({ ...firstname, firstname: firstname });
          window.location.replace(`/profile/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Delete user account
  const handleDelete = () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer votre compte ?`))
      return;
    axios
      .delete(`http://localhost:3000/api/user/delete/${userId}`, {
        headers: {
          JWToken: user.token,
        },
      })
      .then(() => {
        localStorage.clear();
        window.location.reload();
        navigate(`/`);
      });
  };
  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <Link to="/">
          <FontAwesomeIcon icon={faTimes} className="profileClose" />
        </Link>
        <form className="profileTop">
          <label htmlFor="image" className="profileTop__upload">
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name="image"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              onChange={(e) => setImage(e.target.files[0])}
              aria-label="modifier votre image"
            />{" "}
            <img
              className="profileTop__img"
              src={
                profileData.profilePic ||
                "http://localhost:3000/images/default-avatar.png"
              }
              alt="profile pic"
            ></img>
          </label>
          <FontAwesomeIcon
            icon={faImage}
            className="profileTop__icon"
            onClick={handleUpload}
          />
        </form>
        <div className="profileBottom">
          <form className="profileBottom__info">
            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstname"
                placeholder={profileData.firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastname"
                placeholder={profileData.lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></input>
            </label>
            <label className="profileBottom__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                placeholder={profileData.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </label>
          </form>
        </div>
        <div className="profileButtons">
          <button className="profileSave" onClick={updateInfo}>
            Enregistrer
          </button>
          <button className="profileDelete" onClick={handleDelete}>
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
