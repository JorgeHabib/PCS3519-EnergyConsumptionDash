import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Box as Box2 } from '@/components/Box'
import { Flex } from "@/components";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const PotencyFactor = () => {
  const { content } = useAuth()

  const kwhA = content.map((item) => {
    return {
      x: item.created_at,
      y: item.FPT,
      fillColor: '#127EF8',
    }
  })
  
  return (
    <Box2 css={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Fator de Potência (Total)</Text>
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
            xaxis: {
              type: 'datetime'
            }
          }}
          series={[
            {
              name: 'Fator de Potência (Total)',
              data: kwhA.slice(-14)
            },
          ]}
        />
      </Box2>
    </Box2>
  )
}