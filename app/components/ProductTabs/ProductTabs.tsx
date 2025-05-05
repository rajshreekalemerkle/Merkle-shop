
import React, { useState } from 'react';
import './ProductTabs.css';

interface Tab {
  tabKey: string;
  tabLabel: string;
  richText?: string | { content: string }; 
  specs?: Array<{ label: string; value: string }>;
}

interface ProductTabsProps {
  tabs: Tab[];
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0); 

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const activeTabData = tabs[activeTabIndex];
  let richTextContent: string | undefined;

if (typeof activeTabData?.richText === 'string') {
  richTextContent = activeTabData.richText;
} else if (
  activeTabData?.richText &&
  typeof activeTabData.richText === 'object' &&
  'content' in activeTabData.richText &&
  typeof activeTabData.richText.content === 'string'
) {
  richTextContent = activeTabData.richText.content;
}


  return (
    <div className="product-tabs">
      {/* Tab navigation */}
      <div className="tabs-nav">
        {tabs.map((tab, index) => (
          <button
            key={tab.tabKey}
            className={`tab-button ${activeTabIndex === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.tabLabel}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tabs-content">
        {/* Description */}
        {richTextContent && (
  <div className="description-content">
    <div
      dangerouslySetInnerHTML={{ __html: richTextContent }}
    />
  </div>
)}

        {/* Specifications */}
        {activeTabData?.specs && activeTabData.specs.length > 0 && (
          <div className="specifications-content">
            <ul>
              {activeTabData.specs.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.label}:</strong> {spec.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No content fallback */}
        {!activeTabData?.richText &&
          (!activeTabData?.specs || activeTabData.specs.length === 0) && (
            <p>No content available for this tab.</p>
          )}
      </div>
    </div>
  );
}
