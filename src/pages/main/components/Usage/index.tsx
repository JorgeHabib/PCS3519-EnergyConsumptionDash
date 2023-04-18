import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Flex } from "@/components";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Usage = () => {
  const { content } = useAuth()

  // 10 seconds steps
  const kwhT = content.map((item) => {
    return {
      x: item.created_at,
      y: item.KWHT,
      fillColor: '#127EF8',
    }
  }).slice(-30)

  let totalLastMinute = 0
  let totalLastHour = 0
  let totalLastThreeHours = 0

  if (content.length > 6) {
    totalLastMinute = content.slice(-1)[0].KWHT - content.slice(-2)[0].KWHT
  }

  if (content.length > 12) {
    totalLastHour = content.slice(-1)[0].KWHT - content.slice(-12)[0].KWHT
  }

  if (content.length > 36) {
    totalLastThreeHours = content.slice(-1)[0].KWHT - content.slice(-36)[0].KWHT
  }

  return (
    <Box css={{ padding: 8, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Uso de Energia</Text>
      <Flex css={{ alignItems: 'stretch', flex: 1}}>
        <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginRight: 32 }}>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por Minute</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{totalLastMinute}</Text>
              <Text variant={"caption"}>kWh</Text>
            </Flex>
          </Flex>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por Hora</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{totalLastHour}</Text>
              <Text variant={"caption"}>kWh</Text>
            </Flex>
          </Flex>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por 3 Horas</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>{totalLastThreeHours}</Text>
              <Text variant={"caption"}>kWh</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box css={{ flex: 1, padding: 0 }}>
          <Chart 
            height={'100%'}
            width={'100%'}
            type="area"
            options={{
              chart: {
                id: 'realtime',
                type: 'area',
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
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: {
                labels: {
                  formatter: function (y) {
                    return y / 1000 + " kWh";
                  }
                }
              },
            }}
            series={[
              {
                name: 'kWh (Total)',
                data: kwhT
              },
            ]}
          />
        </Box>
      </Flex>
    </Box>
  )
}