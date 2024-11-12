import styles from "./Header.module.css";
import { GoogleLogin } from "@react-oauth/google";

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
        <h1>GramoFER</h1>
      </div>
      <div></div>
      <div className={[styles.row, styles.site_links].join(" ")}>
        <div>
          <h3>Ponude</h3>
        </div>
        <div>
          <h3>Moje ploče</h3>
        </div>
        <div>
          <h3>Moje zamjene</h3>
        </div>
        <div>
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
