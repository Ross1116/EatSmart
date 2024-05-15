import React from 'react';
import Image from 'next/image';
import receipt from "../assets/sample_receipt.jpeg"

const ScanReceiptHover: React.FC = () => {
    // Your component logic here

    return (
        <div className='flex flex-col gap-4'>
            <h1>Please Provide a clear image of receipt to scan like below</h1>
            <Image
                src={receipt.src}
                alt="Scan Receipt Hover"
                width={300}
                height={100}
            />
        </div>
    );
};

export default ScanReceiptHover;