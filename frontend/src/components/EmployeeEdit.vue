<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Edit Employees</h1>
        <router-link
          :to="{ name: 'EmployeeList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateEmployee">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Contract:</label>
            <select v-model="item.contract" class="form-control">
              <option value>No contract</option>
              <option
                v-for="option in options"
                v-bind:value="option._id"
                :key="option._id"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Init Date:</label>
            <input type="date" class="form-control" v-model="item.initdate" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Experiences:</label>
            <textarea class="form-control" v-model="item.experiences"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Education:</label>
            <textarea class="form-control" v-model="item.education"></textarea>
          </div>
        </div>
      </div>
      <div class="form-inline mb-2" v-for="(item, index) in item.properties" :key="item.properties">
        <div class="form-group">
          <input type="text" class="form-control mr-2" v-model="item.label" placeholder="Property" />
          <input type="text" class="form-control mr-2" v-model="item.value" placeholder="Value" />
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
export default {
  data() {
    return {
      item: {
        properties: []
      },
      contract: {},
      options: []
    };
  },

  created: function() {
    this.getEmployee();
    this.fetchContracts();
  },
  methods: {
    fetchContracts() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/contracts";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.options = response.data;
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    getEmployee() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users/" + this.$route.params.id;
      this.axios
        .get(uri, auth)
        .then(response => {
          this.item = response.data;
        })
        .catch(function() {
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
    updateEmployee() {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const router = this.$router;
      let uri = "http://localhost:4000/api/users/" + this.$route.params.id;
      this.axios
        .put(uri, this.item, auth)
        .then(() => {
          this.getContract();
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    getContract() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/contracts/" + this.item.contract;
      this.axios
        .get(uri, auth)
        .then(response => {
          this.contract = response.data;
          this.contract.assignedto = this.$route.params.id;
          this.updateContract();
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    updateContract() {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const router = this.$router;
      this.options.forEach(element => {
        let uri = "http://localhost:4000/api/contracts/" + element._id;
        if (element.assignedto === this.$route.params.id) {
          element.assignedto = "";
          this.axios
            .put(uri, element, auth)
            .then(() => {
              this.$router.push({ name: "EmployeeList" });
            })
            .catch(function() {
              router.push("/SignIn");
            });
        }
      });
      if (this.item.contract !== "") {
        let uri = "http://localhost:4000/api/contracts/" + this.item.contract;
        this.axios
          .put(uri, this.contract, auth)
          .then(() => {
            this.$router.push({ name: "EmployeeList" });
          })
          .catch(function() {
            router.push("/SignIn");
          });
      } else {
        this.$router.push({ name: "EmployeeList" });
      }
    }
  }
};
</script>
