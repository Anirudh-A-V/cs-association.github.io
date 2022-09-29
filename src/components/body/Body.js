import React, { useEffect, useRef, useState } from "react";
import "./body.css";
import drishti from "../../images/drishti-logo.svg";
import cs from "../../images/cs.svg";
import Card from "../card/Card";
import axios from "axios";
import litmus from "../../images/litmus.svg";
import entri from "../../images/entri.svg";
import edgradi from "../../images/edgradi.svg";
import SimpleSlider from "../slider/Slider";
import Modal from "../Modal/Modal";

const Body = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [data, setData] = useState({ score: [] });
  const loadRef = useRef();

  const startloading = () => {
    loadRef.current.style.visibility = "visible";
    loadRef.current.style.opacity = 1;
  };

  const endloading = () => {
    loadRef.current.style.opacity = 0;
    loadRef.current.style.visibility = "hidden";
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        startloading();
        const res = await axios.get(
          `${process.env.REACT_APP_API_URI}/scoreboard`
        );
        setData({ ...res.data });
        setTimeout(() => {
          endloading();
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, []);

  return (
    <div className="body">
      {/* =========== LOADING =========== */}
      <div className="loading" ref={loadRef}>
        <div class="multi-spinner-container">
          <div class="multi-spinner">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <img src={drishti} className="img img-drishti" alt="" />
        <span>DRISHTI 2022</span>
        <div className="sponsors">
          <img className="img-sponsor" src={litmus} alt="" />
          <img className="img-sponsor" src={entri} alt="" />
          <img className="img-sponsor" src={edgradi} alt="" />
        </div>
        <img src={cs} className="img img-cs" alt="" />
      </div>
      {/* =========== CARDS =========== */}
      <div className="cards">
        <span className="games-title">GAMES</span>
        {data.score.map((item) => {
          console.log(item);
          return <Card setSelectedImg={setSelectedImg} item={item} />;
        })}
      </div>
        <SimpleSlider />
        { selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg}/>}
    </div>
  );
};

export default Body;
