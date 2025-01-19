import styles from "./Vinyl.module.css";
import React from "react";
//removed color based on genre for now
interface VinylProps {
  title: string;
  url: string;
  onClick?: () => void;
}
const Vinyl: React.FC<VinylProps> = ({ title, url, onClick }) => {
  return (
    <>
      <div className={[styles.vinylBox].join(" ")} onClick={onClick}>
        <img src={url} alt="image" />
        <div>
          <h3>{title}</h3>
        </div>
      </div>
    </>
  );
};
export default Vinyl;
