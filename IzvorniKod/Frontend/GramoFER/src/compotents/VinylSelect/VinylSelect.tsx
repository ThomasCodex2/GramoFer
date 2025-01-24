import styles from "./VinylSelect.module.css";
import VinylBox from "../VinylBox/VinylBox";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const VinylSelect = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const yearInput = (
      e.currentTarget.elements.namedItem("year") as HTMLInputElement
    )?.value;
    const genreInput = (
      e.currentTarget.elements.namedItem("genre") as HTMLInputElement
    )?.value;
    const searhTermInput = (
      e.currentTarget.elements.namedItem("search") as HTMLInputElement
    )?.value;

    setYear(yearInput ? parseInt(yearInput) : null);
    setGenre(genreInput || "");
    setSearchTerm(searhTermInput || "");
    console.log(
      "YEAR BEING SEND: ",
      parseInt(yearInput),
      " GENRE BEING SEND: ",
      genreInput,
      " TERM BEING SEND: ",
      searhTermInput
    );
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("aToken");
    const fetchAdmin = async () => {
      try {
        const AdminResponse = await fetch(
          `https://gramofer.work.gd/api/admintable/admin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (AdminResponse.ok) {
          const adminCheck = await AdminResponse.json();
          if (parseInt(adminCheck) == 1) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
        console.error(error);
      }
    };
    fetchAdmin();
  });
  return (
    <div className={styles.container}>
      {isAdmin && (
        <Link to="/admin-site">
          <button className={styles.adminButton}>Admin Page button</button>
        </Link>
      )}
      <div className={styles.welcome_banner}>
        <div className={styles.image_crop}></div>
        <div className={styles.banner_text}>
          <h1>Welcome to GramoFER</h1>
          <p>
            Your go-to hub for vinyl discovery and distribution — find, share,
            and celebrate the world of gramophone records with enthusiast alike!
          </p>
        </div>
      </div>
      <div className={styles.content_bg}>
        <div className={styles.filter}>
          <div className={styles.block_header}>
            <h2>
              List of <u>ALL</u> our vinyls!
            </h2>
          </div>
          <VinylBox
            filter={false}
            year={0}
            genre={""}
            searchTerm={""}
            navigate={navigate}
          ></VinylBox>
        </div>
        <hr></hr>
        <div className={[styles.filter].join(" ")}>
          <div className={styles.block_header}>
            <h2>
              Got the <i>groove</i> but not the note? Try by genre or year:
            </h2>
            <form className={styles.genre_select} onSubmit={handleSubmit}>
              <div className={styles.input_fields}>
                {" "}
                <label htmlFor="year">Year: </label>
                <input
                  type="number"
                  min="1948"
                  max="2025"
                  name="year"
                  id="year"
                  className={styles.select}
                  placeholder="Input year"
                />
                <label htmlFor="genre"> genre: </label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  className={styles.select}
                  placeholder="Input genre"
                  required
                />
                <label htmlFor="search"> search term: </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className={styles.select}
                  placeholder="Input search term"
                  required
                />
              </div>
              <button type="submit" className={styles.icon_contain}>
                Search
                <img src="/images/magnify_icon.webp" alt=""></img>
              </button>
            </form>
          </div>
          <VinylBox
            filter={true}
            year={year || 0}
            genre={genre}
            searchTerm={searchTerm}
            navigate={navigate}
          ></VinylBox>
        </div>
      </div>
    </div>
  );
};
export default VinylSelect;
