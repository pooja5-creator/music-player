import React from 'react';

export default function ShimmerEffect() {
  return (
    <div className='shimmerContainer'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className='box' key={index}>
          <div className='circle'></div>
          <div className='NamedContainer'>
            <div className='box1'></div>
            <div className='box2'></div>
          </div>
        </div>
      ))}
    </div>
  );
}