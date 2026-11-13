import styled from 'styled-components';

export const MusicContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.header`
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: rgba(0,0,0,0.95);
  .logo h1 {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: linear-gradient(45deg, #fff, #ccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
  }
  .nav {
    display: flex;
    gap: 1rem;
  }
  .nav-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.2rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    &.active, &:hover {
      color: var(--text-primary);
      background: var(--glow);
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }
  }
`;

export const SearchBar = styled.div`
  padding: 2rem;
  margin-top: 80px;
  position: relative;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  .search-icon {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 1.1rem;
  }
  input {
    width: 100%;
    padding: 1rem 4rem 1rem 3rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 50px;
    color: var(--text-primary);
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 30px rgba(255,255,255,0.1);
      background: var(--bg-tertiary);
    }
  }
  button {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: var(--accent);
    color: var(--bg-primary);
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    &:hover {
      background: var(--text-secondary);
      box-shadow: 0 0 20px rgba(255,255,255,0.2);
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;


`;

export const Section = styled.section`
  animation: fadeIn 0.5s ease;
`;

export const Hero = styled.div`
  text-align: center;
  padding: 4rem 0;
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #fff, #ccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(255,255,255,0.3);
  }
  .hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .card {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      border-color: var(--text-muted);

      .card-image {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
      }

      .card-actions {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-image {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      background: var(--bg-tertiary);
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-subtitle {
      color: var(--text-secondary);
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.5rem;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;

      .action-btn {
        background: var(--accent);
        color: var(--bg-primary);
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;

        &:hover {
          background: var(--text-secondary);
          transform: scale(1.1);
        }

        &.download-btn {
          background: #28a745;

          &:hover {
            background: #218838;
          }
        }

        &.next-btn {
          background: #17a2b8;

          &:hover {
            background: #138496;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;

    .card {
      padding: 1rem;

      .card-image {
        height: 140px;
      }

      .card-title {
        font-size: 1rem;
      }

      .card-subtitle {
        font-size: 0.8rem;
      }
    }
  }
`;

export const Player = styled.div`
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  position: fixed;
  bottom: 85px; left: 0; right: 0;
  z-index: 999;
  backdrop-filter: blur(10px);
  background: rgba(17,17,17,0.95);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1rem;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    bottom: 80px;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -6px 25px rgba(0,0,0,0.4);

    .progress-section {
      order: 1;
      width: 100%;
      max-width: none;
      margin-bottom: 0.75rem;

      .progress-bar {
        height: 8px;
        border-radius: 4px;
        cursor: pointer;
        background: rgba(255,255,255,0.2);
        position: relative;

        &:hover {
          height: 10px;
          border-radius: 5px;
        }

        .progress-fill {
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent), #ff6b6b);
          height: 100%;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--accent);
            box-shadow: 0 0 8px rgba(255,255,255,0.3);
            opacity: 0;
            transition: opacity 0.2s;
          }
        }

        &:hover .progress-fill:after {
          opacity: 1;
        }
      }

      .time-current, .time-total {
        font-size: 0.8rem;
        min-width: 45px;
        font-weight: 600;
        color: var(--text-primary);
      }
    }

    .track-info {
      order: 2;
      flex: 1;
      min-width: 0;
      max-width: 180px;

      img {
        width: 55px;
        height: 55px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        object-fit: cover;
      }

      .track-details {
        h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-top: 0.25rem;
          line-height: 1.2;
        }
        p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.1rem;
        }
      }
    }

    .player-controls {
      order: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;

      button {
        padding: 0.8rem;
        font-size: 1.1rem;
        border-radius: 50%;
        width: 52px;
        height: 52px;
        min-width: 52px;
        min-height: 52px;
        transition: all 0.2s ease;
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
        }

        &:active {
          transform: scale(0.95);
        }

        &.play-btn {
          background: var(--accent);
          color: white;
          font-size: 1.3rem;
          border: none;
          width: 60px;
          height: 60px;
          min-width: 60px;
          min-height: 60px;

          &:hover {
            background: #ff4757;
            box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
          }
        }

        &.download-btn {
          background: #28a745;
          color: white;
          border: none;

          &:hover {
            background: #218838;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          }
        }
      }
    }

    .volume-control {
      order: 4;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255,255,255,0.05);
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);

      svg {
        font-size: 0.9rem;
        color: var(--text-secondary);
      }

      input[type='range'] {
        width: 80px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        outline: none;
        cursor: pointer;

        &::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255,255,255,0.3);
        }

        &::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(255,255,255,0.3);
        }
      }
    }
  }

  @media (max-width: 480px) {
    bottom: 75px;
    padding: 0.6rem 0.8rem;
    gap: 0.6rem;

    .progress-section {
      margin-bottom: 0.6rem;

      .progress-bar {
        height: 6px;
        border-radius: 3px;

        &:hover {
          height: 8px;
          border-radius: 4px;
        }

        .progress-fill:after {
          width: 14px;
          height: 14px;
          right: -7px;
        }
      }

      .time-current, .time-total {
        font-size: 0.75rem;
        min-width: 40px;
      }
    }

    .track-info {
      flex: 0 0 auto;
      min-width: auto;
      max-width: none;

      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }

      .track-details {
        display: none;
      }
    }

    .player-controls {
      gap: 0.4rem;
      justify-content: center;

      button {
        padding: 0.7rem;
        font-size: 1rem;
        width: 48px;
        height: 48px;
        min-width: 48px;
        min-height: 48px;

        &.play-btn {
          font-size: 1.2rem;
          width: 56px;
          height: 56px;
          min-width: 56px;
          min-height: 56px;
        }

        &.download-btn {
          order: -1; /* Move download button first on small screens */
        }
      }
    }

    .volume-control {
      padding: 0.4rem 0.6rem;

      input[type='range'] {
        width: 70px;
      }

      input[type='range']::-webkit-slider-thumb,
      input[type='range']::-moz-range-thumb {
        width: 10px;
        height: 10px;
      }
    }
  }

  /* Extra small screens */
  @media (max-width: 360px) {
    .player-controls {
      button {
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
        font-size: 0.9rem;

        &.play-btn {
          width: 52px;
          height: 52px;
          min-width: 52px;
          min-height: 52px;
          font-size: 1.1rem;
        }
      }
    }

    .volume-control {
      input[type='range'] {
        width: 60px;
      }
    }
  }

  .progress-section {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 600px;
    
    .time-current, .time-total {
      color: var(--text-secondary);
      font-size: 0.8rem;
      min-width: 45px;
    }

    .progress-bar {
      flex: 1;
      height: 4px;
      background: var(--bg-tertiary);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      
      &:hover {
        height: 6px;
        .progress-fill {
          background: var(--accent);
        }
      }

      .progress-fill {
        height: 100%;
        background: var(--text-secondary);
        border-radius: 2px;
        position: relative;
        transition: width 0.1s linear;
        
        &:after {
          content: '';
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.2s;
        }
      }

      &:hover .progress-fill:after {
        opacity: 1;
      }
    }
  }
  .track-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 0;
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      object-fit: cover;
      background: var(--bg-tertiary);
    }
    .track-details {
      min-width: 0;
      flex: 1;
      h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .player-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      background: none;
      border: none;
      color: var(--text-primary);
      font-size: 1.2rem;
      padding: 0.8rem;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      min-height: 48px;
      position: relative;

      &:hover {
        background: var(--glow);
        box-shadow: 0 0 20px rgba(255,255,255,0.1);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }

      &:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }

      /* Add ripple effect for mobile */
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        pointer-events: none;
      }

      &:active:after {
        width: 100%;
        height: 100%;
      }
    }
  }
  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input[type='range'] {
      width: 100px;
      height: 4px;
      background: var(--bg-tertiary);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        height: 6px;
      }

      &::-webkit-slider-thumb {
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent);
        cursor: pointer;
        box-shadow: 0 0 8px rgba(255,255,255,0.3);
        transition: all 0.2s ease;

        &:hover {
          transform: scale(1.2);
          box-shadow: 0 0 12px rgba(255,255,255,0.5);
        }
      }

      &::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent);
        cursor: pointer;
        border: none;
        box-shadow: 0 0 8px rgba(255,255,255,0.3);
        transition: all 0.2s ease;

        &:hover {
          transform: scale(1.2);
          box-shadow: 0 0 12px rgba(255,255,255,0.5);
        }
      }
    }
  }

  .queue-display {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid var(--border);
    max-width: 300px;

    .queue-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);

      .clear-queue-btn {
        margin-left: auto;
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          color: var(--accent);
          background: var(--glow);
        }
      }
    }

    .queue-list {
      .queue-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border);

        &:last-child {
          border-bottom: none;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 4px;
          object-fit: cover;
          background: var(--bg-tertiary);
        }

        .queue-item-info {
          flex: 1;
          min-width: 0;

          .queue-item-title {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .queue-item-artist {
            font-size: 0.7rem;
            color: var(--text-secondary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .remove-queue-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;

          &:hover {
            color: #ff4757;
            background: rgba(255, 71, 87, 0.1);
          }
        }
      }

      .queue-more {
        text-align: center;
        padding: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.8rem;
        font-style: italic;
      }
    }
  }
`;

export const LoadingSpinner = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--bg-tertiary);
    border-top: 3px solid var(--accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Modal = styled.div``;
