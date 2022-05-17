import { Card, CardContent, Typography } from "@mui/material"
import React from "react"

export interface IQuery {
  question: string
  response: string
  id: number
}

interface ResponseCardProps {
  query: IQuery
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ query }) => {
  const { question, response } = query
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Question: {question}</Typography>
        <Typography variant='h6'>Response: {response}</Typography>
      </CardContent>
    </Card>
  )
}
