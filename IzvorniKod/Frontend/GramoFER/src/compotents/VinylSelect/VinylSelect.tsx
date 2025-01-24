import styles from "./VinylSelect.module.css";
import VinylBox from "../VinylBox/VinylBox";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const VinylSelect = () => {
  const [selectedGenre, setSelectedGenre] = useState("Rock");
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };
  const navigate = useNavigate();
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
            by_genre={false}
            color={"random"}
            navigate={navigate}
          ></VinylBox>
        </div>
        <hr></hr>
        <div className={[styles.filter].join(" ")}>
          <div className={styles.block_header}>
            <h2>
              Got the <i>groove</i> but not the note? Try by genre or year:
            </h2>
            <form className={styles.genre_select}>
              <div className={styles.input_fields}>
                {" "}
                <input
                  type="text"
                  name="year"
                  id="year"
                  className={styles.select}
                  placeholder="Input year"
                />
                <label htmlFor="options"> genre: </label>
                <select
                  id="options"
                  name="options"
                  className={styles.select}
                  value={selectedGenre}
                  onChange={handleGenreChange}
                >
                  <option value="Rock">Rock</option>
                  <option value="Blues">Blues</option>
                  <option value="Pop">Pop</option>
                </select>
              </div>

              <button className={styles.icon_contain}>
                <img src="/images/magnify_icon.webp" alt=""></img>
              </button>
            </form>
          </div>
          <VinylBox
            by_genre={true}
            color={selectedGenre}
            navigate={navigate}
          ></VinylBox>
        </div>
      </div>
    </div>
  );
};
export default VinylSelect;
