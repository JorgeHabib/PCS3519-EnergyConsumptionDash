import { Text, styled } from "@punto-ui/react"
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { Flex } from "@/components"

export const EnergyPrice = () => {
  return (
    <Container>
      <Header>
        <BaseIcon>
          <div>
            <CurrencyDollarIcon color={'white'} />
          </div>
        </BaseIcon>
        <Text variant="subtitle2">Consumo de Energia</Text>
      </Header>

      <Footer>
        <FooterItem>
          <Text variant="caption" css={{ color: '$interface_dark_down' }}>Energia</Text>
          <Text variant="paragraph">97,75 kWh</Text>
        </FooterItem>
        <FooterItem last>
          <Text variant="caption" css={{ color: '$interface_dark_down' }}>Custo</Text>
          <Text variant="paragraph">R$ 10,39</Text>
        </FooterItem>
      </Footer>
    </Container>

  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '100%',
})

const BaseIcon = styled('div', {
  padding: 12,
  borderRadius: 16,
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
  marginBottom: 8,

  '> div': {
    backgroundColor: '$status_success_deep',
    borderRadius: 9999,
    height: 24,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '> svg': {
      width: 16,
      height: 16,
    }
  }
})

const Footer = styled('div', {
  display: 'flex',
  borderTop: 'solid 2px',
  borderTopColor: '$interface_light_down',
})

const FooterItem = styled('div', {
  flex: 1,
  padding: 12,
  borderRight: 'solid 2px',
  borderRightColor: '$interface_light_down',

  variants: {
    last: {
      true: {
        borderRight: 'none',
      }
    }
  }
})