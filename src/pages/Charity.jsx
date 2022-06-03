import { useEffect, useState } from "react";
import { getSingleCharity } from "../API/api";
import { useParams } from "react-router-dom";
import { QGL_SINGLE_QUERY } from "../API/queries";
import PageCharitComp from "../components/PageCharitComp";
import ClipLoader from "react-spinners/ClipLoader";
function Charity() {
  const [charityData, setCharityData] = useState();
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  // const id = "1149740";
  useEffect(() => {
    console.log(itemId, "id");
    getSingleCharity(QGL_SINGLE_QUERY, { id: itemId })
      .then((res) => res.json())
      .then((data) => {
        setCharityData(data.data.CHC.getCharities.list[0]);
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <PageCharitComp data={charityData} />
  ) : (
    <ClipLoader color={`#559CF8`} loading={loading} size={150} />
  );
}

export default Charity;
