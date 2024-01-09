import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { isLogin } from "../atoms/login";
import { CLIENT_SECRET, REDIRECT_URI, REST_API_KEY } from "../config";

const Auth = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLogin);

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  console.log("code", code);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      // window.Kakao: developers.kakao.com 에서 제공하는 sdk
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return <div>로그인 진행중입니다..</div>;
};

export default Auth;
