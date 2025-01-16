import AdminSiteUserElement from "../AdminSiteUserElement/AdminSiteUserElement";
import MyVinylsRecord from "../MyVinylsRecord/MyVinylsRecord";
import styles from "./AdminSite.module.css";

const AdminSite = () => {
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
            email="somemail@mail.com"
            firstname="Pero"
            lastname="Peric"
            username="Perica"
          ></AdminSiteUserElement>
          <AdminSiteUserElement
            email="dasfasdadas@asdasda.com"
            firstname="Novak"
            lastname="Novo"
            username="Bad_word"
          ></AdminSiteUserElement>
        </div>
        <h1>Handle Vinyls</h1>
        <div className={styles.vinyl_list}>
          <div className={styles.listing}>Edition mark</div>
          <div className={styles.listing}>Album name</div>
          <div className={styles.listing}>Performer</div>
          <div className={styles.listing}>Genre</div>
          <div className={styles.listing}>Display picture</div>
          <div className={styles.listing}>Edit/Delete Vinyl</div>
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
    </>
  );
};
export default AdminSite;
