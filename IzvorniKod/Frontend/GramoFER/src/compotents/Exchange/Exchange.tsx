import styles from "./Exchange.module.css";
interface ExchangeInterface {
  senderAlbums: string[];
  receiverAlbums: string[];
  senderUsername: string;
  receiverUsername: string;
  senderId: string;
  receiverId: string;
  outgoing: boolean;
}

const Exchange: React.FC<ExchangeInterface> = ({
  senderAlbums,
  receiverAlbums,
  senderUsername,
  receiverUsername,
  outgoing,
}) => {
  return (
    <>
      <div className={styles.e_container}>
        <h3>{outgoing ? receiverUsername : senderUsername}</h3>
        <h3>{outgoing ? receiverAlbums : senderAlbums}</h3>
        <h3>{outgoing ? senderAlbums : receiverAlbums}</h3>
        <div
          className={
            outgoing ? styles.exchange_buttons_double : styles.exchange_buttons
          }
        >
          {!outgoing && (
            <div>
              <img src="/images/pencil_icon.png" alt="" />
            </div>
          )}
          <div>
            <img src="/images/checkmark.webp" alt="" />
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
