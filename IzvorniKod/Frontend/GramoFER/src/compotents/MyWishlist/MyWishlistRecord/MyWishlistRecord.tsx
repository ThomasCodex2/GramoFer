import styles from "./MyWishlistRecord.module.css";
import { useNavigate } from "react-router-dom";
interface MyWish {
  albumName: string;
  artistName: string;
  wishId: string;
}

const MyWishlistRecord: React.FC<MyWish> = ({
  albumName,
  artistName,
  wishId,
}) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/wishes/${wishId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Deleted wish sucessfully");
        navigate("/my-wishlist");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting wish:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div>{albumName}</div>
      <div>{artistName}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/x_icon.png" alt="" onClick={handleDelete} />
        </div>
      </div>
    </>
  );
};
export default MyWishlistRecord;
