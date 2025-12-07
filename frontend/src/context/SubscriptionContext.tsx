"use client";

import React, { createContext, useContext, useState } from "react";

interface SubscriptionContextType {
  isSubscriptionOpen: boolean;
  openSubscription: () => void;
  closeSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const openSubscription = () => setIsSubscriptionOpen(true);
  const closeSubscription = () => setIsSubscriptionOpen(false);

  return (
    <SubscriptionContext.Provider value={{ isSubscriptionOpen, openSubscription, closeSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
