<template>
  <historicoFalas :historico_falas="historico"/>
  <div class="div-container">
    <section class="container">
      <div class="container-texto">
        <p class="texto-capturado" v-if="transcript">{{ transcript }}</p>
        <div v-if="transcript" id="copy" class="div-copiar-texto" @click="copiarText">
          <img src="/assets/img/copy.png" alt="copiar texto">
          <span class="span-copiado none">Copiado</span>
        </div>
        <div class="container-inicio" v-else>
          <p>Olá, vamos lá...</p>
          <img src="/assets/img/falarbrancogrande.png" alt="incio">
        </div>
      </div>
      <div class="container-botoes">
        <button @click="startRecording"
                title="clique aqui para iniciar captura de voz">
          Iniciar captura
          <img class="img-botoes" src="/assets/img/falarbranco.png">
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
</template>

<script>
export default {
  name: 'DashboardCap',
  data() {
    return {
      transcript: "",
      recognition: null,
      isRecording: false,
      historico: []
    };
  },
  methods: {
    startRecording() {
      const clicado = document.querySelector('button')
      const pulsacao = document.querySelector('.container-inicio img')
      clicado.style.background = 'darkgreen'
      clicado.style.border = '3px solid darkgreen'
      pulsacao.style.animation = '1s pulsacao infinite'

      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = event => {
        let interimTranscript = "capturando audio....";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (!event.results[i].isFinal) {
            interimTranscript;
          } else {
            clicado.style.background = 'black'
            clicado.style.border = '3px solid #444654'
            pulsacao.style.animation = 'none'
            this.transcript += ' ' + transcript + ', ';
            this.push({
              historico: this.transcript
            })
          }
        }
      };
      this.recognition.start();
      this.isRecording = true;
    },
    pauseRecording() {
      this.recognition.stop();
      this.isRecording = false;
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
      const input = document.createElement('input');
      input.setAttribute('value', this.transcript);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      let spanCp = document.querySelector('.span-copiado')
      spanCp.classList.remove('none')

      setInterval(()=> {
        spanCp.classList.add('none')
      }, 3000)

    }
  }
};
</script>