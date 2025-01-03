import { AnimatedBeamDemo } from '@/components/Organisms/AnimatedBeam';
import { BentoDemo } from '@/components/Organisms/BentoGrid';
import { Button } from '@/components/ui/button';
import WordPullUp from "@/components/ui/word-pull-up";
import { MagicCard } from "@/components/ui/magic-card";




const Signout = () => {
    return (
    <div className='flex flex-col w-full justify-center items-center px-4 py-5'>
        <div className='max-w-6xl grid grid-cols-2 w-full h-full '>
            <div className='flex flex-col h-full  justify-center items-start'>
                <WordPullUp
                    className="text-2xl font-semibold mb-10 tracking-[-0.02em] text-left text-black dark:text-white md:text-7xl md:leading-[5rem] leading-normal"
                    words="Fast Track Your Migration"
                />
                <p className='max-w-[50ch] tracking-wide mb-10'>
                Migratify helps warehouses drive more business by connecting to any e-commerce platform – and provides an AI assistant that automates data entry into WMS & ERPs platforms.
                </p>
                <div className='flex w-[50%] justify-between '>
                    <Button variant={'default'} className='bg-gradient-primary text-xl font-light text-white p-5'>
                        Let's Talk
                    </Button>
                    <Button className='bg-primary text-lg p-5'>
                        Free Demo
                    </Button>
                </div>
            </div>
            <div>
                <AnimatedBeamDemo/>
            </div>
        </div>
        {/* Section Two Bento Grid*/}
        <div className='flex justify-start items-start w-full  max-w-6xl '>

            <div>
                <h1 className='text-5xl font-normal w-[30ch] leading-snug'>Expand across platforms. <br/> Automate your Integrations. <br/>
                    Add revenue, not complexity
                </h1>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10'>
                    <MagicCard className='p-4  rounded-lg flex flex-col items-start'>
                        <div className='mb-4'><icons.catalog/></div>
                        <h2 className='text-xl font-semibold mb-2'>Select from Multiple E-commerce Platforms</h2>
                        <p className='text-sm text-gray-400'>Use our pre-built integrations or build your own custom integrations using Simple flows</p>
                    </MagicCard>
                    <MagicCard className='p-4 rounded-lg flex flex-col items-start'>
                         <div className='mb-4'><icons.connections/></div>
                        <h2 className='text-xl font-semibold mb-2'>Migrate Quickly and Easily</h2>
                        <p className='text-sm text-gray-400'>Migrate with ease and speed, reduce the time to market by 50%</p>
                    </MagicCard>
                    <MagicCard className='p-4 rounded-lg flex flex-col items-start'>
                        <div className='mb-4'><icons.cart/></div>
                        <h2 className='text-xl font-semibold mb-2'>Automate Data Entry with AI</h2>
                        <p className='text-sm text-gray-400'>Let our AI assistant handle data entry tasks by automatically mapping and transforming data between platforms</p>
                    </MagicCard>
                </div>



            </div>
            
        </div>
         {/* Section Five Integrations */}
         {/* <div className="flex flex-col w-full max-w-6xl py-16">
                    <h2 className="text-3xl font-semibold mb-10">Supported Platforms</h2>
                    <div className="grid grid-cols-4 gap-8">
                        
                        <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            Platform 1
                        </div>
                        
                    </div>
            </div> */}
        {/* Section Three */}
            
        <div className='flex justify-start items-start w-full  max-w-6xl mt-14'>
            <BentoDemo/>
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
                <h2 className="text-3xl font-semibold mb-4 text-center">Ready to Simplify Your Migration?</h2>
                <p className="text-gray-600 mb-8 text-center max-w-[50ch]">
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