"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const galleryImages = [
    {
        beforeImage: '/images/1before.jpg',
        afterImage: '/images/1after.jpg',
        beforeAlt: 'Wild backyard before landscaping',
        afterAlt: 'Architectural backyard paradise with perfect lighting',
        description: 'Luxury backyard transformation'
    },
    {
        beforeImage: '/images/2before.jpg',
        afterImage: '/images/2after.jpg',
        beforeAlt: 'Dry, barren garden space',
        afterAlt: 'Lush, vibrant garden with sculptural elements',
        description: 'Botanical garden redesign'
    },
    {
        beforeImage: '/images/3before.jpg',
        afterImage: '/images/3after.jpg',
        beforeAlt: 'Dated patio area',
        afterAlt: 'Minimalist luxury outdoor lounge',
        description: 'Premium hardscape construction'
    },
    {
        beforeImage: '/images/4before.jpg',
        afterImage: '/images/4after.jpg',
        beforeAlt: 'Unfinished yard space',
        afterAlt: 'Complete resort-style residential landscape',
        description: 'Master plan implementation'
    }
];

export default function Gallery() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {galleryImages.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone/10">
                            <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={item.beforeImage} alt={item.beforeAlt} />}
                                itemTwo={<ReactCompareSliderImage src={item.afterImage} alt={item.afterAlt} />}
                                className="w-full h-full"
                                handle={
                                    <div className="h-full w-[2px] bg-white/80 relative shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                                            <div className="w-1 h-4 bg-stone/20 rounded-full" />
                                        </div>
                                    </div>
                                }
                            />
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                Before / After
                            </div>
                        </div>
                        <p className="text-stone-grey font-medium text-sm uppercase tracking-widest pl-2">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
