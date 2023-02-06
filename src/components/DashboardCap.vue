<template>
  <div class="container">
    <div class="container-texto">
      <p v-if="transcript">{{ transcript }}</p>
    </div>
    <div class="container-botoes">
      <button @click="startRecording">Start Recording</button>
      <button @click="pauseRecording">Pause</button>
      <button @click="resumeRecording">Resume</button>
      <button @click="stopRecording">Stop</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCap',
  data() {
    return {
      transcript: "",
      recognition: null,
      isRecording: false
    };
  },
  methods: {
    startRecording() {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = event => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.transcript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        this.transcript += interimTranscript;
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
    }
  }
};
</script>
<style>
main, body, html {
  padding: 0px;
  margin: 0px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

html {
  background: #343541;
}

.container {
  max-width: 750px;
  margin: auto;
}
.container-texto {
  margin: 10px;
    height: 400px;
    border-radius: 12px;
    padding: 25px;
    text-align: left;
    background: #444654;
    box-shadow: -8px 20px 20px 0px #0000004a;
    overflow: auto;
    
}

.container-texto p {
  color: #d1d5db;
}

.container-botoes {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
}

.container-botoes button {
    padding: 10px 25px;
    background: black;
    color: white;
    border-radius: 24px;
    box-shadow: -2px 0px 20px 0px #373737;
    border: 3px solid #444654;
}
.container-botoes button{
  cursor: pointer;
}
.container-botoes button:nth-child(4) {
  cursor: no-drop;
}
</style>