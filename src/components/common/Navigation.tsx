import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation as RouteIcon, 
  Bot, 
  AlertCircle, 
  UserX, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  SlidersHorizontal, 
  PlusCircle, 
  CheckSquare, 
  Activity, 
  Radio,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { PilgrimScreen, VendorScreen, AdminScreen } from '../../types';

export const Navigation: React.FC = () => {
  const { 
    currentRole, 
    pilgrimScreen, 
    setPilgrimScreen, 
    vendorScreen, 
    setVendorScreen, 
    adminScreen, 
    setAdminScreen, 
    setIsRoleModalOpen,
    currentUser,
    t, 
    playClick,
    vendors,
    alerts
  } = useApp();

  const pendingVendorsCount = vendors.filter(v => v.status === 'pending').length;
  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;

  const handlePilgrimNav = (screen: PilgrimScreen) => {
    playClick();
    setPilgrimScreen(screen);
  };

  const handleVendorNav = (screen: VendorScreen) => {
    playClick();
    setVendorScreen(screen);
  };

  const handleAdminNav = (screen: AdminScreen) => {
    playClick();
    setAdminScreen(screen);
  };

  return (
    <>
      {/* Desktop Navigation Ribbon */}
      <nav className="hidden md:block bg-stone-900 border-b border-amber-900/40 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 py-1.5 overflow-x-auto no-scrollbar">
            {currentRole === 'pilgrim' && (
              <>
                <NavButton
                  id="desktop-nav-map"
                  active={pilgrimScreen === 'home_map'}
                  onClick={() => handlePilgrimNav('home_map')}
                  icon={<MapPin className="w-4 h-4 text-amber-500" />}
                  label={t.map}
                />
                <NavButton
                  id="desktop-nav-routes"
                  active={pilgrimScreen === 'routes'}
                  onClick={() => handlePilgrimNav('routes')}
                  icon={<RouteIcon className="w-4 h-4 text-sky-400" />}
                  label={t.routes}
                />
                <NavButton
                  id="desktop-nav-assistant"
                  active={pilgrimScreen === 'ai_assistant'}
                  onClick={() => handlePilgrimNav('ai_assistant')}
                  icon={<Bot className="w-4 h-4 text-emerald-400" />}
                  label={t.assistant}
                  badge="AI"
                />
                <NavButton
                  id="desktop-nav-sos"
                  active={pilgrimScreen === 'sos'}
                  onClick={() => handlePilgrimNav('sos')}
                  icon={<AlertCircle className="w-4 h-4 text-red-500" />}
                  label={t.sos}
                  highlight
                />
                <NavButton
                  id="desktop-nav-lost"
                  active={pilgrimScreen === 'lost_person'}
                  onClick={() => handlePilgrimNav('lost_person')}
                  icon={<UserX className="w-4 h-4 text-orange-400" />}
                  label={t.lostPerson}
                />
                <NavButton
                  id="desktop-nav-prefs"
                  active={pilgrimScreen === 'preferences'}
                  onClick={() => handlePilgrimNav('preferences')}
                  icon={<Settings className="w-4 h-4 text-stone-400" />}
                  label={t.preferences}
                />
              </>
            )}

            {currentRole === 'vendor' && (
              <>
                <NavButton
                  id="desktop-nav-vendor-dash"
                  active={vendorScreen === 'dashboard'}
                  onClick={() => handleVendorNav('dashboard')}
                  icon={<LayoutDashboard className="w-4 h-4 text-amber-500" />}
                  label={t.vendorDashboard}
                />
                <NavButton
                  id="desktop-nav-vendor-reg"
                  active={vendorScreen === 'registration'}
                  onClick={() => handleVendorNav('registration')}
                  icon={<PlusCircle className="w-4 h-4 text-sky-400" />}
                  label={t.vendorRegister}
                />
                <NavButton
                  id="desktop-nav-vendor-ocr"
                  active={vendorScreen === 'certificate'}
                  onClick={() => handleVendorNav('certificate')}
                  icon={<FileText className="w-4 h-4 text-emerald-400" />}
                  label={t.certificates}
                />
                <NavButton
                  id="desktop-nav-vendor-avail"
                  active={vendorScreen === 'availability'}
                  onClick={() => handleVendorNav('availability')}
                  icon={<SlidersHorizontal className="w-4 h-4 text-orange-400" />}
                  label={t.availability}
                />
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <NavButton
                  id="desktop-nav-admin-dash"
                  active={adminScreen === 'dashboard'}
                  onClick={() => handleAdminNav('dashboard')}
                  icon={<LayoutDashboard className="w-4 h-4 text-amber-500" />}
                  label={t.adminDashboard}
                />
                <NavButton
                  id="desktop-nav-admin-queue"
                  active={adminScreen === 'vendor_queue'}
                  onClick={() => handleAdminNav('vendor_queue')}
                  icon={<CheckSquare className="w-4 h-4 text-emerald-400" />}
                  label={t.vendorQueue}
                  count={pendingVendorsCount}
                />
                <NavButton
                  id="desktop-nav-admin-crowd"
                  active={adminScreen === 'crowd_map'}
                  onClick={() => handleAdminNav('crowd_map')}
                  icon={<Activity className="w-4 h-4 text-sky-400" />}
                  label={t.crowdMonitoring}
                />
                <NavButton
                  id="desktop-nav-admin-alerts"
                  active={adminScreen === 'live_alerts'}
                  onClick={() => handleAdminNav('live_alerts')}
                  icon={<Radio className="w-4 h-4 text-red-400 animate-pulse" />}
                  label={t.liveAlerts}
                  count={activeAlertsCount}
                  highlight={activeAlertsCount > 0}
                />
              </>
            )}
          </div>

          {/* Session Status indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800/80 text-amber-300 border border-amber-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentUser?.role.toUpperCase() || currentRole.toUpperCase()} LIVE</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-amber-900/60 pb-safe shadow-2xl">
        <div className="grid grid-flow-col auto-cols-fr items-center justify-around px-1 py-1.5">
          {currentRole === 'pilgrim' && (
            <>
              <MobileNavTab
                id="mob-nav-map"
                active={pilgrimScreen === 'home_map'}
                onClick={() => handlePilgrimNav('home_map')}
                icon={<MapPin className="w-5 h-5" />}
                label={t.map.split(' ')[0]}
              />
              <MobileNavTab
                id="mob-nav-routes"
                active={pilgrimScreen === 'routes'}
                onClick={() => handlePilgrimNav('routes')}
                icon={<RouteIcon className="w-5 h-5" />}
                label={t.routes.split(' ')[0]}
              />
              <MobileNavTab
                id="mob-nav-assistant"
                active={pilgrimScreen === 'ai_assistant'}
                onClick={() => handlePilgrimNav('ai_assistant')}
                icon={<Bot className="w-5 h-5 text-amber-400" />}
                label={t.assistant.split(' ')[0]}
              />
              <MobileNavTab
                id="mob-nav-sos"
                active={pilgrimScreen === 'sos'}
                onClick={() => handlePilgrimNav('sos')}
                icon={<AlertCircle className="w-5 h-5 text-red-500" />}
                label="SOS"
                highlight
              />
              <MobileNavTab
                id="mob-nav-lost"
                active={pilgrimScreen === 'lost_person'}
                onClick={() => handlePilgrimNav('lost_person')}
                icon={<UserX className="w-5 h-5" />}
                label={t.lostPerson.split(' ')[0]}
              />
              <MobileNavTab
                id="mob-nav-prefs"
                active={pilgrimScreen === 'preferences'}
                onClick={() => handlePilgrimNav('preferences')}
                icon={<Settings className="w-5 h-5" />}
                label={t.preferences.split(' ')[0]}
              />
            </>
          )}

          {currentRole === 'vendor' && (
            <>
              <MobileNavTab
                id="mob-nav-vendor-dash"
                active={vendorScreen === 'dashboard'}
                onClick={() => handleVendorNav('dashboard')}
                icon={<LayoutDashboard className="w-5 h-5" />}
                label="Stall"
              />
              <MobileNavTab
                id="mob-nav-vendor-reg"
                active={vendorScreen === 'registration'}
                onClick={() => handleVendorNav('registration')}
                icon={<PlusCircle className="w-5 h-5" />}
                label="Register"
              />
              <MobileNavTab
                id="mob-nav-vendor-ocr"
                active={vendorScreen === 'certificate'}
                onClick={() => handleVendorNav('certificate')}
                icon={<FileText className="w-5 h-5" />}
                label="OCR Cert"
              />
              <MobileNavTab
                id="mob-nav-vendor-avail"
                active={vendorScreen === 'availability'}
                onClick={() => handleVendorNav('availability')}
                icon={<SlidersHorizontal className="w-5 h-5" />}
                label="Stock"
              />
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <MobileNavTab
                id="mob-nav-admin-dash"
                active={adminScreen === 'dashboard'}
                onClick={() => handleAdminNav('dashboard')}
                icon={<LayoutDashboard className="w-5 h-5" />}
                label="Command"
              />
              <MobileNavTab
                id="mob-nav-admin-queue"
                active={adminScreen === 'vendor_queue'}
                onClick={() => handleAdminNav('vendor_queue')}
                icon={<CheckSquare className="w-5 h-5" />}
                label="Approvals"
                count={pendingVendorsCount}
              />
              <MobileNavTab
                id="mob-nav-admin-crowd"
                active={adminScreen === 'crowd_map'}
                onClick={() => handleAdminNav('crowd_map')}
                icon={<Activity className="w-5 h-5" />}
                label="Crowd"
              />
              <MobileNavTab
                id="mob-nav-admin-alerts"
                active={adminScreen === 'live_alerts'}
                onClick={() => handleAdminNav('live_alerts')}
                icon={<Radio className="w-5 h-5 text-red-400 animate-pulse" />}
                label="Alerts"
                count={activeAlertsCount}
                highlight={activeAlertsCount > 0}
              />
            </>
          )}
        </div>
      </nav>
    </>
  );
};

const NavButton: React.FC<{
  id: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  count?: number;
  highlight?: boolean;
}> = ({ id, active, onClick, icon, label, badge, count, highlight }) => (
  <button
    id={id}
    onClick={onClick}
    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all transform hover:-translate-y-0.5 active:scale-95 ${
      active
        ? highlight
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
        : highlight
        ? 'bg-red-950/40 text-red-300 hover:bg-red-900/50 border border-red-800/40'
        : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge && (
      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        {badge}
      </span>
    )}
    {count !== undefined && count > 0 && (
      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
        {count}
      </span>
    )}
  </button>
);

const MobileNavTab: React.FC<{
  id: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
  highlight?: boolean;
}> = ({ id, active, onClick, icon, label, count, highlight }) => (
  <button
    id={id}
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all relative ${
      active
        ? highlight
          ? 'text-red-400 font-bold scale-105'
          : 'text-amber-400 font-bold scale-105'
        : 'text-stone-400 hover:text-stone-200'
    }`}
  >
    <div className="relative">
      {icon}
      {count !== undefined && count > 0 && (
        <span className="absolute -top-1.5 -right-2 text-[9px] font-black px-1 rounded-full bg-red-600 text-white shadow-sm">
          {count}
        </span>
      )}
    </div>
    <span className="text-[10px] mt-0.5 truncate max-w-[62px]">{label}</span>
  </button>
);
