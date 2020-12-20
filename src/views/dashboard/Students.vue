<template>
  <div>
         <div id="wrapper">
          <Aside />

            <div id="content-wrapper" class="d-flex flex-column">
                 <div id="content">
                
                       <Toolbar />
                    <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Students</h1>
                            
                        </div>
                        <b-form-input v-model="filter" type="search" placeholder="Type to search"></b-form-input>
                        <br />
                         <b-overlay :show="show" rounded="sm">
                        <b-table striped hover outlined :items="students" :filter="filter"
                         :fields="fields"
                         :per-page="perPage"
                         :current-page="currentPage">
                          <template #cell(View)="data">
                                <b-button variant="primary" @click="viewItem(data.item.id)">View</b-button>
                            </template>
                        </b-table>
                        <b-pagination v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table">
                            
                        </b-pagination>
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
            show: false,
           
            perPage: 10,
            currentPage: 1,
            filter: '',
            students: [],
            fields: ["firstName", "lastName", "phoneNumber", "level", "program", "View"]
        }
    },

    created() {
        this.show = true;
        axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/student`, {
            headers: {
                'Authorization':  `Bearer ${localStorage.token}`
            }
        }).then(response => {
            this.show = false;
            this.students = response.data;
            this.$store.state.students = response.data
            
        }).catch(err => {
            this.show = false;
            console.log(err.response.data);
        })
    },

    computed: {
        rows() {
            return this.students.length;
        }
    },

    methods: {
        
        viewItem(id) {
            
            this.$router.push(`/student/detail/${id}`);
        },
    }
}
</script>

<style>

</style>