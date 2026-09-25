import { useNavigate } from "react-router-dom";

export default function Topbar() {

const navigate = useNavigate();

return (

<div className="topbar">

  <div className="topbarLeft">

    <h1>
      PlanetWay Admin Panel V17
    </h1>

    <span className="versionBadge">
      OTA Platform
    </span>

  </div>

  <div className="topbarRight">

    <button
      className="darkBtn"
      onClick={() =>
        document.body.classList.toggle(
          "darkMode"
        )
      }
    >
      🌙
    </button>

    <span>
      Administrator
    </span>

    <button
      className="logoutBtn"
      onClick={() =>
        navigate("/")
      }
    >
      Exit
    </button>

  </div>

</div>

);

}