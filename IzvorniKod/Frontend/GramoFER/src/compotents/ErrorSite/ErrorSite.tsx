import { Link } from "react-router-dom";
import styles from "./ErrorSite.module.css";
const ErrorSite = () => {
  return (
    <div className={styles.container}>
      <h1>Think that record is scratched...</h1>
      <h2>Error 404: Page not Found</h2>
      <Link to="/" className={styles.return_btn}>
        <button>Return to offers</button>
      </Link>
    </div>
  );
};
export default ErrorSite;
