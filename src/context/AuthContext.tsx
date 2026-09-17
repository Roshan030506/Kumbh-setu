import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { UserProfile, UserRole, UserApprovalStatus } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole | null;
  status: UserApprovalStatus | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kumbh_auth_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [role, setRole] = useState<UserRole | null>(() => {
    try {
      return (localStorage.getItem('kumbh_auth_role') as UserRole) || null;
    } catch {
      return null;
    }
  });
  const [status, setStatus] = useState<UserApprovalStatus | null>(() => {
    try {
      return (localStorage.getItem('kumbh_auth_status') as UserApprovalStatus) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserProfile = async (firebaseUser: User) => {
    try {
      // 1. Check custom claims on token for Admin
      const tokenResult = await firebaseUser.getIdTokenResult(true);
      const isCustomAdmin = !!tokenResult.claims.admin || tokenResult.claims.role === 'admin' || firebaseUser.email === 'roshankedar122@gmail.com';

      // 2. Fetch Firestore users/{uid} document
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const resolvedRole: UserRole = isCustomAdmin ? 'admin' : (data.role as UserRole) || 'pilgrim';
        const resolvedStatus: UserApprovalStatus = isCustomAdmin ? 'approved' : (data.status as UserApprovalStatus) || (resolvedRole === 'vendor' ? 'pending_approval' : 'approved');

        const resolvedProfile: UserProfile = {
          id: firebaseUser.uid,
          role: resolvedRole,
          phone: data.phone || firebaseUser.phoneNumber || '',
          email: firebaseUser.email || data.email,
          name: data.name || (resolvedRole === 'pilgrim' ? 'Yatri Devotee' : resolvedRole === 'vendor' ? data.shopName || 'Vendor Partner' : 'District Control Admin'),
          language: data.language || 'en',
          elderlyOrDisabledMode: !!data.elderlyOrDisabledMode,
          status: resolvedStatus,
          shopName: data.shopName,
          licenseOrGstin: data.licenseOrGstin,
          category: data.category,
          address: data.address,
          vendorId: data.vendorId || (resolvedRole === 'vendor' && resolvedStatus === 'approved' ? 'ven-1' : undefined),
          createdAt: data.createdAt
        };

        setProfile(resolvedProfile);
        setRole(resolvedRole);
        setStatus(resolvedStatus);

        localStorage.setItem('kumbh_auth_profile', JSON.stringify(resolvedProfile));
        localStorage.setItem('kumbh_auth_role', resolvedRole);
        localStorage.setItem('kumbh_auth_status', resolvedStatus);
      } else {
        // Doc might not exist yet or user signed in with fallback/phone without doc
        // Check if Admin by claim / email
        if (isCustomAdmin) {
          const adminProf: UserProfile = {
            id: firebaseUser.uid,
            role: 'admin',
            email: firebaseUser.email || 'roshankedar122@gmail.com',
            phone: '0253-2578000',
            name: 'Inspector V. S. Deshmukh (Control Room Unit 3)',
            language: 'en',
            elderlyOrDisabledMode: false,
            status: 'approved'
          };
          setProfile(adminProf);
          setRole('admin');
          setStatus('approved');
          localStorage.setItem('kumbh_auth_profile', JSON.stringify(adminProf));
          localStorage.setItem('kumbh_auth_role', 'admin');
          localStorage.setItem('kumbh_auth_status', 'approved');
        } else {
          // Default fallback based on stored role or pilgrim
          const savedRole = (localStorage.getItem('kumbh_role') as UserRole) || 'pilgrim';
          const fallbackProf: UserProfile = {
            id: firebaseUser.uid,
            role: savedRole,
            phone: firebaseUser.phoneNumber || '9876543210',
            email: firebaseUser.email || undefined,
            name: savedRole === 'vendor' ? 'Santosh Joshi' : 'Pilgrim Devotee',
            language: 'en',
            elderlyOrDisabledMode: false,
            status: savedRole === 'vendor' ? 'pending_approval' : 'approved'
          };
          setProfile(fallbackProf);
          setRole(savedRole);
          setStatus(fallbackProf.status);
          localStorage.setItem('kumbh_auth_profile', JSON.stringify(fallbackProf));
          localStorage.setItem('kumbh_auth_role', savedRole);
          localStorage.setItem('kumbh_auth_status', fallbackProf.status);
        }
      }
    } catch (err) {
      console.warn('Error fetching Firestore user profile:', err);
      // Fallback to cached or default
      const cachedRole = (localStorage.getItem('kumbh_auth_role') as UserRole) || 'pilgrim';
      setRole(cachedRole);
      setStatus((localStorage.getItem('kumbh_auth_status') as UserApprovalStatus) || 'approved');
    }
  };

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser);
      } else {
        setUser(null);
        setProfile(null);
        setRole(null);
        setStatus(null);
        localStorage.removeItem('kumbh_auth_profile');
        localStorage.removeItem('kumbh_auth_role');
        localStorage.removeItem('kumbh_auth_status');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    } finally {
      setUser(null);
      setProfile(null);
      setRole(null);
      setStatus(null);
      localStorage.removeItem('kumbh_auth_profile');
      localStorage.removeItem('kumbh_auth_role');
      localStorage.removeItem('kumbh_auth_status');
      localStorage.removeItem('kumbh_user');
      localStorage.removeItem('kumbh_role');
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchUserProfile(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      role,
      status,
      loading,
      logout,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
