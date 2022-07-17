<template>
  <div class="container mt-3" >
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Contato Manager
          <router-link to="/contato/add" class="btn btn-success bt-sm">
            <i class="fa fa-plus-circle"></i> Novo</router-link>
        </p>
        <p class="fst-italic">Mais uma noite como todas as anteriores. Pego minha caneca de café cheia, acendo meu ultimo cigarro e corro pra velha janela do quarto. Observo a noite fria e chuvosa, até parece confortável por um momento, se não fossem as dezenas de preocupações que me desmotivam a cada dia.</p>
        <form action="" class="form">
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" name="nome" id="nome" class="form-control" placeholder="Pesquisar por Nome"/>
                </div>
              </div>
            </div>
            <div class="col">
              <input type="submit" class="btn btn-outline-dark" value="Enviar">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Espaço do loading-->
 <div v-if="loading">
   <div class="container">
    <div class="row">
      <div class="col">
        <SpinnerComponent/>
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

  <div class="container mt-3" v-if="contatos.length > 0">
    <div class="row">
      <div class="col-md-6" v-for="contato of contatos" :key="contato">
        <div class="card my-2 list-group-item-success shadow-lg" >
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img :src="contato.foto" alt="icon user" class="contact-img">
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item">Nome: <span class="fw-bold">{{contato.nome}}</span></li>
                  <li class="list-group-item">Email: <span class="fw-bold">{{contato.email}}</span></li>
                  <li class="list-group-item">Celular: <span class="fw-bold">{{contato.celular}}</span></li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column jusify-content-center align-items-center">
                <router-link :to="`/contato/view/${contato.id}`" class="btn btn-warning my-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="`/contato/edit/${contato.id}`" class="btn btn-primary my-1">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button class="btn btn-danger my-1" @click="clickDeleteContato(contato.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Contato } from '@/services/Contato';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
export default{
        name: "ContatoManager",
        components: {SpinnerComponent},
        data: function(){
          return{
            loading: false,
            contatos: [],
            errorMessage: null
          }
        },
        created: async function (){
          try{
              this.loading = true;
              let response = await Contato.getAllContatos();
              this.contatos = response.data;
              this.loading = false;
          }
          catch(error){
            this.errorMessage = error;
            this.loading = false;
          }
        },
        methods: {
            getAllContatosData: async function (){
            return await Contato.getAllContatos();
          },
          clickDeleteContato: async function (ContatoId){
            try{
              this.loading = true;
              let response = await Contato.deleteContato(ContatoId);
              if(response){
              
              let response = await Contato.getAllContatos();
              this.contatos = response.data;
              this.loading = false;
              }
            }
            catch (error){
              this.errorMessage = error;
              this.loading = false;
            }
          }
        }
    }
</script>
<style scoped>

</style>
