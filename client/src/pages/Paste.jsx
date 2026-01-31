import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaste } from "../api";

export default function Paste() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getPaste(id).then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;
  return <pre>{data.content}</pre>;
}
