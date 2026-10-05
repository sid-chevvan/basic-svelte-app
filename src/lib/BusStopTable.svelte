<script>
  let { busStops } = $props();
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Stop ID</th>
        <th>Stop Name</th>
        <th>Description</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {#each busStops as stop}
        <tr>
          <td>{stop.stop_id}</td>
          <td>{stop.stop_name}</td>
          <td>{stop.stop_desc || 'N/A'}</td>
          <td>{stop.stop_lat}</td>
          <td>{stop.stop_lon}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
</style>
