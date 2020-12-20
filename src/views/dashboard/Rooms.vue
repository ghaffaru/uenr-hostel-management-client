<template>
  <div>
      <div id="wrapper">
          <Aside />

            <div id="content-wrapper" class="d-flex flex-column">
                 <div id="content">
                   
                    <div>
                       
                        <b-modal id="delete-modal" title="Delete" hide-footer>
                            <p class="my-4">Are you sure you want to delete room number {{roomNumberToDelete}} ?</p>
                             <b-button v-b-modal.modal-1 variant="danger" @click="deleteRoom">Delete </b-button>
                             <b-button v-b-modal.modal-1 @click="$bvModal.hide('delete-modal');">Cancel</b-button>
                        </b-modal>          
                    </div>
                       <Toolbar />
                    <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Rooms</h1>
                            
                        </div>
                        <b-form-input v-model="filter" type="search" placeholder="Type to search"></b-form-input>
                        <br />
                         <b-overlay :show="show" rounded="sm">
                        <b-table striped hover outlined :items="rooms" :filter="filter"
                         :fields="fields"
                         :per-page="perPage"
                         :current-page="currentPage">
                          <template #cell(Edit)="data">
                                <b-button variant="primary" @click="editItem(data.item.id)">Edit</b-button>
                            </template>
                            <template #cell(Delete)="data">
                                <b-button variant="danger" @click="deleteItem(data.item.id, data.item.roomNumber)">Delete</b-button>
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
            roomNumberToDelete: '',
            roomIdToDelete: '',
            perPage: 10,
            currentPage: 1,
            filter: '',
            rooms: [],
            fields: ["roomNumber", "capacity", "furniture", "price", "created_at", "Edit", "Delete"]
        }
    },

    created() {
        this.show = true;
        axios.get(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room`, {
            headers: {
                'Authorization':  `Bearer ${localStorage.token}`
            }
        }).then(response => {
            this.show = false;
            this.rooms = response.data;
            this.$store.state.rooms = response.data
            console.log(this.$store.state.rooms);
        }).catch(err => {
            this.show = false;
            console.log(err.response.data);
        })
    },

    computed: {
        rows() {
            return this.rooms.length;
        }
    },

    methods: {
        deleteItem(id, roomNumber) {
           this.$bvModal.show('delete-modal');
           this.roomNumberToDelete = roomNumber
           this.roomIdToDelete = id
            console.log('Deleted ' + id );
        },

        editItem(id) {
            console.log('Editting ' + id);
            this.$router.push(`/room/edit/${id}`);
        },

        deleteRoom() {
            axios.delete(`https://uenr-hostel-management-api.herokuapp.com/api/admin/room/${this.roomIdToDelete}`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(response => {
                                    swal("Deleted", response.data.message, "success");
                              this.$bvModal.hide('delete-modal');      
                }).catch(err => {
                    console.log(err.response);
                                    swal("Error", err.response.data.message, "error");
                })
        }
    }
}
</script>

<style>

</style>