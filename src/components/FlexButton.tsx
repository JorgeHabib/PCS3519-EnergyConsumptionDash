import { styled } from '@punto-ui/react'

export const FlexButton = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    background: '$interface_light_up',
    transition: 'background 0.2s ease-in-out',
  },
})
