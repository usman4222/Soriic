import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Header from "./components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AddUser from "./Pages/AddUser/AddUser";
import AllUser from "./Pages/AllUsers/AllUser";
import UpdateUser from "./Pages/UpdateUser/UpateUser";
import Attendance from "./Pages/employeeAttendance.js/Attendance";
import UserAttendance from "./Pages/employeeAttendance.js/UserAttendance";
import AttendanceDetails from "./Pages/employeeAttendance.js/AttendanceDetails";
import Finance from "./Pages/Finance/Finance";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/allusers" element={<AllUser />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/:id" element={<UserAttendance />} />
        <Route path="/attendance/view/:id" element={<AttendanceDetails />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
