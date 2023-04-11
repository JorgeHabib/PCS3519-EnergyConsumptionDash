import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Box as Box2 } from '@/components/Box'
import { Flex } from "@/components";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TreeFaseInfo = () => {
  const { content } = useAuth()

  const kwhA = content.map((item) => {
    return {
      x: item.created_at,
      y: item.VARMS,
      fillColor: '#127EF8',
    }
  })
  const kwhB = content.map((item) => {
    return {
      x: item.created_at,
      y: item.VBRMS,
      fillColor: '#FF557D',
    }
  })
  const kwhC = content.map((item) => {
    return {
      x: item.created_at,
      y: item.VCRMS,
      fillColor: '#51F47E',
    }
  })
  
  const LAST_ITEMS_LENGTH = 7

  const lastKwhC = kwhC.slice(-1 * LAST_ITEMS_LENGTH)
  const lastKwhB = kwhB.slice(-1 * LAST_ITEMS_LENGTH)
  const lastKwhA = kwhA.slice(-1 * LAST_ITEMS_LENGTH)

  const lastKwhCItem = lastKwhC[lastKwhC.length - 1]
  const lastKwhBItem = lastKwhB[lastKwhB.length - 1]
  const lastKwhAItem = lastKwhA[lastKwhA.length - 1]

  return (
    <Box2 css={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Tensão (RMS)</Text>
      <Flex css={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Flex css={{ flexDirection: 'column', alignItems: 'flex-end', marginBottom: 4 }}>
          <Flex css={{ alignItems: 'center' }}>
            <Box2 
              css={{
                marginRight: 4,
                height: 8,
                width: 8,
                borderRadius: 888,
                backgroundColor: '#127EF8',
              }}
            />
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>Tensão em A (RMS)</Text>
          </Flex>
          <Flex css={{ alignItems: 'flex-end' }}>
            <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{lastKwhAItem?.y || ''}</Text>
            <Text variant={"caption"}>V</Text>
          </Flex>
        </Flex>
        <Flex css={{ flexDirection: 'column', alignItems: 'flex-end', marginBottom: 4 }}>
          <Flex css={{ alignItems: 'center' }}>
            <Box2 
              css={{
                marginRight: 4,
                height: 8,
                width: 8,
                borderRadius: 888,
                backgroundColor: '#FF557D',
              }}
            />
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>Tensão em B (RMS)</Text>
          </Flex>
          <Flex css={{ alignItems: 'flex-end' }}>
            <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{lastKwhBItem?.y || ''}</Text>
            <Text variant={"caption"}>V</Text>
          </Flex>
        </Flex>
        <Flex css={{ flexDirection: 'column', alignItems: 'flex-end', marginBottom: 4 }}>
          <Flex css={{ alignItems: 'center' }}>
            <Box2 
              css={{
                marginRight: 4,
                height: 8,
                width: 8,
                borderRadius: 888,
                backgroundColor: '#51F47E',
              }}
            />
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>Tensão em C (RMS)</Text>
          </Flex>
          <Flex css={{ alignItems: 'flex-end' }}>
            <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{lastKwhCItem?.y || ''}</Text>
            <Text variant={"caption"}>V</Text>
          </Flex>
        </Flex>
      </Flex>
      <Box2 css={{ 
        flex: 1,
      }}>
        <Chart 
          height={'100%'}
          width={'100%'}
          type="bar"
          options={{
            chart: {
              type: 'bar',
              zoom: {
                enabled: false
              },
              animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  speed: 1000
                }
              },
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            yaxis: {
              labels: {
                formatter: function (y) {
                  return y.toFixed(0) + "V";
                }
              }
            },
            xaxis: {
              type: 'datetime'
            }
          }}
          series={[
            {
              name: 'Corrente (A)',
              data: lastKwhA
            },
            {
              name: 'Corrente (B)',
              data: lastKwhB
            },
            {
              name: 'Corrente (C)',
              data: lastKwhC
            }
          ]}
        />
      </Box2>
    </Box2>
  )
}