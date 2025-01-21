import styles from "./MyWishlist.module.css";

const MyWishlist = () => {
  return (
    <>
      <div className={styles.container}>
        <form className={styles.listing_form} action="">
          <h2 className={styles.wish_title}>Add a Vinyl to your wishlist</h2>
          <div>
            Album name:
            <input
              type="text"
              name="edition.editionLabel" //will need change?
              // value={formData.edition.editionLabel}
              // onChange={handleInputChange} not needed till backend works
              required
              maxLength={20}
            ></input>
          </div>
          <div>
            Performer:
            <input
              type="text"
              name="edition.artistName" //will need change?
              // value={formData.edition.artistName}
              // onChange={handleInputChange} not needed till backend works
              required
              maxLength={20}
            ></input>
          </div>
          <div>
            Edition mark:
            <input
              type="text"
              name="edition.editionLabel"
              // value={formData.edition.editionLabel}
              // onChange={handleInputChange}
              required
              maxLength={20}
            ></input>
          </div>
          <button className={styles.submit_div}>Save wish &#x27A4;</button>
        </form>
        <h1>My Wishlist</h1>
        <div className={styles.wish_list}>
          <div className={styles.listing}>Album name</div>
          <div className={styles.listing}>Performer</div>
          <div className={styles.listing}>Edition</div>
          <div className={styles.listing}>Delete Wish</div>
          {/* CREATE WISH SUBCOMPONENT (unknown elements to send)*/}
          <div>placeholder album name</div>
          <div>placeholder performer name</div>
          <div>placeholder Edition</div>
          <div className={styles.exchange_buttons}>
            <div>
              <img src="/images/x_icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyWishlist;
