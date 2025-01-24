import styles from "./MyVinylsRecord.module.css";
import { useState } from "react";
import VinylEditPopup from "../VinylEditPopup/VinylEditPopup";

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
  const [isVinylEditPopupOpen, setVinylEditPopupOpen] = useState<{
    vinyl_id: string;
    edition_mark: string;
    year_of_release: string;
    performer: string;
    album_name: string;
    goldmine_standard_vinyl: string;
    goldmine_standard_wrap: string;
    genre: string[];
    location: string;
    images: File[];
    description?: string;
  } | null>(null);

  const handleDelete = async () => {
    const token = localStorage.getItem("aToken");
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/vinyls/${vinyl_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Vinyl Deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed to delete Vinyl!");
      }
    } catch (error) {
      console.error("Error deleting vinyl:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleOpen = (
    vinyl_id: string,
    edition_mark: string,
    album: string,
    performer: string,
    genre: string[],
    picture_urls: string
  ) => {
    setVinylEditPopupOpen({
      vinyl_id,
      edition_mark,
      year_of_release: "Unknown", 
      performer,
      album_name: album,
      goldmine_standard_vinyl: "Unknown", 
      goldmine_standard_wrap: "Unknown", 
      genre,
      location: "Unknown", 
      images: [], 
      description: "", 
  });
};

  const handleClose = () => {
    setVinylEditPopupOpen(null);
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
          <img
            src="/images/pencil_icon.png"
            alt="Edit"
            onClick={() =>
              handleOpen(
                vinyl_id,
                edition_mark,
                album,
                performer,
                genre,
                picture_urls
              )
            }
          />
        </div>
        <div>
          <img
            src="/images/x_icon.png"
            alt="Delete"
            onClick={handleDelete}
          />
        </div>
      </div>
      {isVinylEditPopupOpen && (
        <div
          className={styles.popupBackground}
          onClick={handleClose} 
        >
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()} 
          >
            <VinylEditPopup
              vinyl={isVinylEditPopupOpen}
              onClose={handleClose}
            />
          </div>
        </div> 
      )}
    </>
  );
  
};

export default MyVinylsRecord;