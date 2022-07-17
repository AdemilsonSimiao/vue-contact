<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Adicionar Contato</p>
        <p class="fst-italic">Penso em você, mesmo sabendo o quão longe está de mim, sinto aquele amor que continua a me desgraçar intensamente a cada dia, e penso quando enfim poderei te ter comigo. Sei lá, o café chega ao fim e trago a ultima ponta, nada muda. É como se eu fosse passar por isso mais uns longos anos a frente.</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form action="" class="form" @submit.prevent="submitCreate()">
          <div class="mb-2">
            <input v-model="contato.nome" type="text" name="nome" id="nome" class="form-control" placeholder="Nome" required/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.foto" type="text" name="foto" id="foto" class="form-control" placeholder="Foto URL" required/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.email" type="email" name="email" id="email" class="form-control" placeholder="Email" required/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.celular" type="number" name="celular" id="celular" class="form-control" placeholder="Celular" required/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.company" type="text" name="company" id="company" class="form-control" placeholder="Company" required/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.titulo" type="text" name="titulo" id="titulo" class="form-control" placeholder="Titulo" required/>              
          </div>
          <select v-model="contato.grupoId"  class="form-control" v-if="grupos.length > 0" required>
            <option value="">Selecionar Grupo</option>
            <option :value="grupo.id" v-for="grupo of grupos" :key="grupo.id">{{grupo.nome}}</option>   
          </select>
          <div class="mt-2">
            <input type="submit" class="btn btn-success" value="Adicionar"/>
          </div>
        </form>        
      </div>
        <div class="col-sm-4">
          <img :src="contato.foto" alt="" class="contact-img">
        </div>
    </div>
  </div>
</template>
<script>
import { Contato } from '@/services/Contato'
    export default{
        name: "AddContato",
        data: function(){
          return {
            contato:{
              nome: "",
              company: "",
              email: "",
              titulo: "",
              celular: "",
              foto: "",
              grupoId: ""
            },
            grupos:[]
          }
        },
        created: async function(){
          try{
            let response = await Contato.getAllGrupos();
            this.grupos = response.data;
          }
          catch(error){
            console.log(error);
          }
        },
        methods: {
          submitCreate: async function(){
            try{
              let response = await Contato.createContato(this.contato);
              if(response){
                return this.$router.push('/');
              }else{
                return this.$router.push('/contatos/add');
              }
            }
            catch(error){
              console.log(error)
            }
          }
        }
    }
</script>
<style scoped>

</style>
