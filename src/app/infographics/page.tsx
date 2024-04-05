import React from 'react';
import Loader from '../../components/Loader';

interface PageProps {
    // Define your props here
}

const Page: React.FC<PageProps> = () => {
    // Add your component logic here

    return (
        <div>
            <Loader />
        </div>
    );
};

export default Page;