import styles from "./MyWishlistRecord.module.css";
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
  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    const id = parseInt(wishId);
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/wishes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          //nothing to send again
        }
      );
      if (response.ok) {
        alert("Deleted wish sucessfully");
        window.location.reload();
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
