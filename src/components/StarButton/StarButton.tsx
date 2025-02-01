import React from 'react';
import './StarButton.css';

interface StarButtonProps {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const StarButton: React.FC<StarButtonProps> = ({ 
  isActive, 
  onClick, 
  disabled = false 
}) => (
  <button 
    className={`star-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
    title={isActive ? 'Remove from favorites' : 'Add to favorites'}
    aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isActive ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  </button>
);