// src/composables/useAuthModal.ts
import { useState } from '#imports';

export function useAuthModal() {
  const isAuthOpen = useState<boolean>('auth-modal-open', () => false);

  function openAuthModal(): void {
    isAuthOpen.value = true;
  }

  function closeAuthModal(): void {
    isAuthOpen.value = false;
  }

  function setAuthModal(value: boolean): void {
    isAuthOpen.value = value;
  }

  return {
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
    setAuthModal,
  };
}
