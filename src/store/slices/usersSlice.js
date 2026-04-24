import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Manager', status: 'Active', joinDate: '2024-02-20' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-10' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', joinDate: '2024-04-05' },
  { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'Editor', status: 'Active', joinDate: '2024-04-12' },
  { id: 6, name: 'Lisa Martinez', email: 'lisa@example.com', role: 'User', status: 'Active', joinDate: '2024-04-18' },
  { id: 7, name: 'David Garcia', email: 'david@example.com', role: 'Manager', status: 'Active', joinDate: '2024-04-20' },
  { id: 8, name: 'Jessica Taylor', email: 'jessica@example.com', role: 'User', status: 'Inactive', joinDate: '2024-04-22' },
];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 500);
  });
});

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    role: '',
    status: '',
  },
  sorting: {
    field: 'name',
    direction: 'asc',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setSorting } = usersSlice.actions;
export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.loading;
export default usersSlice.reducer;
