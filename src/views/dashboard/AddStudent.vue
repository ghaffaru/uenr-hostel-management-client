<template>
  <div>
      <div id="wrapper">
           <!-- Sidebar -->
            <Aside />
            <!-- End of Sidebar -->  
              <div id="content-wrapper" class="d-flex flex-column">

              </div>   
      </div>
  </div>
</template>

<script>
import Aside from '../../components/dashboard/Aside.vue';
export default {
    components: {
        Aside
    }
}
</script>

<style>

</style>