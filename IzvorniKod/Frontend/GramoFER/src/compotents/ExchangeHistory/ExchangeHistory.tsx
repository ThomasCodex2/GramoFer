import styles from "./ExchangeHistory.module.css";

const history = true;
const ExchangeHistory = () => {
  return (
    <>
      <div className={styles.history}>
        <div className={styles.info}>From</div>
        <div className={styles.info}>Their</div>
        <div className={styles.info}>For Your</div>
        <div className={styles.info}>Date</div>
        {!history && <h2>There are no previous exchanges!</h2>}
        {history && (
          <>
            <h3>Penguin123</h3>
            <div className={styles.vinyl_container}>
              <img src="/images/Njeg.jpg" />
            </div>
            <div className={styles.vinyl_container}>
              <img src="/images/Sun.jpg" />
            </div>
            <h3>23.12.2024.</h3>
            {/* <div className={styles.HistoryFooter}>
              <span>
                Showing{" "}
                <select id="number" name="number">
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>{" "}
                of 1
              </span>
            </div>*/}
          </>
        )}
      </div>
    </>
  );
};
export default ExchangeHistory;
