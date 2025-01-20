import styles from "./MyVinylsRecord.module.css";

interface MyVinylsRecordProps {
  vinyl_id: string;
  edition_mark: string;
  album: string;
  performer: string;
  genre: string[];
  picture_urls: string;
}

const MyVinylsRecord: React.FC<MyVinylsRecordProps> = ({
  vinyl_id,
  edition_mark,
  album,
  performer,
  genre,
  picture_urls,
}) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    //const id = parseInt(vinyl_id); number or string?
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/vinyls/${vinyl_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //NOTHING TO SEND
        }
      );
      if (response.ok) {
        alert("Vinyl Deleted successfully!");
      } else {
        alert("Failed to delete Vinyl!");
      }
    } catch (error) {
      console.error("Error deleting vinyl:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className={styles.list_element}>{edition_mark}</div>
      <div>{album}</div>
      <div>{performer}</div>
      <div>{genre.join(", ")}</div>
      <div>{picture_urls}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/pencil_icon.png" alt="" />
        </div>
        <div>
          <img src="/images/x_icon.png" alt="" onClick={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default MyVinylsRecord;
