import { useState } from 'react';

export function Tabs({ tabs = [], defaultActive = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === index
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
