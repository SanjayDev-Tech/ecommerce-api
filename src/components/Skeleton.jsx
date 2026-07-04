import React from 'react';
import './Skeleton.css';

export const Skeleton = ({ className = '', style = {} }) => {
  return <div className={`skeleton animate-pulse ${className}`} style={style} />;
};
