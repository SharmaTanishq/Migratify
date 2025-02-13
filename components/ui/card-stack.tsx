"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "./separator";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  logo: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: any;
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 15;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  md:left-2 h-full top-16  w-56  md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-52 w-72 md:h-52 md:w-80 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
            >
              <div className="absolute h-4 top-[50%] -right-2 w-4 bg-[#4F46E4] rounded-full border border-[#B1B0EE]"></div>
              <div className="absolute h-4 top-[50%] -left-2 w-4 bg-[#4F46E4] rounded-full border border-[#B1B0EE]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src={card.logo} alt={card.name} width={30} height={30} />
                <p className="text-neutral-500 font-medium dark:text-white">
                  {card.name}
                </p>
              </div>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
              <Separator className="w-full" />
            </div>
            <div className="font-normal  ">
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
