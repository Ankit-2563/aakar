"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

// Simplified Route Constants
export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  // Helper for dynamic project route building
  PROJECT: (id: string | number) => `/projects/${id}`,
} as const;

// Aakar Contact & Details
export const AAKAR_INFO = {
  // TODO replace with actual details
  email: "hello@aakar.com",
  socials: {
    instagram: "https://instagram.com/aakar",
    linkedin: "https://linkedin.com/company/aakar",
  },
  // TODO replace with actual founder details
  founders: [
    {
      name: "Founder One",
      role: "Co-Founder",
      phone: "+91 00000 00000", 
    },
    {
      name: "Founder Two", 
      role: "Co-Founder",
      phone: "+91 00000 00000",
    },
  ],
};

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Basic Next.js router pushing
  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  // Standard history back
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    navigateTo,
    goBack,
    pathname,
  };
};

export default useNavigation;
