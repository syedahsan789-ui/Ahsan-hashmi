
import React from 'react';

// FeedbackMessageProps interface would be defined in types.ts or implicitly
// interface FeedbackMessageProps {
//   message: string;
//   type: 'success' | 'error' | 'info';
// }

const FeedbackMessage = ({ message, type }) => {
  let bgColor = 'bg-blue-100 border-blue-500 text-blue-700';
  if (type === 'success') {
    bgColor = 'bg-green-100 border-green-500 text-green-700';
  } else if (type === 'error') {
    bgColor = 'bg-red-100 border-red-500 text-red-700';
  }

  return (
    <div className={`border-l-4 p-4 my-4 rounded-md shadow ${bgColor} fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-short`} role="alert">
      <p className="font-bold">{type === 'success' ? 'Yay!' : type === 'error' ? 'Uh oh!' : 'Hey!'}</p>
      <p>{message}</p>
    </div>
  );
};

export default FeedbackMessage;
