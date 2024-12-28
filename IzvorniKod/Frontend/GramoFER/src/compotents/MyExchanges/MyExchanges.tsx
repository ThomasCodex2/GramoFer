import styles from "./MyExchanges.module.css";
import Exchange from "../Exchange/Exchange";
const pending_out = true;
const pending_in = false;

const MyExchanges = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Outgoing:</h1>
        <div className={styles.pending}>
          {!pending_out && <h2>There are no current outgoing exchanges</h2>}
          {pending_out && (
            <>
              <div className={styles.exchanges}>
                <div>To:</div>
                <div>Your:</div>
                <div>For their:</div>
                <div>Action</div>
              </div>
              <Exchange />
            </>
          )}
        </div>
        <h1>Incoming:</h1>
        <div className={styles.pending}>
          {!pending_in && <h2>There are no current incoming exchanges</h2>}
          {pending_in && (
            <>
              <div className={styles.exchanges}>
                <div>From:</div>
                <div>Their:</div>
                <div>For Your:</div>
                <div>Action</div>
              </div>
              <p>adasda</p>
            </>
          )}
        </div>
        <h1>Previous exchanges:</h1>
      </div>
    </>
  );
};
export default MyExchanges;
