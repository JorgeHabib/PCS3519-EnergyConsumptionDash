import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Box as Box2 } from '@/components/Box'
import { Flex } from "@/components";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Frequency = () => {
  const { content } = useAuth()

  const lastContentTemp = content.length - 1 < 0 ? 0 : content[content.length - 1].FREQ
  const percentageOfThePie = (lastContentTemp - 5990) * 10

  const data = [percentageOfThePie, 100 - percentageOfThePie]
  return (
    <Box2 css={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Corrente (RMS)</Text>
      <Box2 css={{ 
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Chart 
          height={'300'}
          width={'100%'}
          type="donut"
          options={{
            colors: ['#127EF8', '#EEE'],
            chart: {
              type: 'donut',
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
            plotOptions: {
              pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 0
              }
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              enabled: false,
            },
            labels: ['Frequência', ''],
            stroke: {
              curve: 'smooth'
            },
          }}
          series={data}
        />
        <Box2 css={{ position: 'absolute', right: 0, left: 0, bottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text css={{ marginRight: 8, textAlign: 'center', color: '$brand_primary_deep' }} variant={"heading3"}>{lastContentTemp / 100}</Text>
          <Text css={{ textAlign: 'center', color: '$brand_primary_deep' }} variant={"paragraph"}>Hz</Text>
        </Box2>
      </Box2>
    </Box2>
  )
}