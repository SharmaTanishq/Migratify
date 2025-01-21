"use client"
import { AnimatedBeamDemo } from '@/components/landing/logo-animation/AnimatedBeam';


import WordPullUp from "@/components/ui/word-pull-up";

import { ArrowRight } from 'lucide-react';

import { useRouter } from 'next/navigation';

import PulsatingButton from '@/components/ui/pulsating-button';
import Connect from '@/components/landing/flow-based/connect';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from '@/components/AddNodes/DnDContext';
import { Joinwaitlist } from '@/components/landing/joinwaitlist';
import { FlipWords } from '@/components/ui/flip-words';

import { TimelineSection } from '@/components/landing/timeline';


const Signout = () => {
    const router = useRouter();
    const words = ["faster", "cheaper", "visually", "better", "easier" , "smarter"];
    return (
    <div className='flex flex-col w-full justify-center items-center px-4 py-5'>
        <div className='max-w-7xl p-10  grid grid-cols-2 w-full h-full '>
            
            <div className='flex flex-col h-full  justify-center items-start '>
            <div className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-[#202632] border border-white/10 text-sm">
                <span className="text-purple-300">New</span>
                <span className="text-white/70">AI-Powered Migration Tool</span>
                <ArrowRight className="w-4 h-4 text-white/50" />
            </div>  
                <WordPullUp
                    className=" text-2xl font-semibold mb-10 tracking-[-0.02em] text-left  bg-gradient-to-r from-[#202632] to-gray-500 bg-clip-text text-transparent dark:text-white md:text-7xl md:leading-[5rem] leading-normal"
                    words="Fast Track Your Migration"
                />
                <p className='max-w-[50ch] tracking-wide mb-10 text-color-primary-black font-light'>
                Connect your e-commerce platform to our AI-powered assistant and automate your data migration. Transform weeks of manual work into minutes.
                </p>
                <div className='flex w-3/4 justify-between '>
                    <PulsatingButton 
                       onClick={()=>router.push("/waitlist")}
                        className='bg-gradient-to-r w-full  rounded-full from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xl font-light text-white  transition-all duration-200'
                        
                    >
                        Join Waitlist
                    </PulsatingButton>
                 
                </div>
            </div>
            <div>
                <AnimatedBeamDemo/>
            </div>
            
        </div>
        
        {/* Section Two Bento Grid*/}
        <div className='flex flex-col justify-center items-center w-full  mt-10 '>

            
            <div className="text-4xl md:text-6xl mx-auto font-normal text-center bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent   p-4">
                    Build integrations
                    <FlipWords words={words} className=' font-semibold mb-5   ' /> <br />
                     with Bridgeflow.
            </div>

                <div className='w-full '>
                    <ReactFlowProvider>
                        <DnDProvider>
                            
                            <Connect/>
                        </DnDProvider>
                    </ReactFlowProvider>
                </div>
                
                {/* <div className='p-3 max-w-[1236px] mb-8 mt-[40px]  shadow-sm  border border-neutral-300   rounded-[22px] md:rounded-[28px]'  >
                    <div className="p-3 rounded-[12px] md:rounded-[18px]  relative border border-neutral-200" style={{backgroundColor: "rgba(120, 119, 198, 0.1)"}}>
                        <div className='relative rounded-[4px] md:rounded-[10px] shadow-md'>
                            
                                <Image
                                src={'/images/heropreview.png'}
                                alt="Dashboard preview"
                                width={1200}
                                height={800}
                                className="bg-neutral-white object-cover object-left aspect-[1100/825] rounded-xl md:rounded-xl"    
                                />                        
                            
                        </div>
                    </div>
                    
                </div> */}



            
            
        </div>
        
        <div id='bridgeflow' className='w-full flex flex-col justify-center items-center mt-10 '>
            <TimelineSection/>
        </div>

        
        
        {/* Section how it works */}
        <div className="flex flex-col w-full max-w-6xl py-16">
            <h2 className="text-3xl text-center font-semibold mb-10">How Migratify Works</h2>
            <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-300 text-black flex items-center justify-center mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Connect Platforms</h3>
                    <p className="text-gray-600 text-center">Select and connect your source and destination platforms</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-300 text-black flex items-center justify-center mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Map Data</h3>
                    <p className="text-gray-600 text-center">Our AI assistant helps map your data automatically</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-300 text-black flex items-center justify-center mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Migrate</h3>
                    <p className="text-gray-600 text-center">Start the migration with real-time progress tracking</p>
                </div>
            </div>
        </div>

        {/* Section four Request demo */}
        <Joinwaitlist/>
       
        {/* Footer */}

        <footer className='w-full mt-10 py-2 border-t'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <p className='text-sm text-gray-500'>&copy; 2024 BridgeFlow. All rights reserved.</p>
            <div className='flex space-x-4'>
                <a href='/privacy' className='text-sm text-gray-500 hover:text-gray-700'>Privacy Policy</a>
                <a href='/terms' className='text-sm text-gray-500 hover:text-gray-700'>Terms of Service</a>
            </div>
            </div>
        </footer>
    </div>
    );
};

export default Signout;

