import { Box, Text } from "@punto-ui/react"
import { useAuth } from '@/contexts/hooks'
import dynamic from 'next/dynamic'
import { Flex } from "@/components";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Usage = () => {
  const { content } = useAuth()

  const kwhT = content.map((item) => {
    return {
      x: item.created_at,
      y: item.KWHT,
      fillColor: '#127EF8',
    }
  }).slice(-30)

  return (
    <Box css={{ padding: 8, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Text variant={"subtitle2"} css={{ marginBottom: 16 }}>Uso de Energia</Text>
      <Flex css={{ alignItems: 'stretch', flex: 1}}>
        <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginRight: 32 }}>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por Minute</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>0.66</Text>
              <Text variant={"caption"}>kWh</Text>
            </Flex>
          </Flex>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por Hora</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>20.82</Text>
              <Text variant={"caption"}>kWh</Text>
            </Flex>
          </Flex>
          <Flex css={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
            <Text variant={"caption"} css={{ color: '$interface_dark_down' }}>por 3 Horas</Text>
            <Flex css={{ alignItems: 'flex-end' }}>
              <Text variant={"subtitle2"} css={{ marginRight: 2 }}>64.97</Text>
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