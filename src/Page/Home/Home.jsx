import React from 'react';
import Banner from '../Banner/Banner';
import SomeInfo from './SomeInfo';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SomeInfo></SomeInfo>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;