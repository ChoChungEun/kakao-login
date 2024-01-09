// import { useRecoilValue } from "recoil";
// import { useState, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import { isLogin } from "../atoms/login";

const Profile = () => {
  // const isLoggedIn = useRecoilValue(isLogin);
  // const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [nickName, setNickName] = useState("");
  // const [profileImage, setProfileImage] = useState("");

  // const getProfile = async () => {
  //   try {
  //     const data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //     });
  //     setEmail(data.kakao_account.email);
  //     setNickName(data.properties.nickname);
  //     setProfileImage(data.properties.profile_image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // const handleClickGoHome = () => {
  //   navigate("/");
  // };

  return (
    <>
      {/* {isLoggedIn && (
        <div>
          <h2>WELCOME! {nickName} 🙌</h2>
          <h3>Your email is.. {email}</h3>
          <img src={profileImage}></img>
        </div>
      )} */}
      {/* <button onClick={handleClickGoHome}>Home으로 돌아가기</button> */}
    </>
  );
};

export default Profile;
