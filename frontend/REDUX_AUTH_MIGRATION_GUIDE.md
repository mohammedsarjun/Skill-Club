# Redux-Based Authentication Migration Guide

## Overview

This guide walks you through migrating from localStorage-based route protection to a Redux-based authentication system with HTTP-only cookie support.

## What Changed

### Before (Old System)
- ✗ User data stored in `localStorage`
- ✗ Each route guard reads from localStorage independently
- ✗ No centralized auth state
- ✗ Manual role/onboarding checks in each guard
- ✗ Inconsistent auth state across app

### After (New System)
- ✓ Redux as single source of truth
- ✓ HTTP-only cookie authentication
- ✓ Centralized auth state with `isAuthenticated`, `isLoading`, `error`
- ✓ Reusable `ProtectedRoute` and `RoleRoute` components
- ✓ Automatic auth refresh via `/auth/me` on app mount
- ✓ Multi-role support with active role switching
- ✓ Onboarding-aware routing

---

## Step 1: Verify Backend `/auth/me` Endpoint

Ensure your backend has a `/auth/me` endpoint that:

1. **Validates HTTP-only cookie** (JWT)
2. **Returns user data** in this format:

```json
{
  "success": true,
  "data": {
    "userId": "123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["freelancer", "client"],
    "activeRole": "freelancer",
    "isFreelancerOnboarded": true,
    "isClientOnboarded": false,
    "freelancerProfile": "profile_id_123",
    "clientProfile": null,
    "isFreelancerBlocked": false,
    "isClientBlocked": false,
    "preferredCurrency": "USD"
  }
}
```

**Example Backend Implementation:**

```typescript
// backend/src/controllers/auth/auth-controller.ts
async getCurrentUser(req: Request, res: Response) {
  try {
    // req.user is set by auth middleware after validating JWT cookie
    const userId = req.user.userId;
    
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        activeRole: user.activeRole,
        isFreelancerOnboarded: user.isFreelancerOnboarded ?? false,
        isClientOnboarded: user.isClientOnboarded ?? false,
        freelancerProfile: user.freelancerProfile,
        clientProfile: user.clientProfile,
        isFreelancerBlocked: user.isFreelancerBlocked ?? false,
        isClientBlocked: user.isClientBlocked ?? false,
        preferredCurrency: user.preferredCurrency,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
```

**Route:**
```typescript
// backend/src/routes/auth-router.ts
router.get("/me", authMiddleware, authController.getCurrentUser);
```

---

## Step 2: Bootstrap Auth in Root Layout

Add the `useAuthBootstrap` hook to your root layout to fetch user data on app mount.

**File:** `frontend/src/app/layout.tsx`

```tsx
"use client";

import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  // Bootstrap authentication on mount
  useAuthBootstrap();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Step 3: Replace Old Guards with New Components

### Example 1: Freelancer Dashboard Route

**Before (Old Guard):**
```tsx
// app/(freelancer)/freelancer/dashboard/page.tsx
import FreelancerAuthGuard from "@/components/FreelancerAuthGaurd";

export default function FreelancerDashboard() {
  return (
    <FreelancerAuthGuard>
      <div>Freelancer Dashboard Content</div>
    </FreelancerAuthGuard>
  );
}
```

**After (New System):**
```tsx
// app/(freelancer)/freelancer/dashboard/page.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function FreelancerDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={['freelancer']} requireOnboarding={true}>
        <div>Freelancer Dashboard Content</div>
      </RoleRoute>
    </ProtectedRoute>
  );
}
```

### Example 2: Client Route

**After:**
```tsx
// app/(client)/client/jobs/page.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function ClientJobs() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={['client']} requireOnboarding={true}>
        <div>Client Jobs Content</div>
      </RoleRoute>
    </ProtectedRoute>
  );
}
```

### Example 3: Admin Route (No Onboarding)

**After:**
```tsx
// app/(admin)/admin/dashboard/page.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={['admin']} requireOnboarding={false}>
        <div>Admin Dashboard Content</div>
      </RoleRoute>
    </ProtectedRoute>
  );
}
```

### Example 4: Multi-Role Route

```tsx
// app/profile/page.tsx - Accessible to both freelancers and clients
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={['freelancer', 'client']} requireOnboarding={true}>
        <div>User Profile Content</div>
      </RoleRoute>
    </ProtectedRoute>
  );
}
```

---

## Step 4: Update Login Flow

**Remove localStorage.setItem** and use Redux instead.

**Before:**
```tsx
// Login component
const handleLogin = async (credentials) => {
  const response = await authApi.login(credentials);
  localStorage.setItem("user", JSON.stringify(response.data.data));
  router.push("/dashboard");
};
```

**After:**
```tsx
// Login component
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

const dispatch = useDispatch();

const handleLogin = async (credentials) => {
  const response = await authApi.login(credentials);
  
  // Store in Redux (cookies are set by backend)
  dispatch(setUser(response.data.data));
  
  // Redirect based on role
  const user = response.data.data;
  if (user.activeRole === 'freelancer') {
    router.push("/freelancer/dashboard");
  } else if (user.activeRole === 'client') {
    router.push("/client/dashboard");
  } else {
    router.push("/");
  }
};
```

---

## Step 5: Update Logout Flow

**Remove localStorage.removeItem** and use Redux.

**Before:**
```tsx
const handleLogout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};
```

**After:**
```tsx
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/authSlice";
import { axiosClient } from "@/api/axiosClient";

const dispatch = useDispatch();

const handleLogout = async () => {
  try {
    // Call backend to clear HTTP-only cookie
    await axiosClient.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear Redux state
    dispatch(clearUser());
    router.push("/login");
  }
};
```

---

## Step 6: Role Switching

**Example:** User wants to switch from freelancer to client role.

```tsx
import { useDispatch, useSelector } from "react-redux";
import { setActiveRole } from "@/store/slices/authSlice";
import { RootState } from "@/store";

function RoleSwitcher() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const switchRole = async (newRole: 'freelancer' | 'client') => {
    try {
      // Call backend to update activeRole in database
      await axiosClient.patch("/auth/switch-role", { activeRole: newRole });
      
      // Update Redux state
      dispatch(setActiveRole(newRole));
      
      // Redirect to new role's dashboard
      if (newRole === 'freelancer') {
        router.push("/freelancer/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    } catch (error) {
      console.error("Role switch error:", error);
    }
  };

  return (
    <div>
      {user?.roles.includes('freelancer') && (
        <button onClick={() => switchRole('freelancer')}>
          Switch to Freelancer
        </button>
      )}
      {user?.roles.includes('client') && (
        <button onClick={() => switchRole('client')}>
          Switch to Client
        </button>
      )}
    </div>
  );
}
```

---

## Step 7: Update Onboarding Completion

When user completes onboarding, update Redux state.

```tsx
import { useDispatch } from "react-redux";
import { updateOnboardingStatus } from "@/store/slices/authSlice";

const dispatch = useDispatch();

const handleOnboardingComplete = async () => {
  try {
    // Submit onboarding data to backend
    await freelancerApi.completeOnboarding(onboardingData);
    
    // Update Redux state
    dispatch(updateOnboardingStatus({ role: 'freelancer', completed: true }));
    
    // Redirect to dashboard
    router.push("/freelancer/dashboard");
  } catch (error) {
    console.error("Onboarding error:", error);
  }
};
```

---

## Step 8: Access User Data in Components

**Before:**
```tsx
const userStr = localStorage.getItem("user");
const user = userStr ? JSON.parse(userStr) : null;
```

**After:**
```tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const { user, isAuthenticated, isLoading } = useSelector(
  (state: RootState) => state.auth
);
```

---

## Step 9: Clean Up Old Files (Optional)

After migration is complete, you can remove:

- `frontend/src/components/FreelancerAuthGaurd.tsx`
- `frontend/src/components/ClientAuthGaurd.tsx`
- `frontend/src/components/AdminAuthGaurd.tsx`

**Search for localStorage usage:**
```bash
# PowerShell command to find remaining localStorage references
Select-String -Path "d:\Brototype files\Skill-Club\frontend\src\**\*.tsx" -Pattern "localStorage.getItem\(.*user.*\)" -SimpleMatch:$false
```

---

## Component Comparison Table

| Feature | Old Guards | New System |
|---------|-----------|------------|
| **Auth Check** | localStorage | Redux `isAuthenticated` |
| **User Data** | JSON.parse(localStorage) | Redux `state.auth.user` |
| **Role Check** | Manual in each guard | `RoleRoute` component |
| **Onboarding** | Manual checks | Built into `RoleRoute` |
| **Loading State** | No centralized loading | Redux `isLoading` |
| **Error Handling** | Manual | Redux `error` field |
| **Auto Refresh** | Manual on each page | `useAuthBootstrap` hook |
| **Block Status** | Manual checks | Built into `RoleRoute` |

---

## Testing Checklist

- [ ] `/auth/me` endpoint returns correct user data structure
- [ ] Login sets Redux state correctly
- [ ] Logout clears Redux state and cookies
- [ ] Refresh page maintains auth state (via `/auth/me`)
- [ ] Freelancer routes redirect non-freelancers
- [ ] Client routes redirect non-clients
- [ ] Onboarding redirects work for incomplete users
- [ ] Blocked users are redirected to block page
- [ ] Role switching updates Redux and redirects correctly
- [ ] No localStorage usage remains for auth

---

## Troubleshooting

### Issue: "User not authenticated" after refresh
**Solution:** Check that `/auth/me` endpoint is being called and HTTP-only cookies are sent with `credentials: 'include'`.

### Issue: Infinite redirect loop
**Solution:** Ensure onboarding pages are excluded from redirect logic in `RoleRoute.tsx` (see `onboardingPaths` array).

### Issue: Role switching doesn't work
**Solution:** Verify backend `/auth/switch-role` endpoint updates `activeRole` in database and returns updated user data.

### Issue: TypeScript errors in old guards
**Solution:** This is expected if you're still using old guards. Migrate to new components or temporarily add type assertions.

---

## Summary

You now have a **Redux-based authentication system** with:

✓ HTTP-only cookie security  
✓ Centralized auth state  
✓ Automatic refresh on mount  
✓ Role-based route protection  
✓ Onboarding-aware routing  
✓ Clean, reusable components  

**Next Steps:**
1. Verify `/auth/me` endpoint
2. Add `useAuthBootstrap` to root layout
3. Replace old guards with `ProtectedRoute` + `RoleRoute`
4. Update login/logout flows
5. Test thoroughly
6. Remove old guard files
