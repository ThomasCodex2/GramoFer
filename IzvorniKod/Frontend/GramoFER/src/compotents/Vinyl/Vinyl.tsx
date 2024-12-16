import styles from "./Vinyl.module.css";
import React from "react";
interface VinylProps {
  vinyl_genre: string;
  title: string;
  url: string;
  onClick?: () => void;
}
const Vinyl: React.FC<VinylProps> = ({ vinyl_genre, title, url, onClick }) => {
  return (
    <>
      <div
        className={[styles.vinylBox, styles[vinyl_genre]].join(" ")}
        onClick={onClick}
      >
        <img src={url} alt="image" />
        <div>
          <h3>{title}</h3>
        </div>
      </div>
    </>
  );
};
export default Vinyl;
