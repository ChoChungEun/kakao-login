# 소개
- 서버없는 카카오톡 로그인 with kakao sdk


# 사전준비
- 애플리케이션 추가하기
   - `https://developers.kakao.com/console/app`
   - 해당 블로그 참고 (https://lulu-developmentlog.tistory.com/268)


# flow
1. main page
2. 카카오톡 로그인하기 버튼 클릭
   - 해당 url 로 이동
   - `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
3. 카카오톡 자체 로그인 화면 등장
   - 로그인 성공
       - 성공시에 카카오 개발자 콘솔에서 등록한 `redirect url` 주소로 이동
         - `auth/kakao/callback`
         - 그러면 리액트에서는 해당 url에 접근할때 동작할 코드를 만들어주면 된다
           - `로그인 시도 -> 성공 -> 토큰 저장 -> profile 화면으로 이동`
              ```
                const params = new URL(document.URL).searchParams;
                const code = params.get("code");
              
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
                    // profile 페이지로 이동
                    navigate("/profile");
                  } catch (err) {
                    console.log(err);
                  }
                };
              
                useEffect(() => {
                  getToken();
                }, []);
              
              ```
4. 로그인 성공 후 프로필 화면 등장
    - 로그인 한 정보를 받아와서 화면에 보여줌
      ```
        const getProfile = async () => {
          try {
            const data = await window.Kakao.API.request({
              url: "/v2/user/me",
            });
            setEmail(data.kakao_account.email);
            setNickName(data.properties.nickname);
            setProfileImage(data.properties.profile_image);
          } catch (err) {
            console.log(err);
          }
        };
      
        useEffect(() => {
          getProfile();
        }, []);
      ```
         
