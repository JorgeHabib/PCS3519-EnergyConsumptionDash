import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    console.log('cookies', cookies)

    if (!cookies['@PuntoOk:token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
