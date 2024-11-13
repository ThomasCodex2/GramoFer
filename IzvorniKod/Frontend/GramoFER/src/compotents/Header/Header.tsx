import styles from "./Header.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

function Header() {
  const handleLoginSuccess = (response: any) => {
    console.log("Login Success: ", response);
    // Handle the response, such as storing the token in local storage or state
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div className={styles.header}>
      <div className={[styles.row].join(" ")}>
        <img
          src="/images/logo_reversed_no_bg.png"
          alt=""
          className={styles.logo}
        />
      </div>
      <div className={styles.temp}></div>
      <div className={[styles.row, styles.site_links].join(" ")}>
        <Link to="/" className={styles.link}>
          <h3>Offers</h3>
        </Link>
        <Link to="/my-vinyls" className={styles.link}>
          <h3>My Vinyls</h3>
        </Link>
        <Link to="/my-exchanges" className={styles.link}>
          <h3>My Exchanges</h3>
        </Link>
        <div className={styles.google_btn}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
