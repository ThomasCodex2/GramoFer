import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Header() {
  // const handleLoginSuccess = (response: any) => {
  //   console.log("Login Success: ", response);
  // };

  // const handleLoginFailure = () => {
  //   console.log("Login Failed");
  // };
  const checkLocal = () => {
    console.log(localStorage);
  };
  const notify_test = false;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uriToken = urlParams.get("token");
    if (uriToken) {
      localStorage.setItem("aToken", uriToken);
      console.log(localStorage);
      return;
    }
  });
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
        <div className={styles.link_contain}>
          <Link to="/" className={styles.link}>
            <h3>Offers</h3>
          </Link>
        </div>
        <div className={styles.link_contain}>
          <Link to="/my-vinyls" className={styles.link}>
            <h3>My Vinyls</h3>
            {notify_test && <div className={styles.notify}></div>}
          </Link>
        </div>
        <div className={styles.link_contain}>
          <Link to="/my-exchanges" className={styles.link}>
            <h3>My Exchanges</h3>
            {notify_test && <div className={styles.notify}></div>}
          </Link>
        </div>
        <div className={styles.google_btn}>
          <Link to="/register" className={styles.link}>
            <button className={styles.reg_btn}>Register</button>
          </Link>
          <a
            href="https://gramofer.work.gd/api/auth/google"
            className={styles.google_login_button}
          >
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
