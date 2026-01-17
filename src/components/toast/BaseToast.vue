<template>
    <div class="toast-container">
        <div v-for="toast in toasts" :key="toast.id" :class="['toast', toast.type]">
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/bus/EventBus'

const toasts = ref([])

onMounted(() => {
    emitter.on('toast', addToast)
})

onUnmounted(() => {
    emitter.off('toast', addToast)
})

function addToast(toast) {
    const id = Date.now()
    toasts.value.push({ ...toast, id })

    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
}
</script>

<style scoped>
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 260px;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.25s ease;
}

/* SUCCESS */
.toast.success {
    background-color: white;
    color: #333;
}

/* ERROR (để sẵn) */
.toast.error {
    background-color: #fff1f0;
    border-left: 4px solid #ff4d4f;
    color: #333;
}

.icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #52c41a;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.message {
    flex: 1;
}

/* Animation */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
