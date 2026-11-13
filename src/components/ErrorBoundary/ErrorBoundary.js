import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: var(--background);
  color: var(--foreground);
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--error);
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    // Clear the error state to retry rendering
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            VoidStream encountered an unexpected error. This is usually temporary and can be fixed by refreshing the app.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '800px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                background: '#1a1a1a', 
                padding: '1rem', 
                borderRadius: '4px', 
                overflow: 'auto',
                fontSize: '0.9rem'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;