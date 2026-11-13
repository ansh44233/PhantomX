import React from 'react';
import styled from 'styled-components';

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.2s ease-in-out;

  ${props => {
    if (props.variant === 'secondary') {
      return `
        background: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));
      `;
    } else if (props.variant === 'destructive') {
      return `
        background: hsl(var(--destructive));
        color: hsl(var(--destructive-foreground));
      `;
    } else if (props.variant === 'outline') {
      return `
        background: transparent;
        border-color: hsl(var(--border));
        color: hsl(var(--foreground));
      `;
    } else {
      return `
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      `;
    }
  }}

  ${props => props.className && props.className}
`;

export const Badge = React.forwardRef(({
  variant = 'default',
  children,
  ...props
}, ref) => {
  return (
    <StyledBadge
      ref={ref}
      variant={variant}
      {...props}
    >
      {children}
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';