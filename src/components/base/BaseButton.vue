<!-- src/components/base/BaseButton.vue -->
<template>
  <button
    :type="buttonType"
    class="btn-base"
    :class="variantClass"
    v-bind="$attrs"
  >
    <span v-if="props.variant === 'gradient'" class="btn-gradient__inner">
      <slot />
    </span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'solid' | 'gradient'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
  }>(),
  { variant: 'solid' },
)

const buttonType = computed(() => props.type ?? 'button')

const variantClass = computed(() => {
  return props.variant === 'gradient' ? 'btn-gradient' : 'btn-solid'
})
</script>

<style scoped>
.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: transform 120ms ease, background-color 120ms ease, filter 120ms ease;
  outline: none;
}

.btn-base:focus-visible {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.55), 0 0 0 4px rgba(255, 255, 255, 0.85);
}

:global(html.dark) .btn-base:focus-visible {
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.55), 0 0 0 4px rgba(15, 23, 42, 0.9);
}

.btn-base:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-base:active:not(:disabled) {
  transform: translateY(1px);
}

/* SOLID (comportamento atual) */
.btn-solid {
  background: #4f46e5; /* brand-600-ish */
  color: #ffffff;
}
.btn-solid:hover:not(:disabled) {
  filter: brightness(0.95);
}
:global(html.dark) .btn-solid {
  background: #fbbf24; /* amber-400-ish */
  color: #0f172a; /* slate-950-ish */
}
:global(html.dark) .btn-solid:hover:not(:disabled) {
  filter: brightness(1.02);
}

/* GRADIENT (para “Continuar”) */
.btn-gradient {
  position: relative;
  padding: 2px; /* vira “borda” do gradiente */
  border-radius: 0.75rem;
  background: linear-gradient(
    90deg,
    #00f5ff,
    #00ff6a,
    #ffe600,
    #ff7a00,
    #ff00c8,
    #7a5cff,
    #00f5ff
  );
  background-size: 300% 300%;
  animation: btnShift 4.5s linear infinite;
}

.btn-gradient__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
  border-radius: 0.65rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
}

:global(html.dark) .btn-gradient__inner {
  background: rgba(15, 23, 42, 0.92);
  color: #f8fafc;
}

@keyframes btnShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-gradient {
    animation: none;
  }
}
</style>
