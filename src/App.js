import { useEffect, useState, createContext } from "react";
// import { BrowserRouter as  Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CopyRight from "./components/CopyRight.jsx";
import axios from "axios";
import Navbar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ShowStatus from "./pages/ShowStatus.jsx";
import ShowTicket from "./pages/ShowTicket.jsx";
import Status from "./pages/Status.jsx";
import Test from "./pages/Test.jsx";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const USER_URL = "http://localhost:8000/api/user";
      const res = await axios.get(USER_URL, {
        withCredentials: true,
      });
      if (res.data?.name) setUser(res.data);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/status" element={<ShowStatus />} />
          <Route path="/status/:ticketID" exact element={<Status />} />
          <Route
            path="/test/:contestID/:problemIndex"
            exact
            element={<Test />}
          />
          <Route
            path="/status/ticket/:ticketID"
            exact
            element={<ShowTicket />}
          />
        </Routes>
        <CopyRight />
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
