import styles from "./MyVinylsRecord.module.css";

interface MyVinylsRecordProps {
  edition_mark: string;
  album: string;
  performer: string;
  genre: string;
  picture_urls: string;
}

const MyVinylsRecord: React.FC<MyVinylsRecordProps> = ({
  edition_mark,
  album,
  performer,
  genre,
  picture_urls,
}) => {
  return (
    <>
      <div className={styles.list_element}>{edition_mark}</div>
      <div>{album}</div>
      <div>{performer}</div>
      <div>{genre}</div>
      <div>{picture_urls}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/pencil_icon.png" alt="" />
        </div>
        <div>
          <img src="/images/x_icon.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default MyVinylsRecord;
