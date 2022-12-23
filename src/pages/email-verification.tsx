/* eslint-disable import/no-default-export */
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { EmailVerificationPage } from 'pageComponents/EmailVerification'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default EmailVerificationPage

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      getLocaleNamespaces([LocaleNamespace.EmailVerificationPage])
    )),
  },
})
