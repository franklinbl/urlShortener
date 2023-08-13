<script lang="ts">
  import { createUrl } from '../services/firebaseDB';

  const data = {
    user: '',
    short_url: '',
    large_url: '',
  };

  const handleClick = () => {
    console.log(data);
    createUrl(data);
  };
</script>

<label>
  usuario
  <input type="text" bind:value={data.user} />
</label><br /><br />
<label>
  URL corta
  <input type="text" bind:value={data.short_url} />
</label><br /><br />
<label>
  Url larga
  <input type="text" bind:value={data.large_url} />
</label><br /><br />
<button on:click={handleClick} type="button">Enviar</button>
