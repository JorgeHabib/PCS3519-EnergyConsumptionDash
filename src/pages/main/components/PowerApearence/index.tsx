import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Box as Box2 } from '@/components/Box'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const PowerAppearence = () => {
  const { content } = useAuth()

  const lastcontent = content[content.length - 1]
  const lastContent = lastcontent ? lastcontent : { SA: 0, SB: 0, SC: 0 }

  const data = [{
    name: 'Potência Aparente',
    data: [lastContent.SA, lastContent.SB, lastContent.SC]
  }]

  return (
    <Box2 css={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Potência Aparente</Text>
      <Box2 css={{ flex: 1 }}>
        <Chart 
          height={'100%'}
          width={'100%'}
          type="radar"
          options={{
            chart: {
              type: 'radar',
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
              enabled: true
            },
            legend: {
              show: false,
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: [
                'S(A)',
                'S(B)',
                'S(C)',
              ]
            }
          }}
          series={data}
        />
      </Box2>
    </Box2>
  )
}