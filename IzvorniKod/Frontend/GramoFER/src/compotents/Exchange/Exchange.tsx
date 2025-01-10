import styles from "./Exchange.module.css";

const Exchange = () => {
  return (
    <>
      <div className={styles.e_container}>
        <h3>Penguin123</h3>
        <div className={styles.vinyl_container}>
          <img src="/images/Wave.jpg" />
          <img src="/images/84.jpg" />
        </div>
        <div className={styles.vinyl_container}>
          <img src="/images/Beut.jpg" />
          <img src="/images/DIA.jpg" />
          <img src="/images/Duran.jpg" />
        </div>
        <div className={styles.exchange_buttons}>
          <div>
            <img src="/images/pencil_icon.png" alt="" />
          </div>
          <div>
            <img src="/images/x_icon.png" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.e_container}>
        <h3>MusicLVR</h3>
        <div className={styles.vinyl_container}>
          <img src="/images/GT.jpg" />
        </div>
        <div className={styles.vinyl_container}>
          <img src="/images/Haustor.jpg" />
        </div>
        <div className={styles.exchange_buttons}>
          <div>
            <img src="/images/pencil_icon.png" alt="" />
          </div>
          <div>
            <img src="/images/x_icon.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Exchange;
