import { useState, useEffect } from "react";
import styles from "./ExchangeSite.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
interface SelectedVinyl {
  available: number;
  coverCondition: string;
  coverImagePath1: string;
  coverImagePath2: string;
  description: string;
  editionLabel: {
    albumName: string;
    artistName: string;
    editionLabel: string;
    belongsToGenreGenres: { genreId: number; genreName: string }[];
    countryOfOrigin: string;
    releaseDate: number;
  };
  onLocation: string;
  vinylCondition: string;
  vinylId: string;
  vinylImagePath1: string;
  vinylImagePath2: string;
}
interface ExchangeInterface {
  vinylsid: SelectedVinyl;
  IsOfferingVinylsToOther: Set<SelectedVinyl>;
}
const ExchangeSite: React.FC = () => {
  const location = useLocation();
  const [selectedVinyl, setSelectedVinyl] = useState<SelectedVinyl>();
  const [exchangeVinyls, setExchangeVinyls] = useState<ExchangeInterface>();
  useEffect(() => {
    const vinyl = location.state?.selectedVinyl as SelectedVinyl;
    if (vinyl) {
      setSelectedVinyl(vinyl);
      console.log("selected Vinyl: ", selectedVinyl);
    }
  }, [location.state]);
  const [myVinylsForExchange, setMyVinylsForExchange] = useState<
    SelectedVinyl[]
  >([]);
  const [myVinyls, setMyVInyls] = useState<SelectedVinyl[]>([]);
  useEffect(() => {
    const fetchVinyls = async () => {
      const token = localStorage.getItem("aToken");
      try {
        const response = await fetch(
          `https://gramofer.work.gd/api/vinyls/myVinyl`,
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

        const vinylsData: SelectedVinyl[] = await response.json();
        setMyVInyls(vinylsData);
      } catch (error) {
        console.error("Error fetching vinyls:", error);
      }
    };
    fetchVinyls();
  }, []);
  useEffect(() => {
    if (selectedVinyl && myVinylsForExchange.length > 0) {
      const exchangeData: ExchangeInterface = {
        vinylsid: selectedVinyl,
        IsOfferingVinylsToOther: new Set(myVinylsForExchange),
      };
      setExchangeVinyls(exchangeData);
    }
  }, [selectedVinyl, myVinylsForExchange]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!exchangeVinyls) {
      console.error("No exchange data to submit.");
      return;
    }
    try {
      const token = localStorage.getItem("aToken");
      const response = await fetch(
        `https://gramofer.work.gd/api/exchange/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(exchangeVinyls),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit exchange data.");
      }

      const result = await response.json();
      console.log("Exchange data submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting exchange data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Choose vinyls for exchange</h1>
      {myVinyls.length > 0 ? ( // Change condition to > when backend is connected
        <form onSubmit={handleFormSubmit}>
          <div className={styles.vinyl_choose}>
            <div>Album Name</div>
            <div>Goldmine Standard (Vinyl)</div>
            <div>Goldmine Standard (Cover)</div>
            <div>Mark for Exchange</div>
            {myVinyls.map((vinyl) => [
              <div key={`${vinyl.vinylId}-name`}>
                {vinyl.editionLabel.albumName}
              </div>,
              <div key={`${vinyl.vinylId}-condition`}>
                {vinyl.vinylCondition}
              </div>,
              <div key={`${vinyl.vinylId}-cover`}>{vinyl.coverCondition}</div>,
              <input
                key={`${vinyl.vinylId}-checkbox`}
                type="checkbox"
                name={vinyl.vinylId}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setMyVinylsForExchange((prev) =>
                    isChecked
                      ? [...prev, vinyl]
                      : prev.filter((v) => v.vinylId !== vinyl.vinylId)
                  );
                  console.log(
                    "Current Exchange vinyls: ",
                    myVinylsForExchange,
                    " and length: ",
                    myVinylsForExchange.length
                  );
                }}
              />,
            ])}
          </div>
          <button type="submit" className={styles.submit_button}>
            Submit Exchange
          </button>
        </form>
      ) : (
        <>
          <h2>You have no vinyls to choose from!</h2>
          <Link to="/my-vinyls">
            <button className={styles.submit_button}>
              You can add your vinyls here
            </button>
          </Link>
        </>
      )}
    </div>
  );
};
{
  /* <div className={styles.container}>
<h1>Choose vinyls for exchange</h1>
{myVinyls.length == 0 ? ( //change to > later
  <>
    <div className={styles.vinyl_choose}>
      <div>album name</div>
      <div>Goldmine standard (vinyl)</div>
      <div>Goldmine standard (cover)</div>
      <div>Mark for exchange</div>
      {myVinyls.map((vinyl) => {
        return (
          <>
            <div>{vinyl.editionLabel.albumName}</div>
            <div>{vinyl.vinylCondition}</div>
            <div>{vinyl.coverCondition}</div>
            <input type="checkbox" name={vinyl.vinylId} id="" />
          </>
        );
      })}
    </div>
  </>
) : (
  <>
    <h2>You have no vinyls to choose from!</h2>
    <Link to="/my-vinyls">
      <button>You can add your vinyls here</button>
    </Link>
  </>
)}
</div> */
}
export default ExchangeSite;
