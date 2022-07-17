<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Visualizar Contato</p>
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

  <div class="container mt-3" v-if="!loading && isDone()">
    <div class="row align-items-center">
      <div class="col-sm-4">
        <img :src="contato.foto" alt="icon user" class="contact-img-big">
      </div>
        <div class="col-sm-7">
          <ul class="list-group">
            <li class="list-group-item">Nome: <span class="fw-bold">{{contato.nome}}</span></li>
            <li class="list-group-item">Email: <span class="fw-bold">{{contato.email}}</span></li>
            <li class="list-group-item">Celular: <span class="fw-bold">{{contato.celular}}</span></li>
            <li class="list-group-item">Company: <span class="fw-bold">{{contato.company}}</span></li>
            <li class="list-group-item">Titulo: <span class="fw-bold">{{contato.titulo}}</span></li>
            <li class="list-group-item">Grupo: <span class="fw-bold">{{contato.grupoId}}</span></li>
          </ul>
        </div>
    </div>
    <div class="row  mt-3">
      <div class="col">
        <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Voltar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Contato } from '@/services/Contato';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

export default{
    name: "ViewContato",
    components: { SpinnerComponent },
    data: function () {
        return {
            contatoId: this.$route.params.contatoId,
            loading: false,
            contato: {},
            errorMessage: null,
            grupo: {}
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await Contato.getContato(this.contatoId);
            let grupoResponse = await Contato.getGrupo(response.data);
            this.contato = response.data;
            this.grupo = grupoResponse.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
      isDone: function(){
        return Object.keys(this.contato).length > 0 && Object.keys(this.grupo).length > 0;
      }
    }
}
</script>
<style scoped>

</style>
