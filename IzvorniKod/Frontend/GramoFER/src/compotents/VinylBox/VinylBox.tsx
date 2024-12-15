import styles from "./VinylBox.module.css";
import Vinyl from "../Vinyl/Vinyl";
import React, { useRef, useState } from "react";

interface Vinyl_color {
  by_genre: boolean;
  color: string;
}

const VinylBox: React.FC<Vinyl_color> = ({ by_genre, color }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [selectedVinyl, setSelectedVinyl] = useState<{
    title: string;
    url: string;
  } | null>(null);

  let number = 0;
  let V_count = 0;

  const Naslovi = [
    "Wavelength",
    "U njegovom srcu",
    "All you need is love",
    "The wild boys",
    "84",
    "Running up that hill",
    "Sun Street",
    "Haustor",
    "Diamond life",
    "Elektra",
    "Beutiful vision",
    "Etta Jones G.H.",
  ];
  const Url_slika = [
    "/images/Wave.jpg",
    "/images/Njeg.jpg",
    "/images/All.jpg",
    "/images/Duran.jpg",
    "/images/84.jpg",
    "/images/Kate.jpg",
    "/images/Sun.jpg",
    "/images/Haustor.jpg",
    "/images/DIA.jpg",
    "/images/Elektra.jpg",
    "/images/Beut.jpg",
    "/images/GT.jpg",
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
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -window.innerWidth * 0.5,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: window.innerWidth * 0.5,
        behavior: "smooth",
      });
    }
  };

  const handleVinylClick = (title: string, url: string) => {
    setSelectedVinyl({ title, url });
  };

  const closePopup = () => {
    setSelectedVinyl(null);
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
          const naslov =
            index < Naslovi.length ? Naslovi[index] : "Placeholder Title";
          const url =
            index < Url_slika.length
              ? Url_slika[index]
              : "/images/vinyl_blue.png";
          return (
            <Vinyl
              key={index}
              vinyl_genre={`vinylBox_${number}`}
              title={naslov}
              url={url}
              onClick={() => handleVinylClick(naslov, url)}
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
      {selectedVinyl && (
        <div className={styles.popupBackground} onClick={closePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.column}>
              <div className={styles.rowGrid}>
                <div className={styles.row}>
                  <img src={selectedVinyl.url} />
                  <div className={styles.smallImg}>
                    <img src={selectedVinyl.url} />
                    <img src={selectedVinyl.url} />
                    <img src={selectedVinyl.url} />
                    <img src={selectedVinyl.url} />
                  </div>
                </div>
                <h3>
                  Album name:
                  <br /> {selectedVinyl.title}
                </h3>
                <h3>
                  Genre:
                  <br />
                  somegenre
                </h3>
              </div>
              <div className={styles.vinDetails}>
                <h4>
                  Album name:
                  <br /> {selectedVinyl.title}
                </h4>
                <h4>
                  Genre:
                  <br />
                  somegenre
                </h4>
                <p>Performer: Lorem</p>
                <p>Year of release: Lorem</p>
                <p>Goldmine standard (Vinyl): Lorem</p>
                <p>Goldmine standard (Casing): Lorem</p>
                <p>Edition mark: Lorem</p>
                <p>Current location: Lorem</p>
              </div>
              <p>
                Description: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Fugit nemo eaque voluptatibus ducimus
              </p>
              <button className={styles.buttonExtra}>Ponudi zamjenu</button>
            </div>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VinylBox;
