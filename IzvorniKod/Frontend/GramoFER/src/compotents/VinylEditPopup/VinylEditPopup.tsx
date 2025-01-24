import { useState } from "react";
import styles from "./VinylEditPopup.module.css";
import axios from "axios";  

interface VinylEditPopupProps {
  vinyl: {
    vinyl_id: string;
    edition_mark: string;
    year_of_release: string;
    performer: string;
    album_name: string;
    goldmine_standard_vinyl: string;
    goldmine_standard_wrap: string;
    genre: string[];
    location: string;
    images: File[]; // For drag-and-drop images
    description?: string;
  };
  onClose: () => void;
}

const VinylEditPopup: React.FC<VinylEditPopupProps> = ({ vinyl, onClose }) => {
  const [formData, setFormData] = useState({
    edition_mark: vinyl.edition_mark,
    year_of_release: vinyl.year_of_release,
    performer: vinyl.performer,
    album_name: vinyl.album_name,
    goldmine_standard_vinyl: vinyl.goldmine_standard_vinyl,
    goldmine_standard_wrap: vinyl.goldmine_standard_wrap,
    genre: vinyl.genre.join(", "),
    location: vinyl.location,
    images: vinyl.images,
    description: vinyl.description || "",
  });

  const handleChange = (field: string, value: string | File[] | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
  try {
    // Prepare the data to send
    const vinylData = {
      edition_mark: formData.edition_mark,
      year_of_release: formData.year_of_release,
      performer: formData.performer,
      album_name: formData.album_name,
      goldmine_standard_vinyl: formData.goldmine_standard_vinyl,
      goldmine_standard_wrap: formData.goldmine_standard_wrap,
      genre: formData.genre.split(", ").map((g) => g.trim()), // Convert string to array
      location: formData.location,
      description: formData.description,
      images: [], // Handle images if needed
    };

    // Make the API call
    const response = await axios.post(
      `/update/${vinyl.vinyl_id}`, // Backend endpoint
      vinylData, // Data to send
      {
        headers: {
          "Content-Type": "application/json", // Specify JSON
        },
      }
    );

    console.log("API Response:", response.data);
    alert("Changes saved successfully!");
    onClose();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      alert(`Failed to save: ${error.response?.data || "Unknown error"}`);
    } else {
      console.error("Unexpected error:", error);
      alert("Failed to save: Unexpected error occurred.");
    }
  }
};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      handleChange("images", uploadedFiles);
    }
  };

  const handleClearImages = () => {
    handleChange("images", []);
  };

  return (
    <div
      className={styles.popupBackground}
      onClick={onClose} 
    >
      <div
        className={styles.popupContent}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>Edit Vinyl Details</h2>
        <div>
          <label>Edition mark:</label>
          <input
            type="text"
            value={formData.edition_mark}
            onChange={(e) => handleChange("edition_mark", e.target.value)}
          />
        </div>
        <div>
          <label>Year of release:</label>
          <input
            type="text"
            value={formData.year_of_release}
            onChange={(e) => handleChange("year_of_release", e.target.value)}
          />
        </div>
        <div>
          <label>Performer:</label>
          <input
            type="text"
            value={formData.performer}
            onChange={(e) => handleChange("performer", e.target.value)}
          />
        </div>
        <div>
          <label>Album name:</label>
          <input
            type="text"
            value={formData.album_name}
            onChange={(e) => handleChange("album_name", e.target.value)}
          />
        </div>
        <div>
          <label>Goldmine standard (vinyl):</label>
          <input
            type="text"
            value={formData.goldmine_standard_vinyl}
            onChange={(e) => handleChange("goldmine_standard_vinyl", e.target.value)}
          />
        </div>
        <div>
          <label>Goldmine standard (wrap):</label>
          <input
            type="text"
            value={formData.goldmine_standard_wrap}
            onChange={(e) => handleChange("goldmine_standard_wrap", e.target.value)}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div>
          <label>Drag and drop or click here to add images (max 4):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.images.length > 0 && (
            <div className={styles.image_list}>
              {formData.images.map((file, index) => (
                <span key={index}>{file.name}</span>
              ))}
            </div>
          )}
          <button onClick={handleClearImages}>Clear Images</button>
        </div>
        <div>
          <label>Description (optional):</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default VinylEditPopup;
