# 소개
- 서버없는 카카오톡 로그인 with kakao sdk

- 사실 프론트에서는 24번째 줄에있는 인가코드만`params.get("code")` 넘기고 서버 백엔드에서 인증을 완료하여 DB 저장을 하고 jwt 토큰을 던져주는 방식으로 소셜 로그인은 완료가 된다.
  - 백엔드 처리과정
    - 백엔드에서 이 인가코드로 액세스토큰을 발급받아 그 액세스토큰으로 유저정보를 조회해서 DB에 저장한 후  백엔드에서 jwt 토큰을 프론트로 전달하면 로그인 과정은 끝난다. 


# 사전준비
- 애플리케이션 추가하기
   - `https://developers.kakao.com/console/app`
   - 해당 블로그 참고 (https://lulu-developmentlog.tistory.com/268)


# flow
1. main page
2. 카카오톡 로그인하기 버튼 클릭
   - 카카오톡 자체 로그인 화면으로 이동 (`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`)
3. 카카오톡 자체 로그인 화면 등장
   - 로그인 시도
       - 로그인 성공하면 카카오 개발자 콘솔에서 등록한 redirect url 주소로 이동 `auth/kakao/callback` 
         - 그러면 리액트에서는 해당 url에 라우터를 만들어 컴포넌트를 만들어주면 된다.
           - 해당 컴포넌트 코드의 동작은 이렇다 `로그인 시도 -> 성공 -> 토큰 저장 -> profile 화면으로 이동`
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
         
