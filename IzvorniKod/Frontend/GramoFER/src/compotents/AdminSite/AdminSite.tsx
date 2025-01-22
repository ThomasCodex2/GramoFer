import AdminSiteUserElement from "../AdminSiteUserElement/AdminSiteUserElement";
import VinylsRecord from "../VinylsRecord/VinylsRecord";
import styles from "./AdminSite.module.css";
import { useEffect, useState } from "react";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
  userId: number;
  username: string;
}

interface VinylsData {
  available: string;
  vinylId: string;
  vinylCondition: string;
  coverCondition: string;
  description: string;
  vinylImagePath1: string;
  vinylImagePath2: string;
  coverImagePath1: string;
  coverImagePath2: string;
  editionLabel: {
    editionLabel: string;
    artistName: string;
    releaseDate: string;
    albumName: string;
    countryOfOrigin: string;
    belongsToGenreGenres: { genreId: string; genreName: string }[];
  };
  onLocation: string;
}

const AdminSite = () => {
  const [UsersData, setUsersData] = useState<UserData[]>([]);
  const [VinylsData, setVinlysData] = useState<VinylsData[]>([]);
  useEffect(() => {
    const fetchVinyls = async () => {
      const token = localStorage.getItem("aToken");

      // if (token !== null) {
      //   console.log("Token found:", token);
      // } else {
      //   console.log("No token found");
      // }
      try {
        const response = await fetch(
          `https://gramofer.work.gd/api/admintable/allvinyls`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch vinyls: ${response.status}`);
        }
        const text = await response.text();
        if (!text) {
          console.error("Empty response from server for vinyls");
          return;
        }
        const allVinyls = JSON.parse(text);
        setVinlysData(allVinyls);
        console.log("allVinyls data:", allVinyls);
      } catch (error) {
        console.error("Error fetching vinyls:", error);
      }
    };
    fetchVinyls();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("aToken");

      if (token !== null) {
        console.log("Token found:", token);
      } else {
        console.log("No token found");
      }
      try {
        const response = await fetch(
          `https://gramofer.work.gd/api/admintable/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const text = await response.text();
        if (!text) {
          console.error("Empty response from server for users");
        }
        const allUsers = JSON.parse(text);
        setUsersData(allUsers);
        console.log("AllUsers data:", allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const placeholderDate = new Date();
  return (
    <>
      <div className={styles.container}>
        <h1>Handle accounts</h1>
        <div className={styles.account_list}>
          <div className={styles.listing}>Email</div>
          <div className={styles.listing}>First name</div>
          <div className={styles.listing}>Last name</div>
          <div className={styles.listing}>Username</div>
          <div className={styles.listing}>Registration date</div>
          <div className={styles.listing}>Ban</div>
          {UsersData.length > 0 ? (
            UsersData.map((user) => (
              <AdminSiteUserElement
                userId={user.userId.toString()}
                username={user.username}
                email={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                registrationDate={new Date(user.registrationDate)}
              />
            ))
          ) : (
            <h2 className={styles.all_columns}>There are currently no users</h2>
          )}
          <AdminSiteUserElement
            userId="x"
            username="Perica"
            email="somemail@mail.com"
            firstName="Pero"
            lastName="Peric"
            registrationDate={placeholderDate}
          ></AdminSiteUserElement>
          <AdminSiteUserElement
            userId="x"
            username="BadWord"
            email="asdadasdasdsas@mail.com"
            firstName="Novak"
            lastName="Novo"
            registrationDate={placeholderDate}
          ></AdminSiteUserElement>
        </div>
        <h1>Handle Vinyls</h1>
        <div className={styles.vinyl_list}>
          <div className={styles.listing}>Edition mark</div>
          <div className={styles.listing}>Album name</div>
          <div className={styles.listing}>Performer</div>
          <div className={styles.listing}>Genre</div>
          <div className={styles.listing}>Display picture</div>
          <div className={styles.listing}>Delete Vinyl</div>
          {VinylsData.length > 0 ? (
            VinylsData.map((vinyl) => (
              <VinylsRecord
                vinyl_id={vinyl.vinylId}
                edition_mark={vinyl.editionLabel.editionLabel}
                album={vinyl.editionLabel.albumName}
                performer={vinyl.editionLabel.artistName}
                genre={
                  vinyl.editionLabel.belongsToGenreGenres?.map(
                    (genre) => genre.genreName
                  ) || [""]
                }
                picture_urls={vinyl.coverImagePath1}
                adminSite={true}
              />
            ))
          ) : (
            <h2 className={styles.all_columns}>
              There are currently no vinyls{" "}
            </h2>
          )}
          <VinylsRecord
            vinyl_id="x"
            edition_mark="1203"
            album="Wavelength"
            performer="lorem"
            genre={["pop"]}
            picture_urls="pic_url"
            adminSite={true}
          />
          <VinylsRecord
            vinyl_id="x"
            edition_mark="1014"
            album="The Wild Boys"
            performer="ipsums"
            genre={["pop"]}
            picture_urls="pic_url"
            adminSite={true}
          />
        </div>
      </div>
    </>
  );
};
export default AdminSite;
