"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  logo: string;
  content: React.ReactNode;
};

export const CardStackIntegrations = ({
  items,
  offset,
  scaleFactor,
}: {
  items: any;
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 25;
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
    }, 8000);
  };

  return (
    <div className="relative left-20 md:left-10  h-full w-80 md:h-full md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-52 w-80 md:h-56 md:w-80 rounded-xl p-4 shadow-sm border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
              
            }}
            animate={{
              top: index * -CARD_OFFSET,
              right:index * 10,
              scale: 1 + index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
            >
            <div className="absolute h-3 top-[50%] -left-1.5 w-3 bg-[#4F46E4] rounded-full border border-[#B1B0EE]"></div>
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
            <div className="font-normal text-medium  md:text-base text-primaryGray dark:text-neutral-200 text-ellipsis overflow-hidden p-2 md:h-[100px]">
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
