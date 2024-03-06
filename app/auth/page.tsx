import Image from "next/image";
import Auth from "./components/auth"
import styles from "../styles/test.module.css"

export default function Home() {
  return (
    <>
      <div className="mt-36 w-3/4 mx-auto p-8 bg-white rounded-xl">
        <Auth/>
      </div>
    </>
  );
}