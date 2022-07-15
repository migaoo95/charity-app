import { useParams } from "react-router-dom";
import { QGL_SINGLE_QUERY } from "../API/queries";
import PageCharitComp from "../components/PageCharitComp";
import ClipLoader from "react-spinners/ClipLoader";
import useFetchGql from "../hooks/useFetchGql";

function Charity() {
  const { itemId } = useParams();
  const { data, loading } = useFetchGql(QGL_SINGLE_QUERY, { id: itemId });

  return !loading ? (
    <PageCharitComp data={data.data.CHC.getCharities.list[0]} />
  ) : (
    <ClipLoader color={`#559CF8`} loading={loading} size={150} />
  );
}

export default Charity;
