<script setup>
  import { usePointsStore } from '../store/usePointsStore';
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from '@vue/runtime-core';
  import { useForm, useField, useIsFormDirty } from 'vee-validate';
  
  const router = useRouter();
  const route = useRoute();
  const pointsStore = usePointsStore();

  // Get initial information
  const pointInfo = computed(() => pointsStore.getPointInfo(route.params.id));

  // Form: Initial values
  const formValues = {  id: route.params.id,
                        name: pointInfo.value.name,
                        x: pointInfo.value.x, 
                        y: pointInfo.value.y };

  const { resetForm, handleSubmit } = useForm({ initialValues: formValues });
  const { value: idValue } = useField('id');
  const { value: nameValue } = useField('name');
  const { value: xValue } = useField('x');
  const { value: yValue } = useField('y');

  const isFormDirty = useIsFormDirty();

  // Submit form with values and update
  const submitForm = handleSubmit(async (values) => {    
    await pointsStore.udpatePoint({ ...values });
    backHome();
  });

  // Sorted Points 
  const listsValues = computed(() => (
                      { id: idValue,
                      name: nameValue,
                      x: xValue, 
                      y: yValue }
                      ));
                      
  const sortedPoints = computed(() => pointsStore.sortPoints(listsValues.value));
  
  const nearestDistance = sortedPoints.value[0].distance;
  const fartherDistance = sortedPoints.value[sortedPoints.value.length - 1].distance;

  const nearestPoints = computed(() => sortedPoints.value.filter(function(point) {
                          return point.distance === nearestDistance
                        }));
  const farthestPoints = computed(() => sortedPoints.value.filter(function(point) {
                          return point.distance === fartherDistance
                        }));

  // Reset function
  function resetValues(e){
    e.preventDefault();
    resetForm();
  }

  // Destroy function
  async function deleteValue(e){
    e.preventDefault();
    await pointsStore.destroyPoint(route.params.id);
    backHome();
  }

  // Back home (link)
  const backHome = () => {
   router.push(`/`);
  }
</script>

<template>
  <h1>Edit Point</h1>
  
  <form @submit="submitForm">
    <input type="hidden" name="id" id="id" placeholder="Point Name" v-model="idValue" />
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
        <td>
            <input type="text" maxlength="1" name="name" id="name" v-model="nameValue" />
        </td>
      </tr>
      <tr>
        <td>X</td>
        <td>
            <input type="number" name="x" id="x" placeholder="Point Name" v-model="xValue" />
        </td>
      </tr>
      <tr>
        <td>Y</td>
        <td>
            <input type="number" name="y" id="y" placeholder="Point Name" v-model="yValue" />
        </td>
      </tr>
      </tbody>
    </table>

    <div class="linear-controls">
      <a class="item-hover" v-on:click="backHome">Back Home</a> &nbsp; &nbsp; 
      <div>
        <button class="btn btn-danger" v-on:click="deleteValue">Delete</button>&nbsp; &nbsp; 
        <button class="btn btn-secondary" v-on:click="resetValues" :disabled="!isFormDirty">Reset</button>&nbsp; &nbsp; 
        <button class="btn btn-primary" type="submit" :disabled="!isFormDirty">Save</button>&nbsp; &nbsp;
      </div>
    </div>
    <hr><br>
  </form>

  <div>
  <h5>Nearest point<span v-if="nearestPoints.length > 1">s</span> at distance {{ nearestDistance }}</h5>
  <table class="table table-striped">
    <thead class="thead-light">
    <tr>
      <th>Name</th>
      <th>X</th>
      <th>Y</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="point in nearestPoints" :key="point.id">
        <td>{{ point.name }}</td>
        <td>{{ point.x }}</td>
        <td>{{ point.y }}</td>
      </tr>
    </tbody>
  </table>
  </div>

  <div id="farthest">
  <br>
  <h5 id="hFarTitle">Farthest point<span v-if="farthestPoints.length > 1">s</span> at distance {{ fartherDistance }}</h5>
  <table class="table table-striped">
    <thead class="thead-light">
    <tr>
      <th>Name</th>
      <th>X</th>
      <th>Y</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="point in farthestPoints" :key="point.id">
        <td>{{ point.name }}</td>
        <td>{{ point.x }}</td>
        <td>{{ point.y }}</td>
      </tr>
    </tbody>
  </table>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.item-hover{
  cursor: pointer;
}

.linear-controls{
  display: flex;
  justify-content: space-between;
}
</style>
