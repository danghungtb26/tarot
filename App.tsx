import React from 'react'
import { Box } from '@rn-base/element'
import TarotScreen from '@features/Tarot'

type AppProps = {}

const App: React.FC<AppProps> = () => {
  return (
    <Box flex={1} color="gray">
      <TarotScreen />
    </Box>
  )
}

export default App
