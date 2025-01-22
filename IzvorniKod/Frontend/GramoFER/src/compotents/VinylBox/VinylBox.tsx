import styles from "./VinylBox.module.css";
import Vinyl from "../Vinyl/Vinyl";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Vinyl_color {
  by_genre: boolean;
  color: string;
  navigate: ReturnType<typeof useNavigate>;
}

interface VinylRecord {
  available: number;
  coverCondition: string;
  coverImagePath1: string; //url
  coverImagePath2: string;
  description: string;
  editionLabel: {
    albumName: string; //title
    artistName: string;
    editionLabel: string;
    belongsToGenreGenres: { genreId: number; genreName: string }[]; //genre
    countryOfOrigin: string;
    releaseDate: number;
  };
  onLocation: string;
  vinylCondition: string;
  vinylId: string; //number
  vinylImagePath1: string;
  vinylImagePath2: string;
}
const VinylBox: React.FC<Vinyl_color> = ({ by_genre, color, navigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVinyl, setSelectedVinyl] = useState<{
    title: string;
    url: string;
    belongsToGenreGenres: string[];
    performer: string;
    YearOfRelease: number;
    vinylCondition: string;
    coverCondition: string;
    editionMark: string;
    location: string;
    description: string;
  } | null>(null);
  const [vinylRecords, setVinylRecords] = useState<VinylRecord[]>([]);

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
    "/images/Njeg.jpg",
    "/images/All.jpg",
    "/images/Duran.jpg",
    "/images/Wave.jpg",
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

  const handleVinylClick = (vinylId?: number) => {
    if (vinylId === 500) {
      // Placeholder logic
      setSelectedVinyl({
        title: "Placeholder Title",
        url: "",
        belongsToGenreGenres: ["Placeholder Genre"],
        performer: "Placeholder Performer",
        YearOfRelease: 1984,
        vinylCondition: "Placeholder Condition",
        coverCondition: "Placeholder Condition",
        editionMark: "Placeholder Edition",
        location: "Placeholder Location",
        description: "This is a placeholder description.",
      });
    } else {
      navigate(`/vinyl/${vinylId}`);
    }
  };

  const closePopup = () => {
    setSelectedVinyl(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await fetch(
          "https://gramofer.work.gd/api/vinyls/vinyl"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vinyls");
        }

        const vinylsData: VinylRecord[] = await response.json();

        console.log("Vinyls data:", vinylsData);

        setVinylRecords(vinylsData);
      } catch (error) {
        console.error("Error fetching vinyls:", error);
      }
    };
    fetchVinyls();
  }, []);
  const { vinylId } = useParams();

  useEffect(() => {
    if (vinylId && vinylRecords.length > 0) {
      const selected = vinylRecords.find(
        (vinyl) => parseInt(vinyl.vinylId) === Number(vinylId)
      );
      if (selected) {
        setSelectedVinyl({
          title: selected.editionLabel.albumName,
          url: selected.coverImagePath1,
          belongsToGenreGenres: selected.editionLabel.belongsToGenreGenres.map(
            (genre) => genre.genreName
          ),
          performer: selected.editionLabel.artistName,
          YearOfRelease: selected.editionLabel.releaseDate,
          vinylCondition: selected.vinylCondition,
          coverCondition: selected.coverCondition,
          editionMark: selected.editionLabel.editionLabel,
          location: selected.onLocation,
          description: selected.description,
        });
      } else {
        setSelectedVinyl(null);
      }
    }
  }, [vinylId, vinylRecords]);
  // useEffect(() => {
  //   if (!vinylId) {
  //     setSelectedVinyl(null);
  //   }
  // }, [vinylId]);
  const changePicture = (event: React.MouseEvent<HTMLImageElement>) => {
    const bigImage = document.getElementById("bigPicture") as HTMLImageElement;
    if (bigImage && event.target instanceof HTMLImageElement) {
      bigImage.src = event.target.src;
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
        {!by_genre &&
          vinylRecords.map((vinyl) => (
            <Vinyl
              key={vinyl.vinylId}
              //vinyl_genre={`vinylBox_${index}`}
              title={vinyl.editionLabel.albumName}
              url={vinyl.coverImagePath1 || "/images/placeholder_vinyl.jpg"}
              onClick={() => handleVinylClick(parseInt(vinyl.vinylId))}
            />
          ))}
        {Array.from({ length: V_count }).map((_, index) => {
          const naslov =
            index < Naslovi.length ? Naslovi[index] : "Placeholder Title";
          const url = index < Url_slika.length ? Url_slika[index] : "";
          return (
            <Vinyl
              key={index}
              //vinyl_genre={`vinylBox_${number}`}
              title={naslov}
              url={url}
              onClick={() => handleVinylClick(500)}
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
                  <img
                    id="bigPicture"
                    src={selectedVinyl.url || "/images/placeholder_vinyl.jpg"}
                  />
                  <div className={styles.smallImg}>
                    <img
                      src={selectedVinyl.url || "/images/vinyl_blue.png"}
                      onClick={changePicture}
                    />
                    <img
                      src={selectedVinyl.url || "/images/vinyl_back.jpg"}
                      onClick={changePicture}
                    />
                    <img
                      src={selectedVinyl.url || "/images/vinyl_blue.png"}
                      onClick={changePicture}
                    />
                    <img
                      src={selectedVinyl.url || "/images/vinyl_back.jpg"}
                      onClick={changePicture}
                    />
                  </div>
                </div>
                <h3>
                  Album name:
                  <br /> {selectedVinyl.title}
                </h3>
                <h3>
                  Genre:
                  <br />
                  {selectedVinyl.belongsToGenreGenres.join(", ") ||
                    "GENRE IN WIP"}
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
                  {selectedVinyl.belongsToGenreGenres.join(", ") ||
                    "GENRE IN WIP"}
                </h4>
                <p>Performer: {selectedVinyl.performer || "PERFORMER"}</p>
                <p>Year of release: {selectedVinyl.YearOfRelease || "YEAR"}</p>
                <p>
                  Goldmine standard (Vinyl):{" "}
                  {selectedVinyl.vinylCondition || "CONDITION"}
                </p>
                <p>
                  Goldmine standard (Cover):{" "}
                  {selectedVinyl.coverCondition || "CONDITION"}
                </p>
                <p>Edition mark: {selectedVinyl.editionMark || "EDITION"}</p>
                <p>Current location: {selectedVinyl.location || "LOCATION"}</p>
              </div>
              <p>
                Description:{" "}
                {selectedVinyl.description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nemo eaque voluptatibus ducimus"}
              </p>
              <div className={styles.buttonDiv}>
                <div></div>
                <button className={styles.buttonExtra}>Ponudi zamjenu</button>
              </div>
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
