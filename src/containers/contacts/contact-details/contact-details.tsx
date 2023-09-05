import { useParams } from "react-router-dom";

export const ContactDetails = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
