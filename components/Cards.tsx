"use client"
import chip from "../assets/images/chip.png";
import signal from "../assets/images/signal.png";
import mastercard from "../assets/images/mastercard.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Profile from "./Profile";
// import image from "../constant/image";

const Cards = () => {
  const [cards] = useState([
    {
      id: 1,
      name: "CodeItDown",
      number: "5000 0000 0000 0000",
      expiry: "12/05",
      image: mastercard,
      color: "#050622",
    },
    // {
    //   id: 2,
    //   name: "Personal",
    //   number: "5000 0000 0000 0000",
    //   expiry: "12/05",
    //   image: mastercard,
    //   color: "#141c5b",
    // },
  ]);

  return (
    <div className="w-auto xl:w-auto flex xl:flex-col flex-col justify-center self-start mt-3 ml-5 xl:ml-5">
      <div className="flex flex-col gap-3 items-center justify-center">


        <div className="flex flex-col w-full items-start justify-start text-start">
          <div className="w-10">
            <Profile />

            <span className="text-2xl font-bold text-primary" style={{ lineHeight: '.2rem' }}>Tom Schory</span>
          </div>
          <div className="flex flex-row items-start justify-start mt-2" >
            <span className="text-sm text-primary" >Financial Analysts</span>
          </div>
        </div>

        {/*  */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="xl:w-[250px] w-[320px] h-[20] mt-10 rounded-3xl flex flex-col gap-3 py-3 px-5 mb-5"
            style={{ backgroundColor: card.color }}>
            <div className="flex items-center gap-1">
              {/* <img src={image.chip} alt="chip" className="w-9 h-7" /> */}
              {/* <img src={image.signal} alt="signal" className="w-6 h-6" /> */}
            </div>
            <div className="w-full flex items-center justify-between">
              {card.number.split(" ").map((chunk, index) => (
                <span key={index} className="text-white text-lg">
                  {chunk}
                </span>
              ))}
            </div>
            <span className="text-white text-sm">{card.expiry}</span>
            <div className="w-full flex items-center justify-between">
              <span className="text-white">{card.name}</span>
              {/* <img src={image.mastercard} alt="card brand" className="w-[20%] mt-[-5px]" /> */}
            </div>
          </div>
        ))}
      </div>

      <div className="xl:w-auto w-full h-auto border-2 border-card-border border-dashed rounded-2xl flex items-center justify-center gap-2 cursor-pointer">
        <PlusCircleIcon className="w-10 h-10 text-card-border" />
        <span className="text-lg font-medium text-card-border">Add new card</span>
      </div>
    </div>
  );
};

export default Cards;
