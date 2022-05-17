import { FC } from "react"
import { AppBar, Toolbar, Tooltip } from "@mui/material"

import DarkModeToggle from "./DarkModeToggle"
import { Info } from "@mui/icons-material"

const Header: FC = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <DarkModeToggle />
        <Tooltip sx={{marginLeft:"2rem"}} title="Made by Richard Kirk for Shopify Frontend Challenge 2022">
          <Info />
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default Header
