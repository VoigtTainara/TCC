<template>
  <div>
    <titulo texto="Setores"/>
    <br>
    <input type="text" placeholder="Nome do setor" v-model="nome" v-on:keyup.enter="addSetor()">
    <button class="btn btnInput">Inserir</button> 
    <table>
      <thead>
        <th>Código</th>
        <th>Nome</th>
        <th>Quant. Funcionários</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="setores.length">
        <tr v-for="(setores,index) in setores" :key="index">
          <td>{{setores.id}}</td>
          <td>{{setores.nome}}</td>
          <td>{{setores.quantidadefuncionarios}}</td>
          <td>
            <button class="btn" @click="remover(setor)">Remover</button>
          </td>
        </tr> 
      </tbody>
      <tfoot v-else>
          Nenhum setor encontrado!
      </tfoot>  
    </table>    
  </div>
</template>

<script>
import Titulo from '../_share/Titulo.vue';


export default {
 components: {
  Titulo
 }, 
 data(){
    return{
      titulo: "Setores",
      nome: "",
      setores: []
    }; 
  },
  created(){
	  this.$http
	  .get('http://localhost:3000/setores')
	  .then(res => res.json())
	  .then(setores => this.setores = setores)
  },
  props: {},
  methods:{
    addSetor(){
      let _setor={
        nome: this.nome,
        sobrenome: ""
      }

      this.$http
	      .post('http://localhost:3000/setores', _setor)
        .then(res => res.json())
        .then(setorRetornado =>{
            this.setores.push(setorRetornado);
            this.nome="";
        });


      console.log("-----")
      this.setores.foreach(setor => {
          console.log(setor);
      });
    },
    remover(setor){

      this.$http
        .delete(`http://localhost:3000/setores/${setor.id}`)
        .then(() =>{
            let indice = this.setores.indexOf(setor);
            this.setores.splice(indice, 1);
        });  
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 400px;
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color:#687f7f;
  display:inline;
}
.btnInput{
  width: 150px;
  border:0;
  padding:20px;
  font-size: 1.3em;
}
</style>
