import { server } from "./server.js"
const form = document.querySelector("#form");
const url = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder")
  const VideoURL = url.value
  
  if(!VideoURL.includes("shorts")){
    return content.textContent = "Esse vídeo não parece ser um short."
  }
  const [_, params] =  VideoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  content.textContent = ("Obtendo o texto do áudio...")

  const transcription = await server.get("/summary/" + videoID)

 content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
   text: transcription.data.result,
  })

 content.textContent = summary.data.result
 content.classList.remove("placeholder")

})