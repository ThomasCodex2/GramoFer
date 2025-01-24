import { useState, useEffect } from "react";
import styles from "./ExchangeSite.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  vinylId: number;
  vinylImagePath1: string;
  vinylImagePath2: string;
}
// interface ExchangeInterface {
//   vinylsid: SelectedVinyl;
//   IsOfferingVinylsToOther: Set<SelectedVinyl>;
// }
interface ExchangeIds {
  vinylsid: number;
  isOfferingVinylsToOther: number[];
}

const ExchangeSite: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [selectedVinyl, setSelectedVinyl] = useState<SelectedVinyl>();
  const [selectedVinylid, setSelectedVinylId] = useState<number>();

  //const [exchangeVinyls, setExchangeVinyls] = useState<ExchangeInterface>();
  const [exchangeVinylIds, setExchangeVinylIds] = useState<ExchangeIds>();

  //const [myVinylsForExchange, setMyVinylsForExchange] = useState<
  //  SelectedVinyl[]
  //>([]);
  const [myVinylIdsForExchage, setMyVinylIdsForExchange] = useState<number[]>(
    []
  );

  const [myVinyls, setMyVInyls] = useState<SelectedVinyl[]>([]);
  useEffect(() => {
    console.log("Location state:", location.state);
    //const vinyl = location.state as SelectedVinyl; PREV SOLUTION
    const receivedId = location.state as number;
    // const receivedVinyl = location.state;
    // const vinyl: SelectedVinyl = {
    //   ...receivedVinyl, // Spread all properties
    //   vinylId: parseInt(receivedVinyl.vinylId, 10), // Convert `vinylId` to a number
    // };
    if (receivedId) {
      setSelectedVinylId(receivedId);
      console.log("selected Vinyl: ", receivedId);
    }
  }, [location.state]);

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
    if (selectedVinylid && myVinylIdsForExchage.length > 0) {
      const exchangeData: ExchangeIds = {
        vinylsid: selectedVinylid,
        isOfferingVinylsToOther: myVinylIdsForExchage,
      };
      setExchangeVinylIds(exchangeData);
    }
  }, [selectedVinylid, myVinylIdsForExchage]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!exchangeVinylIds) {
      console.error("No exchange data to submit.");
      return;
    }
    console.log("Data being send: ", exchangeVinylIds);
    console.log(JSON.stringify(exchangeVinylIds));
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
          body: JSON.stringify(exchangeVinylIds),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit exchange data.");
      }
      const result = await response.text();
      console.log("Exchange added sucessfully: ", result);
      navigate("/");
    } catch (error) {
      console.error("Error submitting exchange data:", error);
    }
  };

  return (
    <div className={styles.container}>
      {myVinyls.length > 0 ? ( // Change condition to > when backend is connected
        <form onSubmit={handleFormSubmit}>
          <div className={styles.exchanges_header}>
            <h1>Choose vinyls for exchange</h1>
            <button type="submit" className={styles.submit_button}>
              Submit Exchange
            </button>
          </div>

          <div className={styles.vinyl_choose}>
            <div className={styles.first_row}>Album Name</div>
            <div className={styles.first_row}>Goldmine Standard (Vinyl)</div>
            <div className={styles.first_row}>Goldmine Standard (Cover)</div>
            <div className={styles.first_row}>Mark for Exchange</div>
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
                name={vinyl.vinylId.toString()} //.toString() added
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setMyVinylIdsForExchange((prev) => {
                    const updatedVinyls = isChecked
                      ? [...prev, Number(vinyl.vinylId)]
                      : prev.filter((id) => id !== Number(vinyl.vinylId));

                    console.log(
                      "Updated Vinyl IDs: ",
                      updatedVinyls,
                      " and length: ",
                      updatedVinyls.length
                    );

                    return updatedVinyls;
                  });
                }}
                // onChange={(e) => {
                //   const isChecked = e.target.checked;
                //   setMyVinylsForExchange((prev) => {
                //     const updatedVinyls = isChecked
                //       ? [...prev, vinyl]
                //       : prev.filter((v) => v.vinylId !== vinyl.vinylId);

                //     console.log(
                //       "Updated Exchange Vinyls: ",
                //       updatedVinyls,
                //       " and length: ",
                //       updatedVinyls.length
                //     );

                //     return updatedVinyls as SelectedVinyl[];
                //   });
                // }}
              />,
            ])}
          </div>
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
