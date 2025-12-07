// Utility functions for managing property subscriptions in localStorage

export interface PropertySubscription {
  activePackage: string;
  reportsLeft: number;
}

export function getPropertySubscription(propertyId: string): PropertySubscription | null {
  if (typeof window === 'undefined') return null;
  const subscriptions = JSON.parse(localStorage.getItem('propertySubscriptions') || '{}');
  return subscriptions[propertyId] || null;
}

export function setPropertySubscription(propertyId: string, subscription: PropertySubscription): void {
  if (typeof window === 'undefined') return;
  const subscriptions = JSON.parse(localStorage.getItem('propertySubscriptions') || '{}');
  subscriptions[propertyId] = subscription;
  localStorage.setItem('propertySubscriptions', JSON.stringify(subscriptions));
}

export function decrementPropertyReports(propertyId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const subscriptions = JSON.parse(localStorage.getItem('propertySubscriptions') || '{}');
  const subscription = subscriptions[propertyId];
  
  if (!subscription || subscription.reportsLeft <= 0) {
    return false; // Cannot decrement
  }
  
  subscription.reportsLeft -= 1;
  subscriptions[propertyId] = subscription;
  localStorage.setItem('propertySubscriptions', JSON.stringify(subscriptions));
  return true;
}

export function canGenerateReport(propertyId: string): boolean {
  if (typeof window === 'undefined') return false;
  const subscription = getPropertySubscription(propertyId);
  return subscription !== null && subscription.reportsLeft > 0;
}
