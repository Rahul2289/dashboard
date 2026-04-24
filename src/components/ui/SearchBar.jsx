import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  debounceDelay = 300,
  className = '',
}) {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    (searchValue) => {
      setIsSearching(true);
      const timer = setTimeout(() => {
        onSearch(searchValue);
        setIsSearching(false);
      }, debounceDelay);
      return () => clearTimeout(timer);
    },
    [onSearch, debounceDelay]
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
