import React from 'react';
import './SectionTitle.css';

/**
 * SectionTitle Component
 * Renders consistent, luxurious section headers with an accent subtitle and description
 */
export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center'
}) {
  return (
    <div className={`section-title-wrap ${align === 'left' ? 'text-left' : 'text-center'}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-heading">{title}</h2>
      <div className="section-divider"></div>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
