<template>
  <div>
      <div id="wrapper">
         <Aside />

              <div id="content-wrapper" class="d-flex flex-column">
                 <div id="content">
                    <Toolbar />

                     <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Student Detail</h1>
                            
                        </div>
                        <table class="table">
                           <tr>
                               <td></td>
                               <td><b-button variant="primary" @click="editItem">Edit </b-button>
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
                        Photo: 
                        <img :src="studentPath" class="img-fluid" alt="" v-if="student.photoPath" width="80%">
                       
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
            if (this.student) {
            let image =  this.student.photoPath.split('/', 1)
            return `https://dl.dropboxusercontent.com/s/ougi1oasq81625r/${image}`;
            }
          
        }
    }
}
</script>

<style>

</style>