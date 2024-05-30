import { useNavigate } from "react-router-dom";
import "./../styles/style3.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const updateProfile = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  const manageEvents = (event) => {
    event.preventDefault();
    navigate("/createevent");
  };

  const logout = (event) => {
    event.preventDefault();
    // Perform logout functionality, such as clearing user session
    // Then redirect to the login page
    navigate("/login");
  };

  return (
    <div>
      <div>
        <div className="wrapper">
          <nav className="nav">
            <div className="Bikers Portal">
              <p>Biker's Portal</p>
            </div>
            <div className="nav-menu">
              <ul>
                <li>
                  <a href="#" onClick={updateProfile}>
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" onClick={manageEvents}>
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="dashboard-content"></div>
        </div>
        ;
      </div>
    </div>
  );
};

export default Dashboard;
