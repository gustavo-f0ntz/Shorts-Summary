import cors from 'cors' // importar para dentro do projeto a biblioteca cors, e para especificar de onde ela vem

import express from 'express' // aqui o mesmo do comando acima

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const app = express()       // aqui estou pegando o express e colocando-o dentro de uma constante app para que eu consiga utilizá-lo.
app.use(express.json())
app.use(cors())

app.get('/summary/:id' , async (request, response) => {
  try{
  await download(request.params.id)
  const audioConverted = await convert()
  console.log(audioConverted)
  const result = await transcribe(audioConverted)

  return response.json({ result })
  } catch (error){
    console.log(error)
    return response.json({ error })

  }
}) 

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }

})


app.listen(3333, () => console.log("Server is running on port 3333")) 

