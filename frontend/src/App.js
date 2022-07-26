import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import Landing from "./Pages/landing/Landing";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Home from "./Pages/home/Home";
import UserAccount from "./Pages/userAccount/UserAccount";

import UserContextProvider from "./Context/UserContext";
import Topic from "./Pages/topic/Topic";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div className="App">
          <header>
            <Navbar />
          </header>

          <div>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/home" element={<Home />} />

              <Route path="/userAccount" element={<UserAccount />} />

              <Route path="/:id" element={<Topic />} />

              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
