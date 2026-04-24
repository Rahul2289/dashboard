import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Tabs } from '../components/ui/Tabs.jsx';
import { Toggle } from '../components/ui/Toggle.jsx';
import { Bell, Lock, User } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    twoFactor: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const accountTab = {
    label: 'Account',
    content: (
      <div className="space-y-4">
        <Input label="Full Name" placeholder="John Doe" defaultValue="John Doe" />
        <Input label="Email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
        <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        <Button variant="primary" size="md">
          Save Changes
        </Button>
      </div>
    ),
  };

  const securityTab = {
    label: 'Security',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Password</h3>
          <p className="text-sm text-blue-800 mb-4">
            Last changed 2 months ago. Update your password regularly to keep your account secure.
          </p>
          <Button variant="outline" size="md">
            Change Password
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
            </div>
            <Toggle
              checked={settings.twoFactor}
              onChange={() => handleToggle('twoFactor')}
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Active Sessions</h4>
          <div className="space-y-2">
            {[
              { device: 'Chrome on Windows', ip: '192.168.1.1', date: 'Today at 10:30 AM' },
              { device: 'Safari on iOS', ip: '192.168.1.2', date: 'Yesterday at 3:45 PM' },
            ].map((session, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.device}</p>
                  <p className="text-sm text-gray-600">{session.ip}</p>
                  <p className="text-xs text-gray-500">{session.date}</p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  const notificationsTab = {
    label: 'Notifications',
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
          </div>
          <Toggle
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive browser notifications</p>
            </div>
          </div>
          <Toggle
            checked={settings.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Enable dark theme</p>
            </div>
          </div>
          <Toggle
            checked={settings.darkMode}
            onChange={() => handleToggle('darkMode')}
          />
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs
            tabs={[accountTab, securityTab, notificationsTab]}
            defaultActive={0}
          />
        </CardContent>
      </Card>
    </div>
  );
}
