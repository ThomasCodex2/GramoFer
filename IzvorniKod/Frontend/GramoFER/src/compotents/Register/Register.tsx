import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor="">Register</label>
        <form action="" className={styles.form_contain}>
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
        <label htmlFor="">Login</label>
        <form action="" className={styles.form_contain}>
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
export default Register;
