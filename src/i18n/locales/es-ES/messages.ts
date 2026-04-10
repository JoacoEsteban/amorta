import eduWhatBody from './content/articles/edu-what-body.html.txt' with { type: 'text' }
import eduHowBody from './content/articles/edu-how-body.html.txt' with { type: 'text' }
import eduTermsBody from './content/articles/edu-terms-body.html.txt' with { type: 'text' }
import eduWhenBody from './content/articles/edu-when-body.html.txt' with { type: 'text' }
import articleMathBody from './content/articles/article-math-body.html.txt' with { type: 'text' }
import articleAprVsEarBody from './content/articles/article-apr-vs-ear-body.html.txt' with { type: 'text' }
import articleUnderstandingAmortizationScheduleBody from './content/articles/article-understanding-amortization-schedule-body.html.txt' with { type: 'text' }
import articleExtraPaymentsBody from './content/articles/article-extra-payments-body.html.txt' with { type: 'text' }
import articleLoanTermComparisonBody from './content/articles/article-loan-term-comparison-body.html.txt' with { type: 'text' }
import articleBiweeklyVsMonthlyPaymentsBody from './content/articles/article-biweekly-vs-monthly-payments-body.html.txt' with { type: 'text' }
import articleCalculatingRemainingLoanBalanceBody from './content/articles/article-calculating-remaining-loan-balance-body.html.txt' with { type: 'text' }
import articleFactorsAffectingMortgageRatesBody from './content/articles/article-factors-affecting-mortgage-rates-body.html.txt' with { type: 'text' }
import articleNegativeAmortizationBody from './content/articles/article-negative-amortization-body.html.txt' with { type: 'text' }
import articleComparingLoanOffersBody from './content/articles/article-comparing-loan-offers-body.html.txt' with { type: 'text' }
import articleInterestOnlyLoanPeriodBody from './content/articles/article-interest-only-loan-period-body.html.txt' with { type: 'text' }
import articleBalloonPaymentLoanBody from './content/articles/article-balloon-payment-loan-body.html.txt' with { type: 'text' }
import articleLoanOriginationFeeBody from './content/articles/article-loan-origination-fee-body.html.txt' with { type: 'text' }
import articlePrepaymentPenaltyBody from './content/articles/article-prepayment-penalty-body.html.txt' with { type: 'text' }

export const esESMessages = {
  sharedResult: 'Resultado Compartido',
  liveCalculator: 'Calculadora en Vivo',
  sharedFrenchAmortizationResult:
    'Resultado de Amortización Francés Compartido',
  frenchAmortizationCalculator: 'Calculadora de Amortización Francesa',
  reviewSharedResultSummary:
    'Revisa el calendario de pagos, compara capital e intereses de cada cuota, y copia la URL del resultado compartido.',
  modelFrenchLoanSummary:
    'Modela un préstamo al estilo francés, invierte un pago para obtener su tasa anual efectiva, e inspecciona el calendario de amortización visualmente.',
  shareResult: 'Compartir resultado',
  sharedInputs: 'Entradas Compartidas',
  frenchMortgageInputs: 'Entradas de Hipoteca Francesa',
  sharedInputsDescription:
    'Estos valores provienen de un resultado compartido y no pueden editarse aquí.',
  changeValueDescription:
    'Cambia cualquier valor y el calendario de amortización se recalcula inmediatamente.',
  loanAmount: 'Monto del préstamo',
  timeInYears: 'Plazo en años',
  paymentsPerYear: 'Pagos por año',
  effectiveAnnualRate: 'Tasa anual efectiva',
  paymentAmountOptionalOverride: 'Importe del pago (opcional)',
  placeholderLoanAmount: '250000',
  placeholderYears: '30',
  placeholderEar: '0.12',
  placeholderPaymentAmount: 'Dejar en blanco para derivar el pago',
  loadingSharedResult: 'Cargando resultado compartido',
  calculatedAutomatically: 'Calculado automáticamente',
  waitingForValidInputs: 'Esperando entradas válidas',
  fieldNoteReadonly:
    'Este resultado compartido no puede editarse aquí. Usa "Editar este resultado" para continuar con estos valores.',
  fieldNoteEarDisabled:
    'Se desactiva al indicar un importe de pago. La aplicación calcula la TAE a partir de ese pago.',
  fieldNoteEarFormat:
    'Usa formato decimal. Ejemplo: 0.12 significa una tasa anual efectiva del 12%.',
  fieldNotePaymentOverride:
    'Rellena esto para cambiar al modo basado en pagos y calcular la TAE dinámicamente.',
  startNewCalculation: 'Iniciar nuevo cálculo',
  editThisResult: 'Editar este resultado',
  openCalculator: 'Abrir calculadora',
  collapseAll: 'Contraer todo',
  expandAll: 'Expandir todo',
  activePayment: 'Pago activo',
  activeEAR: 'TAE activa',
  repaymentHorizon: 'Plazo de amortización',
  installmentsAtRate: '{count} cuotas a {rate}/año',
  amortizationGraph: 'Gráfico de Amortización',
  chartPendingSharedResult:
    'La vista previa del resultado compartido se está cargando. El gráfico interactivo aparecerá después de resolver la carga útil.',
  chartPrerendered:
    'Se muestra una vista previa del gráfico prerrenderizado. El gráfico interactivo se activa justo después de cargar.',
  chartInteractive:
    'El capital y los intereses están apilados para cada cuota, con un punto cero final para el cierre del préstamo.',
  chartCannotGraph: 'El calendario aún no puede graficarse.',
  loadingSharedAmortization: 'Cargando resultado de amortización compartida',
  loadingSharedAmortizationSubtitle:
    'El resultado compartido se está cargando. El calendario y el gráfico aparecerán pronto.',
  amortizationSchedule: 'Calendario de Amortización',
  scheduleExpandDescription:
    'Expande cada año para ver el desglose detallado del pago.',
  loanAmountMetric: 'Monto del préstamo',
  totalInterestMetric: 'Intereses totales',
  totalPaidMetric: 'Total pagado',
  principal: 'Capital',
  ofTotalPaid: '{percent} del total pagado',
  principalRepaid: '{multiplier}x capital amortizado',
  yearMarker: 'Año {year}',
  yearSectionPayments:
    'Año {year} ({count} {count, plural, one {pago} other {pagos}})',
  tableHeaderQuota: 'Nº',
  tableHeaderPayment: 'Pago',
  tableHeaderPrincipal: 'Capital',
  tableHeaderInterest: 'Interés',
  tableHeaderBalance: 'Saldo',
  quotaTooltip: 'Cuota {quota}',
  tooltipTotal: 'Total',
  tooltipPrincipal: 'Capital',
  tooltipInterest: 'Interés',
  sharedResultUnavailable: 'Resultado compartido no disponible',
  noSharedResultFound: 'No se encontró resultado compartido',
  thisSharedResultIsInvalid: 'Este resultado compartido es inválido',
  validResultRequired:
    'Se requiere un resultado compartido válido antes de poder compartirlo nuevamente.',
  clipboardUnavailable: 'El acceso al portapapeles no está disponible aquí.',
  shareUrlCopied: 'URL compartida copiada al portapapeles.',
  shareUrlCopyFailed: 'No se pudo copiar la URL compartida.',
  loadingSharedResultTooltip:
    'El resultado compartido debe terminar de cargar antes de poder copiarlo.',
  mustBeValidNumber: '{label} debe ser un número válido',
  mustBeGreaterThanZero: '{label} debe ser mayor que 0',
  mustBeZeroOrGreater: '{label} debe ser 0 o mayor',
  isRequired: '{label} es obligatorio',
  timeInYearsMustBeWhole:
    'El tiempo en años debe producir un número entero de pagos para la frecuencia seleccionada',
  paymentAmountMustBeAtLeast:
    'El monto del pago debe ser al menos {minimum} para el préstamo y plazo seleccionados',
  cannotSolveEAR:
    'No se puede resolver una tasa anual efectiva para este monto de pago',
  earIsRequired: 'La tasa anual efectiva es requerida',
  paymentIsRequired: 'El importe del pago es obligatorio',
  loanInputsIncomplete: 'Las entradas del préstamo están incompletas',
  noSharedResultProvided:
    'No se proporcionó un resultado compartido en la URL.',
  sharedResultCouldNotBeDecoded:
    'El resultado compartido no pudo ser decodificado.',
  sharedResultNotValidJSON: 'El resultado compartido no es JSON válido.',
  sharedResultInvalidFormat:
    'El resultado compartido no coincide con el formato de datos esperado.',
  loadingSharedResultFromURL: 'Cargando el resultado compartido desde la URL.',
  seoTitleIndex: 'Amorta | Calculadora de Amortización Francesa',
  seoTitleResult: 'Resultado Compartido | Amorta',
  seoTitleUnavailable: 'Resultado Compartido No Disponible | Amorta',
  seoDescription:
    'Amorta es una calculadora interactiva de amortización francesa con resultados compartibles, cálculo de tasa a partir del pago y una visualización del desglose entre capital e intereses.',
  seoDescriptionShare:
    'Revisa un resultado de amortización francesa de solo lectura, inspecciona el desglose de cuotas, y continúa el cálculo en Amorta.',
  seoDescriptionUnavailable:
    'El resultado compartido de Amorta solicitado no está disponible. Regresa a la calculadora para crear o inspeccionar un calendario de amortización válido.',
  frequencyOnePayment: '1 pago / año',
  frequencyThreePayments: '3 pagos / año',
  frequencySixPayments: '6 pagos / año',
  frequencyTwelvePayments: '12 pagos / año',
  madeBy: 'Hecho por',
  exportSchedule: 'Exportar calendario',
  exportScheduleDescription:
    'Descarga el calendario de amortización en el formato que prefieras.',
  downloadCsv: 'Hoja de cálculo CSV',
  downloadCsvDetail:
    'Números localizados, todas las filas con encabezados de columna',
  downloadJson: 'Datos JSON',
  downloadJsonDetail:
    'Carga útil estructurada completa con entradas y resultados',
  cancel: 'Cancelar',
  aboutFrenchAmortization: 'Sobre la Amortización Francesa',
  aboutFrenchAmortizationDescription:
    'Conceptos clave y terminología para entender cómo funciona la amortización francesa.',
  eduWhatTrigger: '¿Qué es la amortización francesa?',
  eduWhatBody,
  eduHowTrigger: '¿Cómo funciona la matemática?',
  eduHowBody,
  eduTermsTrigger: 'Terminología clave',
  eduTermsBody,
  eduWhenTrigger: '¿Cuándo es útil esta calculadora?',
  eduWhenBody,
  blog: 'Blog',
  articles: 'Artículos',
  blogIndexTitle: 'Artículos',
  blogIndexDescription:
    'Explicaciones detalladas sobre amortización francesa, convenciones de tasas y matemáticas financieras.',
  backToCalculator: 'Volver a la calculadora',
  backToBlog: 'Volver a los artículos',
  articleNotFound: 'Artículo no encontrado',
  relatedArticlesTitle: 'Artículos Relacionados',
  relatedArticlesDescription:
    'Continúa con temas cercanos para comparar mecánicas de amortización, conceptos de tasas y decisiones prácticas sobre préstamos.',
  articleCtaText: '¿Listo para hacer tu propio cálculo?',
  seoTitleBlogIndex: 'Artículos | Amorta',
  seoDescriptionBlogIndex:
    'Lee artículos en profundidad sobre amortización francesa, tasas anuales efectivas y las matemáticas detrás de los préstamos de pago constante.',
  articleMathTitle: 'La Matemática Detrás de la Amortización Francesa',
  articleMathDescription:
    'Un análisis profundo de la fórmula de anualidades, la conversión de tasas periódicas y cómo cada pago se divide entre intereses y capital a lo largo de la vida de un préstamo francés.',
  articleMathDate: '25 de Marzo de 2026',
  articleMathBody,
  articleAprVsEarTitle: 'TIN vs TAE: Por Qué Importa la Diferencia',
  articleAprVsEarDescription:
    'Comprende la diferencia entre el Tipo de Interés Nominal y la Tasa Anual Efectiva, y aprende por qué la TAE es la tasa correcta para usar en cálculos financieros.',
  articleAprVsEarDate: '31 de Marzo de 2026',
  articleAprVsEarBody,
  articleUnderstandingAmortizationScheduleTitle:
    'Entendiendo Tu Tabla de Amortización',
  articleUnderstandingAmortizationScheduleDescription:
    'Aprende a leer una tabla de amortización, qué significa cada columna y cómo identificar patrones en el reembolso de tu préstamo a lo largo del tiempo.',
  articleUnderstandingAmortizationScheduleDate: '31 de Marzo de 2026',
  articleUnderstandingAmortizationScheduleBody,
  articleExtraPaymentsTitle: 'El Poder de los Pagos Extra',
  articleExtraPaymentsDescription:
    'Aprende cómo hacer pagos adicionales hacia el capital puede reducir dramáticamente los intereses totales y acortar el plazo de tu préstamo.',
  articleExtraPaymentsDate: '31 de Marzo de 2026',
  articleExtraPaymentsBody,
  articleBiweeklyVsMonthlyPaymentsTitle:
    'Pagos Quincenales vs Mensuales: ¿Realmente Importa?',
  articleBiweeklyVsMonthlyPaymentsDescription:
    'Explora si cambiar de pagos mensuales a quincenales realmente ahorra dinero, y comprende la mecánica detrás de los calendarios de pago más frecuentes.',
  articleBiweeklyVsMonthlyPaymentsDate: '31 de Marzo de 2026',
  footerPrivacyPolicy: 'Política de Privacidad',
  footerAbout: 'Acerca de',
  footerContact: 'Contacto',
  footerTerms: 'Términos y Condiciones',
  privacyPolicyTitle: 'Política de Privacidad',
  privacyIntroductionTitle: 'Introducción',
  privacyIntroductionText:
    'Esta Política de Privacidad describe cómo Amorta ("nosotros", "nos" o "nuestro") recopila, utiliza y protege tu información cuando usas nuestro sitio web. Estamos comprometidos con proteger tu privacidad y garantizar transparencia sobre nuestras prácticas de datos.',
  privacyDataCollectionTitle: 'Datos que Recopilamos',
  privacyDataCollectionText: 'Recopilamos los siguientes tipos de información:',
  privacyDataCollectionPersonal:
    'Información Personal: No recopilamos información personal a menos que nos contactes voluntariamente por correo electrónico.',
  privacyDataCollectionNonPersonal:
    'Información No Personal: Recopilamos automáticamente el tipo de navegador, dirección IP, información del dispositivo y patrones de uso a través de cookies y herramientas de análisis.',
  privacyDataUsageTitle: 'Cómo Usamos tus Datos',
  privacyDataUsageText:
    'Utilizamos la información recopilada para los siguientes fines:',
  privacyDataUsageAnalytics:
    'Análisis: Para entender cómo los visitantes usan nuestro sitio y mejorar la experiencia del usuario',
  privacyDataUsageCommunication:
    'Comunicación: Para responder a consultas enviadas por correo electrónico',
  privacyDataUsageImprovement:
    'Mejora del Sitio: Para identificar y corregir problemas técnicos y mejorar la funcionalidad',
  privacyCookiesTitle: 'Cookies',
  privacyCookiesText:
    'Utilizamos cookies y tecnologías de seguimiento similares para mejorar tu experiencia de navegación. Las cookies son pequeños archivos de texto almacenados en tu dispositivo que nos ayudan a comprender el comportamiento y las preferencias de los usuarios.',
  privacyCookiesPurpose:
    'Nuestras cookies se utilizan para: recordar tus preferencias, analizar el tráfico del sitio y mostrar anuncios personalizados a través de servicios de terceros.',
  privacyThirdPartyTitle: 'Servicios de Terceros',
  privacyThirdPartyText:
    'Utilizamos servicios de terceros para mejorar la funcionalidad y monetización de nuestro sitio web.',
  privacyThirdPartyAdsense:
    'Google AdSense: Mostramos anuncios servidos por Google AdSense. Google puede utilizar cookies y web beacons para recopilar datos sobre tus visitas a este y otros sitios web.',
  privacyThirdPartyCookies:
    'Estos terceros pueden utilizar cookies para mostrar anuncios basados en tus visitas anteriores a este sitio web y otros sitios en Internet. Puedes optar por no recibir publicidad personalizada visitando la Configuración de Anuncios de Google.',
  privacyUserRightsTitle: 'Tus Derechos',
  privacyUserRightsText:
    'Tienes derecho a controlar tus datos. Puedes desactivar las cookies a través de la configuración de tu navegador en cualquier momento. Ten en cuenta que desactivar las cookies puede afectar la funcionalidad de ciertas características de nuestro sitio web.',
  privacyContactTitle: 'Contáctanos',
  privacyContactText:
    'Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contáctanos en:',
  contactEmail: 'support@joaco.io',
  aboutTitle: 'Acerca de Amorta',
  aboutIdentityTitle: 'Quiénes Somos',
  aboutIdentityText:
    'Amorta es un proyecto independiente creado y mantenido por joaco.io. Soy un desarrollador apasionado por hacer que las herramientas financieras sean accesibles y fáciles de entender para todos.',
  aboutPurposeTitle: 'Lo que Ofrecemos',
  aboutPurposeText:
    'Amorta proporciona una calculadora de amortización francesa gratuita e interactiva que ayuda a los usuarios a entender los calendarios de pago de préstamos, visualizar desgloses de capital e intereses, y comparar diferentes escenarios de préstamos. Nuestras herramientas están diseñadas para empoderar a los usuarios con cálculos financieros claros y precisos.',
  aboutAudienceTitle: 'Para Quién es Nuestro Contenido',
  aboutAudienceText:
    'Nuestro contenido está diseñado para cualquier persona interesada en entender la amortización de préstamos, incluyendo: compradores de vivienda comparando opciones de hipotecas, estudiantes de finanzas aprendiendo sobre métodos de amortización, profesionales inmobiliarios que necesitan cálculos rápidos, y cualquiera que esté planeando una compra importante que requiera un préstamo.',
  aboutCredibilityTitle: 'Nuestra Experiencia',
  aboutCredibilityText:
    'Aunque no somos una institución financiera, nuestra calculadora se basa en matemáticas financieras establecidas y está probada exhaustivamente contra estándares de la industria. Estamos comprometidos con la precisión y transparencia en todos nuestros cálculos y explicaciones.',
  aboutTransparencyTitle: 'Intención Editorial',
  aboutTransparencyText:
    'Amorta es una herramienta informativa y educativa. No proporcionamos asesoramiento financiero. Nuestro objetivo es ayudar a los usuarios a entender la mecánica de la amortización francesa y tomar decisiones informadas. Siempre consulta con un asesor financiero calificado para decisiones financieras personales.',
  contactTitle: 'Contáctanos',
  contactMethodsTitle: 'Cómo Contactarnos',
  contactMethodsText:
    'Agradecemos tus comentarios, preguntas y sugerencias. La mejor manera de contactarnos es por correo electrónico:',
  contactResponseTitle: 'Tiempo de Respuesta',
  contactResponseText:
    'Nuestro objetivo es responder a todas las consultas dentro de 2-3 días hábiles. Para problemas técnicos o reportes de errores, por favor incluye detalles sobre tu navegador y dispositivo para ayudarnos a asistirte más efectivamente.',
  termsTitle: 'Términos y Condiciones',
  termsAcceptanceTitle: 'Aceptación de los Términos',
  termsAcceptanceText:
    'Al acceder y usar Amorta, aceptas y te comprometes a cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, por favor no uses nuestro sitio web.',
  termsContentUseTitle: 'Uso del Contenido',
  termsContentUseText:
    'Todo el contenido de Amorta se proporciona únicamente con fines informativos y educativos. Puedes usar la calculadora y leer nuestros artículos para uso personal, no comercial. No puedes reproducir, distribuir, modificar o crear trabajos derivados de nuestro contenido sin permiso escrito explícito.',
  termsIntellectualPropertyTitle: 'Propiedad Intelectual',
  termsIntellectualPropertyText:
    'Todo el contenido, código, elementos de diseño y funcionalidad de este sitio web son propiedad de Amorta y sus creadores. Esto incluye, entre otros, texto, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y software.',
  termsLiabilityTitle: 'Limitación de Responsabilidad',
  termsLiabilityText:
    'Amorta proporciona sus herramientas y contenido "tal cual" sin garantías de ningún tipo. Aunque nos esforzamos por la precisión, no garantizamos que los resultados de nuestra calculadora estén libres de errores o sean adecuados para tu situación específica. No somos responsables de ninguna decisión financiera tomada basándose en información de este sitio web.',
  termsExternalLinksTitle: 'Enlaces Externos',
  termsExternalLinksText:
    'Nuestro sitio web puede contener enlaces a sitios web de terceros. No tenemos control sobre y no asumimos ninguna responsabilidad por el contenido, políticas de privacidad o prácticas de ningún sitio de terceros.',
  termsModificationsTitle: 'Modificaciones a los Términos',
  termsModificationsText:
    'Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán efectivos inmediatamente después de publicarse en esta página. Tu uso continuado del sitio web después de cualquier cambio constituye aceptación de los nuevos términos.',
  seoTitlePrivacyPolicy: 'Política de Privacidad | Amorta',
  seoTitleAbout: 'Acerca de | Amorta',
  seoTitleContact: 'Contacto | Amorta',
  seoTitleTerms: 'Términos y Condiciones | Amorta',
  seoDescriptionPrivacyPolicy:
    'Lee nuestra Política de Privacidad para entender cómo Amorta recopila, utiliza y protege tu información. Infórmate sobre cookies, servicios de terceros incluyendo Google AdSense, y tus derechos de privacidad.',
  seoDescriptionAbout:
    'Conoce Amorta, una calculadora gratuita de amortización francesa. Descubre quiénes somos, lo que ofrecemos y nuestro compromiso con la educación financiera precisa.',
  seoDescriptionContact:
    'Ponte en contacto con el equipo de Amorta. Contáctanos por correo electrónico para preguntas, comentarios o soporte sobre nuestra calculadora de amortización francesa.',
  seoDescriptionTerms:
    'Lee nuestros Términos y Condiciones para entender las reglas y regulaciones para usar la calculadora de amortización francesa y el contenido educativo de Amorta.',
  aboutLink: 'Acerca de',
  contactLink: 'Contacto',
  privacyPolicyLink: 'Privacidad',
  termsLink: 'Términos',
  articleLoanTermComparisonTitle:
    'Préstamos a 15 vs 30 Años: Cómo Elegir Correctamente',
  articleLoanTermComparisonDescription:
    'Compara las ventajas y desventajas entre plazos cortos y largos, entiende el impacto en las cuotas mensuales y los intereses totales, y descubre qué opción se adapta a tu situación financiera.',
  articleLoanTermComparisonDate: '3 de Abril de 2026',
  articleLoanTermComparisonBody,
  articleLoanTermComparisonSeoTitle:
    'Préstamos a 15 vs 30 Años: Cómo Elegir Correctamente | Amorta',
  articleLoanTermComparisonSeoDescription:
    'Compara préstamos a 15 y 30 años. Entiende el equilibrio entre cuotas mensuales e intereses totales para elegir la hipoteca adecuada para tu situación financiera.',
  articleBiweeklyVsMonthlyPaymentsBody,
  articleCalculatingRemainingLoanBalanceTitle:
    'Cómo Calcular el Saldo Pendiente de tu Préstamo en Cualquier Momento',
  articleCalculatingRemainingLoanBalanceDescription:
    'Aprende las fórmulas matemáticas y métodos para calcular tu saldo exacto en cualquier punto del préstamo, incluyendo ejemplos prácticos y errores comunes a evitar.',
  articleCalculatingRemainingLoanBalanceDate: '6 de Abril de 2026',
  articleCalculatingRemainingLoanBalanceBody,
  articleCalculatingRemainingLoanBalanceSeoTitle:
    'Cómo Calcular el Saldo Pendiente de tu Préstamo | Amorta',
  articleCalculatingRemainingLoanBalanceSeoDescription:
    'Aprende las fórmulas matemáticas para calcular tu saldo exacto en cualquier momento. Comprende los métodos prospectivo y retrospectivo con ejemplos prácticos.',
  articleFactorsAffectingMortgageRatesTitle:
    'Factores que Afectan el Tipo de Interés de tu Hipoteca',
  articleFactorsAffectingMortgageRatesDescription:
    'Conoce los factores clave que los prestamistas consideran al establecer tasas hipotecarias, desde el historial crediticio hasta las condiciones del mercado, y cómo puedes mejorar tu tasa.',
  articleFactorsAffectingMortgageRatesDate: '6 de Abril de 2026',
  articleFactorsAffectingMortgageRatesBody,
  articleFactorsAffectingMortgageRatesSeoTitle:
    'Factores que Afectan el Tipo de Interés de tu Hipoteca | Amorta',
  articleFactorsAffectingMortgageRatesSeoDescription:
    'Descubre qué factores afectan el tipo de interés de tu hipoteca. Aprende cómo los historiales crediticios, las relaciones préstamo-valor y las condiciones del mercado influyen en tu tasa.',
  articleNegativeAmortizationTitle: '¿Qué es la Amortización Negativa?',
  articleNegativeAmortizationDescription:
    'Aprende qué significa la amortización negativa, por qué un saldo puede crecer después de pagar, y qué cláusulas suelen producir ese resultado.',
  articleNegativeAmortizationDate: '6 de Abril de 2026',
  articleNegativeAmortizationBody,
  articleNegativeAmortizationSeoTitle:
    '¿Qué es la Amortización Negativa? | Amorta',
  articleNegativeAmortizationSeoDescription:
    'La amortización negativa añade intereses impagados al saldo del préstamo. Aprende cómo funciona, por qué genera saltos de cuota y cómo detectarla.',
  articleComparingLoanOffersTitle:
    'Cómo Comparar Ofertas de Préstamos de Forma Efectiva',
  articleComparingLoanOffersDescription:
    'Aprende un enfoque sistemático para comparar ofertas de préstamos más allá de los tipos de interés, incluyendo comisiones, plazos, comisiones por amortización anticipada y coste total.',
  articleComparingLoanOffersDate: '7 de Abril de 2026',
  articleComparingLoanOffersBody,
  articleComparingLoanOffersSeoTitle:
    'Cómo Comparar Ofertas de Préstamos | Amorta',
  articleComparingLoanOffersSeoDescription:
    'Compara ofertas de préstamos como un profesional. Aprende a evaluar el coste total, comisiones, comisiones por amortización anticipada y plazos para encontrar la mejor opción.',
  articleInterestOnlyLoanPeriodTitle:
    'Qué es un Periodo de Solo Intereses en un Préstamo',
  articleInterestOnlyLoanPeriodDescription:
    'Aprende cómo funciona un periodo de solo intereses, por qué la cuota inicial es más baja y qué cambia cuando el préstamo empieza a amortizar capital.',
  articleInterestOnlyLoanPeriodDate: '7 de Abril de 2026',
  articleInterestOnlyLoanPeriodBody,
  articleInterestOnlyLoanPeriodSeoTitle:
    'Qué es un Periodo de Solo Intereses en un Préstamo | Amorta',
  articleInterestOnlyLoanPeriodSeoDescription:
    'Aprende qué es un periodo de solo intereses, cómo modifica la cuota mensual y por qué la cuota posterior puede elevar el coste total del préstamo.',
  articleBalloonPaymentLoanTitle: 'Qué es un Préstamo con Pago Globo',
  articleBalloonPaymentLoanDescription:
    'Aprende cómo funciona un préstamo con pago globo, por qué mantiene cuotas más bajas y qué riesgos aparecen cuando vence un saldo final elevado.',
  articleBalloonPaymentLoanDate: '8 de Abril de 2026',
  articleBalloonPaymentLoanBody,
  articleBalloonPaymentLoanSeoTitle:
    'Qué es un Préstamo con Pago Globo | Amorta',
  articleBalloonPaymentLoanSeoDescription:
    'Aprende cómo funciona un préstamo con pago globo, por qué deja un saldo final alto, y qué riesgos de liquidez y refinanciación debes revisar.',
  articleLoanOriginationFeeTitle:
    'Qué es la Comisión de Apertura de un Préstamo',
  articleLoanOriginationFeeDescription:
    'Aprende qué cubre la comisión de apertura, cómo cambia el dinero inicial que necesitas, y por qué modifica el coste real del préstamo.',
  articleLoanOriginationFeeDate: '9 de Abril de 2026',
  articleLoanOriginationFeeBody,
  articleLoanOriginationFeeSeoTitle:
    'Qué es la Comisión de Apertura de un Préstamo | Amorta',
  articleLoanOriginationFeeSeoDescription:
    'Aprende qué es la comisión de apertura, cómo afecta a la TAE y a los costes de cierre, y cuándo una comisión mayor puede compensar.',
  articlePrepaymentPenaltyTitle:
    'Qué es una Penalización por Reembolso Anticipado',
  articlePrepaymentPenaltyDescription:
    'Aprende qué es una penalización por reembolso anticipado, cuándo se aplica y cómo puede cambiar el valor real de refinanciar o amortizar antes.',
  articlePrepaymentPenaltyDate: '10 de Abril de 2026',
  articlePrepaymentPenaltyBody,
  articlePrepaymentPenaltySeoTitle:
    'Qué es una Penalización por Reembolso Anticipado | Amorta',
  articlePrepaymentPenaltySeoDescription:
    'Aprende qué es una penalización por reembolso anticipado, cómo se calcula y por qué importa al refinanciar, vender o hacer amortizaciones grandes.',
}
