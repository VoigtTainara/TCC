<template>
  <div>
    <titulo texto="Funcionários"/>
    <br>
    <input type="text" placeholder="Nome do Funcionario" v-model="nome" v-on:keyup.enter="addFuncionario()">
    <button class="btn btnInput">Inserir</button> 
    <table>
      <thead>
        <th>Matricula</th>
        <th>Nome</th>
        <th>Opcoes</th>
      </thead>
      <tbody v-if="funcionarios.length">
        <tr v-for="(funcionario,index) in funcionarios" :key="index">
          <td>{{funcionario.id}}</td>
          <td>{{funcionario.nome}} {{funcionario.sobrenome}}</td>
          <td>
            <button class="btn" @click="remover(funcionario)">Remover</button>
          </td>
        </tr> 
      </tbody>
      <tfoot v-else>
          Nenhum aluno encontrado!
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
      titulo: "Funcionarios",
      nome: "",
      funcionarios: []
    }; 
  },
  created(){
	  this.$http
	  .get('http://localhost:3000/funcionarios')
	  .then(res => res.json())
	  .then(funcionarios => this.funcionarios = funcionarios)
  },
  props: {},
  methods:{
    addFuncionario(){
      let _funcionario={
        nome: this.nome,
        sobrenome: ""
      }

      this.$http
	      .post('http://localhost:3000/funcionarios', _funcionario)
        .then(res => res.json())
        .then(funcionarioRetornado =>{
            this.funcionarios.push(funcionarioRetornado);
            this.nome="";
        });


      console.log("-----")
      this.funcionarios.foreach(funcionario => {
          console.log(funcionario);
      });
    },
    remover(funcionario){

      this.$http
        .delete(`http://localhost:3000/funcionarios/${funcionario.id}`)
        .then(() =>{
            let indice = this.funcionarios.indexOf(funcionario);
            this.funcionarios.splice(indice, 1);
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
