import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

export function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  searchable = false,
  multi = false,
  error,
  disabled = false,
  required = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOptions = multi ? value || [] : value ? [value] : [];
  const selectedLabels = selectedOptions
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean);

  const handleSelect = (optionValue) => {
    if (multi) {
      const newValue = selectedOptions.includes(optionValue)
        ? selectedOptions.filter((v) => v !== optionValue)
        : [...selectedOptions, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    if (multi) {
      onChange(selectedOptions.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-between ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
        >
          <div className="flex flex-wrap gap-2 items-center">
            {selectedLabels.length > 0 ? (
              multi ? (
                selectedLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {label}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-blue-600"
                      onClick={(e) =>
                        handleRemove(selectedOptions[idx], e)
                      }
                    />
                  </span>
                ))
              ) : (
                <span>{selectedLabels[0]}</span>
              )
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 ${
                      selectedOptions.includes(option.value)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {multi && (
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        readOnly
                        className="w-4 h-4"
                      />
                    )}
                    <span>{option.label}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-center">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
