import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const defaultAvatar = "http://localhost:3000/images/default-avatar.png"

export default function Post({
  profilePic, 
  firstname, 
  createdAt, 
  content, 
  image 
}) {
  // const [content, setContent] = useState("");
  // const [file, setFile] = useState(null);
  // const [image, setImage] = useState();
  const formatter = buildFormatter(frenchStrings);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={profilePic || defaultAvatar}
            alt=""
          ></img>
          <span className="postTop__user">{firstname}</span>
          <span className="postTop__postDate">
            <TimeAgo date={createdAt} formatter={formatter} />
          </span>
        </div>
        <div className="postCenter">
          <span className="postCenter__text">{content}</span>
          {image && (
            <>
              <img
                className="postCenter__img"
                src={image}
                alt="illustration du post"
              />
            </>
          )}
        </div>
  
        {/* <div className="postBottom">
              <div className="postBottom__like">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="postBottom__like--icon"
                />
                <span className="postBottom__like--counter">2</span>
              </div>
               <span className="postBottom__noComments">0 commentaires</span>
            </div> */}
      </div>
    </div>
  );
}
