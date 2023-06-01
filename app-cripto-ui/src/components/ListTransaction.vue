<template>
  <div class="background">
    <div class="container" v-if="listTransaction.length > 0">
      <v-table class="table">
        <thead>
          <tr>
            <th class="text-left">
              Nome
            </th>
            <th class="text-left">
              Quantidade
            </th>
            <th class="text-left">
              Preço de compra
            </th>
            <th class="text-left">
              Preço de venda
            </th>
            <th class="text-left">
              Data
            </th>
            <th class="text-left">
              Tipo de ação
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in desserts"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
        <v-table-toolbar>
          <h1 class="v-title">Editoras</h1>
        </v-table-toolbar>

        <v-table-row slot="v-table-row" slot-scope="{ item }">
          <v-table-cell v-label="Código" v-sort-by="id" v-numeric>{{
            item.id
          }}</v-table-cell>
          <v-table-cell
            v-label="Nome da Editora"
            v-sort-by="id"
            v-numeric
            >{{ item.name }}</v-table-cell
          >
        </v-table-row>
      </v-table>
    </div>
    <div class="addCompany">
      <div class="alert" v-if="listTransaction.length == 0">
        <p>Nenhuma editora cadastrada no sistema!</p>
      </div>
      <v-button class="add" v-on:click="navigateFormTransaction"
        >Adicionar</v-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "./../routes";
import CriptoService from "../services/CriptoService";

export default {
  name: "ListTransaction",
  data: () => ({
    listTransaction: [],
  }),
  methods: {
    navigateFormTransaction() {
      router.push("form-transaction");
    },
    getAll() {
      CriptoService.getTransactions()
        .then((response) => {
          console.log(response);

          let newListTransaction = response.data;
          this.listTransaction = newListTransaction;
        })
        .catch((error) => console.error(error));
    },
  },
  run() {
    this.getAll();
  },
};
</script>

<style scoped>
.table {
  width: 35vw;
  text-align: center;
}
.background {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2vw;
}

.add {
  margin-top: 1vw;
  color: #ffffff;
  background-color: #2a9d8f;
  font-family: cursive;
  font-size: 0.8vw;
}

.addCompany {
  display: flex;
  align-items: baseline;
  height: 15vh;
}

.alert {
  background-color: #2a9d8f;
  border-radius: 0.5vw;
  margin: 1vw;
}

p {
  padding: 0.3vw;
  color: #ffffff;
  font-size: 0.8vw;
  font-family: inherit;
}
</style>