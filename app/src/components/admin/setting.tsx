"use client";

import React from "react";

export default function SettingsTab({settings}: {settings: boolean}) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Admin Settings</h2>

      <p className="text-gray-700 mb-6">
        This section allows you to manage admin-side configurations and controls for the MentorSync platform.
      </p>

      {/* <div className="space-y-4 text-gray-800">
        <div>
          <h3 className="font-semibold">🔐 Access Control</h3>
          <p className="text-sm text-gray-600">Manage role-based access for new users, restrict dashboard views, and assign admin privileges.</p>
        </div>

        <div>
          <h3 className="font-semibold">🎨 Theme Settings</h3>
          <p className="text-sm text-gray-600">Toggle light/dark mode or customize primary branding colours.</p>
        </div>

        <div>
          <h3 className="font-semibold">📤 Data Export</h3>
          <p className="text-sm text-gray-600">Enable manual or scheduled exports of user and match data in CSV/JSON format.</p>
        </div>

        <div>
          <h3 className="font-semibold">📧 Email Notifications</h3>
          <p className="text-sm text-gray-600">Configure email templates and alerts for new matches, reminders, and onboarding tips.</p>
        </div>

        <div>
          <h3 className="font-semibold">🧪 Feature Flags</h3>
          <p className="text-sm text-gray-600">Toggle beta features (like AI-based matching, feedback scoring) for controlled rollout.</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 border-l-4 border-primary text-sm text-gray-800">
        💡 Tip: These settings are currently static but can be made dynamic by integrating with a settings model or a CMS in future iterations.
      </div> */}
    </div>
  );
}
