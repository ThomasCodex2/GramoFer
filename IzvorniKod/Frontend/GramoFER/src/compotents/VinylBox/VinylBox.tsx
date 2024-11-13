import styles from "./VinylBox.module.css";
import Vinyl from "../Vinyl/Vinyl";
import React, { useRef } from "react";

interface Vinyl_color {
  by_genre: boolean;
  color: string;
}

const VinylBox: React.FC<Vinyl_color> = ({ by_genre, color }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let number = 0;
  let V_count = 0;

  const Naslovi = [
    "Wavelength",
    "U njegovom srcu",
    "All you need is love",
    "The wild boys",
  ];
  const Url_slika = [
    "/images/Wave.jpg",
    "/images/Njeg.jpg",
    "/images/All.jpg",
    "/images/Duran.jpg",
  ];

  if (by_genre) {
    switch (color) {
      case "Rock":
        number = 1;
        V_count = 4;
        break;
      case "Blues":
        number = 2;
        V_count = 7;
        break;
      case "Pop":
        number = 3;
        V_count = 12;
        break;
      default:
        number = 1;
        V_count = 1;
    }
  } else {
    number = 6;
    V_count = 4;
  }
  let vinylclass = `vinylBox_${number}`;
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -800,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 800,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={scrollLeft}
        className={`${styles.arrowButton} ${styles.leftArrow}`}
      >
        <img src="/images/left.png" alt="" />
      </button>

      <div className={styles.filter_row} ref={scrollContainerRef}>
        {Array.from({ length: V_count }).map((_, index) => {
          let naslov = "";
          let url = "";

          if (index < Naslovi.length) {
            naslov = Naslovi[index];
            url = Url_slika[index];
          } else {
            naslov = "Placeholder Title";
            url = "/images/vinyl_blue.png";
          }

          if (by_genre) {
            vinylclass = `vinylBox_${number}`;
          } else {
            const randomColor = Math.floor(Math.random() * 3) + 1;
            vinylclass = `vinylBox_${randomColor}`;
          }
          return (
            <Vinyl
              key={index}
              vinyl_genre={vinylclass}
              title={naslov}
              url={url}
            />
          );
        })}
      </div>
      <button
        onClick={scrollRight}
        className={`${styles.arrowButton} ${styles.rightArrow}`}
      >
        <img src="/images/right.png" alt="" />
      </button>
    </div>
  );
};

export default VinylBox;
