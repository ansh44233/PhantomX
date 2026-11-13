import styled from 'styled-components';

export const SettingsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: var(--background);
  color: var(--text);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SettingsHeader = styled.header`
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
  }
`;

export const ResetButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid #333333;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    border-color: #555555;
  }
`;

export const SettingsContent = styled.div`
  max-width: 1200px;
`;

export const SettingsSection = styled.section`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SectionIcon = styled.div`
  font-size: 1.3rem;
  color: #ffffff;
`;

export const SettingsGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const SettingGroup = styled.div`
  margin-bottom: 2rem;
`;

export const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-small);
  transition: var(--transition-normal);
  
  &:hover {
    border-color: var(--border-color-hover);
    background: var(--card-background-hover);
  }
`;

export const SettingLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

export const SettingDescription = styled.p`
  font-size: 0.85rem;
  color: #666666;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 50px;
  height: 26px;
  background: var(--toggle-background);
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: var(--transition-normal);
  
  &:checked {
    background: var(--accent-color, #ffffff);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--toggle-handle);
    top: 2px;
    left: 2px;
    transition: var(--transition-normal);
  }
  
  &:checked::before {
    background: var(--background);
    transform: translateX(24px);
  }
`;

export const SelectInput = styled.select`
  background: var(--input-background);
  color: var(--text);
  border: 1px solid var(--border-color);
  padding: 0.75rem;
  border-radius: var(--border-radius-small);
  font-size: 0.9rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--border-color-focus);
  }
  
  option {
    background: var(--input-background);
    color: var(--text);
  }
`;

export const SliderInput = styled.input.attrs({ type: 'range' })`
  appearance: none;
  width: 100%;
  height: 6px;
  background: #333333;
  border-radius: 3px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

export const ColorInput = styled.input.attrs({ type: 'color' })`
  width: 60px;
  height: 40px;
  border: 1px solid #333333;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`;