<script setup>
  import { usePointsStore } from '../store/usePointsStore';

  const pointsStore = usePointsStore();
</script>

<template>
  <h1>Edit Point</h1>

   <form>

   </form>

  
   <table class="table table-striped">
    <thead class="thead-light">
     <tr>
       <th>Field</th>
       <th>Value</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Name</td>
      <td>Name</td>
     </tr>
    </tbody>
   </table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
