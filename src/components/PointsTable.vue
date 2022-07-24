<script setup>
  import { useRouter } from 'vue-router';
  import { usePointsStore } from '../store/usePointsStore';

  const pointsStore = usePointsStore();
  const router = useRouter();

  const navigateToEdit = (pointId) => {
   router.push(`/edit/${pointId}`);
  }

  const navigateToCreate = () => {
   router.push(`/create`);
  }
</script>

<template>
  <h1>Points</h1>

   <button class="btn btn-success" v-on:click="navigateToCreate">+ Add</button>
   <table class="table table-striped">
    <thead class="thead-light">
     <tr>
       <th>Name</th>
       <th>X</th>
       <th>Y</th>
       <th></th>
     </tr>
    </thead>
    <tbody>
     <tr v-for="point in pointsStore.points" :key="point.id">
      <td>{{ point.name }}</td>
      <td>{{ point.x }}</td>
      <td>{{ point.y }}</td>
      <td><router-link class="btn-icon" :to="{path: `/edit/${point.id}`}">Edit</router-link></td>
     </tr>
    </tbody>
   </table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
