/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { User } from 'interfaces/User'
import { Expert } from 'interfaces/Expert'

export interface AppGetServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> extends GetServerSidePropsContext<Q> {
  user: User | null
  expert: Expert | null
  locale: string
}

export type AppGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: AppGetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>
