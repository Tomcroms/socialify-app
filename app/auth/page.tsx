import Image from "next/image";
import Auth from "./components/auth"
import styles from "../styles/test.module.css"

export default function AuthPage() {
  return (
    <>
      <div className="w-full h-screen bg-customGray2 flex justify-center items-center">
        <Auth/>
      </div>
    </>
  );
}