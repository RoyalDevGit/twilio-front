/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { MessagesPage } from 'pageComponents/Messages'

export default MessagesPage

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, user } = ctx
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([LocaleNamespaceBundle.AppShell])
      )),
    },
  }
})
