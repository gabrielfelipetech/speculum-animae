<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 py-6"
        @click="onBackdropClick"
      >
        <Transition name="scale">
          <div
            v-if="modelValue"
            class="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
          >
            <!-- Botão fechar -->
            <button
              type="button"
              class="absolute right-3 top-3 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Fechar"
              @click="close"
            >
              ✕
            </button>

            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

function close(): void {
  emit('update:modelValue', false);
  emit('close');
}

function onBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    close();
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.modelValue) {
    close();
  }
}

onMounted(() => {
  if (!import.meta.client) return;
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  if (!import.meta.client) return;
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
