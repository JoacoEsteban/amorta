import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { useTranslator } from '../state/locale.js'

export const EducationalSection = () => {
  const { _ } = useTranslator()

  const contentBlocks = [
    {
      key: 'what',
      trigger: _('eduWhatTrigger'),
      body: _('eduWhatBody'),
    },
    {
      key: 'how',
      trigger: _('eduHowTrigger'),
      body: _('eduHowBody'),
    },
    {
      key: 'terms',
      trigger: _('eduTermsTrigger'),
      body: _('eduTermsBody'),
    },
    {
      key: 'when',
      trigger: _('eduWhenTrigger'),
      body: _('eduWhenBody'),
    },
  ]

  return (
    <Card className="panel-card edu-card">
      <CardHeader className="panel-card__header panel-card__header--plain">
        <CardTitle>{_('aboutFrenchAmortization')}</CardTitle>
        <CardDescription>
          {_('aboutFrenchAmortizationDescription')}
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
