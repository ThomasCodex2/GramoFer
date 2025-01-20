import AdminSiteUserElement from "../AdminSiteUserElement/AdminSiteUserElement";
import MyVinylsRecord from "../MyVinylsRecord/MyVinylsRecord";
import styles from "./AdminSite.module.css";
import { useEffect } from "react";
const AdminSite = () => {
  useEffect(() => {
    const fetchVinyls = async () => {
      const token = localStorage.getItem("aToken");

      if (token !== null) {
        console.log("Token found:", token);
      } else {
        console.log("No token found");
      }
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
          throw new Error("Failed to fetch vinyls");
        }
        const allVinyls = await response.json();
        // const myVinylsData: MyVinylsData[] = await response.json();
        // setMyVinylsData(myVinylsData); CHANGE FOR ADMINTABLE
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
          throw new Error("Failed to fetch users");
        }
        const allUsers = await response.json();
        // const myVinylsData: MyVinylsData[] = await response.json();
        // setMyVinylsData(myVinylsData); CHANGE FOR ADMINTABLE
        console.log("AllVinyls data:", allUsers);
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
          <div className={styles.listing}>Ban</div>
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
          <MyVinylsRecord
            vinyl_id="x"
            edition_mark="1203"
            album="Wavelength"
            performer="lorem"
            genre={["pop"]}
            picture_urls="pic_url"
          />
          <MyVinylsRecord
            vinyl_id="x"
            edition_mark="1014"
            album="The Wild Boys"
            performer="ipsums"
            genre={["pop"]}
            picture_urls="pic_url"
          />
        </div>
      </div>
    </>
  );
};
export default AdminSite;
