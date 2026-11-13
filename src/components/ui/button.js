import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.gap || '0.5rem'};
  border-radius: 6px;
  font-size: ${props => props.size === 'sm' ? '0.875rem' : '1rem'};
  font-weight: 500;
  padding: ${props => {
    switch (props.size) {
      case 'sm': return '0.5rem 1rem';
      case 'lg': return '0.75rem 2rem';
      default: return '0.625rem 1.5rem';
    }
  }};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;

  ${props => {
    if (props.variant === 'outline') {
      return `
        background: transparent;
        border-color: hsl(var(--border));
        color: hsl(var(--foreground));

        &:hover {
          background: hsl(var(--accent));
          border-color: hsl(var(--accent-foreground));
        }
      `;
    } else if (props.variant === 'secondary') {
      return `
        background: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));

        &:hover {
          background: hsl(var(--secondary) / 0.8);
        }
      `;
    } else {
      return `
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));

        &:hover {
          background: hsl(var(--primary) / 0.9);
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.className && props.className}
`;

export const Button = React.forwardRef(({
  variant = 'default',
  size = 'default',
  gap,
  children,
  ...props
}, ref) => {
  return (
    <StyledButton
      ref={ref}
      variant={variant}
      size={size}
      gap={gap}
      {...props}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';