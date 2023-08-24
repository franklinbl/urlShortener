import { writable } from 'svelte/store';
export const dataTable = writable([]);
export const alertStore = writable([]);

// Función para agregar una nueva alerta
export function addAlert(message, type = 'info') {
  alertStore.update((alerts) => [...alerts, { message, type }]);
}

// Función para eliminar una alerta
export function removeAlert(id) {
  alertStore.update((alerts) => alerts.filter((alert) => alert.id !== id));
}
