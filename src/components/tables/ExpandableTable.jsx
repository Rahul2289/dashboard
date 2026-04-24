import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ExpandableTable({
  columns = [],
  data = [],
  renderExpandedRow,
  onExpand,
}) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
    onExpand?.(rowId, !expandedRows[rowId]);
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="w-12 px-4 py-3"></th>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left">
                <span className="font-semibold text-gray-700">{col.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tbody key={row.id}>
              <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggleRow(row.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {expandedRows[row.id] ? (
                      <ChevronUp size={18} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-600" />
                    )}
                  </button>
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>

              {expandedRows[row.id] && (
                <tr className="bg-blue-50 border-b border-gray-200">
                  <td colSpan={columns.length + 1} className="px-6 py-4">
                    <div className="space-y-4">
                      {renderExpandedRow(row)}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </tbody>
      </table>
    </div>
  );
}
