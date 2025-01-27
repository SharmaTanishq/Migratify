

import { ArrowRight } from 'lucide-react';

import { useRouter } from 'next/navigation';

import PulsatingButton from '@/components/ui/pulsating-button';
import Connect from '@/components/landing/flow-based/connect';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from '@/components/AddNodes/DnDContext';
import { Joinwaitlist } from '@/components/landing/joinwaitlist';
import { FlipWords } from '@/components/ui/flip-words';

import { TimelineSection } from '@/components/landing/timeline';

import { SparklesText } from '@/components/ui/sparkles-text';


const Signout = () => {
    const router = useRouter();
    const words = ["faster", "cheaper", "visually", "better", "easier" , "smarter"];
    return (
    <div className='flex flex-col w-full justify-center items-center px-2 md:px-4 py-5'>
        <div className='max-w-7xl p-4 md:p-10  flex flex-col w-full h-full '>
            
            <div className='flex flex-col h-full  justify-center items-center '>
            <div className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-[#202632] border border-white/10 text-sm">
                <span className="text-purple-300">New</span>
                <span className="text-white/70">AI-Powered Migration Tool</span>
                <ArrowRight className="w-4 h-4 text-white/50" />
            </div>  
                
                <h1
                    className='text-4xl md:text-[85px] md:leading-[5rem] text-[#0F1218] leading-normal font-bold text-center p-2 overflow-hidden bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent'                                    
                    
                    >Migrate faster with
                </h1>
                <SparklesText text="Bridgeflow" className='text-5xl md:text-[85px] font-bold md:mt-10' />
                
                <p className='max-w-[50ch] tracking-wide md:leading-normal mb-1 mt-4 md:mt-10 text-color-primary-black font-light text-xs md:text-[20px] text-center'>
                    Build integrations faster with our AI-powered platform that connects your systems seamlessly.
                </p>
                <div className='flex w-2/4 md:w-1/4 justify-between mt-4 md:mt-10'>
                    <PulsatingButton 
                       onClick={()=>router.push("/waitlist")}
                        className='bg-gradient-to-r w-full  rounded-full from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 md:text-xl font-light text-white  transition-all duration-200'
                        
                    >
                        Join Waitlist
                    </PulsatingButton>
                 
                </div>
            </div>
            
            
        </div>
        
        {/* Section Two Bento Grid*/}
        <div className='flex flex-col justify-center items-center w-full  mt-10 '>

            
            <div className="text-4xl md:text-6xl mx-auto font-normal text-center bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent   p-4">
                    Build 
                    <FlipWords words={words} className=' font-semibold ' /> 
                    
            </div>

                <div className='w-full '>
                    <ReactFlowProvider>
                        <DnDProvider>
                            
                            <Connect/>
                        </DnDProvider>
                    </ReactFlowProvider>
                </div>
                
              
            
            
        </div>
        
        <div id='bridgeflow' className='w-full flex flex-col justify-center items-center md:mt-10 '>
            <TimelineSection/>
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

