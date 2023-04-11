import { Box, styled } from "@punto-ui/react"
import { Flex } from "@/components"

import { RMSChart } from "./components/RMSChart"
import { Usage } from "./components/Usage"
import { EnergyPrice } from "./components/EnergyPrice"
import { TreeFaseInfo } from "./components/TreeFaseInfos"
import { TreeCurrentInfos } from "./components/TreeCurrentInfos"
import { Frequency } from "./components/Frequency"
import { PowerAppearence } from "./components/PowerApearence"
import { PotencyFactor } from "./components/PotencyFactor"

const Main = () => {
  return (
    <Container>
      <Flex css={{ justifyContent: 'space-between', height: '40%' }}>
        <Box css={{ width: '48%', marginRight: 16 }}>
          <TreeFaseInfo />
        </Box>
        <Box css={{ flex: 1 }}>
          <TreeCurrentInfos />
        </Box>
      </Flex>
      <Flex css={{ justifyContent: 'space-between', flex: 1, marginTop: 16, marginBottom: 16 }}>
        <Box css={{ width: '48%' }}>
          <RMSChart />
        </Box>
        <Box css={{ flex: 1, marginLeft: 16 }}>
          <Usage />
        </Box>
      </Flex>
      <Flex css={{ justifyContent: 'space-between', height: '30%', gap: 16 }}>
        <Box css={{ flex: 1 }}>
          <Frequency />
        </Box>
        <Box css={{ flex: 1 }}>
          <PowerAppearence />
        </Box>
        <Box css={{ padding: 0, flex: 1 }}>
          <EnergyPrice />
        </Box>
        <Box css={{ flex: 1 }}>
          <PotencyFactor />
        </Box>
      </Flex>
    </Container>
  )
}

const Container = styled('div', {
  backgroundColor: '$interface_dark_down', 
  borderRadius: 0, 
  minHeight: '100vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  padding: 24,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& div': {

  }
})

export default Main