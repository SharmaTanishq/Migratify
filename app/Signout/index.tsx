import { AnimatedBeamDemo } from '@/components/Organisms/AnimatedBeam';
import { BentoDemo } from '@/components/Organisms/BentoGrid';
import { Button } from '@/components/ui/button';
import WordPullUp from "@/components/ui/word-pull-up";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowRight } from 'lucide-react';
import { RulerCard } from "@/components/ui/ruler-card";

import VtexNodeImage from "@/public/assets/VtexNode.png"


const Signout = () => {
    return (
    <div className='flex flex-col w-full justify-center items-center px-4 py-5'>
        <div className='max-w-7xl p-10 mt-10  grid grid-cols-2 w-full h-full '>
            
            <div className='flex flex-col h-full  justify-center items-start mt-10'>
            <div className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-[#0f1011] border border-white/10 text-sm">
                <span className="text-purple-300">New</span>
                <span className="text-white/70">AI-Powered Migration Assistant</span>
                <ArrowRight className="w-4 h-4 text-white/50" />
            </div>  
                <WordPullUp
                    className="text-2xl font-semibold mb-10 tracking-[-0.02em] text-left text-black  bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent dark:text-white md:text-8xl md:leading-[5rem] leading-normal"
                    words="Fast Track Your Migration"
                />
                <p className='max-w-[50ch] tracking-wide mb-10 text-[#8a8f98] font-light'>
                Connect your e-commerce platform to our AI-powered assistant and automate your data migration. Transform weeks of manual work into minutes.
                </p>
                <div className='flex w-[50%] justify-between'>
                    <Button 
                        variant={'default'} 
                        className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xl font-light text-white p-5 transition-all duration-200'
                    >
                        Let's Talk
                    </Button>
                    <Button 
                        className='bg-[#0f1011] border border-white/10 text-white hover:bg-[#1a1b1d] text-lg p-5 transition-colors'
                    >
                        Free Demo
                    </Button>
                </div>
            </div>
            <div>
                <AnimatedBeamDemo/>
            </div>
        </div>
        {/* Section Two Bento Grid*/}
        <div className='flex justify-start items-start w-full  max-w-6xl mt-10 '>

            <div>
                <h1 className='text-5xl font-normal w-[30ch] leading-snug'>Expand across platforms. <br/> Automate your Integrations. <br/>
                    Add revenue, not complexity
                </h1>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10'>
                    <MagicCard className='p-4  rounded-lg flex flex-col items-start'>
                        <div className='mb-4 text-white'><icons.catalog/></div>
                        <h2 className='text-xl text-white font-semibold mb-2'>Select from Multiple E-commerce Platforms</h2>
                        <p className='text-sm text-[#8a8f98]'>Use our pre-built integrations or build your own custom integrations using Simple flows</p>
                    </MagicCard>
                    <MagicCard className='p-4 rounded-lg flex flex-col items-start'>
                         <div className='mb-4 text-white'><icons.connections/></div>
                        <h2 className='text-xl text-white font-semibold mb-2'>Migrate Quickly and Easily</h2>
                        <p className='text-sm text-[#8a8f98]'>Migrate with ease and speed, reduce the time to market by 50%</p>
                    </MagicCard>
                    <MagicCard className='p-4 rounded-lg flex flex-col items-start'>
                        <div className='mb-4 text-white'><icons.cart/></div>
                        <h2 className='text-xl text-white font-semibold mb-2'>Automate Data Entry with AI</h2>
                        <p className='text-sm text-[#8a8f98]'>Let our AI assistant handle data entry tasks by automatically mapping and transforming data between platforms</p>
                    </MagicCard>
                </div>



            </div>
            
        </div>
        
            
        <div className='flex justify-start items-start w-full max-w-6xl mt-14 flex-col gap-8'>
            <RulerCard
                title="Automate Your E-commerce Platform Migration"
                description="Move your entire store between platforms effortlessly with AI-assisted data mapping and real-time progress tracking."
                className="w-full h-[250px]"
            />
            <RulerCard
                title="Seamless Data Synchronization"
                description="Keep your product data, orders, and customer information synchronized across multiple platforms in real-time."
                className="w-full h-[250px]"
            />
            <RulerCard
                title="Custom Integration Builder"
                description="Create and customize your own integration workflows with our intuitive drag-and-drop interface and AI-powered suggestions."
                className="w-full h-[250px]"
                imageSrc={"/images/VtexNode.png"}
            />
        </div>
        
        {/* Section how it works */}
        <div className="flex flex-col w-full max-w-6xl py-16">
            <h2 className="text-3xl text-center font-semibold mb-10">How Migratify Works</h2>
            <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Connect Platforms</h3>
                    <p className="text-gray-600 text-center">Select and connect your source and destination platforms</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Map Data</h3>
                    <p className="text-gray-600 text-center">Our AI assistant helps map your data automatically</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Migrate</h3>
                    <p className="text-gray-600 text-center">Start the migration with real-time progress tracking</p>
                </div>
            </div>
        </div>

        {/* Section four Request demo */}
        <MagicCard className="flex flex-col items-center w-full max-w-6xl py-16 bg-secondary rounded-xl">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-semibold mb-4 text-center text-white">Ready to Simplify Your Migration?</h2>
                <p className="text-gray-600 mb-8 text-center max-w-[50ch] ">
                    Schedule a demo to see how Migratify can transform your warehouse operations
                </p>
                <Button className="bg-gradient-primary text-white text-lg px-8 py-4">
                    Request Demo
                </Button>
            </div>
        </MagicCard>
       
        {/* Footer */}

        <footer className='w-full mt-10 py-5 border-t'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <p className='text-sm text-gray-500'>&copy; 2023 Migratify. All rights reserved.</p>
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

const icons ={

    catalog:()=>(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
    ),

    connections:()=>(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
    ),

    cart:()=>(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    )


}