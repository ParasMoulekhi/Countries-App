import { useParams } from "react-router-dom";

export default function Contact() {
  const params = useParams();
  console.log(params);
  console.log("Hii");
  return <h1>Contact</h1>;
}
