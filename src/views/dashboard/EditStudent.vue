<template>
  <div>
       <div id="wrapper">
         <Aside />

          <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                       <Toolbar />
                    <div class="container-fluid">
                           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Edit Student</h1>

                             <a href="">
                <!-- <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ this.$store.state.user.firstName }} {{ this.$store.state.user.lastName }}</span> -->
                <img class="img-profile rounded-circle" :src="studentPath" v-bind="studentPath" width="100px" height="100px">
              </a>
                            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
                            </div>
                         <b-overlay :show="show" rounded="sm">
                          <form @submit.prevent="updateStudent">
                                      <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" id="firstName" aria-describedby="" value="student.firstName" v-model="student.firstName" required>
                                </div>

                                <div class="form-group">
                                    <label for="otherNames">Other Names</label>
                                    <input type="text" class="form-control" id="otherNames" aria-describedby="" v-model="student.otherNames" value="otherNames">
                                </div>
                              
                                <div class="form-group">
                                  <label for="level">Level</label>
                                  <select class="form-control" v-model="student.level"  required>
                                     
                                      <option value="100">100</option>
                                      <option value="200">200</option>
                                      <option value="300">300</option>
                                      <option value="400">400</option>
                                  </select>
                                </div>
                                <div class="form-group"> 
                                  <label for="emergencyContactName">Emergency Contact Name</label>
                                   <input type="text" class="form-control" v-model="student.emergencyContactName" value="student.emergencyContactName" required>
                                </div>
                                <div class="form-group">
                                  <label for="photo">Photo</label>
                                  <input type="file"  class="form-control" accept="image/*" ref="file"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" class="form-control" id="otherNames" v-model="student.lastName" value="student.lastName" required>
                                </div>  
                                <div class="form-group">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="number" class="form-control" id="phoneNumber" aria-describedby="" value="student.phoneNumber" v-model="student.phoneNumber">
                              </div>
                                <div class="form-group">
                                  <label for="lastName">Program</label>
                                  <select class="form-control"  v-model="student.program">
                                     
                                      <option value="">Program</option>
                                      <option value="BSc Agriculture">Bsc Agriculture</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="roomNumber">Room Number</label>
                                  <select name="" id="" v-model="student.room.id" class="form-control">
                                    <option v-for="roomNumber in roomNumbers" :value="roomNumber.value" :key="roomNumber.value">{{ roomNumber.text }} </option>
                                  </select>
                                  <!-- <v-select :options="roomNumbers" v-model="roomNumber" required/> -->
                                </div>

                                <div class="form-group"> 
                                  <label for="emergencyContactNumber">Emergency Contact Number</label>
                                   <input type="text" class="form-control" v-model="student.emergencyContactNumber" value="student.emergencyContactNumber" required>
                                </div>
                            </div>
                          </div>
                              
                                <button type="submit" class="btn btn-primary block">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
                            </form>
                         </b-overlay>
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
            student: {},
            show: false,
            loading: false,
            roomNumbers: [],

            firstName: '',
            lastName: '',
            program: '',
            otherNames: '',
            phoneNumber: '',
            roomNumberId: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
            program: '',

        }
    },
      created () {
        this.show = true;
        axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student/${this.$route.params.id}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(response => {
                this.show = false;
                this.student = response.data;
                console.log(this.student);
                console.log(this.student.photo);
            }).catch(err => {
                this.show = false;
                console.log(err.response.data);
            })
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
        }
    },

    methods: {
      updateStudent() {
        
        this.loading = true;
        this.photo = this.$refs.file.files[0];
        let formData = new FormData();
        let firstName = this.student.firstName;
        console.log(firstName);
        formData.append('firstName', firstName);
        formData.append('lastName', this.student.lastName);
        formData.append('otherNames', this.student.otherNames);
        formData.append('program', this.student.program);
        formData.append('level', this.student.level);
        formData.append('emergencyContactName', this.student.emergencyContactName);
        formData.append('emergencyContactNumber', this.student.emergencyContactNumber);
        formData.append('roomNumberId', this.student.room.id);
        formData.append('phoneNumber', this.student.phoneNumber);
        // formData.append('_method', 'PUT')
        if (this.photo) {
          formData.append('photo', this.photo);
        }
        console.log(formData);
        axios.post(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student/${this.$route.params.id}?_method=PUT`, formData, {
         headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
         }).then(response => {
              swal('Success', "Student updated Successfully!", 'success')
               this.loading = false;
        }).catch(err => {
           swal('Error', "Could not update student", 'danger')
           this.loading = false;
        })
      }
    }
}


</script>

<style>

</style>