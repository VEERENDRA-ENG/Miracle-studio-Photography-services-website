import React from 'react';
import './ErrorMessage.css';

/**
 * ErrorMessage Component
 * Displays friendly, non-crashing feedback with an optional retry button
 */
export default function ErrorMessage({
  message = 'Unable to load this information. Please try again.',
  onRetry
}) {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <p className="error-message">{message}</p>
        {onRetry && (
          <button className="btn btn-outline error-retry-btn" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
