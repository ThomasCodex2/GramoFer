import styles from "./Register.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface RegFormValues {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
}
interface LogFormValues {
  email: string;
  password: string;
}
const API_BASE_URL = "https://gramofer.work.gd";

const Register = () => {
  const [activeButton, setActiveButton] = useState("register");

  const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(event.currentTarget.id);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urltoken = urlParams.get("token");
    if (urltoken) {
      localStorage.setItem("aToken", urltoken);
      navigate("/");
      return;
    }
  });
  const handleLogResult = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: LogFormValues = {
      email: "",
      password: "",
    };
    formData.forEach((value, key) => {
      if (key in formValues) {
        formValues[key as keyof LogFormValues] = value.toString();
      }
    });

    console.log("Form values to be sent:", JSON.stringify(formValues, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully", data);
        navigate("/");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error occurred during form submission", error);
    }
  };

  const handleRegSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const formValues: RegFormValues = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
    };
    formData.forEach((value, key) => {
      if (key in formValues) {
        formValues[key as keyof RegFormValues] = value.toString();
      }
    });

    console.log("Form values to be sent:", JSON.stringify(formValues, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully", data);
        alert("Accout created succesfully!");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error occurred during form submission", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_contain}>
        <h2>Newcomer or returning user?</h2>
        <h3 className={styles.undertext}>Choose one</h3>
        <div className={styles.buttons}>
          <button
            id="register"
            className={[
              styles.reg_button,
              activeButton === "register" ? styles.active_button : "",
            ].join(" ")}
            onClick={handleButtonPress}
          >
            Register
          </button>
          <button
            id="login"
            className={[
              styles.login_button,
              activeButton === "login" ? styles.active_button : "",
            ].join(" ")}
            onClick={handleButtonPress}
          >
            Login
          </button>
        </div>
        {activeButton === "register" && (
          <form
            action=""
            onSubmit={handleRegSubmit}
            className={[styles.form_style, styles.register_form].join(" ")}
          >
            <div>
              <label htmlFor="">Email: </label>
              <input
                name="email"
                type="text"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input
                name="password"
                type="password"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <div>
              <label htmlFor="">Firstname: </label>
              <input
                name="firstname"
                type="text"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <div>
              <label htmlFor="">Lastname: </label>
              <input
                name="lastname"
                type="text"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <div className={styles.double}>
              <label htmlFor="">Username: </label>
              <input
                name="username"
                type="text"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <button
              type="submit"
              className={[
                styles.submit_button,
                activeButton === "register" ? styles.register : styles.login,
              ].join(" ")}
            >
              {activeButton}
            </button>
          </form>
        )}
        {activeButton === "login" && (
          <form
            action=""
            onSubmit={handleLogResult}
            className={[styles.form_style, styles.login_form].join(" ")}
          >
            <div>
              <label htmlFor="">Email: </label>
              <input
                name="email"
                type="text"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input
                name="password"
                type="password"
                placeholder=""
                maxLength={30}
                required
              />
            </div>
            <button
              type="submit"
              className={[
                styles.submit_button,
                activeButton === "login" ? styles.login : styles.register,
              ].join(" ")}
            >
              {activeButton}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Register;
