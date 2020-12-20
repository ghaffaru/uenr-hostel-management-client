import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard/Dashboard'
import AddStudent from '../views/dashboard/AddStudent'
import Students from '../views/dashboard/Students'
import AddRoom from '../views/dashboard/AddRoom'
import Rooms from '../views/dashboard/Rooms'
import EditRoom from '../views/dashboard/EditRoom'
import StudentDetail from '../views/dashboard/StudentDetail';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard
  },
  {
      path: '/add-student',
      name: 'AddStudent',
      component: AddStudent
  },
  {
      path: '/students',
      name: 'Students',
      component: Students
  },
  {
      path: '/add-room',
      name: 'AddRoom',
      component: AddRoom
  },
  {
      path: '/rooms',
      name: 'Rooms',
      component: Rooms
  },
  {
    path: '/room/edit/:id',
    name: 'EditRoom',
    component: EditRoom
  },
  {
    path: '/student/detail/:id',
    name: 'StudentDetail',
    component: StudentDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
