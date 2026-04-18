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
  email: "teamaakarofficial@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/aakar.in_/",
    linkedin: "https://linkedin.com/company/aakar",
  },
  // TODO replace with actual founder details
  founders: [
    {
      name: "Pratham Mewada",
      role: "Co-Founder, Operation Head",
      phone: "+91 77382 83814",
    },
    {
      name: "Tripti Singh",
      role: "Co-Founder, Design Head",
      phone: "+91 99200 36244",
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
    [router],
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
