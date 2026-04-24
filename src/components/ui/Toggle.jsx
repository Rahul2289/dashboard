export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  className = '',
}) {
  return (
    <label className={`flex items-center cursor-pointer gap-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-5 h-5"
      />
      {label && <span className="font-medium text-gray-700">{label}</span>}
    </label>
  );
}
