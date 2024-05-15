import React from 'react';
import Image from 'next/image';
import food from "../assets/sample_food.jpeg"

const ScanFoodHover: React.FC = () => {

    return (
        <div className='flex flex-col gap-4'>
            <h1>Please provide a clear image of well spaced food to scan like below</h1>
            <Image
                src={food.src}
                alt="Scan Receipt Hover"
                width={300}
                height={100}
            />
        </div>
    );
};

export default ScanFoodHover;