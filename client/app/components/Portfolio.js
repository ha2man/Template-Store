import React from 'react';

// import components
import Projects from './Projects';

const Portfolio = () => {
  return (
    <section id='portfolio' className='section bg-primary min-h-[1100px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center text-center'>
          <h2 className='section-title before:content-portfolio relative before:absolute before:opacity-40 before:-top-[2rem] before:-left-3/4 before:hidden before:lg:block'>
            My latest work
          </h2>
          <p className='subtitle'>
          I believe that good results come from close collaboration, shared ambition, and mutual respect, and I love using design to make a positive impact on customers and on our shared environment.
          </p>
        </div>
        <Projects />
      </div>
    </section>
  );
};

export default Portfolio;
