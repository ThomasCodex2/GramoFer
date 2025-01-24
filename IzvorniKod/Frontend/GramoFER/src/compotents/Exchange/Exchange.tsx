import styles from "./Exchange.module.css";
import { useNavigate } from "react-router-dom";
interface ExchangeInterface {
  albumname: string;
  exchangeid: string;
  isoffering: string[];
  username: string;
  outgoing: boolean;
  history: boolean;
}

const Exchange: React.FC<ExchangeInterface> = ({
  albumname,
  exchangeid,
  isoffering,
  username,
  outgoing,
  history,
}) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    const id = parseInt(exchangeid);
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/exchange/update/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //NOTHING TO SEND
        }
      );
      if (response.ok) {
        alert("Exchange Deleted successfully!");
        navigate("/");
      } else {
        alert("Failed to delete Exchange!");
      }
    } catch (error) {
      console.error("Error deleting exchange:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className={history ? styles.history_container : styles.e_container}>
        <h3 className={styles.list_element} data-full-text={username}>
          {username}
        </h3>
        <h3
          className={styles.list_element}
          data-full-text={outgoing ? albumname : isoffering.join(", ")}
        >
          {outgoing ? albumname : isoffering.join(", ")}
        </h3>
        <h3
          className={styles.list_element}
          data-full-text={outgoing ? isoffering.join(", ") : albumname}
        >
          {outgoing ? isoffering.join(", ") : albumname}
        </h3>
        {!history ? (
          <div
            className={
              outgoing
                ? styles.exchange_buttons_double
                : styles.exchange_buttons
            }
          >
            {!outgoing && (
              <div>
                <img src="/images/checkmark.webp" alt="" />
              </div>
            )}
            <div>
              <img src="/images/pencil_icon.png" alt="" />
            </div>
            <div>
              <img src="/images/x_icon.png" alt="" onClick={handleDelete} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Exchange;
