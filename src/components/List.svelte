<script lang="ts">
  import { getUrls } from '../services/firebaseDB';

  let urls = [];
  getUrls().then((response) => {
    urls = response;
  });
</script>


<table>
  <tr>
    <th>Usuario</th>
    <th>URL acortada</th>
    <th>URL original</th>
  </tr>
  {#each urls as url}
    <tr>
      <td>{url.user}</td>
      <td>{url.short_url}</td>
      <td>{url.large_url}</td>
    </tr>
  {/each}
</table>
