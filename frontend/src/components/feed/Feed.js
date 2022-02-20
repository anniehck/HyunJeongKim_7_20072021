import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const useProfileData = (user) => {
  const [profileData, setProfileData] = useState({});

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
  }, []);

  return profileData;
}

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const profileData = useProfileData(user);

  // let userId = JSON.parse(localStorage.getItem("user")).id;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/api/post/`, {
        headers: {
          JWToken: user.token,
        },
      });
      setPosts(res.data.posts);
      console.log(res.data);
      console.log(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share profileData={profileData} />
        <>
          <div className="title">Publications récentes</div>
          <hr />
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                profilePic={post.profilePic}
                firstname={post.firstname}
                createdAt={post.createdAt}
                content={post.content}
                image={post.image}
              />
            )
          })}
        </>
      </div>
    </div>
  );
}
