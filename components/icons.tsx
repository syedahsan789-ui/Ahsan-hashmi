
import React from 'react';

// interface ShapeIconProps {
//   outline?: boolean;
//   className?: string;
//   fillColor?: string; 
//   strokeColor?: string;
// }

export const CircleIcon = ({ outline = false, className = "w-16 h-16", fillColor = "fill-yellow-400", strokeColor = "stroke-yellow-600" }) => (
  <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="20" cy="20" r="18" 
      className={`${outline ? 'fill-transparent stroke-2 ' + strokeColor : fillColor + ' ' + strokeColor + ' stroke-2'}`} 
    />
  </svg>
);

export const SquareIcon = ({ outline = false, className = "w-16 h-16", fillColor = "fill-blue-400", strokeColor = "stroke-blue-600" }) => (
  <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="2" y="2" width="36" height="36" rx="3" ry="3"
      className={`${outline ? 'fill-transparent stroke-2 ' + strokeColor : fillColor + ' ' + strokeColor + ' stroke-2'}`} 
    />
  </svg>
);

export const TriangleIcon = ({ outline = false, className = "w-16 h-16", fillColor = "fill-green-400", strokeColor = "stroke-green-600" }) => (
  <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
    <polygon 
      points="20,2 2,38 38,38" 
      className={`${outline ? 'fill-transparent stroke-2 ' + strokeColor : fillColor + ' ' + strokeColor + ' stroke-2'}`} 
    />
  </svg>
);

export const StarIcon = ({ className = "w-8 h-8", fillColor = "fill-yellow-400" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path className={fillColor} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
  </svg>
);

export const SparkleIcon = ({className = "w-6 h-6 text-yellow-400"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17.437 9.154a4.5 4.5 0 00-3.09-3.09L11.5 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.25 12zM12 18.75l.813-2.846a4.5 4.5 0 003.09-3.09L18.75 12l-2.846-.813a4.5 4.5 0 00-3.09-3.09L12 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L5.25 12l2.846.813a4.5 4.5 0 003.09 3.09L12 18.75z" />
  </svg>
);
