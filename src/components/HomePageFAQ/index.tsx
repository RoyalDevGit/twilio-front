import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  HomePageFAQContainer,
  HomePageFAQBox,
  HomePageFAQLabel,
  HomePageFAQTitle,
  HomePageFAQAccordion,
} from 'components/HomePageFAQ/styles'
import { PlusIcon } from 'icons/Plus'

export const HomePageFAQ: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(LocaleNamespace.HomePage)

  return (
    <HomePageFAQContainer>
      <HomePageFAQTitle>{t('homePageFAQTitleLabel')}</HomePageFAQTitle>
      <HomePageFAQBox>
        <HomePageFAQAccordion>
          <AccordionSummary
            expandIcon={<PlusIcon invertColor />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <HomePageFAQLabel>{t('homePageFAQLabel-1')}</HomePageFAQLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </HomePageFAQAccordion>
        <HomePageFAQAccordion>
          <AccordionSummary
            expandIcon={<PlusIcon invertColor />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <HomePageFAQLabel>{t('homePageFAQLabel-2')}</HomePageFAQLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </HomePageFAQAccordion>
        <HomePageFAQAccordion>
          <AccordionSummary
            expandIcon={<PlusIcon invertColor />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <HomePageFAQLabel>{t('homePageFAQLabel-3')}</HomePageFAQLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </HomePageFAQAccordion>
        <HomePageFAQAccordion>
          <AccordionSummary
            expandIcon={<PlusIcon invertColor />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <HomePageFAQLabel>{t('homePageFAQLabel-4')}</HomePageFAQLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </HomePageFAQAccordion>
        <HomePageFAQAccordion>
          <AccordionSummary
            expandIcon={<PlusIcon invertColor />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <HomePageFAQLabel>{t('homePageFAQLabel-5')}</HomePageFAQLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </HomePageFAQAccordion>
      </HomePageFAQBox>
    </HomePageFAQContainer>
  )
}
