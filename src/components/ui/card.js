import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

const StyledCardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid hsl(var(--border));
`;

const StyledCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin: 0;
`;

const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin: 0.5rem 0 0 0;
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
`;

const StyledCardFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid hsl(var(--border));
  background: hsl(var(--muted) / 0.5);
`;

export const Card = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCard ref={ref} {...props}>
    {children}
  </StyledCard>
));

export const CardHeader = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCardHeader ref={ref} {...props}>
    {children}
  </StyledCardHeader>
));

export const CardTitle = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCardTitle ref={ref} {...props}>
    {children}
  </StyledCardTitle>
));

export const CardDescription = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCardDescription ref={ref} {...props}>
    {children}
  </StyledCardDescription>
));

export const CardContent = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCardContent ref={ref} {...props}>
    {children}
  </StyledCardContent>
));

export const CardFooter = React.forwardRef(({ children, ...props }, ref) => (
  <StyledCardFooter ref={ref} {...props}>
    {children}
  </StyledCardFooter>
));

// Set display names for debugging
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';