<template>
  <div class="container">
    <h3>Nova Editora</h3>

    <div class="form">
      <md-field>
        <label for="title" class="float-left">Nome da editora</label>
        <md-input type="text" v-model="name" placeholder="Editora" />
      </md-field>
    </div>

    <md-button v-on:click="submit" class="submit">Cadastrar</md-button>
  </div>
</template>
<script>
import Vue from "vue";
import router from "./../routes";
import { MdCard, MdButton, MdField } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import CriptoService from "../services/CriptoService";

Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdField);

export default {
  name: "FormTransaction",
  data: () => ({
    name: "",
  }),
  methods: {
    navigationBack() {
      router.push("/");
    },

    buildTransaction() {
      return {
        name: this.name
      };
    },
    submit() {
      let transaction = this.buildTransaction();
      CriptoService.creat(transaction)
        .then((response) => {
          this.navigationBack();
          console.log(response);
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
<style scoped>
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  width: 20vw;
}

.submit {
  width: 5vw;
  background-color: #2a9d8f;
  color: #ffffff;
}

h3 {
  color: #2a9d8f;
}
</style>