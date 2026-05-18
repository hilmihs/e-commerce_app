"use client";

import type { AdminSession } from "@/types/api";

const ADMIN_SESSION_KEY = "storefront.admin.v1";

export function saveAdminSession(session: AdminSession) {
  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}
