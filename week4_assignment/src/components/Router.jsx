import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUp';
import MyPage from '../pages/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path={`/main/:memberId`} element={<MainPage />}></Route>
        <Route path={`/my/:memberId`} element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
