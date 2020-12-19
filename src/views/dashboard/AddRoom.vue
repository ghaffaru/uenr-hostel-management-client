<template>
  <div>
      <div id="wrapper">
           <!-- Sidebar -->
            <Aside />
            <!-- End of Sidebar -->  
              <div id="content-wrapper" class="d-flex flex-column">
                  <div id="content">

                      <!-- Topbar -->
                        <Toolbar />
                        <!-- End of Topbar -->

                          <div class="container-fluid">
                                <!-- Page Heading -->
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Add a new Room</h1>
                            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
                            </div>

                            <form @submit.prevent="addRoom">
                                <div class="form-group">
                                    <label for="roomNumber">Room Number</label>
                                    <input type="text" class="form-control" id="roomNumber" aria-describedby="" v-model="roomNumber" required>
                                </div>
                                <div class="form-group">
                                    <label for="capacity">Capacity</label>
                                    <input type="number" class="form-control" id="capacity" v-model="capacity" required>
                                </div>
                                <div class="form-group">
                                    <label for="furniture">Furniture (Separate with commas)</label>
                                    <input type="text" class="form-control" id="furniture" aria-describedby="" v-model="furniture" required>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="text" class="form-control" id="price" aria-describedby="" v-model="price" required>
                                </div>
                                <button type="submit" class="btn btn-primary block">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

                                    Submit
                                </button>
                            </form>

                          </div>
                  </div>
              </div>   
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Aside from '../../components/dashboard/Aside.vue';
import Toolbar from '../../components/dashboard/Toolbar.vue';
import swal from 'sweetalert';

export default {
    components: {
        Aside,
        Toolbar
    },
    data() {
        return {
            roomNumber : '',
            capacity: '',
            furniture: '',
            price: '',

            loading: false
        }
    },

    methods: {
        addRoom() {
            this.loading = true;
            axios.post(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room`, {
                roomNumber: this.roomNumber,
                capacity: this.capacity,
                furniture: this.furniture,
                price: this.price
            }, {headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }}).then(response => {
                swal('Success', "Room added Successfully!", 'success')
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                swal("Duplicate", err.response.data.message, "error");
            })
        }
    }
}
</script>

<style>

</style>