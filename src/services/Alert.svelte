<script>
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import { notifications } from '../services/alertStore';
  import { AlertIcon } from '../assets/icons';
</script>

<div>
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      transition:fly={{ y: 30 }}
      id="toast-top-right"
      class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
      >
        {@html AlertIcon}
        <span class="sr-only">Warning icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">{notification.message}</div>
    </div>
  {/each}
</div>
