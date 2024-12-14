import { AnimatedBeamDemo } from '@/components/Organisms/AnimatedBeam';
import { BentoDemo } from '@/components/Organisms/BentoGrid';
import { Button } from '@/components/ui/button';
import WordPullUp from "@/components/ui/word-pull-up";




const Signout = () => {
    return (
    <div className='flex flex-col w-full justify-center items-center px-4 py-5'>
        <div className='max-w-6xl grid grid-cols-2 w-full h-full '>
            <div className='flex flex-col h-full  justify-center items-start'>
                <WordPullUp
                    className="text-2xl font-semibold mb-10 tracking-[-0.02em] text-left text-black dark:text-white md:text-7xl md:leading-[5rem] leading-normal"
                    words="Fast Track Your Migration"
                />
                <p className='max-w-[50ch] mb-10'>
                Migratify helps warehouses drive more business by connecting to any e-commerce platform – and provides an AI assistant that automates data entry into WMS & ERPs platforms.
                </p>
                <div className='flex w-[40%] justify-between '>
                    <Button className='bg-primary'>
                        Let's Talk
                    </Button>
                    <Button className='bg-secondary'>
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
                    <div className='p-4 border rounded-lg flex flex-col items-start'>
                        <img src='/path/to/logo1.png' alt='Logo 1' className='mb-4' />
                        <h2 className='text-xl font-semibold mb-2'>Card Title 1</h2>
                        <p className='text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    </div>
                    <div className='p-4 border rounded-lg flex flex-col items-start'>
                        <img src='/path/to/logo2.png' alt='Logo 2' className='mb-4' />
                        <h2 className='text-xl font-semibold mb-2'>Card Title 2</h2>
                        <p className='text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    </div>
                    <div className='p-4 border rounded-lg flex flex-col items-start'>
                        <img src='/path/to/logo3.png' alt='Logo 3' className='mb-4' />
                        <h2 className='text-xl font-semibold mb-2'>Card Title 3</h2>
                        <p className='text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    </div>
                </div>



            </div>
            
        </div>
        {/* Section Three */}

        <div className='flex justify-start items-start w-full  max-w-6xl mt-14'>
            <BentoDemo/>
        </div>
        
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