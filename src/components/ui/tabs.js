import React, { useState } from 'react';
import styled from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const StyledTabs = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTabsList = styled(TabsPrimitive.List)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  border-radius: 6px;
  background: hsl(var(--muted));
  padding: 0.25rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0.125rem;
  }
`;

const StyledTabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  background: transparent;
  color: hsl(var(--muted-foreground));

  &[data-state='active'] {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  &:hover {
    color: hsl(var(--foreground));
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;

const StyledTabsContent = styled(TabsPrimitive.Content)`
  margin-top: 1rem;
  outline: none;

  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
`;

export const Tabs = React.forwardRef(({ defaultValue, value, onValueChange, children, ...props }, ref) => (
  <StyledTabs
    ref={ref}
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
    {...props}
  >
    {children}
  </StyledTabs>
));

export const TabsList = React.forwardRef(({ children, ...props }, ref) => (
  <StyledTabsList ref={ref} {...props}>
    {children}
  </StyledTabsList>
));

export const TabsTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <StyledTabsTrigger ref={ref} {...props}>
    {children}
  </StyledTabsTrigger>
));

export const TabsContent = React.forwardRef(({ children, ...props }, ref) => (
  <StyledTabsContent ref={ref} {...props}>
    {children}
  </StyledTabsContent>
));

// Set display names for debugging
Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';