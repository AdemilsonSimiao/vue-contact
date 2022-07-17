<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Editar Contato</p>
        <p class="fst-italic">Penso em você, mesmo sabendo o quão longe está de mim, sinto aquele amor que continua a me desgraçar intensamente a cada dia, e penso quando enfim poderei te ter comigo. Sei lá, o café chega ao fim e trago a ultima ponta, nada muda. É como se eu fosse passar por isso mais uns longos anos a frente.</p>
      </div>
    </div>
  </div>

<!--Espaço do loading-->
 <div v-if="loading">
   <div class="container">
    <div class="row">
      <div class="col">
        <spinner-component/>
      </div>
    </div>
  </div>
 </div>

 <!--Espaço da mensagem de Erro-->
 <div v-if="!loading && errorMessage">
   <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-danger fw-bold">{{errorMessage}}</p>
      </div>
    </div>
  </div>
 </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form action="" class="form" @submit.prevent="submitUpdate()">
          <div class="mb-2">
            <input v-model="contato.nome" type="text" name="nome" id="nome" class="form-control" placeholder="Nome"/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.foto" type="text" name="foto" id="foto" class="form-control" placeholder="Foto URL"/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.email" type="email" name="email" id="email" class="form-control" placeholder="Email"/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.celular" type="number" name="celular" id="celular" class="form-control" placeholder="Celular"/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.company" type="text" name="company" id="company" class="form-control" placeholder="Company"/>              
          </div>
          <div class="mb-2">
            <input v-model="contato.titulo" type="text" name="titulo" id="titulo" class="form-control" placeholder="Titulo"/>              
          </div>
          <select v-model="contato.grupoId"  class="form-control" v-if="grupos.length > 0">
            <option value="">Selecionar Grupo</option>
            <option :value="grupo.id" v-for="grupo of grupos" :key="grupo.id">{{grupo.nome}}</option>   
          </select>
          <div class="mt-2">
            <input type="submit" class="btn btn-success" value="Atualizar"/>
          </div>
        </form>        
      </div>
        <div class="col-sm-4">
          <img :src="contato.foto" alt="icon user" class="contact-img">
        </div>
    </div>
  </div>
</template>
<script>
import { Contato } from '@/services/Contato';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

export default{
    name: "EditContato",
    components: { SpinnerComponent },
    data: function () {
        return {
            contatoId: this.$route.params.contatoId,
            loading: false,
            contato: {
               nome: "",
              company: "",
              email: "",
              titulo: "",
              celular: "",
              foto: "",
              grupoId: ""
            },
            errorMessage: null,
            grupos: []
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await Contato.getContato(this.contatoId);
            let grupoResponse = await Contato.getAllGrupos(response.data);
            this.contato = response.data;
            this.grupos = grupoResponse.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
     submitUpdate: async function(){
            try{
              let response = await Contato.updateContato(this.contato, this.contatoId);
              if(response){
                return this.$router.push('/');
              }else{
                return this.$router.push(`/contatos/edit/${this.contatoId}`);
              }
            }
            catch(error){
              console.log(error);
            }
          }
    }
}
</script>
<style scoped>

</style>
