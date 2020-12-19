<template>
  <div>
      <ul class="navbar-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Hostel Management</div>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <router-link class="nav-link" to="/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Features
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <router-link class="nav-link collapsed" to="/students" data-toggle="collapse" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-list"></i>
          <span>All Students</span>
        </router-link>
       
      </li>

      <!-- Nav Item - Utilities Collapse Menu -->
      <li class="nav-item">
        <router-link class="nav-link collapsed" to="/add-student" data-toggle="collapse" aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fas fa-fw fa-plus"></i>
          <span>Add Student</span>
        </router-link>
        <!-- <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Custom Utilities:</h6>
            <a class="collapse-item" href="utilities-color.html">Colors</a>
            <a class="collapse-item" href="utilities-border.html">Borders</a>
            <a class="collapse-item" href="utilities-animation.html">Animations</a>
            <a class="collapse-item" href="utilities-other.html">Other</a>
          </div>
        </div> -->
      </li>

      <!-- Divider -->
      <!-- <hr class="sidebar-divider"> -->

      <!-- Heading -->
      <!-- <div class="sidebar-heading">
        Addons
      </div> -->

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <router-link class="nav-link collapsed" to="/rooms" data-toggle="collapse" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-fw fa-list"></i>
          <span>All Rooms</span>
        </router-link>
       
      </li>

      <!-- Nav Item - Charts -->
     <li class="nav-item">
        <router-link class="nav-link collapsed" to="/add-room" data-toggle="collapse" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-fw fa-plus"></i>
          <span>Add Room</span>
        </router-link>
       
      </li>

      <!-- Nav Item - Tables -->
      <!-- <li class="nav-item">
        <a class="nav-link" href="tables.html">
          <i class="fas fa-fw fa-table"></i>
          <span>Assign Training</span></a>
      </li> -->

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
 
}
</script>

<style>
</style>