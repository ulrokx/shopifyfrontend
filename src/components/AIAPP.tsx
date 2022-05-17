import { useLocalStorage } from "@caldwell619/react-hooks"
import { Box, Button, Grid, Slider, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { IQuery, ResponseCard } from "./ResponseCard"

// only doing this for the demo, production code would hit backend which would use API key
const SECRET_KEY = "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"

export const AIAPP = () => {
  const [storage, setStorage] = useLocalStorage<Array<IQuery>>("queries", [])
  const [queries, setQueries] = useState<Array<IQuery>>(storage)
  const [prompt, setPrompt] = useState("")
  const [temperature, setTemperature] = useState(1)
  useEffect(() => {
    setQueries(storage)
  }, [storage])

  const handleQuery = async () => {
    const input = prompt.trim()
    setPrompt("")
    const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET_KEY}`
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 512,
        temperature
      }),
      method: "POST"
    })
    const data = await response.json()
    console.log(data)
    const newQueries = [...queries, { question: input, response: data.choices[0].text, id: data.created }]
    setStorage(newQueries)
  }
  return (
    <Stack
      flexDirection='column'
      sx={{
        width: "100%",
        maxWidth: "clamp(600px, 100vw, 800px)",
        marginTop: "clamp(0, 0, 100px)"
      }}
    >
      <Stack spacing={2} justifyContent='center' alignItems='center'>
        <Typography variant='h1'>Fun with OpenAI</Typography>
        <TextField
          fullWidth
          variant='filled'
          rows={4}
          label='Enter a prompt for OpenAI to respond to'
          multiline={true}
          onChange={e => {
            setPrompt(e.target.value)
          }}
          value={prompt}
        />
        <Grid container spacing={2}>
          <Grid item xs={3} textAlign='center'>
            <Typography variant='h6'>Temperature:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Slider
              onChange={e => setTemperature(Number((e.target as HTMLInputElement).value))}
              aria-label='temperature'
              step={0.1}
              min={0}
              max={1}
              value={temperature}
              valueLabelDisplay='auto'
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleQuery} variant='contained' sx={{ height: "100%", width: "100%" }} size='medium'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h2'>Responses:</Typography>
        <Button onClick={() => setStorage([])} variant='contained' sx={{ height: "fit-content" }} color='warning'>
          Clear Responses
        </Button>
      </Box>
      <Stack spacing={2} direction='column-reverse'>
        {queries.map(query => (
          <ResponseCard query={query} key={query.id} />
        ))}
      </Stack>
    </Stack>
  )
}
