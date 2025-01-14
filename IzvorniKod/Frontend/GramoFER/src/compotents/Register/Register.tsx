import styles from "./Register.module.css";
import { useState } from "react";

const Register = () => {
  const [activeButton, setActiveButton] = useState("register");

  const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(event.currentTarget.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_contain}>
        <h2>Newcomer or returning user?</h2>
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
            className={[styles.form_style, styles.register_form].join(" ")}
          >
            <div>
              <label htmlFor="">Email: </label>
              <input type="text" placeholder="" maxLength={30} required />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input type="password" placeholder="" maxLength={30} required />
            </div>
            <div>
              <label htmlFor="">Firstname: </label>
              <input type="text" placeholder="" maxLength={30} required />
            </div>
            <div>
              <label htmlFor="">Lastname: </label>
              <input type="text" placeholder="" maxLength={30} required />
            </div>
            <div className={styles.double}>
              <label htmlFor="">Username: </label>
              <input type="text" placeholder="" maxLength={30} required />
            </div>
            <button
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
            className={[styles.form_style, styles.login_form].join(" ")}
          >
            <div>
              <label htmlFor="">Email: </label>
              <input type="text" placeholder="" maxLength={30} required />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input type="password" placeholder="" maxLength={30} required />
            </div>
            <button
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
