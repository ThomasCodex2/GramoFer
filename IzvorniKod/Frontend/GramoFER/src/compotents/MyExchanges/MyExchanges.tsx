import styles from "./MyExchanges.module.css";
import Exchange from "../Exchange/Exchange";
const pending_out = true;
const pending_in = true;
const prev_out = true;
const prev_in = true;
const MyExchanges = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.prev}>Current Exchanges</h1>
        <h2 className={styles.out}>Outgoing pending</h2>
        <div className={styles.pending}>
          {!pending_out && <h2>There are no current outgoing exchanges</h2>}
          {pending_out && (
            <>
              <div className={styles.exchanges}>
                <div>To</div>
                <div>Your</div>
                <div>For their</div>
                <div>Action</div>
              </div>
              <Exchange
                senderAlbums={["VanMorris"]}
                receiverAlbums={["WaveLength", "Duran Duran"]}
                receiverUsername="Penguin123"
                receiverId="numbers"
                senderUsername="Your username"
                senderId="your id"
                outgoing={true}
              />
              <Exchange
                senderAlbums={["U njegovom srcu", "Black Hole Sun"]}
                receiverAlbums={["Elektra"]}
                receiverUsername="MusicLVR"
                receiverId="numbers"
                senderUsername="Your username"
                senderId="your id"
                outgoing={true}
              />
            </>
          )}
        </div>
        <h2 className={styles.in}>Incoming pending</h2>
        <div className={styles.pending}>
          {!pending_in && <h2>There are no current incoming exchanges</h2>}
          {pending_in && (
            <>
              <div className={styles.exchanges}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
                <div>Action</div>
              </div>
              <Exchange
                senderAlbums={["GT", "Diamond"]}
                receiverAlbums={["84"]}
                receiverUsername="Yourusername"
                receiverId="numbers"
                senderUsername="MusicLVR"
                senderId="your id"
                outgoing={false}
              />
            </>
          )}
        </div>
        <h1 className={styles.prev}>Previous exchanges</h1>
        <h2 className={styles.out}>Outgoing history</h2>
        <div className={styles.pending}>
          {!prev_out && <h2>There were no previous outgoing exchanges</h2>}
          {prev_out && (
            <>
              <div className={styles.exchanges}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
                <div>Action</div>
              </div>
              <Exchange
                senderAlbums={["Wave"]}
                receiverAlbums={["some album"]}
                receiverUsername="Yourusername"
                receiverId="numbers"
                senderUsername="MusicLVR"
                senderId="your id"
                outgoing={true}
              />
            </>
          )}
        </div>
        <h2 className={styles.in}>Incoming history</h2>
        <div className={styles.pending}>
          {!prev_in && <h2>There were no previous incoming exchanges</h2>}
          {prev_in && (
            <>
              <div className={styles.exchanges}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
                <div>Action</div>
              </div>
              <Exchange
                senderAlbums={["All", "Beut"]}
                receiverAlbums={["Kate"]}
                receiverUsername="Yourusername"
                receiverId="numbers"
                senderUsername="MusicLVR"
                senderId="your id"
                outgoing={false}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MyExchanges;
