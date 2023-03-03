<template>
  <div class="container-base-geral">
    <HistoricoFalas
        :historico_falas="historico"/>
    <div class="div-container">
      <section class="container">
        <div class="container-texto">
          <p class="texto-capturado" v-if="transcript">
            {{ isRecording ? 'Capturando...' : transcript }}
          </p>
          <div v-if="transcript" id="copy" class="div-copiar-texto" @click="copiarText">
            <img src="/assets/img/copy.png" alt="copiar texto">
            <span class="span-copiado none">Copiado</span>
          </div>
          <div class="container-inicio" v-else>
            <p>{{ isRecording ? 'Capturando...' : 'Olá, vamos lá...' }}</p>

            <img v-if="isRecording" src="/assets/img/ondas-de-audio.png" class="img-falando" alt="imagem falando">
            <img v-else src="/assets/img/toquegrande.png" style="border-radius: 33px;" alt="imagem de play">
          </div>
        </div>
        <div class="container-botoes">
          <button @click="startRecording"
                  :style="!isRecording ? 'capturando audio...' : 'background:darkgreen;'"
                  :title="isRecording ? 'capturando audio...' : 'clique aqui para iniciar captura de voz'">
            {{ isRecording ? 'Capturando...' : 'Iniciar captura' }}
            <img v-if="isRecording" class="img-botoes" src="/assets/img/falarbranco.png" alt="imagem falando">
            <img v-else class="img-botoes" src="/assets/img/toque.png" alt="imagem de play">
          </button>
          <button @click="pauseRecording" title="clique aqui para pausa captura">
            Pause
            <img class="img-botoes" src="/assets/img/pausabranco.png" alt="icone pause">
          </button>
          <button @click="resumeRecording" title="clique aqui para voltar a captura">
            Resume
            <img class="img-botoes" src="/assets/img/continuobranco.png" alt="icone resume">
          </button>
          <button @click="stopRecording" title="clique aqui para apagar texto">
            Apagar
            <img class="img-botoes" src="/assets/img/lixobranco.png" alt="icone excluir">
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import HistoricoFalas from "@/components/shared/HistoricoFalas.vue";
import copiarTextoDialogo from "@/controller/copiarTextoDialogos"

export default {
  name: 'DashboardCap',
  components: {HistoricoFalas},
  data() {
    return {
      transcript: "",
      recognition: null,
      isRecording: false,
      historico: [],
    };
  },
  methods: {
    startRecording() {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'pt-BR'
      this.recognition.onresult = event => {
        let interimTranscript = "capturando audio....";
        this.transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (!event.results[i].isFinal) {
            interimTranscript;
          } else {
            this.transcript += ' ' + transcript;
            this.historico.push(transcript)
            // localStorage.setItem(this.transcript += transcript, transcript)
          }
        }
      };
      this.recognition.start();
      this.isRecording = true;
      document.title = 'Capturando...'
    },
    pauseRecording() {
      this.recognition.stop();
      this.isRecording = false;
      document.title = 'Captura pausada'
    },
    resumeRecording() {
      this.recognition.start();
      this.isRecording = true;
      document.title = 'Captura Retomada'
    },
    stopRecording() {
      this.recognition.stop();
      this.isRecording = false;
      this.transcript = "";
      document.title = 'Excluindo capturas...'
      setTimeout(() => {
        document.title = 'VamosFalar'
      }, 3000)
    },
    copiarText() {
      copiarTextoDialogo(this.transcript)
    }
  }
};
</script>