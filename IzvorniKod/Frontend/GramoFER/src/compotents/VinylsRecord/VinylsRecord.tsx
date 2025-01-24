import styles from "./VinylsRecord.module.css";
import { useNavigate } from "react-router-dom";
interface MyVinylsRecordProps {
  vinyl_id: string;
  edition_mark: string;
  album: string;
  performer: string;
  genre: string[];
  picture_urls: string;
  adminSite: boolean;
}

const VinylsRecord: React.FC<MyVinylsRecordProps> = ({
  vinyl_id,
  edition_mark,
  album,
  performer,
  genre,
  picture_urls,
  adminSite,
}) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    //const id = parseInt(vinyl_id); number or string?
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/vinyls/${vinyl_id}`,
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
        alert("Vinyl Deleted successfully!");
        navigate("/my-vinyls");
      } else {
        alert("Failed to delete Vinyl!");
      }
    } catch (error) {
      console.error("Error deleting vinyl:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleAdminDelete = async () => {
    const token = localStorage.getItem("aToken");
    //const id = parseInt(vinyl_id); number or string?
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/admintable/vinyl/${vinyl_id}`,
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
        alert("Vinyl ADMIN Deleted successfully!");
        navigate("/admin-site");
      } else {
        alert("Failed to ADMIN delete Vinyl!");
      }
    } catch (error) {
      console.error("Error ADMIN deleting vinyl:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className={styles.vinyl_element} data-full-text={edition_mark}>
        {edition_mark}
      </div>
      <div className={styles.vinyl_element} data-full-text={album}>
        {album}
      </div>
      <div className={styles.vinyl_element} data-full-text={performer}>
        {performer}
      </div>
      <div className={styles.vinyl_element} data-full-text={genre.join(", ")}>
        {genre.join(", ")}
      </div>
      <div className={styles.vinyl_element} data-full-text={picture_urls}>
        {picture_urls}
      </div>
      <div className={styles.exchange_buttons}>
        {adminSite == false ? (
          <div>
            <img src="/images/pencil_icon.png" alt="" />
          </div>
        ) : (
          ""
        )}
        <div>
          <img
            src="/images/x_icon.png"
            alt=""
            onClick={adminSite == false ? handleDelete : handleAdminDelete}
          />
        </div>
      </div>
    </>
  );
};

export default VinylsRecord;