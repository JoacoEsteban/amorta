export const esARMessages = {
  sharedResult: 'Resultado Compartido',
  liveCalculator: 'Calculadora en Vivo',
  sharedFrenchAmortizationResult:
    'Resultado de Amortización Francés Compartido',
  frenchAmortizationCalculator: 'Calculadora de Amortización Francesa',
  reviewSharedResultSummary:
    'Revisá el calendario de pagos, compará capital e intereses de cada cuota, y copiá la URL del resultado compartido.',
  modelFrenchLoanSummary:
    'Modelá un préstamo al estilo francés, invertí un pago para obtener su tasa anual efectiva, e inspeccioná el calendario de amortización visualmente.',
  shareResult: 'Compartir resultado',
  sharedInputs: 'Entradas Compartidas',
  frenchMortgageInputs: 'Entradas de Hipoteca Francesa',
  sharedInputsDescription:
    'Estos valores provienen de un resultado compartido y no pueden editarse acá.',
  changeValueDescription:
    'Cambiá cualquier valor y el calendario de amortización se recalcula inmediatamente.',
  loanAmount: 'Monto del préstamo',
  timeInYears: 'Plazo en años',
  paymentsPerYear: 'Pagos por año',
  effectiveAnnualRate: 'Tasa anual efectiva',
  paymentAmountOptionalOverride: 'Monto del pago (anulación opcional)',
  placeholderLoanAmount: '250000',
  placeholderYears: '30',
  placeholderEar: '0.12',
  placeholderPaymentAmount: 'Dejar en blanco para derivar el pago',
  loadingSharedResult: 'Cargando resultado compartido',
  calculatedAutomatically: 'Calculado automáticamente',
  waitingForValidInputs: 'Esperando entradas válidas',
  fieldNoteReadonly:
    'Este resultado compartido no puede editarse acá. Usá "Editar este resultado" para continuar con estos valores.',
  fieldNoteEarDisabled:
    'Deshabilitado mientras se proporciona un monto de pago. La app deriva la TAE de ese pago.',
  fieldNoteEarFormat:
    'Usá formato decimal. Ejemplo: 0.12 significa una tasa anual efectiva del 12%.',
  fieldNotePaymentOverride:
    'Rellená esto para cambiar al modo basado en pagos y calcular la TAE dinámicamente.',
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
    'Se muestra una vista previa del gráfico pre-renderizado. El gráfico interactivo se hidrata justo después de cargar.',
  chartInteractive:
    'El capital y los intereses están apilados para cada cuota, con un punto cero final para el cierre del préstamo.',
  chartCannotGraph: 'El calendario aún no puede graficarse.',
  loadingSharedAmortization: 'Cargando resultado de amortización compartida',
  loadingSharedAmortizationSubtitle:
    'El resultado compartido se está cargando. El calendario y el gráfico aparecerán pronto.',
  amortizationSchedule: 'Calendario de Amortización',
  scheduleExpandDescription:
    'Expandí cada año para ver el desglose detallado del pago.',
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
  clipboardUnavailable: 'El acceso al portapapeles no está disponible acá.',
  shareUrlCopied: 'URL compartida copiada al portapapeles.',
  shareUrlCopyFailed: 'No se pudo copiar la URL compartida.',
  loadingSharedResultTooltip:
    'El resultado compartido debe terminar de cargar antes de poder copiarlo.',
  mustBeValidNumber: '{label} debe ser un número válido',
  mustBeGreaterThanZero: '{label} debe ser mayor que 0',
  mustBeZeroOrGreater: '{label} debe ser 0 o mayor',
  isRequired: '{label} es requerido',
  timeInYearsMustBeWhole:
    'El tiempo en años debe producir un número entero de pagos para la frecuencia seleccionada',
  paymentAmountMustBeAtLeast:
    'El monto del pago debe ser al menos {minimum} para el préstamo y plazo seleccionados',
  cannotSolveEAR:
    'No se puede resolver una tasa anual efectiva para este monto de pago',
  earIsRequired: 'La tasa anual efectiva es requerida',
  paymentIsRequired: 'El monto del pago es requerido',
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
    'Amorta es una calculadora interactiva de amortización francesa con resultados compartibles, inversión de pago a tasa, y una visualización del desglose capital versus intereses.',
  seoDescriptionShare:
    'Revisá un resultado de amortización francesa de solo lectura, inspeccioná el desglose de cuotas, y continuá el cálculo en Amorta.',
  seoDescriptionUnavailable:
    'El resultado compartido de Amorta solicitado no está disponible. Volvé a la calculadora para crear o inspeccionar un calendario de amortización válido.',
  frequencyOnePayment: '1 pago / año',
  frequencyThreePayments: '3 pagos / año',
  frequencySixPayments: '6 pagos / año',
  frequencyTwelvePayments: '12 pagos / año',
  madeBy: 'Hecho por',
  exportSchedule: 'Exportar calendario',
  exportScheduleDescription:
    'Descargá el calendario de amortización en el formato que prefieras.',
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
  eduWhatBody:
    '<p>La amortización francesa — también conocida como <strong>amortización de pago constante</strong> — es el método más común para devolver préstamos e hipotecas en Europa y América Latina. A diferencia de la estructura de pago decreciente común en EE.UU., donde cada pago tiene el mismo monto total pero la proporción entre intereses y capital cambia con el tiempo, la amortización francesa mantiene <strong>cada pago igual</strong> desde el primer mes hasta el último.</p><p>Como cada pago es fijo, el prestatario siempre sabe exactamente qué presupuestar. La desventaja es que los pagos iniciales van casi en su totalidad hacia los intereses, y el capital se reduce muy lentamente al principio.</p>',
  eduHowTrigger: '¿Cómo funciona la matemática?',
  eduHowBody:
    '<p>Cada pago se determina mediante tres números: el <strong>monto del préstamo</strong>, la <strong>tasa anual efectiva (TAE)</strong> y el <strong>número de pagos</strong>. La TAE se convierte en una tasa periódica (para pagos mensuales, la raíz 12 de 1 + TAE), y luego se aplica la fórmula estándar de anualidad:</p><p><strong>Pago = Préstamo × r / (1 − (1 + r)<sup>−n</sup>)</strong></p><p>donde <strong>r</strong> es la tasa periódica y <strong>n</strong> es el número total de pagos. Con cada pago, una parte paga intereses (saldo × tasa periódica) y el resto reduce el capital. A medida que el saldo disminuye, la porción de intereses de cada pago también disminuye — lo que significa que más del pago fijo se destina a capital con el tiempo.</p>',
  eduTermsTrigger: 'Terminología clave',
  eduTermsBody:
    '<p><strong>Cuota:</strong> Un solo pago. Una hipoteca a 30 años con pagos mensuales tiene 360 cuotas.</p><p><strong>Tasa Anual Efectiva (TAE):</strong> El costo real anual de pedir prestado, considerando la capitalización dentro del año. Diferente de la TIN nominal — la TAE es lo que realmente pagás.</p><p><strong>Capital:</strong> La parte de un pago que reduce el saldo pendiente del préstamo.</p><p><strong>Interés:</strong> La parte de un pago que va al prestamista como costo del préstamo.</p><p><strong>Tasa periódica:</strong> La TAE expresada por período de pago. Para pagos mensuales, es (1 + TAE)<sup>1/12</sup> − 1.</p>',
  eduWhenTrigger: '¿Cuándo es útil esta calculadora?',
  eduWhenBody:
    '<p>Usá esta calculadora siempre que necesites modelar un préstamo que siga las convenciones europeas o latinoamericanas. Maneja ambas direcciones:</p><ul><li><strong>Modo estándar:</strong> Ingresá el monto del préstamo, plazo y TAE para calcular la cuota mensual.</li><li><strong>Inversión de pago:</strong> Ingresá un monto de cuota objetivo para resolver la TAE implícita — útil para comparar ofertas con diferentes estructuras de pago.</li></ul><p>El calendario de amortización muestra cada cuota en detalle, facilitando entender exactamente cuánto de cada pago va hacia intereses versus capital en cualquier punto de la vida del préstamo.</p>',
  blog: 'Blog',
  articles: 'Artículos',
  blogIndexTitle: 'Artículos',
  blogIndexDescription:
    'Explicaciones detalladas sobre amortización francesa, convenciones de tasas y matemáticas financieras.',
  backToCalculator: 'Volver a la calculadora',
  backToBlog: 'Volver a los artículos',
  articleNotFound: 'Artículo no encontrado',
  articleCtaText: '¿Listo para hacer tu propio cálculo?',
  seoTitleBlogIndex: 'Artículos | Amorta',
  seoDescriptionBlogIndex:
    'Leé artículos detallados sobre amortización francesa, tasas anuales efectivas y la matemática detrás de los préstamos de pago constante.',
  articleMathTitle: 'La Matemática Detrás de la Amortización Francesa',
  articleMathDescription:
    'Un análisis profundo de la fórmula de anualidades, la conversión de tasas periódicas y cómo cada pago se divide entre intereses y capital a lo largo de la vida de un préstamo francés.',
  articleMathDate: 'Marzo 2026',
  articleMathBody:
    '<p>La amortización francesa se rige por una fórmula elegante. Dado un monto de préstamo <strong>L</strong>, una tasa anual efectiva <strong>TAE</strong> y un número de pagos <strong>n</strong>, el pago fijo <strong>P</strong> es:</p><pre><code>P = L &times; r / (1 &minus; (1 + r)<sup>&minus;n</sup>)</code></pre><p>donde <strong>r</strong> es la <em>tasa periódica</em>: la TAE expresada por intervalo de pago. Para pagos mensuales sobre un préstamo con 12 pagos por año:</p><pre><code>r = (1 + TAE)<sup>1/12</sup> &minus; 1</code></pre><p>Esta conversión de tasa anual a periódica es lo que hace que la TAE sea la tasa correcta para usar en la fórmula &mdash; no la TIN nominal, ni una tasa simple dividida por el número de pagos.</p><h2>Cómo se divide cada pago</h2><p>Una vez que se conoce <strong>P</strong>, el calendario de amortización surge naturalmente. Para la cuota <strong>q</strong> (donde q = 1 para el primer pago):</p><pre><code>intereses_q = saldo_q-1 &times; r\ncapital_q = P &minus; intereses_q\nsaldo_q = saldo_q-1 &minus; capital_q</code></pre><p>Porque el saldo disminuye con cada pago, la porción de intereses <strong>intereses_q</strong> se reduce con el tiempo, mientras que la porción de capital <strong>capital_q</strong> crece. El pago <strong>P</strong> se mantiene constante.</p><p>Esta es la característica definitoria de la amortización francesa: pagos totales constantes, intereses decrecientes y reducción acelerada del capital.</p><h2>Resolviendo la TAE a partir de un pago</h2><p>La fórmula anterior funciona hacia adelante desde (L, TAE, n) para encontrar P. La calculadora también opera en sentido inverso: si conocés L, P y n, puede resolver la TAE implícita.</p><p>Esto requiere un resolutor numérico (búsqueda binaria en este caso), ya que la TAE aparece en ambos lados de la ecuación a través de la tasa periódica.</p><h2>¿Por qué TAE y no TIN?</h2><p>El <strong>TIN</strong> (Tipo de Interés Nominal) es una tasa nominal &mdash; no tiene en cuenta la capitalización dentro del año. Si un préstamo dice "12% TIN" con pagos mensuales, la tasa real que pagás es superior al 12%.</p><p>La <strong>TAE</strong> (Tasa Anual Equivalente) sí tiene en cuenta la capitalización. La relación entre TIN y TAE para <strong>m</strong> pagos por año es:</p><pre><code>TAE = (1 + TIN/m)<sup>m</sup> &minus; 1</code></pre><p>Para 12 pagos por año al 12% TIN: TAE = (1 + 0,12/12)<sup>12</sup> &minus; 1 &asymp; 12,68%. Esto es lo que usa la calculadora.</p><h2>Ajuste del último pago</h2><p>Debido a errores de redondeo, el último pago de un calendario francés generalmente se ajusta ligeramente para asegurar que el saldo llegue a exactamente cero. La calculadora maneja esto verificando si el último pago produciría un saldo negativo y ajustándolo al saldo restante más los intereses devengados.</p>',
}
