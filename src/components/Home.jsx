import React,{useState,useEffect} from "react";

import Userform from "./Userform";
import Spinner from "./Spinner";
import "../styles/Home.css";
import Header from './Header';
import Footer from './Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="main-content">
       {isLoading ? (
        <div className="spinner-header">
          <Spinner />
        </div>
      ) : (
        <>
          <Header />
          <Userform />
          <Footer />
        </>
      )}

    </div>
  );
}
