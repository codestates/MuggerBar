import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, useHistory, Redirect, Link } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Posting from "./pages/Posting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Recipes from "./pages/Recipes";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  // TODO: 서버에 유저정보 get 요청 후 로그인 상태 변경
  const isAuthenticated = () => {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    axios
      .get("https://localhost:80/userinfo", { withCredentials: true })
      .then((res) => {
        //console.log(res.data.data.userInfo);
        setUserInfo(res.data.data.userInfo);
        setIsLogin(true);
        history.push("/");
      })
      .catch((err) => console.log("err messege =>", err));
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post("https://localhost:4000/signout").then((res) => {
      setUserInfo(null);
      setIsLogin(false);
      history.push("/");
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Mainpage}></Route>
        {/* <Route exact path="/" component={Mainpage} userinfo={userinfo} handleLogout={handleLogout}></Route> */}
        <Route path="/posting" component={Posting}></Route>
        <Route exact path="/">
          <Mainpage />
        </Route>
        <Route path="/login">
          <Login handleResponseSuccess={handleResponseSuccess} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/mypage">
          <Mypage userInfo={userInfo} />
        </Route>
        <Route path="/Posting">
          <Posting />
        </Route>
        <Route path="/recipes">
          <Recipes userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
