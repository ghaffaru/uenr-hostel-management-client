<template>
  <div>
      <div id="wrapper">
         <Aside />

              <div id="content-wrapper" class="d-flex flex-column">
                 <div id="content">
                    <Toolbar />

                    <div>
                       
                        <b-modal id="delete-modal" title="Delete" hide-footer>
                            <p class="my-4">Are you sure you want to delete this student ?</p>
                             <b-button v-b-modal.modal-1 variant="danger" @click="deleteStudent">Delete </b-button>
                             <b-button v-b-modal.modal-1 @click="$bvModal.hide('delete-modal');">Cancel</b-button>
                        </b-modal>          
                    </div>
                     <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Student Detail</h1>
                            
                        </div>
                        <table class="table">
                           <tr>
                               <td>
                                    <a href="">
                <!-- <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ this.$store.state.user.firstName }} {{ this.$store.state.user.lastName }}</span> -->
                <img class="img-profile rounded-circle" :src="studentPath" v-if="student.photoPath" width="100px" height="100px">
                <p v-if="!student.photoPath">No Photo</p>
              </a>
                               </td>
                               <td>
                                   <router-link :to="editUrl">
                                       Edit
                                    <!-- <b-button variant="primary"> </b-button> -->
                                    </router-link>
                                  
                                <b-button variant="danger" @click="deleteItem">Delete</b-button></td>
                           </tr>
                            <tr>
                                <td>First Name</td>
                                
                                <td>{{ student.firstName }}</td>
                            </tr>

                             <tr>
                                <td>Last Name</td>
                                
                                <td>{{ student.lastName }}</td>
                            </tr>

                             <tr>
                                <td>Other Names</td>
                                
                                <td>{{ student.otherNames }}</td>
                            </tr>

                             <tr>
                                <td>Phone Number</td>
                                
                                <td>{{ student.phoneNumber }}</td>
                            </tr>

                             <tr>
                                <td>Level</td>
                                
                                <td>{{ student.level }}</td>
                            </tr>

                             <tr>
                                <td>Room Number</td>
                                
                                <td>{{ student.room.roomNumber }}</td>
                            </tr>

                             <tr>
                                <td>Emergency Contact Name</td>
                                
                                <td>{{ student.emergencyContactName }}</td>
                            </tr>
                            <tr>
                                <td>Emergency Contact Number</td>
                                <td>{{ student.emergencyContactNumber }}</td>
                            </tr>
                        </table>
                        <!-- Photo: 
                        <img :src="studentPath" class="img-fluid" alt="" v-if="student.photoPath" width="80%">
                        -->
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
export default {
 components: {
        Aside,
        Toolbar
    },
    data() {
        return {
            student: {},
           
        }
    },

    mounted () {
        axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student/${this.$route.params.id}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(response => {
                this.student = response.data;
                console.log(this.student);
                console.log(this.student.photo);
            }).catch(err => {
                console.log(err.response.data);
            })
    },
    computed: {
        studentPath() {
            if (this.student && this.student.photoPath) {
            // let image =  this.student.photoPath.split('', 1);
            let image = this.student.photo.slice(0, -4)
            console.log(image);
            // return `https://dl.dropboxusercontent.com/s/ougi1oasq81625r/${this.student.photoPath}`;
            return `${image}raw=1`
            }
        },
        editUrl() {
            return `/student/edit/${this.$route.params.id}`
        }
    },
    methods: {
        editItem() {
            this.$router.push(`/student/edit/${this.$route.params.id}`);
        },

        deleteItem() {
                this.$bvModal.show('delete-modal');
        },

        deleteStudent() {
            //  deleteRoom() {
            axios.delete(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student/${this.$route.params.id}`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(response => {
                                    swal("Deleted", response.data.message, "success");
                              this.$bvModal.hide('delete-modal');  
                              this.$router.push('/students')    
                }).catch(err => {
                    console.log(err.response);
                                    swal("Error", err.response.data.message, "error");
                })
        // }
        }
    }
}
</script>

<style>

</style>