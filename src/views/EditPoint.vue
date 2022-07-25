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
  const formValues = {  name: pointInfo.value.name,
                        x: pointInfo.value.x, 
                        y: pointInfo.value.y };

  const { resetForm, handleSubmit } = useForm({ initialValues: formValues });
  const { value: nameValue } = useField('name');
  const { value: xValue } = useField('x');
  const { value: yValue } = useField('y');

  const isFormDirty = useIsFormDirty();
  console.log(isFormDirty.value);

  // Submit form with values and update
  const submitForm = handleSubmit(async (values) => {    
    await pointsStore.udpatePoint({ id:route.params.id, ...values });
    backHome();
  });

  // Reset function
  function resetValues(){
    resetForm();
  }

  // Destroy function
  async function deleteValue(){
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
            <input type="text" maxlength="1" name="name" id="name" placeholder="Point Name" v-model="nameValue" />
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

  <div id="nearest">
  <h5>Nearest Points</h5>
  <table class="table table-striped">
    <thead class="thead-light">
    <tr>
      <th>Name</th>
      <th>X</th>
      <th>Y</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>F</td>
        <td>6</td>
        <td>7</td>
      </tr>
      <tr>
        <td>J</td>
        <td>2</td>
        <td>1</td>
      </tr>
    </tbody>
  </table>
  </div>

  <div id="farthest">
  <br>
  <h5>Farthest Points</h5>
  <table class="table table-striped">
    <thead class="thead-light">
    <tr>
      <th>Name</th>
      <th>X</th>
      <th>Y</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>F</td>
        <td>6</td>
        <td>7</td>
      </tr>
      <tr>
        <td>J</td>
        <td>2</td>
        <td>1</td>
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
