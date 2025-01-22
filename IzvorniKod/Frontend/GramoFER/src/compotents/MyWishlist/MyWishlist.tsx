import { useState, useEffect } from "react";
import styles from "./MyWishlist.module.css";
import MyWishlistRecord from "./MyWishlistRecord/MyWishlistRecord";
interface Wish {
  artistName: string;
  albumName: string;
}
interface WishFormData {
  artistName: string;
  albumName: string;
}
const MyWishlist = () => {
  const [AllWishes, setAllWishes] = useState<Wish[]>([]);
  const [WishFormData, setWishFormData] = useState<WishFormData>({
    artistName: "",
    albumName: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("aToken");
    if (token !== null) {
      console.log("Token found:", token);
    } else {
      console.log("No token found");
    }

    console.log(JSON.stringify(WishFormData));
    try {
      const response = await fetch(`https://gramofer.work.gd/wishes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(WishFormData),
      });

      if (response.ok) {
        alert("Wish added sucessfully!");
        setWishFormData({
          artistName: "",
          albumName: "",
        });
        window.location.reload();
      } else {
        alert("Failed to add wish. Please try again.");
      }
    } catch (error) {
      console.error("Error adding wish:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWishFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchWishes = async () => {
      const token = localStorage.getItem("aToken");

      if (token !== null) {
        console.log("Token found:", token);
      } else {
        console.log("No token found");
      }
      try {
        const response = await fetch(
          `https://gramofer.work.gd/api/wishes/myWishes`,
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
        const allWishes = JSON.parse(text);
        setAllWishes(allWishes);
        console.log("AllUsers data:", allWishes);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchWishes();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <form className={styles.listing_form} action="" onSubmit={handleSubmit}>
          <h2 className={styles.wish_title}>Add a Vinyl to your wishlist</h2>
          <div>
            Album name:
            <input
              type="text"
              name="albumName" //will need change?
              value={WishFormData.albumName}
              onChange={handleInputChange}
              required
              maxLength={20}
            ></input>
          </div>
          <div>
            Performer:
            <input
              type="text"
              name="artistName" //will need change?
              value={WishFormData.artistName}
              onChange={handleInputChange}
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
          <div className={styles.listing}>Delete Wish</div>
          {AllWishes.length > 0 ? (
            AllWishes.map((wish) => (
              <MyWishlistRecord
                artistName={wish.artistName}
                albumName={wish.albumName}
              />
            ))
          ) : (
            <h2 className={styles.all_columns}>
              You currently have no vinyls in your wishlist!
            </h2>
          )}
          <MyWishlistRecord
            artistName="placeholderArtist1"
            albumName="placeholderAlbum1"
          />
          <MyWishlistRecord
            artistName="placeholderArtist2"
            albumName="placeholderAlbum2"
          />
        </div>
      </div>
    </>
  );
};
export default MyWishlist;
