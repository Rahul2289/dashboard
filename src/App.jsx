import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { UsersPage } from './pages/UsersPage.jsx';
import { DataTablePage } from './pages/DataTablePage.jsx';
import { FormsPage } from './pages/FormsPage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';
import { PlaceholderPage } from './pages/PlaceholderPage.jsx';

function AppContent() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <div className="p-6 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/customers" element={<UsersPage />} />
                <Route path="/products" element={<DataTablePage />} />
                <Route path="/forms" element={<FormsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/analytics" element={<PlaceholderPage title="Analytics" description="Advanced analytics dashboard" />} />
                <Route path="/ecommerce" element={<PlaceholderPage title="E-commerce" description="E-commerce metrics and insights" />} />
                <Route path="/crypto" element={<PlaceholderPage title="Crypto" description="Cryptocurrency market data" />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
