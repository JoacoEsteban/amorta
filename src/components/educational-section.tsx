import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { i18n } from '../i18n/index.js'

export const EducationalSection = () => {
  const contentBlocks = [
    {
      key: 'what',
      trigger: i18n._('eduWhatTrigger'),
      body: i18n._('eduWhatBody'),
    },
    {
      key: 'how',
      trigger: i18n._('eduHowTrigger'),
      body: i18n._('eduHowBody'),
    },
    {
      key: 'terms',
      trigger: i18n._('eduTermsTrigger'),
      body: i18n._('eduTermsBody'),
    },
    {
      key: 'when',
      trigger: i18n._('eduWhenTrigger'),
      body: i18n._('eduWhenBody'),
    },
  ]

  return (
    <Card className="panel-card edu-card">
      <CardHeader className="panel-card__header panel-card__header--plain">
        <CardTitle>{i18n._('aboutFrenchAmortization')}</CardTitle>
        <CardDescription>
          {i18n._('aboutFrenchAmortizationDescription')}
        </CardDescription>
      </CardHeader>
      <Accordion type="multiple">
        {contentBlocks.map(({ key, trigger, body }) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{trigger}</AccordionTrigger>
            <AccordionContent>
              <div
                className="edu-accordion__body"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}
