import styles from "./MyExchanges.module.css";
import Exchange from "../Exchange/Exchange";
import { useEffect, useState } from "react";
const API_BASE_URL = "https://gramofer.work.gd";

interface userExchange {
  albumname: string;
  exchangeid: string;
  isoffering: string[];
  username: string;
}

const MyExchanges = () => {
  const [IncomingActiveExchanges, setIncomingActiveExchanges] = useState<
    userExchange[]
  >([]);
  const [OutgoingActiveExchanges, setOutgoingActiveExchanges] = useState<
    userExchange[]
  >([]);
  const [IncomingDoneExchanges, setIncomingDoneExchanges] = useState<
    userExchange[]
  >([]);
  const [OutgoingDoneExchanges, setOutgoingDoneExchanges] = useState<
    userExchange[]
  >([]);
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
        setOutgoingActiveExchanges(OutActExc);
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
        setIncomingActiveExchanges(IncActExc);
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
        setOutgoingDoneExchanges(OutDoneExc);
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
        setIncomingDoneExchanges(IncDoneExc);
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
          {OutgoingActiveExchanges.length > 0 ? (
            <>
              <div className={styles.exchanges}>
                <div>To</div>
                <div>Your</div>
                <div>For their</div>
                <div>Action</div>
              </div>
              {OutgoingActiveExchanges.map((exchange) => {
                <Exchange
                  albumname={exchange.albumname}
                  exchangeid={exchange.exchangeid}
                  isoffering={exchange.isoffering}
                  username={exchange.username}
                  outgoing={true}
                  history={false}
                />;
              })}
              <Exchange
                albumname={"albumName"}
                exchangeid={"id"}
                isoffering={["offers"]}
                username={"username"}
                outgoing={true}
                history={false}
              />
            </>
          ) : (
            <h2>There are no current outgoing exchanges</h2>
          )}
        </div>
        <h2 className={styles.in}>Incoming pending</h2>
        <div className={styles.pending}>
          {IncomingActiveExchanges.length > 0 ? (
            <>
              <div className={styles.exchanges}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
                <div>Action</div>
              </div>
              {IncomingActiveExchanges.map((exchange) => {
                <Exchange
                  albumname={exchange.albumname}
                  exchangeid={exchange.exchangeid}
                  isoffering={exchange.isoffering}
                  username={exchange.username}
                  outgoing={true}
                  history={false}
                />;
              })}
              <Exchange
                albumname={"albumName"}
                exchangeid={"id"}
                isoffering={["offers"]}
                username={"username"}
                outgoing={false}
                history={false}
              />
            </>
          ) : (
            <h2>There are no current incoming exchanges</h2>
          )}
        </div>
        <h1 className={styles.prev}>Previous exchanges</h1>
        <h2 className={styles.out}>Outgoing history</h2>
        <div className={styles.pending}>
          {OutgoingDoneExchanges.length > 0 ? (
            <>
              <div className={styles.history_exchange}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
              </div>
              {OutgoingDoneExchanges.map((exchange) => {
                <Exchange
                  albumname={exchange.albumname}
                  exchangeid={exchange.exchangeid}
                  isoffering={exchange.isoffering}
                  username={exchange.username}
                  outgoing={true}
                  history={false}
                />;
              })}
              <Exchange
                albumname={"albumName"}
                exchangeid={"id"}
                isoffering={["offers"]}
                username={"username"}
                outgoing={true}
                history={true}
              />
            </>
          ) : (
            <h2>There were no previous outgoing exchanges</h2>
          )}
        </div>
        <h2 className={styles.in}>Incoming history</h2>
        <div className={styles.pending}>
          {IncomingDoneExchanges.length > 0 ? (
            <>
              <div className={styles.history_exchange}>
                <div>From</div>
                <div>Their</div>
                <div>For Your</div>
              </div>
              {IncomingDoneExchanges.map((exchange) => {
                <Exchange
                  albumname={exchange.albumname}
                  exchangeid={exchange.exchangeid}
                  isoffering={exchange.isoffering}
                  username={exchange.username}
                  outgoing={true}
                  history={false}
                />;
              })}
              <Exchange
                albumname={"albumName"}
                exchangeid={"id"}
                isoffering={["offers"]}
                username={"username"}
                outgoing={false}
                history={true}
              />
            </>
          ) : (
            <h2>There were no previous incoming exchanges</h2>
          )}
        </div>
      </div>
    </>
  );
};
export default MyExchanges;
