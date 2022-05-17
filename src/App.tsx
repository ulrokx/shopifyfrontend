import { FC } from "react"
import { styled } from "@mui/material"

import Header from "@/header"
import { AIAPP } from "./components/AIAPP"

const App: FC = () => {
  return (
    <Root>
      <Header />
      <AIAPP />
    </Root>
  )
}

const Root = styled("div")`
  padding: 5% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  & a {
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`

export default App
