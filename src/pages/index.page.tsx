import { withSSRGuest } from './utils/withSSRGuest'

export { default } from './main'

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
