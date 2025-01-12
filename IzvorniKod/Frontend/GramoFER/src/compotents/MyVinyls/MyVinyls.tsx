import styles from "./MyVinyls.module.css";
import MyVinylsRecord from "../MyVinylsRecord/MyVinylsRecord";
const MyVinyls = () => {
  return (
    <div className={styles.container}>
      <h1>My Vinyls</h1>
      <form>
        <button>Add Vinyl</button>
      </form>
      <div className={styles.vinyl_list}>
        <div>Edition mark</div>
        <div>Album name</div>
        <div>Performer</div>
        <div>Genre</div>
        <div>Display picture</div>
        <div>Edit/Delete record</div>
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
  );
};
export default MyVinyls;
