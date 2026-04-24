import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilters } from '../store/slices/usersSlice.js';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { DataTable } from '../components/tables/DataTable.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Plus } from 'lucide-react';

export function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const loading = useSelector((state) => state.users.loading);
  const filters = useSelector((state) => state.users.filters);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...localFilters, [filterName]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
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
    { key: 'joinDate', label: 'Join Date', sortable: true },
  ];

  const filteredUsers = users.filter((user) => {
    if (localFilters.role && user.role !== localFilters.role) return false;
    if (localFilters.status && user.status !== localFilters.status) return false;
    if (
      localFilters.search &&
      !user.name.toLowerCase().includes(localFilters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const roleOptions = [
    { label: 'All Roles', value: '' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Editor', value: 'Editor' },
    { label: 'User', value: 'User' },
  ];

  const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage and view all users in your system</p>
        </div>
        <Button variant="primary" size="md">
          <Plus size={20} />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Role"
              options={roleOptions}
              value={localFilters.role}
              onChange={(value) => handleFilterChange('role', value)}
              placeholder="Filter by role"
            />
            <Select
              label="Status"
              options={statusOptions}
              value={localFilters.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Filter by status"
            />
            <div></div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={tableColumns}
            data={filteredUsers}
            pagination={true}
            pageSize={10}
            loading={loading}
            searchable={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
