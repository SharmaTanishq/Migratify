"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../../ui/animated-beam";
import { LogoCarousel } from ".";
import centerLogos from "./logos-collections/centerIcon";
import leftcenter from "./logos-collections/left-center";
import rightcenter from "./logos-collections/right-center";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex  w-full items-center justify-center  rounded-lg  bg-none p-5 "
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <div className="z-10">
            <Circle ref={div1Ref}>
              <Icons.vtex />
            </Circle>
          </div>
          <div className="z-10">
            <Circle ref={div5Ref}>
              <Icons.salsify />
            </Circle>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="z-10">
            <Circle ref={div2Ref}>
              <Icons.kibo />
            </Circle>
          </div>

          <Circle ref={div4Ref} className="size-16 ">
            <Icons.commercetools />
          </Circle>

          <div className="z-10">
            <Circle ref={div6Ref}>
              <Icons.shopify />
            </Circle>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="z-10">
            <Circle ref={div3Ref}>
              <Icons.bigcommerce />
            </Circle>
          </div>
          <div className="z-10">
            <Circle ref={div7Ref}>
              <Icons.akeneo />
            </Circle>
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

const Icons = {
  vtex: () => (
    <svg
      id="logosandtypes_com"
      data-name="logosandtypes com"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
    >
      <defs>
        <style>
          {
            "\n      .cls-1 {\n        fill: #f71963;\n      }\n\n      .cls-2 {\n        fill: none;\n      }\n    "
          }
        </style>
      </defs>
      <path className="cls-2" d="M0,0H150V150H0V0Z" />
      <path
        className="cls-1"
        d="M135.79,18.35H29.11c-8.27,0-13.57,8.75-9.7,16.02l10.67,20.1H10.73c-3.73-.07-7.07,3.14-7.11,6.87-.04,1.22,.25,2.43,.82,3.5l34.32,64.63c2.42,4.94,10.15,4.95,12.57,0,0,0,9.32-17.46,9.32-17.46l11.7,22.03c4.12,7.75,15.27,7.76,19.4,.02l53.47-100.11c3.78-7.08-1.38-15.62-9.44-15.62Zm-47.92,42.77l-23.06,43.18c-1.62,3.28-6.75,3.29-8.37,0,0,0-22.83-42.99-22.83-42.99-1.21-2.17-.34-5.13,1.84-6.3,.71-.4,1.51-.61,2.33-.62h46.02c3.34-.11,5.75,3.82,4.07,6.73Z"
      />
    </svg>
  ),
  commercetools: () => (
    <svg
      width={68}
      height={68}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 50.8441V20.5961C0 19.7579 0.899305 19.2365 1.62023 19.6531L27.6357 34.7759C28.3046 35.165 28.7158 35.8835 28.7158 36.6594V66.9074C28.7158 67.7456 27.8165 68.267 27.0956 67.8504L1.08016 52.7301C0.411252 52.3409 0 51.6225 0 50.8466V50.8441Z"
        fill="#6359FF"
      />
      <path
        d="M3.37663 15.1801L28.9858 0.291878C29.6547 -0.0972925 30.4772 -0.0972925 31.1461 0.291878L56.7552 15.1801C57.6545 15.704 57.6545 17.0112 56.7552 17.5351L31.1461 32.4234C30.4772 32.8125 29.6547 32.8125 28.9858 32.4234L3.37663 17.5351C2.47732 17.0112 2.47732 15.704 3.37663 15.1801Z"
        fill="#FFC806"
      />
      <path
        d="M31.416 66.9098V38.8597C31.416 38.0214 32.3153 37.5001 33.0363 37.9167L56.7551 51.7073C57.6544 52.2311 57.6544 53.5384 56.7551 54.0622L33.0363 67.8528C32.3153 68.2719 31.416 67.7481 31.416 66.9098Z"
        fill="#0BBFBF"
      />
    </svg>
  ),
  shopify: () => (
    <svg
      width={61}
      height={61}
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.3758 11.5534C46.3342 11.2504 46.0695 11.0823 45.8498 11.064C45.6318 11.0457 41.3604 10.9808 41.3604 10.9808C41.3604 10.9808 37.7881 7.51175 37.4352 7.15885C37.0824 6.80596 36.3932 6.91249 36.1252 6.99239C36.1219 6.99406 35.4544 7.20047 34.3308 7.54837C34.1427 6.93913 33.8663 6.19005 33.4718 5.43765C32.2001 3.01066 30.3374 1.72725 28.0868 1.72393C28.0835 1.72393 28.0818 1.72393 28.0785 1.72393C27.922 1.72393 27.7672 1.73891 27.6108 1.75222C27.5442 1.67232 27.4776 1.59409 27.4077 1.51751C26.4272 0.468815 25.1705 -0.0422181 23.664 0.00272613C20.7576 0.0859563 17.8629 2.18502 15.5158 5.91373C13.8645 8.53714 12.6077 11.8331 12.2515 14.3849C8.91395 15.4186 6.58017 16.141 6.52857 16.1577C4.84399 16.687 4.79073 16.7386 4.571 18.3267C4.40787 19.5268 0 53.6113 0 53.6113L36.9392 60L52.9493 56.0199C52.9493 56.0199 46.4174 11.8564 46.3758 11.5534ZM32.4814 8.12099C31.6308 8.384 30.6636 8.68363 29.6149 9.00823C29.5933 7.53672 29.4185 5.48926 28.7327 3.71978C30.9383 4.1376 32.0236 6.63284 32.4814 8.12099ZM27.6823 9.60748C25.7464 10.2067 23.634 10.8609 21.515 11.5168C22.1109 9.23461 23.2412 6.96243 24.6295 5.47261C25.1455 4.9183 25.8679 4.30073 26.7235 3.94783C27.5275 5.62575 27.7023 8.00114 27.6823 9.60748ZM23.7222 1.93699C24.4047 1.92201 24.979 2.07183 25.4701 2.39476C24.6844 2.80259 23.9253 3.38853 23.2129 4.15258C21.3668 6.13346 19.9519 9.20798 19.3876 12.1743C17.6281 12.7186 15.9069 13.253 14.3222 13.7424C15.3227 9.07315 19.2361 2.06683 23.7222 1.93699Z"
        fill="#95BF47"
      />
      <path
        d="M45.8514 11.0657C45.6334 11.0474 41.362 10.9825 41.362 10.9825C41.362 10.9825 37.7898 7.51344 37.4369 7.16055C37.3054 7.02904 37.1273 6.96079 36.9408 6.9325L36.9425 59.9984L52.951 56.02C52.951 56.02 46.4191 11.8581 46.3775 11.5551C46.3358 11.2521 46.0695 11.084 45.8514 11.0657Z"
        fill="#5E8E3E"
      />
      <path
        d="M28.0668 19.2972L26.2075 26.2535C26.2075 26.2535 24.1334 25.3097 21.6748 25.4645C18.0692 25.6926 18.0309 27.9664 18.0676 28.5374C18.264 31.6485 26.4488 32.3277 26.9083 39.6153C27.2695 45.3482 23.867 49.27 18.9648 49.5796C13.0804 49.9508 9.84109 46.4801 9.84109 46.4801L11.0879 41.1767C11.0879 41.1767 14.3488 43.637 16.9589 43.4722C18.6635 43.364 19.2727 41.9774 19.2111 40.9969C18.9548 36.9386 12.2897 37.1783 11.8686 30.5099C11.514 24.8986 15.1995 19.2123 23.331 18.6996C26.4638 18.4982 28.0668 19.2972 28.0668 19.2972Z"
        fill="white"
      />
    </svg>
  ),
  kibo: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
    >
      <title>{"Group 18 Copy 6"}</title>
      <defs>
        <polygon id="path-1" points="0 0 43.387896 0 43.387896 44 0 44" />
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g id="Homepage-v01" transform="translate(-210.000000, -82.000000)">
          <g id="Group-18-Copy-6" transform="translate(210.000000, 82.000000)">
            <polygon
              id="Fill-1"
              fill="#FFFFFF"
              points="21.9311529 21.9285647 22.5864941 22.5901176 21.9321882 21.9275294"
            />
            <polygon
              id="Fill-2"
              fill="#FFFFFF"
              points="0.517647059 43.4823529 0.535146437 43.4823529 18.1176471 25.8823529"
            />
            <polygon
              id="Fill-3"
              fill="#FFFFFF"
              points="0.517647059 42.9647059 42.9647059 42.9647059 26.8807408 26.9176471"
            />
            <polygon
              id="Fill-4"
              fill="#656868"
              points="0.521270588 43.472 0.500564706 43.4927059 0.534729412 43.472"
            />
            <polygon
              id="Fill-5"
              fill="#656868"
              points="17.8474306 25.7514084 0.517647059 42.9647059 0.531660942 42.9647059 26.9101011 26.7857894 26.9176471 26.7815107 22.5711873 22.4257719 21.888819 21.7411765"
            />
            <polygon
              id="Fill-6"
              fill="#FFCE01"
              points="17.4659872 0.517647059 0.517647059 17.4670605 0.517647059 42.9647059 17.7890683 25.6922113 21.8120182 21.6671147 21.8141649 21.6692614 21.8152382 21.6681881 42.9647059 0.517647059"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
  akeneo: () => (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 156.5 162.8"
      xmlSpace="preserve"
    >
      <style type="text/css">
        {
          "\n  .st0{fill:url(#SVGID_1_);}\n\t.st1{opacity:0.8;}\n\t.st2{opacity:0.51;fill:url(#SVGID_2_);enable-background:new    ;}\n\t.st3{opacity:0.51;fill:url(#SVGID_3_);enable-background:new    ;}\n\t.st4{opacity:0.7;}\n\t.st5{opacity:0.7;fill:url(#SVGID_4_);enable-background:new    ;}\n\t.st6{opacity:0.7;fill:url(#SVGID_5_);enable-background:new    ;}\n "
        }
      </style>
      <g>
        <g>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1={21.514}
            y1={32.366}
            x2={156.3037}
            y2={104.6682}
            gradientTransform="matrix(1 0 0 -1 0 163.9514)"
          >
            <stop
              offset={0.0429448}
              style={{
                stopColor: "#5C257E",
              }}
            />
            <stop
              offset={0.9693}
              style={{
                stopColor: "#8C509A",
              }}
            />
          </linearGradient>
          <path
            className="st0"
            d="M123.7,159c0.6,2,1.1,3.3,1.3,3.8c0.1,0-0.1,0,0,0c-3-42.5,21.7-59.3,30.4-87.2c0.1-0.4,0.2-0.9,0.3-1.4 c0.2-0.6,0.3-1.3,0.4-1.9c1.4-7.8-1.5-16.9-7.2-26.5c0-0.1-0.1-0.1-0.1-0.2c-0.5-0.8-1-1.6-1.5-2.4c-0.9-1.5-2-3-3-4.5 c-0.1-0.1-0.2-0.3-0.3-0.5c-0.3-0.4-0.6-0.8-0.9-1.2c-0.3-0.4-0.6-0.8-0.9-1.3c-0.3-0.4-0.6-0.8-1-1.2c-0.3-0.4-0.7-0.8-1-1.3 c-0.2-0.3-0.5-0.6-0.7-0.9C130.3,21.1,118.3,9.9,105.7,0c0,0-0.1-0.1,0,0c1.2,15.9,0.9,32-1.1,44.7c-2.3,15.3-8.5,33-16.7,48.9 c-17.9-2.1-36-6.8-50.1-13.4C26.1,74.8,12.7,66.3,0,56.4c0.1,1.3,0.2,2.7,0.3,4c0,0.4,0.1,0.8,0.1,1.2c0.1,1,0.2,1.9,0.3,2.8 c0,0.4,0.1,0.9,0.1,1.3c0.1,1,0.2,1.9,0.3,2.8c0,0.4,0.1,0.8,0.1,1.2c0.2,1.2,0.3,2.4,0.5,3.6c0,0.1,0,0.2,0,0.4 c0.2,1.4,0.4,2.8,0.6,4.1c0,0.1,0,0.2,0.1,0.3c0.2,1.2,0.4,2.4,0.6,3.7c0,0.3,0.1,0.5,0.1,0.7c0.2,1.1,0.4,2.2,0.6,3.3 c0.1,0.2,0.1,0.4,0.1,0.6c0.3,1.3,0.5,2.5,0.8,3.8c0.9,4,2,7.9,3.1,11.6c0,0.1,0,0.1,0,0.1c1.9,6.2,4.2,12,6.7,17 c0.4,0.7,0.8,1.5,1.1,2.2v0.1c0.3,0.6,0.7,1.3,1.1,1.9c0,0,0,0,0,0.1c0.4,0.7,0.8,1.3,1.2,1.9c0.1,0.1,0.1,0.2,0.2,0.2 c0.5,0.8,1.1,1.6,1.6,2.3c0.1,0.1,0.2,0.2,0.3,0.4l0.1,0.1c0.6,0.8,1.3,1.6,1.9,2.4c0.5,0.5,0.9,1,1.4,1.5 c0.2,0.2,0.4,0.4,0.6,0.6c0.3,0.3,0.6,0.6,0.9,0.9c0.2,0.2,0.4,0.4,0.7,0.6c0.3,0.3,0.6,0.5,0.9,0.7c0.2,0.2,0.5,0.4,0.7,0.5 c0.3,0.2,0.6,0.5,0.9,0.7c0.2,0.2,0.5,0.3,0.7,0.5c0.3,0.2,0.6,0.4,1,0.6c0.2,0.1,0.5,0.3,0.7,0.4c0.4,0.2,0.7,0.4,1.1,0.5 c0.2,0.1,0.4,0.2,0.6,0.3c0.6,0.3,1.2,0.5,1.7,0.7c0.4,0.1,0.7,0.3,1,0.4c28.1,8.4,56.1-2.5,89.9,23.3"
          />
          <g className="st1">
            <linearGradient
              id="SVGID_2_"
              gradientUnits="userSpaceOnUse"
              x1={155.6833}
              y1={24.6265}
              x2={86.7916}
              y2={153.7688}
              gradientTransform="matrix(1 0 0 -1 0 163.9514)"
            >
              <stop
                offset={0.0429448}
                style={{
                  stopColor: "#5C257E",
                }}
              />
              <stop
                offset={1}
                style={{
                  stopColor: "#FFFFFF",
                }}
              />
            </linearGradient>
            <path
              className="st2"
              d="M104.6,44.7c-2.3,15.3-8.5,33-16.7,48.9c31.7,3.7,62.5-1.1,67.8-19.5c5.8-20.1-20.4-51-50-74.1 C106.8,16.2,106.5,31.9,104.6,44.7z"
            />
            <linearGradient
              id="SVGID_3_"
              gradientUnits="userSpaceOnUse"
              x1={88.1763}
              y1={-11.3788}
              x2={19.2846}
              y2={117.7639}
              gradientTransform="matrix(1 0 0 -1 0 163.9514)"
            >
              <stop
                offset={0.0429448}
                style={{
                  stopColor: "#5C257E",
                }}
              />
              <stop
                offset={1}
                style={{
                  stopColor: "#FFFFFF",
                }}
              />
            </linearGradient>
            <path
              className="st3"
              d="M37.9,80.3C26.1,74.8,12.7,66.3,0,56.4c2.8,37.4,14.1,76.2,34.1,82.6c18.3,5.8,39.4-17,53.9-45.4 C70.1,91.6,52,86.9,37.9,80.3z"
            />
          </g>
          <g className="st4">
            <linearGradient
              id="SVGID_4_"
              gradientUnits="userSpaceOnUse"
              x1={31.756}
              y1={94.5678}
              x2={85.3905}
              y2={-5.9742}
              gradientTransform="matrix(1 0 0 -1 0 163.9514)"
            >
              <stop
                offset={0.2331}
                style={{
                  stopColor: "#4F256F",
                }}
              />
              <stop
                offset={0.8405}
                style={{
                  stopColor: "#5C257E",
                }}
              />
            </linearGradient>
            <path
              className="st5"
              d="M63.1,115.7C16.4,98.4,0,56.4,0,56.4c1.7,22.9,6.6,46.3,14.8,62.6c0.4,0.7,0.7,1.4,1.1,2.1 c0,0.1,0.1,0.1,0.1,0.2c0.4,0.6,0.7,1.3,1.1,1.9c0,0.1,0.1,0.2,0.2,0.2c0.4,0.6,0.7,1.2,1.1,1.8c0.1,0.1,0.1,0.2,0.2,0.2 c0.4,0.6,0.7,1.1,1.1,1.7c0.3,0.4,0.5,0.7,0.7,1c0.1,0.1,0.1,0.2,0.2,0.3c0.2,0.2,0.4,0.5,0.5,0.7c0.4,0.6,0.9,1.1,1.3,1.6 c3.5,4.1,7.5,7.1,11.8,8.5c0.4,0.1,0.7,0.3,1,0.4c28.1,8.4,56.1-2.5,89.9,23.3C122.4,159.3,98.4,128.8,63.1,115.7z"
            />
            <linearGradient
              id="SVGID_5_"
              gradientUnits="userSpaceOnUse"
              x1={99.2464}
              y1={130.5639}
              x2={152.8799}
              y2={30.0235}
              gradientTransform="matrix(1 0 0 -1 0 163.9514)"
            >
              <stop
                offset={0.2331}
                style={{
                  stopColor: "#4F256F",
                }}
              />
              <stop
                offset={0.8405}
                style={{
                  stopColor: "#5C257E",
                }}
              />
            </linearGradient>
            <path
              className="st6"
              d="M155.7,74.1c5.8-20.1-20.4-51-50-74.1c0,0,25.8,37,14.3,85.3c-8.9,37.3,4,74.6,5,77.4c0.1,0-0.1,0,0,0 c-3-42.5,21.7-59.3,30.4-87.2C155.4,75.1,155.5,74.6,155.7,74.1z"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
  bigcommerce: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
  salsify: () => (
    <svg
      data-name="Layer 1"
      height="39.74px"
      id="a"
      viewBox="0 0 215.739 213.925"
      width="39px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m182.857,66.363c-.078-.735-.004-1.462-.114-2.198-1.997-13.3-9.054-25.025-19.871-33.016-8.727-6.448-19.061-9.856-29.886-9.856-7.12,0-14.051,1.602-20.421,4.433-6.241-2.779-13.108-4.392-20.369-4.392-25.904,0-47.051,19.736-49.8,44.921-2.151,1.561-4.276,3.174-6.192,5.09-9.509,9.51-14.747,22.154-14.747,35.603s5.237,26.092,14.747,35.602c1.893,1.893,3.995,3.481,6.117,5.028.557,5.186,1.7,10.329,3.888,15.229,8.093,18.118,26.146,29.825,45.994,29.825,7.092,0,13.993-1.476,20.511-4.387.006-.003.011-.006.016-.009.518.227.953.563,1.482.775,6,2.404,12.295,3.622,18.713,3.622,20.7,0,39.051-12.417,46.75-31.634,1.764-4.403,2.63-8.905,3.105-13.404,12.602-9.16,20.896-23.911,20.896-40.647s-8.262-31.42-20.819-40.585Zm-49.853,46.683c-.271.006-.542.028-.813.028-.098,0-.198-.006-.296-.019-2.441-.029-4.976-.338-7.666-.907l-1.281-.248c-1.608-.365-1.972.186-.897,1.5l1.098,1.397c1.595,1.836,3.014,3.79,4.223,5.837.194.33.38.662.571.993.575.994,1.135,1.995,1.612,3.058,2.258,5.057,3.42,10.493,3.453,16.154l.015,1.252.003.224-.137-.08-1.143-.666c-5.784-3.382-10.627-8.194-14.101-13.939-.2-.331-.413-.652-.604-.989-1.333-2.345-2.416-4.87-3.256-7.507l-.339-.959c-.564-1.55-1.304-1.555-1.827.061l-.611,1.773s-.004-.007-.005-.011c-.795,2.318-1.786,4.553-2.975,6.654-.183.326-.367.637-.551.949-1.85,3.146-3.737,5.645-5.887,7.791-2.237,2.247-4.86,4.212-8.257,6.183l-1.071.633-.195.116v-.193s.01-1.287.01-1.287c.026-5.178.972-10.128,2.81-14.71.631-1.58,1.386-3.103,2.205-4.576.185-.333.352-.68.546-1.006,1.108-1.877,2.483-3.735,4.158-5.635l1.151-1.464c1.075-1.315.711-1.866-.897-1.5l-1.182.228c-2.712.571-5.249.876-7.691.893-.132.022-.229.032-.321.032-.268,0-.534-.021-.802-.027-6.535-.136-12.905-1.921-18.942-5.347l-1.108-.63-.167-.107.186-.108,1.096-.618c.369-.208,2.496-1.525,3.321-1.898,5.028-2.246,10.346-3.411,15.812-3.487.189-.003.972.002,1.156.025,2.241.024,4.607.291,7.037.776l1.658.32c1.608.365,1.972-.186.897-1.5l-1.095-1.393c-1.738-1.958-3.172-3.884-4.328-5.841-.199-.337-.373-.69-.561-1.034-3.123-5.712-4.813-12.287-4.859-19.116l-.015-1.322-.002-.163.2.118,1.081.637c3.347,1.962,5.943,3.912,8.169,6.137,2.148,2.15,4.032,4.646,5.878,7.781.187.318.374.635.56.966,1.225,2.163,2.237,4.463,3.041,6.847l.64,1.594c.564,1.55,1.225,1.557,1.747-.058l.611-1.773s.004.008.005.012c.793-2.3,1.782-4.521,2.968-6.616.193-.341.409-.667.611-1.001,3.484-5.76,8.337-10.572,14.13-13.942l1.17-.689.102-.06v.196s-.008,1.277-.008,1.277c-.021,6.695-1.766,13.146-5.146,19.2-.191.341-.365.686-.566,1.025-1.288,2.176-2.615,4.068-4.021,5.744,0,0,.001,0,.002,0l-1.159,1.475c-1.075,1.315-.711,1.866.897,1.5l1.275-.247c2.59-.542,5.051-.836,7.46-.864l.116-.011c.108-.011.215-.024.331-.015.246,0,.489.013.734.017,4.883.088,9.646,1.047,14.194,2.874,1.442.577,2.745,1.327,4.005,2.052l1.873,1.066.171.097-.135.076-1.16.654c-5.976,3.369-12.496,5.195-18.912,5.339Zm18.659-17.511c-4.419-1.771-9.028-2.672-13.698-3.143,2.879-6.335,4.578-13.311,4.578-20.71,0-1.284-.284-2.49-.379-3.75,3.57-1.022,7.265-1.743,11.163-1.743,7.414,0,14.271,2.129,20.262,5.589-.02,8.382-2.493,16.826-7.856,24.084-1.344,1.819-2.965,3.279-4.534,4.807-2.943-1.999-6.1-3.758-9.536-5.135Zm-18.678-64.652c8.414,0,16.901,2.596,24.187,7.979,7.462,5.513,12.347,13.125,14.754,21.394-5.767-2.306-12.018-3.658-18.599-3.658-4.44,0-8.669.761-12.774,1.846-2.903-10.567-9.107-19.678-17.512-26.259,3.255-.816,6.583-1.302,9.943-1.302Zm-27.225,10.539c.872-.754,1.776-1.46,2.7-2.134.602-.439,1.211-.862,1.831-1.269.758-.497,1.523-.98,2.303-1.432h0c1.156.673,2.263,1.415,3.342,2.193.965.696,1.909,1.417,2.807,2.191.634.547,1.251,1.112,1.849,1.696.534.521,1.05,1.059,1.555,1.608,1.18,1.283,2.273,2.645,3.28,4.073.494.7.974,1.41,1.423,2.142,2.11,3.436,3.722,7.214,4.738,11.245-7.591,3.669-14.125,9.111-19.016,15.891-1.579-2.185-3.219-4.337-5.163-6.281-4.1-4.1-8.867-7.233-13.945-9.667,1.26-5,3.456-9.851,6.71-14.255.855-1.158,1.766-2.244,2.725-3.265.912-.971,1.871-1.879,2.862-2.736Zm-13.564-10.498c1.665,0,3.294.127,4.895.349,1.601.222,3.172.537,4.721.914-3.489,2.744-6.67,5.905-9.353,9.537-3.759,5.088-6.383,10.75-8.003,16.674-4.101-1.062-8.301-1.8-12.648-1.8-6.452,0-12.694,1.273-18.518,3.577,4.991-16.867,20.422-29.251,38.907-29.251Zm-20.39,35.265c3.729,0,7.416.691,11.031,1.708-.271,3.709-.24,7.457.326,11.224.705,4.698,2.25,9.091,4.161,13.301-5.38.523-10.665,1.64-15.678,3.879-2.808,1.255-5.42,2.802-7.907,4.5-7.542-7.371-12.251-17.618-12.288-28.987,6.294-3.647,13.293-5.625,20.354-5.625Zm-26.652,58.096c-1.351,3.53-2.186,7.154-2.72,10.805-15.131-15.794-15.101-40.692.118-56.433,1.537,10.938,6.413,20.801,13.815,28.314-4.823,4.89-8.686,10.706-11.213,17.313Zm18.648-11.083c6.776,4.648,14.794,7.457,23.39,8.322-.311.688-.708,1.316-.991,2.022-2.952,7.367-3.841,14.997-3.278,22.424-3.643,1.034-7.359,1.734-11.118,1.734-7.044,0-14.026-1.971-20.308-5.6.054-10.856,4.49-21.267,12.304-28.901Zm28.402,69.837c-15.589,0-30.468-8.991-37.237-24.145-.76-1.7-1.206-3.449-1.717-5.188,5.835,2.314,12.091,3.589,18.557,3.589,4.386,0,8.622-.751,12.756-1.832,0,0,0,0,0,0h0c2.819,10.283,8.853,19.485,17.438,26.236-3.257.814-6.535,1.341-9.797,1.341Zm20.314-5.683c-9.692-5.633-16.377-14.774-19.002-25.169,5.058-2.432,9.807-5.553,13.893-9.639,1.944-1.944,3.585-4.096,5.163-6.281,4.883,6.767,11.403,12.2,18.976,15.868,0,0,0,0,0,0,0,0,0,0,0,0-2.613,10.394-9.254,19.558-19.03,25.221Zm58.254-19.926c-6.38,15.924-21.681,25.61-37.846,25.61-3.227,0-6.473-.539-9.704-1.337,8.588-6.77,14.493-16.024,17.294-26.265,0,0,0,0,0,0,0,0,0,0,0,0,4.116,1.091,8.358,1.858,12.812,1.858,6.556,0,12.782-1.348,18.531-3.637-.368,1.258-.59,2.53-1.087,3.772Zm-17.443-9.726c-3.904,0-7.603-.723-11.178-1.748.61-8.056-.479-16.338-3.998-24.218-.008-.019-.021-.035-.029-.054,8.388-.88,16.381-3.862,23.266-8.57h0c7.789,7.607,12.209,18.072,12.265,28.966-6.004,3.482-12.885,5.624-20.326,5.624Zm29.236-12.442c-1.521-10.623-6.238-20.595-13.815-28.302,0,0,0,0,0,0h0s0,0,0,0c1.673-1.69,3.27-3.463,4.699-5.398,5.053-6.839,7.994-14.706,9.142-22.898,7.088,7.333,11.495,17.278,11.495,28.283s-4.416,20.979-11.522,28.315Z"
        fill="#00c4ff"
      />
    </svg>
  ),
};
