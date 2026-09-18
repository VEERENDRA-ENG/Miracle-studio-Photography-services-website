import React from 'react';
import './Loading.css';

/**
 * Loading Component
 * Displays a camera-shutter styled spinner with a customizable message
 */
export default function Loading({ message = 'Loading visual stories...' }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="shutter-spinner">
        <div className="blade blade-1"></div>
        <div className="blade blade-2"></div>
        <div className="blade blade-3"></div>
        <div className="blade blade-4"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
