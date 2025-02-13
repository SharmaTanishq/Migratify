
import { ArrowRight, Dna,  FlameIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import PulsatingButton from "@/components/ui/pulsating-button";
import Connect from "@/components/landing/flow-based/connect";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "@/components/AddNodes/DnDContext";
import { Joinwaitlist } from "@/components/landing/joinwaitlist";


import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OrbitingCirclesDemo } from "@/components/landing/IntegrateCards/iconCircle";
import { OrdersList } from "@/components/landing/MigrateSection/orders-list";
import Bridges from "@/components/landing/IntegrateCards/cardStack";
import IntegrationCards from "@/components/landing/IntegrateCards/integrationCards";
import ProductCard from "@/components/landing/MigrateSection/product-cards";


const Signout = ({bridgesData}:any) => {
    
  const router = useRouter();
  const words = [
    "faster",
    "cheaper",
    "visually",
    "better",
    "easier",
    "smarter",
  ];
  return (
    <div className="container-grid ">
      <section className="w-full mt-10">
        <div className="relative max-w-7xl mx-auto p-4 pl-10 md:py-20 gap-8 flex flex-col w-full h-full bg-white rounded-2xl border border-gray-300 overflow-hidden">
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(700px_circle_at_right,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 right-5 "
            )}
            width={80}
            height={80}
          />
          <div className="flex flex-col h-full  justify-start items-start  ">
            <div className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-background border shadow-sm border-white/10 text-sm">
              <span>Effortless Migration, Instant Integration</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="text-4xl md:text-[70px]  text-[#0F1218] w-[15ch] leading-tight font-bold font-mono text-left ">
              The Faster way to replatform
            </div>

            <p className="max-w-[50ch] tracking-wide md:leading-tight mb-1 mt-4 md:mt-5 text-primaryGray font-light text-xs md:text-[16px] text-left">
              Bridgeflow helps drive more business by connecting to any
              e-commerce platform – and provides a Visual Tool that eases your
              workflows
            </p>
            <div className="flex w-2/4 md:w-1/4 justify-between mt-4 md:mt-10">
              <PulsatingButton
                onClick={() => router.push("/waitlist")}
                className="bg-gradient-to-r w-full  rounded-full from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 md:text-xl font-light text-white  transition-all duration-200"
              >
                Join Waitlist
              </PulsatingButton>
            </div>
          </div>
        </div>
      </section>
      {/* Section two Integrate*/}
      <section>
        <div className="w-full rounded-2xl md:py-20 overflow-hidden ">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center gap-8 ">
              <Badge className="bg-white rounded-full border border-white/10 text-sm text-black gap-2">
                <Dna className="w-4 h-4" />
                <span className="text-black font-normal">Integrate</span>
              </Badge>
              <h1 className="text-4xl md:text-5xl font-mono text-center">
                With Us, Integrations are easier
              </h1>
              <p className="text-sm md:text-base text-primaryGray text-center">
                Effortless Orchestration for developers & business owners{" "}
              </p>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 w-full   gap-4">
              <Card className="overflow-hidden border border-gray-300 ">
                <CardHeader>
                  
                  <CardTitle>Select your platform</CardTitle>
                  <CardDescription>
                    Pick a platform that you want to extend.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm md:text-base text-primaryGray max-h-[300px]">
                    <OrbitingCirclesDemo />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Use our pre-built bridges</CardTitle>
                  <CardDescription>
                    Want to use an event that triggers your workflow or run a
                    batch job? we got you!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center h-[350px] md:h-full ">
                    
                        <Bridges />
                    
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Choose what to do</CardTitle>
                  <CardDescription>
                    Trigger an email or send your data to an ERP
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] md:h-full  overflow-hidden">
                    
                        <IntegrationCards />
                    
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Section Three Migrate*/}
      <section>
        <div className="w-full rounded-2xl   md:py-20 overflow-hidden ">
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center gap-8">
              <Badge className="bg-white rounded-full border border-white/10 text-sm text-black gap-2">
                <FlameIcon className="w-4 h-4" />
                
                <span className="text-black font-normal">Migrate</span>
              </Badge>
              <h1 className="text-4xl md:text-5xl font-mono text-center ">
                Take control of your business
              </h1>
              <p className="text-sm md:text-base text-primaryGray text-center">
                E-commerce migrations don’t have to take months. Do it faster
                with Bridgeflow.{" "}
              </p>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full  gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Migrate Products</CardTitle>
                  <CardDescription>
                    Migrate your products from one platform to another.
                  </CardDescription>
                  <CardContent className="md:p-6 p-2 ">
                    <ProductCard />
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Migrate Orders</CardTitle>
                  <CardDescription>
                    Migrate your orders from one platform to another.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[310px] overflow-hidden ">
                    <OrdersList />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Migrate Customers</CardTitle>
                  <CardDescription>
                    Migrate your customers from one platform to another.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Migrate Inventory</CardTitle>
                  <CardDescription>
                    Migrate your inventory from one platform to another.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <span className="text-4xl font-mono text-black text-center">
              .... and so much more
            </span>
          </div>
        </div>
      </section>
      {/* Section Two Bento Grid*/}
      {/* <section>
        <div className="flex flex-col justify-center items-center w-full  mt-10 gap-10 ">
          <div className="flex flex-col justify-center items-center gap-8">
            <Badge className="bg-white rounded-full border border-white/10 text-sm text-black">
              <span className="text-black font-normal">Try it out</span>
            </Badge>
            <h1 className="text-4xl md:text-5xl font-mono">Try it here</h1>
          </div>

          <div className="w-full  rounded-2xl   overflow-hidden ">
            <ReactFlowProvider>
              <DnDProvider>
                <Connect />
              </DnDProvider>
            </ReactFlowProvider>
          </div>
        </div>
      </section> */}

      {/* <section>
        <div
          id="bridgeflow"
          className="w-full flex flex-col justify-center items-center md:mt-10 bg-white rounded-2xl p-4  overflow-hidden "
        >
          <TimelineSection />
        </div>
      </section> */}
      {/* Section four Request demo */}
      <section>
        <Joinwaitlist />
      </section>
      {/* Footer */}

      <footer className="w-full mt-10 py-2 ">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 BridgeFlow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signout;
