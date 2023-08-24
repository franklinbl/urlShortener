<script lang="ts">
  import { AlertIcon } from '../assets/icons';
  import { buscarUrlsByFilter, createUrl } from '../services/firebaseDB';
  import { dataTable } from '../services/store';

  let error = false;
  let data = {
    user: 'aa',
    short_url: '',
    large_url: '',
  };

  const searchLinks = () => {
    if (data.user === '') {
      error = true;
      setTimeout(() => {
        error = false;
      }, 3000);
      return;
    }
    buscarUrlsByFilter('user', data.user).then((response) => {
      dataTable.set(response);
    });
  };

  searchLinks();

  const acortarUrl = () => {
    createUrl(data);
    searchLinks();
    data = {
      user: '',
      short_url: '',
      large_url: '',
    };
  };
</script>

<form>
  <div class="grid md:grid-cols-3 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
      <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
      <input
        bind:value={data.user}
        type="text"
        id="user"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
      />
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <label for="shortUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL corta</label>
      <input
        bind:value={data.short_url}
        type="url"
        id="shortUrl"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="https://www.google.com/"
      />
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <label for="largeUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url larga</label>
      <input
        bind:value={data.large_url}
        type="url"
        id="largeUrl"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="https://www.google.com/"
      />
    </div>
  </div>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click={acortarUrl}
  >
    Acortar link
  </button>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click={searchLinks}
  >
    Buscar links de usuario
  </button>
</form>

{#if error === true}
  <div
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
    <div class="ml-3 text-sm font-normal">Debe ingresar un usuario.</div>
  </div>
{/if}
