"use client"

import React from 'react';
import { HeroSection } from './page2Components';
import data from "./page2.js"
import './page2.scss';

interface Page2Props {
  data?: typeof data;
}

const Page2: React.FC<Page2Props> = ({ data: pageData = data }) => {
  return (
    <main className="page2">
      <HeroSection data={pageData.heroSection} />
    </main>
  );
};

export default Page2; 