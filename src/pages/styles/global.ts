import { globalCss } from '@punto-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,

    /* width */
    '&::-webkit-scrollbar': {
      width: 2,
      height: 4,
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '$brand_primary_pure',
      borderRadius: 2,
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '$brand_primary_deep',
    },
  },

  svg: {
    strokeWidth: 2,
  },

  body: {
    backgroundColor: '$interface_light_pure',
    color: '$interface_dark_deep',
    '-webkit-font-smoothing': 'antialiased',
  },
})
