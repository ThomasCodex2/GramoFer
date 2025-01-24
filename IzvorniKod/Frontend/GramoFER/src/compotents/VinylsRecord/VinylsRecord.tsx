import styles from "./VinylsRecord.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VinylEditPopup from "../VinylEditPopup/VinylEditPopup";

interface VinylsRecordProps {
  vinyl_id: string;
  edition_mark: string;
  album: string;
  performer: string;
  genre: string[];
  picture_urls: string;
  adminSite: boolean;
}

const VinylsRecord: React.FC<VinylsRecordProps> = ({
  vinyl_id,
  edition_mark,
  album,
  performer,
  genre,
  picture_urls,
  adminSite,
}) => {
  const navigate = useNavigate();
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
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/admintable/vinyl/${vinyl_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        {!adminSite && (
          <div>
            <img
              src="/images/pencil_icon.png"
              alt="Edit"
              onClick={() =>
                handleOpen(vinyl_id, edition_mark, album, performer, genre, picture_urls)
              }
            />
          </div>
        )}
        <div>
          <img
            src="/images/x_icon.png"
            alt="Delete"
            onClick={adminSite ? handleAdminDelete : handleDelete}
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

export default VinylsRecord;
