import styles from "./MyExchanges.module.css";
import Exchange from "../Exchange/Exchange";
import { useEffect } from "react";
const pending_out = true;
const pending_in = true;
const prev_out = true;
const prev_in = true;
const API_BASE_URL = "https://gramofer.work.gd";

const MyExchanges = () => {
  useEffect(() => {
    const token = localStorage.getItem("aToken");
    const fetchOutgoingActiveExchages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/exchange/myExchangesActive`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const OutActExc = await response.json();
        console.log("OutgoingActiveExchanges: ", OutActExc);
        //TODO, SET FOR LOCAL VARIABLE
      } catch (error) {
        console.error("ERROR FETCHING OutActExc: ", error);
      }
    };
    const fetchIncomingActiveExchages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/exchange/incomingExchangesActive`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const IncActExc = await response.json();
        console.log("IncomingActiveExchanges: ", IncActExc);
        //TODO, SET FOR LOCAL VARIABLE
      } catch (error) {
        console.error("ERROR FETCHING IncActExc: ", error);
      }
    };
    const fetchOutgoingDoneExchages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/exchange/myExchangesDone`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const OutDoneExc = await response.json();
        console.log("OutgoingDoneExchanges: ", OutDoneExc);
        //TODO, SET FOR LOCAL VARIABLE
      } catch (error) {
        console.error("ERROR FETCHING OutDoneExc: ", error);
      }
    };
    const fetchIncomingDoneExchages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/exchange/incomingExchangesDone`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const IncDoneExc = await response.json();
        console.log("IncomingDoneExchanges: ", IncDoneExc);
        //TODO, SET FOR LOCAL VARIABLE
      } catch (error) {
        console.error("ERROR FETCHING IncDoneExc: ", error);
      }
    };
    fetchOutgoingActiveExchages();
    fetchIncomingActiveExchages();
    fetchOutgoingDoneExchages();
    fetchIncomingDoneExchages();
  }, []);
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
