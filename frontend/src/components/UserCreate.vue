<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Create User</h1>
        <router-link
          :to="{ name: 'UserList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="createUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" v-model="item.username" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="item.name" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="item.email" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="item.password" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Role</label>
            <select v-model="item.role" class="form-control" required>
              <option v-for="option in options" v-bind:value="option.value" :key="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  data() {
    return {
      item: {
        properties: []
      },
      options: [
        { value: 'Admin', text: 'Admin' },
        { value: 'Manager', text: 'Manager' },
        { value: 'Employee', text: 'Employee' },
        { value: 'Visitor', text: 'Visitor' }
      ]
    };
  },

  methods: {
    createUser() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users";
      this.axios.post(uri, this.item, auth).then(response => {
        toastr.success(response.data.item, "User created");
        this.$router.push({ name: "UserList" });
      }).catch(function () {
        router.push("/SignIn");
      });
    }
  }
};
</script>
