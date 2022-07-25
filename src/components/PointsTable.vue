<script setup>
  import { useRouter } from 'vue-router';
  import { usePointsStore } from '../store/usePointsStore';
  import { onMounted } from '@vue/runtime-core';

  const pointsStore = usePointsStore();
  const router = useRouter();

  const navigateToEdit = (pointId) => {
   router.push(`/edit/${pointId}`);
  }

  const navigateToCreate = () => {
   router.push(`/create`);
  }

  onMounted(() => {
    pointsStore.fetchAllPoints()
  })

</script>

<template>
  <h1>Points</h1>

   <button class="btn btn-success" v-on:click="navigateToCreate">+ Add</button>
   <table class="table table-striped table-hover">
    <thead class="thead-light">
     <tr>
       <th>Name</th>
       <th>X</th>
       <th>Y</th>
     </tr>
    </thead>
    <tbody>
     <tr v-for="point in pointsStore.points" :key="point.id" v-on:click="navigateToEdit(point.id)" class="table-hover">
      <td>{{ point.name }}</td>
      <td>{{ point.x }}</td>
      <td>{{ point.y }}</td>
     </tr>
    </tbody>
   </table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.table-hover tbody tr {
    cursor: pointer;
}
</style>
