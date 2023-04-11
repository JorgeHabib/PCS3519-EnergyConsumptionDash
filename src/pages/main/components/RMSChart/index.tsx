import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Box as Box2 } from '@/components/Box'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const RMSChart = () => {
  const { content } = useAuth()

  const kwhA = content.map((item) => {
    return {
      x: item.created_at,
      y: item.PA
    }
  })
  const kwhB = content.map((item) => {
    return {
      x: item.created_at,
      y: item.PB
    }
  })
  const kwhC = content.map((item) => {
    return {
      x: item.created_at,
      y: item.PC
    }
  })

  return (
    <Box2 css={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Potência</Text>
      <Box2 css={{ flex: 1 }}>
        <Chart 
          height={'100%'}
          width={'100%'}
          type="line"
          options={{
            chart: {
              id: 'realtime2',
              type: 'line',
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
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false,
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime'
            }
          }}
          series={[
            {
              name: 'Potência em A',
              data: kwhA
            },
            {
              name: 'Potência em B',
              data: kwhB
            },
            {
              name: 'Potência em C',
              data: kwhC
            }
          ]}
        />
      </Box2>
    </Box2>
  )
}