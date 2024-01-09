import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../config";
import { isLogin } from "../atoms/login";

const Home = () => {
  const isLoggedIn = useRecoilValue(isLogin);
  const navigate = useNavigate();

  const handleClickGoProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      <p>Welcome!</p>
      <p>
        {isLoggedIn ? (
          <button onClick={handleClickGoProfile}>마이페이지</button>
        ) : (
          <Login />
        )}
      </p>
    </div>
  );
};

export default Home;

function Login() {
  return <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>;
}
