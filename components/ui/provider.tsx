"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { appSystem } from "./theme"
import { type ColorModeProviderProps } from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      {props.children}
    </ChakraProvider>
  )
}
