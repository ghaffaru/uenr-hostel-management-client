<template>
  <div>
      <div id="wrapper">
           <!-- Sidebar -->
            <Aside />
            <!-- End of Sidebar -->  
             <div id="content-wrapper" class="d-flex flex-column">
                  <div id="content">
                    <Toolbar />
                    <div class="container-fluid">
                    <div id="content-wrapper" class="d-flex flex-column">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                  <h1 class="h3 mb-0 text-gray-800">Add Student</h1>
                                  <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
                          </div>
                    
                          <form @submit.prevent="addStudent">
                                      <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" id="firstName" aria-describedby="" v-model="firstName" required>
                                </div>

                                <div class="form-group">
                                    <label for="otherNames">Other Names</label>
                                    <input type="text" class="form-control" id="otherNames" aria-describedby="" v-model="otherNames">
                                </div>
                              
                                <div class="form-group">
                                  <label for="level">Level</label>
                                  <select class="form-control" v-model="level" required>
                                     
                                      <option value="100">100</option>
                                      <option value="200">200</option>
                                      <option value="300">300</option>
                                      <option value="400">400</option>
                                  </select>
                                </div>
                                <div class="form-group"> 
                                  <label for="emergencyContactName">Emergency Contact Name</label>
                                   <input type="text" class="form-control" v-model="emergencyContactName" required>
                                </div>
                                <div class="form-group">
                                  <label for="photo">Photo</label>
                                  <input type="file"  class="form-control" accept="image/*" ref="file"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" class="form-control" id="otherNames" v-model="lastName" required>
                                </div>  
                                <div class="form-group">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="number" class="form-control" id="phoneNumber" aria-describedby="" v-model="phoneNumber">
                              </div>
                                <div class="form-group">
                                  <label for="lastName">Program</label>
                                  <select class="form-control"  v-model="program">
                                     
                                      <option value="">Program</option>
                                      <option value="BSc Agriculture">Bsc Agriculture</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="roomNumber">Room Number</label>
                                  <select name="" id="" v-model="roomNumber" class="form-control">
                                    <option v-for="roomNumber in roomNumbers" :value="roomNumber.value" :key="roomNumber.value">{{ roomNumber.text }} </option>
                                  </select>
                                  <!-- <v-select :options="roomNumbers" v-model="roomNumber" required/> -->
                                </div>

                                <div class="form-group"> 
                                  <label for="emergencyContactNumber">Emergency Contact Number</label>
                                   <input type="text" class="form-control" v-model="emergencyContactNumber" required>
                                </div>
                            </div>
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
  </div>
</template>

<script>
import Aside from '../../components/dashboard/Aside.vue';
import Toolbar from '../../components/dashboard/Toolbar';
import VSelect from '@alfsnd/vue-bootstrap-select';
import axios from 'axios';
import swal from 'sweetalert';

export default {
    components: {
        Aside,
        Toolbar,
        VSelect
    },
    mounted() {
      // $('.my-select').selectpicker();
    },
    data() {
      return {
        loading: false,
        firstName: '',
        lastName: '',
        otherNames: '',
        program: '',
        level: '',
        phoneNumber: '',
        emergencyContactName: '',
        emergencyContactNumber: '', 
        roomNumber: null,
        photo: '',
        roomNumbers:[]
      }
    },

    methods:{
      addStudent(){
        this.loading = true;
        this.photo = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('otherNames', this.otherNames);
        formData.append('program', this.program);
        formData.append('level', this.level);
        formData.append('emergencyContactName', this.emergencyContactName);
        formData.append('emergencyContactNumber', this.emergencyContactNumber);
        formData.append('roomNumberId', this.roomNumber);
        if (this.photo) {
          formData.append('photo', this.photo);
        }
        
        formData.append('phoneNumber', this.phoneNumber);
        axios.post(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student`, formData, 
        {headers: {
          Authorization: `Bearer ${localStorage.token}`
        }})
            .then(response => {
               swal('Success', "Student added Successfully!", 'success')
               this.loading = false;
            }).catch(err => { 
               swal('Error', "Could not add student", 'danger')
               this.loading = false;
            })
      }
    },
    mounted(){
       axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room`, {
            headers: {
                'Authorization':  `Bearer ${localStorage.token}`
            }
        }).then(response => {
            
            let rooms = []
            response.data.forEach(element => {
              rooms.push({
                value: element.id,
                text: element.roomNumber
              });
            });

            this.roomNumbers = rooms;
            console.log(this.roomNumbers);
            
        }).catch(err => {
            
            console.log(err.response.data);
        })
    }
}

</script>

<style>

</style>