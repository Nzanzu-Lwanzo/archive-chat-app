import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../assets/svg";
import { useEffect, useRef } from "react";
import image from "../assets/imgs/chat.png";

export default function Home() {
  const titleRef = useRef();
  const pRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    Promise.resolve(() => {})
      .then(() => {
        setTimeout(() => {
          titleRef.current.classList.add("show");
        }, 200);
      })
      .then(() => {
        setTimeout(() => {
          pRef.current.classList.add("show");
        }, 500);
      })
      .then(() => {
        setTimeout(() => {
          btnRef.current.classList.add("show");
        }, 800);
      });
  }, []);

  return (
    <main className="home-page">
      <div className="announce">
          <Link to="/" className="text-container">
            <span>Moza Chat est vente ! Achetez le code !</span>
            <span className="center animate-icon">
              <ArrowRightIcon />
            </span>
          </Link>
      </div>
      <div className="top">
        <header>
          <div className="logo"></div>
          <div className="links-n-buttons">
            <Link to="/log-in/" className="link paradox">
              Se connecter
            </Link>
            <Link to="/sign-up/" className="link normal">
              Créer compte
            </Link>
          </div>
        </header>

        <div className="content">
          
        </div>
      </div>
      <div className="bottom">
        <div className="right">
          <h1 className="fade-one" ref={titleRef}>
            Welcome on <br /> Moza Chat
          </h1>
          <p className="slogan fade-two" ref={pRef}>
            A place strangers become family
          </p>
          <Link to="/chat/" className="call-to-action fade-three" ref={btnRef}>
            Aller au chat
          </Link>
        </div>
      </div>
    </main>
  );
}
