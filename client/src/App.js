import { Routes, Route } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Dashboard from "./pages/Dashboard";
// import CreateEvent from "./pages/Createevent";
// import EventForm from "./pages/Createevent";
// //import CreateEvent from "./../../models/eventModel";
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/profile" element={<Footer />} />
        <Route path="/createevent" element={<EventForm />} />
      </Routes> */}
      <div className="App">
        <Navbar />
        <Home />
        <Register />
        <Footer />
      </div>
    </>
  );
}

export default App;
