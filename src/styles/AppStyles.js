import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--background);
  transition: background-color 0.3s ease;
  padding-top: ${props => window.electronAPI ? '32px' : '0'};
`;

export const MainContent = styled.main`
  flex: 1;
  min-height: calc(100vh - ${props => window.electronAPI ? '102px' : '70px'});
  position: relative;
  background: var(--background);
  transition: background-color 0.3s ease, margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 110px;
  padding-top: 0;
  width: calc(100% - 110px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    ${props => !window.electronAPI && `
      padding-top: 60px;
      padding-bottom: 80px;
      min-height: calc(100vh - 60px);
    `}
  }
`;