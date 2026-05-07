"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-medium tracking-tight mb-1">Settings</h1>
        <p className="text-white/50 text-sm">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 space-y-4">
          <h3 className="font-medium text-lg">Profile</h3>
          <div>
            <label className="block text-xs text-white/50 mb-1">Name</label>
            <input type="text" className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:border-white/30 outline-none text-sm" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Email</label>
            <input type="email" disabled className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2 opacity-50 text-sm" placeholder="user@example.com" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 space-y-4">
          <h3 className="font-medium text-lg">AI Preferences</h3>
          <div>
            <label className="block text-xs text-white/50 mb-1">Model Selection</label>
            <select className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:border-white/30 outline-none text-sm text-white">
              <option value="deepseek">DeepSeek Chat (Default)</option>
              <option value="claude" disabled>Claude 3.5 Sonnet (Pro)</option>
              <option value="gpt4o" disabled>GPT-4o (Pro)</option>
            </select>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-lg text-red-500">Danger Zone</h3>
            <p className="text-sm text-white/40">Permanently delete your account and all data.</p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
