import styles from "./MyVinyls.module.css";
import MyVinylsRecord from "../MyVinylsRecord/MyVinylsRecord";
import { useState, useRef } from "react";

const MyVinyls = () => {
  const [images, setImages] = useState<string[]>([]);
  const maxImages = 4;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result && typeof result === "string") {
            setImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Only image files are allowed!");
      }
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <div className={styles.container}>
      <form className={styles.listing_form} action="">
        <h1>
          Add <span>YOUR</span> records here!
        </h1>
        <div>
          Edition mark: <input type="text" required maxLength={20}></input>
        </div>
        <div>
          Year of release:{" "}
          <input type="number" required min={1948} max={2025}></input>
        </div>
        <div>
          Performer: <input type="text" required></input>
        </div>
        <div>
          Album name:
          <input type="text" required></input>
        </div>
        <div>
          Goldmine standard {"(vinyl)"}: <input type="text" required></input>
        </div>
        <div>
          Goldmine standard {"(wrap)"}: <input type="text" required></input>
        </div>
        <div>
          Genre: <input type="text" required></input>
        </div>
        <div>
          Location: <input type="text" required></input>
        </div>
        <div
          className={styles.picture_drop}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div id="dropZone" className={styles.dropZone} onClick={handleClick}>
            Drag and drop or click here to add images {"(max 4)"}
          </div>
          <div id="preview" className={styles.preview}>
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Preview ${index + 1}`} />
            ))}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className={styles.clear_button}
            onClick={clearImages}
          >
            Clear Images
          </button>
        </div>
        <div className={styles.desc}>
          Description {"(optional)"}:{" "}
          <input type="text" maxLength={200}></input>
        </div>
        <button className={styles.add_button}>Add Vinyl</button>
      </form>
      <h1>My Vinyls</h1>
      <div className={styles.vinyl_list}>
        <div className={styles.listing}>Edition mark</div>
        <div className={styles.listing}>Album name</div>
        <div className={styles.listing}>Performer</div>
        <div className={styles.listing}>Genre</div>
        <div className={styles.listing}>Display picture</div>
        <div className={styles.listing}>Edit/Delete record</div>
        <MyVinylsRecord
          edition_mark="1203"
          album="Wavelength"
          performer="lorem"
          genre="pop"
          picture_urls="pic_url"
        />
        <MyVinylsRecord
          edition_mark="1014"
          album="The Wild Boys"
          performer="ipsums"
          genre="pop"
          picture_urls="pic_url"
        />
      </div>
    </div>
  );
};
export default MyVinyls;
