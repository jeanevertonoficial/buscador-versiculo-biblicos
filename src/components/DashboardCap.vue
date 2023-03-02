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
            <img src="/assets/img/falarbrancogrande.png" alt="incio">
          </div>
        </div>
        <div class="container-botoes">
          <button @click="startRecording"
                  :style="!isRecording ? 'capturando audio...' : 'background:darkgreen;'"
                  :title="isRecording ? 'capturando audio...' : 'clique aqui para iniciar captura de voz'">
            {{ isRecording ? 'Capturando...' : 'Iniciar captura' }}
            <img v-if="isRecording" class="img-botoes" src="/assets/img/falarbranco.png">
            <img v-else class="img-botoes" src="/assets/img/toque.png">
          </button>
          <button @click="pauseRecording" title="clique aqui para pausa captura">
            Pause
            <img class="img-botoes" src="/assets/img/pausabranco.png">
          </button>
          <button @click="resumeRecording" title="clique aqui para voltar a captura">
            Resume
            <img class="img-botoes" src="/assets/img/continuobranco.png">
          </button>
          <button @click="stopRecording" title="clique aqui para apagar texto">
            Apagar
            <img class="img-botoes" src="/assets/img/lixobranco.png">
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import HistoricoFalas from "@/components/HistoricoFalas";
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

      const clicado = document.querySelector('button')
      const pulsacao = document.querySelector('.container-inicio img')

      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = event => {
        let interimTranscript = "capturando audio....";
        this.transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (!event.results[i].isFinal) {
            interimTranscript;
          } else {
            clicado.style.background = 'black'
            clicado.style.border = '3px solid #444654'
            pulsacao.style.animation = 'none'
            this.transcript += ' ' + transcript;
            this.historico.push(transcript)
            localStorage.setItem(this.transcript += transcript, transcript)
          }
        }
      };
      this.recognition.start();
      this.isRecording = true;
    },
    pauseRecording() {
      this.recognition.stop();
      this.isRecording = false;
      this.historico.push(this.transcript)
    },
    resumeRecording() {
      this.recognition.start();
      this.isRecording = true;
    },
    stopRecording() {
      this.recognition.stop();
      this.isRecording = false;
      this.transcript = "";
    },
    copiarText() {
      copiarTextoDialogo(this.transcript)
    }
  }
};
</script>