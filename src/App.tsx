import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import SignIn from "./Signin";
import UserHome from "./UserHome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<UserHome />} />

        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </>
  );
};

export default App;
