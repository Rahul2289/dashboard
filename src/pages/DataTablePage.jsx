import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '../store/slices/tablesSlice.js';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { ExpandableTable } from '../components/tables/ExpandableTable.jsx';

export function DataTablePage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tables.items);
  const loading = useSelector((state) => state.tables.loading);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  const columns = [
    { key: 'product', label: 'Product', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const renderExpandedRow = (row) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
        <p className="text-gray-600 text-sm">{row.details}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Sub-Items</h4>
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Downloads
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {row.subRows.map((subRow) => (
                <tr key={subRow.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{subRow.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{subRow.downloads}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      {subRow.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Table</h1>
        <p className="text-gray-600 mt-1">Click on rows to expand and view detailed information</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Products Overview</h2>
          <p className="text-gray-600 text-sm mt-1">Expandable table with nested details</p>
        </CardHeader>
        <CardContent>
          <ExpandableTable
            columns={columns}
            data={data}
            renderExpandedRow={renderExpandedRow}
          />
        </CardContent>
      </Card>
    </div>
  );
}
