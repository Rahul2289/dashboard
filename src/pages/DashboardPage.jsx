import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/usersSlice.js';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { DataTable } from '../components/tables/DataTable.jsx';
import { BarChart3, Users, TrendingUp, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-1 ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon size={24} className="text-blue-600" />
      </div>
    </div>
  </Card>
);

export function DashboardPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const usersLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your dashboard overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value="2,543"
          change="+12.5% from last month"
        />
        <StatCard
          icon={TrendingUp}
          title="Revenue"
          value="$45,231"
          change="+8.2% from last month"
        />
        <StatCard
          icon={DollarSign}
          title="Conversion"
          value="3.24%"
          change="+2.1% from last month"
        />
        <StatCard
          icon={BarChart3}
          title="Active Sessions"
          value="1,247"
          change="-3.2% from last week"
        />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          <p className="text-gray-600 text-sm mt-1">Latest user registrations</p>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tableColumns}
            data={users.slice(0, 5)}
            pagination={false}
            loading={usersLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
