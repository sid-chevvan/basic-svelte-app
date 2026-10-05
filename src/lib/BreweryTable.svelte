<script>
  let { breweries, onSelect } = $props();
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each breweries as brewery}
        <tr>
          <td>{brewery.name}</td>
          <td>{brewery.city}</td>
          <td>{brewery.brewery_type}</td>
          <td>
            <button onclick={() => onSelect(brewery.id)}>View Details</button>
          </td>
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

  button {
    padding: 6px 12px;
    font-size: 0.9rem;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #004494;
  }
</style>
