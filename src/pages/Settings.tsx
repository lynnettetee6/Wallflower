
import React from 'react';
import FriendManager from '@/components/FriendManager';
import RefreshTimeSettings from '@/components/RefreshTimeSettings';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center p-4 sm:p-8 flex items-center justify-center font-sans"
      style={{ backgroundImage: "url('/assets/settings-bg.png')" }}
    >
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="flex items-center gap-2 text-white bg-black/50 p-2 rounded-lg hover:bg-black/75 transition-colors">
          <ArrowLeft size={24} />
          <span className="hidden sm:inline">Back to Cozy Room</span>
        </Link>
      </div>

      {/* Wooden cabin theme container */}
      <div className="w-full max-w-4xl bg-[#6b4226] p-2 sm:p-4 rounded-2xl shadow-2xl overflow-hidden border-4 border-[#4a2e1d]">
        <div className="w-full bg-[#f5e8c7] p-4 sm:p-6 rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4a2e1d] mb-6 font-pixel">
            Settings
          </h1>
          <div className="space-y-8">
            <FriendManager />
            <RefreshTimeSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
