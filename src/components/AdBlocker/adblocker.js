import React, { useEffect, useRef } from 'react';

const AdBlocker = ({ children, enabled = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const blockAdsInContainer = () => {
      const container = containerRef.current;
      if (!container) return;

      // Find all iframes in the container
      const iframes = container.querySelectorAll('iframe');
      
      iframes.forEach(iframe => {
        if (!iframe.src) return;
        
        const src = iframe.src.toLowerCase();
        const isAdFrame = src.includes('googleads') || 
                         src.includes('doubleclick') || 
                         src.includes('googlesyndication') ||
                         src.includes('adsystem') ||
                         src.includes('/ads/') ||
                         src.includes('advertising') ||
                         src.includes('outbrain') ||
                         src.includes('taboola');
        
        if (isAdFrame) {
          // Hide the ad iframe
          iframe.style.display = 'none';
          iframe.style.visibility = 'hidden';
          iframe.style.width = '0px';
          iframe.style.height = '0px';
          
          // Also hide parent containers that might be ad wrappers
          let parent = iframe.parentElement;
          while (parent && parent !== container) {
            const parentClass = parent.className?.toLowerCase() || '';
            const parentId = parent.id?.toLowerCase() || '';
            
            if (parentClass.includes('ad') || parentId.includes('ad') ||
                parentClass.includes('advertisement') || parentId.includes('advertisement')) {
              parent.style.display = 'none';
              break;
            }
            parent = parent.parentElement;
          }
          
          console.log('🚫 AdBlocker: Blocked iframe ad:', iframe.src);
        }
      });

      // Block known ad containers
      const adSelectors = [
        'div[id*="google_ads"]',
        'div[id*="div-gpt-ad"]',
        'ins.adsbygoogle',
        'div.advertisement',
        'div.ad-banner',
        'div[class*="ad-"]',
        'div[id*="ad-"]'
      ];

      adSelectors.forEach(selector => {
        try {
          const elements = container.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && el.style) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
            }
          });
        } catch (e) {
          // Ignore errors
        }
      });
    };

    // Initial block
    blockAdsInContainer();

    // Set up observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      let shouldBlock = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if added node is an iframe or contains iframes
              if (node.tagName === 'IFRAME' || node.querySelector('iframe')) {
                shouldBlock = true;
              }
            }
          });
        }
      });

      if (shouldBlock) {
        // Debounce the blocking to avoid excessive calls
        setTimeout(blockAdsInContainer, 100);
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: false
    });

    // Periodic cleanup
    const interval = setInterval(blockAdsInContainer, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [enabled]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default AdBlocker;