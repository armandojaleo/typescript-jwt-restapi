<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Update Contract</h1>
        <router-link
          :to="{ name: 'ContractList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateContract">
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
            <label>Duration</label>
            <input type="text" class="form-control" v-model="item.duration" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Location</label>
            <input type="text" class="form-control" v-model="item.location" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Salary</label>
            <input type="text" class="form-control" v-model="item.salary" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Description</label>
            <vue-editor v-model="item.description"></vue-editor>
          </div>
        </div>
      </div>
      <div class="form-inline mb-2" v-for="(item, index) in item.properties" :key="item.properties">
        <div class="form-group">
          <input type="text" class="form-control mr-2" v-model="item.label" placeholder="Property">
          <input type="text" class="form-control mr-2" v-model="item.value" placeholder="Value">
          <a class="btn btn-warning text-white" v-on:click="deleteProperty(index)">Delete</a>
        </div>
        <br />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
        <a class="btn btn-secondary ml-1 text-white" v-on:click="addProperty">Add Property</a>
      </div>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      item: {
        properties: []
      }
    };
  },

  components: {
    VueEditor
  },

  created: function() {
    this.getContract();
  },

  methods: {
    getContract() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/contracts/" + this.$route.params.id;
      this.axios.get(uri, auth).then(response => {
        this.item = response.data;
      }).catch(function () {
        router.push("/SignIn");
      });
    },
    addProperty() {
      this.item.properties.push({
        label: "",
        value: ""
      });
    },
    deleteProperty(index) {
      this.item.properties.splice(index, 1);
    },
    updateContract() {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const router = this.$router;
      let uri = "http://localhost:4000/api/contracts/" + this.$route.params.id;
      this.axios.put(uri, this.item, auth).then(() => {
        this.$router.push({ name: "ContractList" });
      }).catch(function () {
        router.push("/SignIn");
      });
    }
  }
};
</script>
