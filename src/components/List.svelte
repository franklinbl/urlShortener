<script lang="ts">
  import { deleteUrl } from '../services/firebaseDB';
  import { dataTable } from '../services/store';
  import { TrashIcon, ClipboardIcon, RedirectIcon } from '../assets/icons';

  let urls: any[] = [];

  dataTable.subscribe((response) => {
    urls = response;
  });

  const deleteItems = (data) => {
    deleteUrl(data);
    const newDataTable = urls.filter((x) => x.id !== data);
    dataTable.update(() => newDataTable);
  };

  const copyUrlInClipboard = (urlCopied) => {
    navigator.clipboard.writeText(window.location + urlCopied);
  };

  const tryUrl = (url) => {
    window.open(window.location + url, '_blank');
  };
</script>

<div class="relative overflow-x-auto my-10">
  {#if urls.length > 0}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Url larga</th>
          <th scope="col" class="px-6 py-3">Url corta</th>
          <th scope="col" class="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each urls as url}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">{url.large_url}</td>
            <td class="px-6 py-4">{window.location + url.short_url}</td>
            <td class="px-6 py-4 flex">
              <button
                on:click={() => copyUrlInClipboard(url.short_url)}
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline copyButton">{@html ClipboardIcon}</button
              >
              <button
                on:click={() => tryUrl(url.short_url)}
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline redirectButton">{@html RedirectIcon}</button
              >
              <button
                on:click={() => deleteItems(url.id)}
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline deleteButton"
              >
                {@html TrashIcon}
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .deleteButton {
    color: rgb(178, 53, 53);
  }

  .redirectButton {
    color: rgb(201, 201, 71);
  }

  .copyButton {
    color: rgb(32, 138, 32);
  }
</style>
