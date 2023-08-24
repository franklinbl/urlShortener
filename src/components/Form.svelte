<script lang="ts">
  import { buscarUrlsByFilter, createUrl } from '../services/firebaseDB';
  import { dataTable } from '../services/store';
  import { notifications } from '../services/alertStore';
  import Alert from '../services/Alert.svelte';

  let error = false;
  let data = {
    user: '',
    short_url: '',
    large_url: '',
  };

  const searchLinks = () => {
    if (data.user === '') {
      return notifications.send('Debe ingresar un nombre de usuario.', 3000);
    }
    buscarUrlsByFilter('user', data.user).then((response) => {
      dataTable.set(response);
    });
  };

  const acortarUrl = () => {
    if (data.user === '') {
      return notifications.send('Debe ingresar un nombre de usuario.', 3000);
    }

    if (data.large_url === '') {
      return notifications.send('Debe indicar la URL que desea acortar', 3000);
    }

    const shortUrl = Math.random().toString(32).substr(2, 5);
    data.short_url = shortUrl;
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
  <div class="grid md:grid-cols-2 md:gap-6">
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
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
    on:click={searchLinks}
  >
    Buscar links de usuario
  </button>
</form>

<Alert />
