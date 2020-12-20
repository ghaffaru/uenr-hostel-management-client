<template>
  <div>
       <div id="wrapper">
           <Aside />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Toolbar />
                    <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Edit Room</h1>
                            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
                            </div>


                            <form @submit.prevent="updateRoom">
                                <div class="form-group">
                                    <label for="roomNumber">Room Number</label>
                                    <input type="text" class="form-control" id="roomNumber" aria-describedby="" v-model="room.roomNumber" value="room.roomName" required>
                                </div>
                                <div class="form-group">
                                    <label for="capacity">Capacity</label>
                                    <input type="number" class="form-control" id="capacity" v-model="room.capacity" value="room.capacity" required>
                                </div>
                                <div class="form-group">
                                    <label for="furniture">Furniture (Separate with commas)</label>
                                    <input type="text" class="form-control" id="furniture" aria-describedby="" v-model="room.furniture" value="room.furniture" required>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="text" class="form-control" id="price" aria-describedby="" v-model="room.price" value="room.price" required>
                                </div>
                                <button type="submit" class="btn btn-primary block">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

                                    Update
                                </button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Aside from '../../components/dashboard/Aside';
import Toolbar from '../../components/dashboard/Toolbar';
import axios from 'axios';
import swal from 'sweetalert';
export default {
    components: {
        Aside,
        Toolbar
    },
    data() {
        return {
            room: {},
            loading: false
        }
    },
    created() {
        axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room/${this.$route.params.id}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(response => {
                
                this.room = response.data
                
               
            }).catch(err => {
               
                console.log(err.response);
            })
        
    },

    methods: {
        updateRoom() {
            this.loading = true;
            axios.patch(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room/${this.$route.params.id}`, this.room,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            .then(response => {
                 this.loading = false;
                swal('Success', "Room updated Successfully!", 'success')
            }).catch(err => {
                 this.loading = false;
                console.log(err.response);
            })
        }
    }
}
</script>
<style>

</style>