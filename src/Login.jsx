import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (email === "admin@planetway.com") {
      navigate("/admin");
      return;
    }

    if (email === "employee@planetway.com") {
      navigate("/employee");
      return;
    }

    navigate("/user");
  };

  return (
    <div className="loginPage">

      <div className="loginCard">

        <button
          className="closeBtn"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h1 className="loginLogo">
          PlanetWay
        </h1>

        <p className="loginSubtitle">
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="loginMainBtn"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <button className="googleBtn">
          Continue with Google
        </button>

        <div className="loginLinks">

          <span>
            Forgot Password?
          </span>

          <span>
            Register
          </span>

        </div>

      </div>

    </div>
  );
}