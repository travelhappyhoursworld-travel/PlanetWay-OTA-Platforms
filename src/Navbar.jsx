import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({
showPackages,
setShowPackages
}) {

const navigate = useNavigate();

const [showContact, setShowContact] =
useState(false);

return (

<header className="header">

  <div className="brand">
    <strong>PlanetWay</strong>
  </div>

  <nav>

    <button>
      Flights
    </button>

    <button>
      Hotels
    </button>

    <button>
      Rent a Car
    </button>

    <button
      onClick={() =>
        setShowPackages(
          !showPackages
        )
      }
    >
      Packages
    </button>

    <button
      onClick={() =>
        setShowContact(
          !showContact
        )
      }
    >
      Contact
    </button>

    <button
      className="loginBtn"
      onClick={() =>
        navigate("/login")
      }
    >
      Log In
    </button>

  </nav>

  {showContact && (

    <div className="contactPopup">

      <h3>
        PlanetWay OTA Platform
      </h3>

      <p>
        📞 +381659335732
      </p>

      <p>
        📧 office@planetway.com
      </p>

      <p>
        📧 sales@planetway.com
      </p>

      <p>
        📧 support@planetway.com
      </p>

      <p>
        📧 employee@planetway.com
      </p>

    </div>

  )}

</header>

);
}