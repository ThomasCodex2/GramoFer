import styles from "./MyVinyls.module.css";
import VinylsRecord from "../VinylsRecord/VinylsRecord";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
interface FormData {
  vinylCondition: string;
  coverCondition: string;
  description: string;
  vinylImagePath1: string;
  vinylImagePath2: string;
  coverImagePath1: string;
  coverImagePath2: string;
  edition: {
    editionLabel: string;
    artistName: string;
    releaseDate: string;
    albumName: string;
    countryOfOrigin: string;
    genres: [];
  };
  onLocation: string;
  [key: string]: any; // Index signature for dynamic keys
}
interface MyVinylsData {
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
    countryOfOrigin: string; //umjesto toga
    belongsToGenreGenres: { genreId: string; genreName: string }[];
  };
  onLocation: string;
}

const API_BASE_URL = "https://gramofer.work.gd";

const MyVinyls = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  //const [isAdmin, setIsAdmin] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    vinylCondition: "",
    coverCondition: "",
    description: "",
    vinylImagePath1: "",
    vinylImagePath2: "",
    coverImagePath1: "",
    coverImagePath2: "",
    onLocation: "",
    edition: {
      editionLabel: "",
      artistName: "",
      releaseDate: "",
      albumName: "",
      countryOfOrigin: "",
      genres: [],
    },
  });
  const [MyVinylsData, setMyVinylsData] = useState<MyVinylsData[]>([]);
  const maxImages = 4;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result && typeof result === "string") {
            setImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Only image files are allowed!");
      }
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const clearImages = () => {
    setImages([]);
    setFormData((prev) => ({
      ...prev,
      vinylImagePath1: "",
      vinylImagePath2: "",
      coverImagePath1: "",
      coverImagePath2: "",
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes("edition.")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: child === "genres" ? value.split(",") : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("aToken");

    if (token !== null) {
      // If the value exists, print the value of atoken
      console.log("Token found:", token);
    } else {
      // If it does not exist, print a message
      console.log("No token found");
    }

    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`${API_BASE_URL}/api/vinyls/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vinyl added successfully!");
        setFormData({
          vinylCondition: "",
          coverCondition: "",
          description: "",
          vinylImagePath1: "",
          vinylImagePath2: "",
          coverImagePath1: "",
          coverImagePath2: "",
          onLocation: "",
          edition: {
            editionLabel: "",
            artistName: "",
            releaseDate: "",
            albumName: "",
            countryOfOrigin: "",
            genres: [],
          },
        });
        clearImages();
        navigate("/my-vinyls");
      } else {
        alert("Failed to add vinyl. Please try again.");
      }
    } catch (error) {
      console.error("Error adding vinyl:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchVinyls = async () => {
      const token = localStorage.getItem("aToken");

      if (token !== null) {
        console.log("Token found:", token);
      } else {
        console.log("No token found");
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/vinyls/myVinyl`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vinyls");
        }

        const myVinylsData: MyVinylsData[] = await response.json();
        setMyVinylsData(myVinylsData);
        console.log("myVinyls data:", myVinylsData);
      } catch (error) {
        console.error("Error fetching vinyls:", error);
      }
    };
    // const checkAdmin = () => {
    //   const A = localStorage.getItem("isAdmin");
    //   if (A) {
    //     setIsAdmin(parseInt(A));
    //   }
    // };
    // checkAdmin();
    fetchVinyls();
  }, []); //add MyVinylsData?
  return (
    <div className={styles.container}>
      {/* <Link to="/admin-site">
        <button className={styles.adminButton}>
          Temporary Admin page button
        </button>
      </Link> */}

      <form className={styles.listing_form} onSubmit={handleSubmit}>
        <h1>
          Add <span>YOUR</span> records here!
        </h1>
        <div>
          Edition mark:
          <input
            type="text"
            name="edition.editionLabel"
            value={formData.edition.editionLabel}
            onChange={handleInputChange}
            required
            maxLength={20}
          ></input>
        </div>
        <div>
          Year of release:{" "}
          <input
            type="number"
            name="edition.releaseDate"
            value={formData.edition.releaseDate}
            onChange={handleInputChange}
            required
            min={1948}
            max={2025}
          ></input>
        </div>
        <div>
          Performer:
          <input
            type="text"
            name="edition.artistName"
            value={formData.edition.artistName}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          Album name:
          <input
            type="text"
            name="edition.albumName"
            value={formData.edition.albumName}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          Goldmine standard {"(vinyl)"}:
          <input
            type="text"
            name="vinylCondition"
            value={formData.vinylCondition}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          Goldmine standard {"(wrap)"}:
          <input
            type="text"
            name="coverCondition"
            value={formData.coverCondition}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          Genre:
          <input
            type="text"
            name="edition.genres"
            value={formData.edition.genres.join(",")}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          Location:
          <input
            type="text"
            name="onLocation" //WAS PREVIOUSLY edition.countryOfOrigin
            value={formData.onLocation} //WAS PREVIOUSLY formData.edition.countryOfOrigin
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div
          className={styles.picture_drop}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div id="dropZone" className={styles.dropZone} onClick={handleClick}>
            Drag and drop or click here to add images {"(max 4)"}
          </div>
          <div id="preview" className={styles.preview}>
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Preview ${index + 1}`} />
            ))}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className={styles.clear_button}
            onClick={clearImages}
          >
            Clear Images
          </button>
        </div>
        <div className={styles.desc}>
          Description {"(optional)"}:{" "}
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={200}
          ></input>
        </div>
        <button className={styles.add_button}>Add Vinyl</button>
      </form>
      <h1 className={styles.yellow}>My Vinyls</h1>
      <div className={styles.vinyl_list}>
        <div className={styles.listing}>Edition mark</div>
        <div className={styles.listing}>Album name</div>
        <div className={styles.listing}>Performer</div>
        <div className={styles.listing}>Genre</div>
        <div className={styles.listing}>Display picture</div>
        <div className={styles.listing}>Edit/Delete record</div>
        {MyVinylsData.length > 0 ? (
          MyVinylsData.map((vinyl, index) => (
            <VinylsRecord
              key={index}
              vinyl_id={vinyl.vinylId}
              edition_mark={vinyl.editionLabel.editionLabel || "N/A"}
              album={vinyl.editionLabel.albumName || "ALBUM_NAME"}
              performer={vinyl.editionLabel.artistName || "PERFORMER"}
              genre={
                vinyl.editionLabel.belongsToGenreGenres?.map(
                  (genre) => genre.genreName
                ) || [""]
              }
              picture_urls={vinyl.coverImagePath1 || "pic_url"}
              adminSite={false}
            />
          ))
        ) : (
          <h2 className={styles.noVinylsAdded}>You have no Vinyl records</h2>
        )}
        <VinylsRecord
          vinyl_id="x"
          edition_mark="1203"
          album="Wavelength"
          performer="lorem"
          genre={["pop"]}
          picture_urls="pic_url"
          adminSite={false}
        />
        <VinylsRecord
          vinyl_id="x"
          edition_mark="1014"
          album="The Wild Boys"
          performer="ipsums"
          genre={["pop"]}
          picture_urls="pic_url"
          adminSite={false}
        />
      </div>
    </div>
  );
};
export default MyVinyls;
