import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockTableData = [
  {
    id: 1,
    product: 'Dashboard UI Kit',
    category: 'UI Components',
    sales: 1240,
    revenue: '$24,800',
    growth: '+12.5%',
    status: 'Active',
    details: 'High-performance dashboard UI component library built with React and Tailwind CSS.',
    subRows: [
      { id: '1-1', name: 'Button Component', downloads: 2500, rating: 4.8 },
      { id: '1-2', name: 'Table Component', downloads: 1800, rating: 4.9 },
      { id: '1-3', name: 'Modal Component', downloads: 1200, rating: 4.7 },
    ],
  },
  {
    id: 2,
    product: 'Analytics Suite',
    category: 'Analytics',
    sales: 890,
    revenue: '$17,800',
    growth: '+8.3%',
    status: 'Active',
    details: 'Complete analytics solution with real-time dashboards and reporting.',
    subRows: [
      { id: '2-1', name: 'Real-time Reports', downloads: 1100, rating: 4.6 },
      { id: '2-2', name: 'Data Visualization', downloads: 950, rating: 4.8 },
    ],
  },
  {
    id: 3,
    product: 'Mobile SDK',
    category: 'Development',
    sales: 650,
    revenue: '$13,000',
    growth: '+5.2%',
    status: 'Inactive',
    details: 'Cross-platform mobile development SDK for iOS and Android.',
    subRows: [
      { id: '3-1', name: 'iOS Framework', downloads: 800, rating: 4.7 },
      { id: '3-2', name: 'Android Library', downloads: 750, rating: 4.5 },
    ],
  },
];

export const fetchTableData = createAsyncThunk('tables/fetchData', async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTableData), 500);
  });
});

const initialState = {
  items: [],
  loading: false,
  error: null,
  expandedRows: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    toggleRowExpand: (state, action) => {
      const index = state.expandedRows.indexOf(action.payload);
      if (index > -1) {
        state.expandedRows.splice(index, 1);
      } else {
        state.expandedRows.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleRowExpand } = tablesSlice.actions;
export const selectTableData = (state) => state.tables.items;
export const selectTableLoading = (state) => state.tables.loading;
export default tablesSlice.reducer;
