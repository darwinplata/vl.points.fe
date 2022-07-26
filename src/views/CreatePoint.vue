<script setup>
  import { usePointsStore } from '../store/usePointsStore';
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from '@vue/runtime-core';
  import { useForm, useField, useIsFormDirty } from 'vee-validate';
  
  const router = useRouter();
  const route = useRoute();
  const pointsStore = usePointsStore();

  function isRequired(value) {
    if (value && value.trim()) {
        return true;
    }
    return 'This field is required';
  }

  const { resetForm, handleSubmit } = useForm();
  const { value: nameValue } = useField('name');
  const { value: xValue } = useField('x');
  const { value: yValue } = useField('y');
  const isFormDirty = useIsFormDirty();

  // Submit form with values and update
  const submitFormCre = handleSubmit(async (values) => {    
    await pointsStore.createPoint({ ...values });
    pointsStore.fetchAllPoints();
    backHome();
  });

  // Back home (link)
  const backHome = () => {
   router.push(`/`);
  }
</script>

<template>
  <h1>Create Point</h1>

   <form @submit="submitFormCre">
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
            <input type="text" maxlength="1" name="name" id="name" placeholder="Point Name" v-model="nameValue" required/>
        </td>
      </tr>
      <tr>
        <td>X</td>
        <td>
            <input type="number" name="x" id="x" placeholder="Point Name" v-model="xValue" required />
        </td>
      </tr>
      <tr>
        <td>Y</td>
        <td>
            <input type="number" name="y" id="y" placeholder="Point Name" v-model="yValue" required />
        </td>
      </tr>
      </tbody>
    </table>

    <div class="linear-controls">
      <a class="item-hover" v-on:click="backHome">Back Home</a> &nbsp; &nbsp; 
      <div>
        <button class="btn btn-primary" type="submit" :disabled="!isFormDirty">Save</button>&nbsp; &nbsp;
      </div>
    </div>
    <hr><br>
  </form>
</template>

<style scoped>
.linear-controls{
  display: flex;
  justify-content: space-between;
}
</style>
