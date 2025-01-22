import styles from "./MyWishlistRecord.module.css";
interface MyWish {
  albumName: string;
  artistName: string;
}

const MyWishlistRecord: React.FC<MyWish> = ({ albumName, artistName }) => {
  //WISH DELETION NOT IMPLEMENTED YET (?)
  return (
    <>
      <div>{albumName}</div>
      <div>{artistName}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/x_icon.png" alt="" />
        </div>
      </div>
    </>
  );
};
export default MyWishlistRecord;
