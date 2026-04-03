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
  articleMathDate: '25 de Marzo de 2026',
  articleMathBody:
    '<p>La amortización francesa se rige por una fórmula elegante. Dado un monto de préstamo <strong>L</strong>, una tasa anual efectiva <strong>TAE</strong> y un número de pagos <strong>n</strong>, el pago fijo <strong>P</strong> es:</p><pre><code>P = L &times; r / (1 &minus; (1 + r)<sup>&minus;n</sup>)</code></pre><p>donde <strong>r</strong> es la <em>tasa periódica</em>: la TAE expresada por intervalo de pago. Para pagos mensuales sobre un préstamo con 12 pagos por año:</p><pre><code>r = (1 + TAE)<sup>1/12</sup> &minus; 1</code></pre><p>Esta conversión de tasa anual a periódica es lo que hace que la TAE sea la tasa correcta para usar en la fórmula &mdash; no la TIN nominal, ni una tasa simple dividida por el número de pagos.</p><h2>Cómo se divide cada pago</h2><p>Una vez que se conoce <strong>P</strong>, el calendario de amortización surge naturalmente. Para la cuota <strong>q</strong> (donde q = 1 para el primer pago):</p><pre><code>intereses_q = saldo_q-1 &times; r\ncapital_q = P &minus; intereses_q\nsaldo_q = saldo_q-1 &minus; capital_q</code></pre><p>Porque el saldo disminuye con cada pago, la porción de intereses <strong>intereses_q</strong> se reduce con el tiempo, mientras que la porción de capital <strong>capital_q</strong> crece. El pago <strong>P</strong> se mantiene constante.</p><p>Esta es la característica definitoria de la amortización francesa: pagos totales constantes, intereses decrecientes y reducción acelerada del capital.</p><h2>Resolviendo la TAE a partir de un pago</h2><p>La fórmula anterior funciona hacia adelante desde (L, TAE, n) para encontrar P. La calculadora también opera en sentido inverso: si conocés L, P y n, puede resolver la TAE implícita.</p><p>Esto requiere un resolutor numérico (búsqueda binaria en este caso), ya que la TAE aparece en ambos lados de la ecuación a través de la tasa periódica.</p><h2>¿Por qué TAE y no TIN?</h2><p>El <strong>TIN</strong> (Tipo de Interés Nominal) es una tasa nominal &mdash; no tiene en cuenta la capitalización dentro del año. Si un préstamo dice "12% TIN" con pagos mensuales, la tasa real que pagás es superior al 12%.</p><p>La <strong>TAE</strong> (Tasa Anual Equivalente) sí tiene en cuenta la capitalización. La relación entre TIN y TAE para <strong>m</strong> pagos por año es:</p><pre><code>TAE = (1 + TIN/m)<sup>m</sup> &minus; 1</code></pre><p>Para 12 pagos por año al 12% TIN: TAE = (1 + 0,12/12)<sup>12</sup> &minus; 1 &asymp; 12,68%. Esto es lo que usa la calculadora.</p><h2>Ajuste del último pago</h2><p>Debido a errores de redondeo, el último pago de un calendario francés generalmente se ajusta ligeramente para asegurar que el saldo llegue a exactamente cero. La calculadora maneja esto verificando si el último pago produciría un saldo negativo y ajustándolo al saldo restante más los intereses devengados.</p>',
  articleAprVsEarTitle: 'TIN vs TAE: Por Qué Importa la Diferencia',
  articleAprVsEarDescription:
    'Comprendé la diferencia entre el Tipo de Interés Nominal y la Tasa Anual Efectiva, y aprendé por qué la TAE es la tasa correcta para usar en cálculos financieros.',
  articleAprVsEarDate: '31 de Marzo de 2026',
  articleAprVsEarBody:
    '<p>Al comparar préstamos, vas a encontrar dos números diferentes que describen el costo anual de endeudamiento: <strong>TIN</strong> (Tipo de Interés Nominal) y <strong>TAE</strong> (Tasa Anual Efectiva). Suenan similar pero pueden diferir sustancialmente. Entender esta diferencia puede ahorrarte miles de pesos durante la vida de un préstamo.</p><h2>¿Qué es el TIN?</h2><p>El <strong>TIN</strong> es una declaración regulatoria diseñada para facilitar la comparación de préstamos. Expresa el costo del endeudamiento como una tasa anual, pero parte del tipo de interés <em>nominal</em> (declarado), no de la tasa efectiva real.</p><p>El tipo nominal se divide simplemente por el número de períodos de capitalización al año. Para un préstamo con un tipo anual nominal del 12% y capitalización mensual:</p><pre><code>tasa periódica = 0.12 / 12 = 0.01 (1% mensual)</code></pre><p>Pero esto ignora el hecho de que el interés del mes 2 se calcula sobre un saldo que ya incluye el interés del mes 1. Después de 12 meses de interés compuesto al 1% mensual, el costo anual real es superior al 12%.</p><h2>¿Qué es la TAE?</h2><p>La <strong>TAE</strong> (a veces llamada <strong>TAE</strong>) tiene en cuenta el efecto de la capitalización dentro del año. Responde a la pregunta: <em>¿cuál es el costo anual real, incluyendo la capitalización?</em></p><pre><code>TAE = (1 + tipo nominal / períodos)<sup>períodos</sup> &minus; 1</code></pre><p>Para el tipo nominal del 12% con capitalización mensual:</p><pre><code>TAE = (1 + 0.12 / 12)<sup>12</sup> &minus; 1 = 0.1268 (12.68%)</code></pre><p>Esta diferencia del 0,68% puede parecer pequeña, pero se capitaliza a lo largo de una hipoteca a 30 años en intereses adicionales significativos.</p><h2>¿Qué tasa deberías usar?</h2><p>Para la fórmula de anualidades que subyace a la amortización francesa, <strong>la TAE es la tasa correcta</strong>. La fórmula asume tasas periódicas efectivas, y usar el TIN dividido por períodos introduce un error sistemático en el pago calculado.</p><p>Al comparar ofertas de préstamos, siempre pedí la TAE y usala en tus cálculos.</p>',
  articleUnderstandingAmortizationScheduleTitle:
    'Entendiendo Tu Tabla de Amortización',
  articleUnderstandingAmortizationScheduleDescription:
    'Aprendé a leer una tabla de amortización, qué significa cada columna y cómo identificar patrones en el reembolso de tu préstamo a lo largo del tiempo.',
  articleUnderstandingAmortizationScheduleDate: '31 de Marzo de 2026',
  articleUnderstandingAmortizationScheduleBody: `
    <p>Una tabla de amortización es un cuadro que muestra cada pago a lo largo de la vida de un préstamo. Desglosa cada pago en cuánto se destina a intereses, cuánto reduce el capital y cuál es el saldo restante después de cada pago. Entender esta tabla te ayuda a seguir tu progreso real en el pago de la deuda.</p>
    <h2>Las columnas explicadas</h2>
    <p>Cada fila de la tabla representa un pago. Para un préstamo mensual, cada fila corresponde a un mes. Las columnas clave son:</p>
    <ul>
      <li><strong>Número de pago</strong>: La secuencia (1, 2, 3&hellip; n)</li>
      <li><strong>Monto del pago</strong>: El pago mensual fijo (constante en la amortización francesa)</li>
      <li><strong>Porción de intereses</strong>: La parte del pago que se destina a intereses del período</li>
      <li><strong>Porción de capital</strong>: La parte que reduce el saldo pendiente</li>
      <li><strong>Saldo restante</strong>: El monto adeudado después de aplicar el pago</li>
    </ul>
    <h2>Cómo cambian los intereses y el capital</h2>
    <p>En la amortización francesa, el pago es fijo, pero su composición cambia drásticamente con el tiempo. Los pagos tempranos son mayormente intereses; los pagos tardíos son mayormente capital. Esto sucede porque los intereses se calculan sobre el saldo restante, que es más alto al inicio.</p>
    <p>Consideremos los primeros meses de una hipoteca de 200.000 &euro; al 6% TAE durante 30 años (360 pagos mensuales). La tasa periódica es aproximadamente 0,00487 mensual. En el mes 1, los intereses sobre un saldo de 200.000 &euro; son aproximadamente 974 &euro;. Los 373 &euro; restantes del pago reducen el capital. En el mes 180 (año 15), el saldo es mucho menor, por lo que la porción de intereses disminuye y la porción de capital crece correspondientemente.</p>
    <h2>El punto de cruce</h2>
    <p>Hay un punto en cada tabla de amortización donde las porciones de intereses y capital son iguales. Para una hipoteca a 30 años al 6%, esto sucede alrededor del año 12 o 13. Antes de este <strong>punto de cruce</strong>, estás pagando más en intereses que reduciendo capital. Después de él, la reducción del capital se acelera.</p>
    <p>Esto tiene implicaciones prácticas para los pagos extra. Hacer pagos extra antes del punto de cruce tiene un impacto mucho mayor en el total de intereses pagados que los mismos pagos extra realizados más tarde, porque los pagos extra tempranos evitan todos los intereses futuros sobre ese monto.</p>
    <h2>Leyendo tu propia tabla</h2>
    <p>Cuando ejecutás un cálculo en Amorta, la tabla muestra exactamente estas columnas para cada intervalo de pago. Podés ver los intereses acumulados al final de la tabla, lo que te ayuda a entender el costo real del préstamo durante su plazo completo.</p>
    <p>Prestá atención a la columna de intereses en las primeras filas para ver cuánto de tu pago se "desperdicia" en intereses versus la construcción de patrimonio. Esta perspectiva ayuda al evaluar si hacer pagos extra o al comparar ofertas de préstamos.</p>
  `,
  articleExtraPaymentsTitle: 'El Poder de los Pagos Extra',
  articleExtraPaymentsDescription:
    'Aprendé cómo hacer pagos adicionales hacia el capital puede reducir dramáticamente los intereses totales y acortar el plazo de tu préstamo.',
  articleExtraPaymentsDate: '31 de Marzo de 2026',
  articleExtraPaymentsBody: `
    <p>Una de las formas más efectivas de ahorrar dinero en un préstamo es hacer pagos adicionales hacia el capital. Incluso cantidades pequeñas pueden tener un impacto desproporcionado a lo largo del tiempo, quitando años a tu préstamo y miles de pesos en intereses totales pagados.</p>
    <h2>Cómo funcionan los pagos extra</h2>
    <p>En la amortización francesa, cada pago se divide entre intereses y capital. Los intereses se calculan sobre el saldo restante, así que cuando reducís el capital más rápido, menos intereses se acumulan en períodos posteriores.</p>
    <p>Cuando hacés un pago extra, todo el monto va directamente a reducir el capital &mdash; evitando el cálculo normal de intereses para esa porción. Esto significa que no solo ahorrás los intereses de ese pago, sino todos los intereses futuros que se habrían acumulado sobre esa cantidad.</p>
    <p>Cuanto antes hagas pagos extra en el plazo del préstamo, más poderosos se vuelven. Esto es porque los intereses se calculan sobre el saldo restante, que es más alto al inicio del préstamo.</p>
    <h2>Un ejemplo concreto</h2>
    <p>Consideremos una hipoteca de 300.000 &euro; al 6% TAE durante 30 años. El pago mensual es aproximadamente 1.798 &euro;. Sin pagos extra, pagarías 347.200 &euro; en intereses totales durante la vida del préstamo.</p>
    <p>Ahora supongamos que pagás 200 &euro; extra por mes. Después de 30 años, habrías pagado solo 240.600 &euro; en intereses &mdash; un ahorro de más de 106.000 &euro;. Y habrías terminado de pagar el préstamo unos 7 años antes.</p>
    <p>Hacé el mismo pago extra de 200 &euro;, pero esperá hasta el año 15 para comenzar. Los ahorros se reducen a aproximadamente 28.000 &euro; y solo reducís 3 años del plazo. El momento importa enormemente.</p>
    <h2>Tipos de pagos extra</h2>
    <p>Hay dos enfoques principales para los pagos extra:</p>
    <ul>
      <li><strong>Pagos extra recurrentes</strong>: Agregar una cantidad fija a cada pago mensual. Por ejemplo, pagar 1.998 &euro; en lugar de 1.798 &euro; cada mes.</li>
      <li><strong>Pagos extra únicos</strong>: Hacer pagos ocasionales más grandes cuando tenés fondos extra, como devoluciones de impuestos, bonos o herencias.</li>
    </ul>
    <p>Ambos enfoques son efectivos. Los pagos extra recurrentes proporcionan progreso constante y son más fáciles de presupuestar. Los pagos únicos pueden hacer un gran impacto rápidamente cuando hay montos más grandes disponibles.</p>
    <h2>Verificá las penalizaciones por prepago</h2>
    <p>Antes de comprometerte a hacer pagos extra, verificá tu contrato de préstamo por penalizaciones por prepago. Algunos préstamos cobran una tarifa si pagás el préstamo antes de tiempo, lo cual puede compensar los ahorros de intereses. Esto es más común en hipotecas de tasa fija en algunos países, aunque muchos préstamos modernos han eliminado tales penalizaciones.</p>
    <h2>Calculá tus propios números</h2>
    <p>Usá Amorta para modelar cómo los pagos extra afectarían tu préstamo específico. La tabla de amortización facilita ver cómo los pagos extra cambian el saldo a lo largo del tiempo y cuánto interés ahorrás. Incluso un pago extra pequeño puede hacer una diferencia significativa cuando te mantenés constante a lo largo del tiempo.</p>
  `,
  articleBiweeklyVsMonthlyPaymentsTitle:
    'Pagos Quincenales vs Mensuales: ¿Realmente Importa?',
  articleBiweeklyVsMonthlyPaymentsDescription:
    'Explorá si cambiar de pagos mensuales a quincenales realmente ahorra dinero, y comprendé la mecánica detrás de los calendarios de pago más frecuentes.',
  articleBiweeklyVsMonthlyPaymentsDate: '31 de Marzo de 2026',
  footerPrivacyPolicy: 'Política de Privacidad',
  footerAbout: 'Acerca de',
  footerContact: 'Contacto',
  footerTerms: 'Términos y Condiciones',
  privacyPolicyTitle: 'Política de Privacidad',
  privacyIntroductionTitle: 'Introducción',
  privacyIntroductionText:
    'Esta Política de Privacidad describe cómo Amorta ("nosotros", "nos" o "nuestro") recopila, utiliza y protege tu información cuando usás nuestro sitio web. Estamos comprometidos con proteger tu privacidad y garantizar transparencia sobre nuestras prácticas de datos.',
  privacyDataCollectionTitle: 'Datos que Recopilamos',
  privacyDataCollectionText: 'Recopilamos los siguientes tipos de información:',
  privacyDataCollectionPersonal:
    'Información Personal: No recopilamos información personal a menos que nos contactés voluntariamente por correo electrónico.',
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
    'Estos terceros pueden utilizar cookies para mostrar anuncios basados en tus visitas anteriores a este sitio web y otros sitios en Internet. Podés optar por no recibir publicidad personalizada visitando la Configuración de Anuncios de Google.',
  privacyUserRightsTitle: 'Tus Derechos',
  privacyUserRightsText:
    'Tenés derecho a controlar tus datos. Podés desactivar las cookies a través de la configuración de tu navegador en cualquier momento. Tené en cuenta que desactivar las cookies puede afectar la funcionalidad de ciertas características de nuestro sitio web.',
  privacyContactTitle: 'Contactanos',
  privacyContactText:
    'Si tenés alguna pregunta o inquietud sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contactanos en:',
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
    'Amorta es una herramienta informativa y educativa. No proporcionamos asesoramiento financiero. Nuestro objetivo es ayudar a los usuarios a entender la mecánica de la amortización francesa y tomar decisiones informadas. Siempre consultá con un asesor financiero calificado para decisiones financieras personales.',
  contactTitle: 'Contactanos',
  contactMethodsTitle: 'Cómo Contactarnos',
  contactMethodsText:
    'Agradecemos tus comentarios, preguntas y sugerencias. La mejor manera de contactarnos es por correo electrónico:',
  contactResponseTitle: 'Tiempo de Respuesta',
  contactResponseText:
    'Nuestro objetivo es responder a todas las consultas dentro de 2-3 días hábiles. Para problemas técnicos o reportes de errores, por favor incluí detalles sobre tu navegador y dispositivo para ayudarnos a asistirte más efectivamente.',
  termsTitle: 'Términos y Condiciones',
  termsAcceptanceTitle: 'Aceptación de los Términos',
  termsAcceptanceText:
    'Al acceder y usar Amorta, aceptás y te comprometés a cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, por favor no uses nuestro sitio web.',
  termsContentUseTitle: 'Uso del Contenido',
  termsContentUseText:
    'Todo el contenido de Amorta se proporciona únicamente con fines informativos y educativos. Podés usar la calculadora y leer nuestros artículos para uso personal, no comercial. No podés reproducir, distribuir, modificar o crear trabajos derivados de nuestro contenido sin permiso escrito explícito.',
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
    'Leé nuestra Política de Privacidad para entender cómo Amorta recopila, utiliza y protege tu información. Informate sobre cookies, servicios de terceros incluyendo Google AdSense, y tus derechos de privacidad.',
  seoDescriptionAbout:
    'Conocé Amorta, una calculadora gratuita de amortización francesa. Descubrí quiénes somos, lo que ofrecemos y nuestro compromiso con la educación financiera precisa.',
  seoDescriptionContact:
    'Ponete en contacto con el equipo de Amorta. Contactanos por correo electrónico para preguntas, comentarios o soporte sobre nuestra calculadora de amortización francesa.',
  seoDescriptionTerms:
    'Leé nuestros Términos y Condiciones para entender las reglas y regulaciones para usar la calculadora de amortización francesa y el contenido educativo de Amorta.',
  aboutLink: 'Acerca de',
  contactLink: 'Contacto',
  privacyPolicyLink: 'Privacidad',
  termsLink: 'Términos',
  articleLoanTermComparisonTitle:
    'Préstamos a 15 vs 30 Años: Cómo Elegir Correctamente',
  articleLoanTermComparisonDescription:
    'Compará las ventajas y desventajas entre plazos cortos y largos, entendé el impacto en las cuotas mensuales y los intereses totales, y descubrí qué opción se adapta a tu situación financiera.',
  articleLoanTermComparisonDate: '3 de Abril de 2026',
  articleLoanTermComparisonBody: `
    <p>Al financiar una compra importante como una vivienda, una de las decisiones más trascendentales que vas a tomar es la duración del plazo de tu préstamo. Las dos opciones más comunes son los plazos de 15 y 30 años. Cada una tiene ventajas y desventajas distintas que pueden afectar tu vida financiera durante décadas. Entender estas diferencias te ayuda a elegir el camino que se alinea con tus objetivos.</p>
    <h2>El equilibrio fundamental</h2>
    <p>Los plazos más cortos significan cuotas mensuales más altas pero significativamente menos intereses totales pagados. Los plazos más largos distribuyen el mismo principal en más pagos, reduciendo la carga mensual pero aumentando el costo total del préstamo. Esto no es solo aritmética — afecta tu flujo de caja mensual, tu capacidad de ahorrar para otros objetivos y tu flexibilidad financiera general.</p>
    <p>Consideremos una hipoteca de 300.000 &euro; al 6% TAE. Con un plazo de 30 años, tu cuota mensual es de aproximadamente 1.798 &euro;, y vas a pagar unos 347.000 &euro; en intereses totales durante la vida del préstamo. Con un plazo de 15 años, la cuota mensual sube a unos 2.532 &euro;, pero tus intereses totales bajan a unos 155.700 &euro;. Ahorrás más de 191.000 &euro; en intereses, pero tu obligación mensual es 734 &euro; mayor.</p>
    <h2>Cuando tiene sentido un préstamo a 15 años</h2>
    <p>Un préstamo a 15 años es ideal cuando tenés ingresos estables y predecibles y tu presupuesto mensual puede acomodar cómodamente la cuota más alta sin sacrificar el ahorro de emergencia o las aportaciones a la jubilación. Los beneficios van más allá del ahorro en intereses:</p>
    <ul>
      <li><strong>El patrimonio crece más rápido:</strong> Con pagos de capital más altos desde el principio, sos dueño de más de tu vivienda antes. Esto importa si necesitás vender o pedir prestado contra la propiedad.</li>
      <li><strong>Alivio psicológico:</strong> Muchos prestatarios experimentan una reducción significativa del estrés sabiendo que su deuda más grande se eliminará en la mitad de tiempo.</li>
      <li><strong>Calendario de jubilación:</strong> Si planeás jubilarte en menos de 20 años, un préstamo a 15 años garantiza que entres en la jubilación sin pagos de hipoteca.</li>
    </ul>
    <p>El requisito clave es la asequibilidad genuina. Si la cuota más alta te obliga a mantener deuda de tarjeta de crédito, omitir aportaciones a la jubilación o vivir sin un fondo de emergencia adecuado, el plazo de 15 años se vuelve contraproducente.</p>
    <h2>Cuando un préstamo a 30 años es la mejor opción</h2>
    <p>Un préstamo a 30 años proporciona cuotas mensuales más bajas, lo que crea margen de maniobra financiero. Esta flexibilidad es valiosa en varias situaciones:</p>
    <ul>
      <li><strong>Variabilidad de ingresos:</strong> Si tus ingresos fluctúan estacionalmente o trabajás en una industria volátil, los pagos obligatorios más bajos reducen el riesgo.</li>
      <li><strong>Etapas iniciales de carrera:</strong> Los jóvenes profesionales con fuerte potencial de crecimiento de ingresos pueden preferir pagos más bajos ahora, planeando hacer pagos extra a medida que aumenten los ingresos.</li>
      <li><strong>Oportunidades de inversión:</strong> El ahorro mensual puede dirigirse a cuentas de jubilación con ventajas fiscales u otras inversiones que pueden generar rendimientos superiores al tipo del préstamo.</li>
    </ul>
    <p>El plazo de 30 años también funciona como seguro contra contratiempos financieros. Si perdés tu empleo o enfrentás gastos inesperados, los pagos obligatorios más bajos son más fáciles de gestionar que el calendario rígido de un préstamo a 15 años.</p>
    <h2>El costo oculto de la flexibilidad</h2>
    <p>El riesgo principal de un préstamo a 30 años es conductual. Muchos prestatarios pretenden hacer pagos extra pero no logran seguir adelante consistentemente. La vida interviene, y el dinero extra se gasta en otras cosas. A lo largo de 30 años, esta inacción cuesta decenas de miles en intereses innecesarios.</p>
    <p>Si elegís un préstamo a 30 años, considerá automatizar los pagos extra de capital. Configurá transferencias automáticas por la cantidad que habrías pagado en un calendario a 15 años. Esto elimina el requisito de fuerza de voluntad y captura la mayor parte del ahorro en intereses mientras preserva la flexibilidad de reducir o pausar los pagos extra en tiempos difíciles.</p>
    <h2>Diferencias en los tipos de interés</h2>
    <p>Los prestamistas típicamente ofrecen tipos más bajos para préstamos a 15 años porque conllevan menos riesgo. El plazo más corto significa menos tiempo para que las condiciones económicas cambien, y las cuotas mensuales más altas indican una posición financiera del prestatario más sólida. Una diferencia de tipo del 0,25% al 0,75% es común.</p>
    <p>Esta ventaja de tipo potencia los ahorros del plazo más corto. Usando nuestro ejemplo anterior, si el tipo a 15 años es del 5,5% en lugar del 6%, la cuota mensual baja a unos 2.452 &euro; y los intereses totales caen a unos 141.400 &euro; — un ahorro adicional de 14.300 &euro; comparado con el mismo plazo al 6%.</p>
    <h2>Calculá tus propios números</h2>
    <p>Usá Amorta para modelar ambos escenarios con los parámetros reales de tu préstamo. Compará no solo la cuota y los intereses totales, sino también examiná cuán rápido acumulás patrimonio en cada escenario. El calendario de amortización revela exactamente cuándo ocurre el punto de cruce — cuando los pagos de capital superan los pagos de intereses — que sucede mucho antes con un préstamo a 15 años.</p>
    <p>No existe una elección universalmente correcta. El plazo adecuado depende de tu estabilidad de ingresos, otros objetivos financieros, tolerancia al riesgo y disciplina con los fondos discrecionales. Lo que importa es tomar la decisión conscientemente en lugar de optar por defecto a la opción de 30 años simplemente porque la cuota mensual es más baja.</p>
  `,
  articleLoanTermComparisonSeoTitle:
    'Préstamos a 15 vs 30 Años: Cómo Elegir Correctamente | Amorta',
  articleLoanTermComparisonSeoDescription:
    'Compará préstamos a 15 y 30 años. Entendé el equilibrio entre cuotas mensuales e intereses totales para elegir la hipoteca adecuada para tu situación financiera.',
  articleBiweeklyVsMonthlyPaymentsBody: `
    <p>Algunos prestamistas ofrecen planes de pago quincenal como una forma de pagar tu hipoteca más rápido. La idea suena atractiva: en lugar de hacer 12 pagos al año, hacés 26 &mdash; efectivamente un pago mensual extra por año sin notarlo. Pero ¿realmente funciona y vale la pena el cambio?</p>
    <h2>Cómo funcionan los pagos quincenales</h2>
    <p>Con un calendario de pago mensual, pagás tu hipoteca 12 veces al año. Con quincenal, pagás la mitad de tu pago mensual cada dos semanas. Como hay 52 semanas en un año, esto resulta en 26 pagos &mdash; o 13 equivalentes mensuales completos por año.</p>
    <p>Ese pago extra va directamente al capital, evitando los intereses. A lo largo de una hipoteca a 30 años, esto puede reducir de 4 a 5 años del plazo del préstamo y ahorrar decenas de miles en intereses.</p>
    <h2>La matemática detrás</h2>
    <p>Consideremos una hipoteca de 300.000 &euro; al 6% TAE durante 30 años. El pago mensual es aproximadamente 1.798 &euro;.</p>
    <p>Con pagos mensuales, hacés 360 pagos totalizando 647.200 &euro; &mdash; de los cuales 347.200 &euro; son intereses.</p>
    <p>Con pagos quincenales de 899 &euro; (la mitad del monto mensual), hacés 26 pagos por año. El extra de 1.798 &euro; por año reduce el capital más rápido. Terminás pagando el préstamo en unos 26 años en lugar de 30, ahorrando aproximadamente 45.000 &euro; en intereses totales.</p>
    <h2>Cuidado con las comisiones</h2>
    <p>Algunos prestamistas cobran comisiones de configuración o transacción por programas de pago quincenal, especialmente servicios de terceros que gestionan el calendario. Estas comisiones pueden superar fácilmente los ahorros de intereses. Antes de inscribirte, calculá si el costo inicial vale el beneficio.</p>
    <p>También verificá que los pagos extra se apliquen directamente al capital, no se retengan como prepago de seguro. Algunos prestamistas pueden no procesarlos correctamente.</p>
    <h2>La estrategia equivalente</h2>
    <p>Acá está la idea clave: un pago quincenal es matemáticamente equivalente a hacer un pago mensual extra por año. Si podés presupuestarlo, simplemente agregar 1/12 de tu pago mensual a cada pago mensual logra el mismo resultado &mdash; sin ninguna participación del prestamista ni comisiones.</p>
    <p>Por ejemplo, agregá 150 &euro; a tu pago mensual de 1.798 &euro; (1.948 &euro; total) y obtenés el mismo beneficio que un calendario quincenal. Este enfoque es más flexible porque vos controlás el monto extra y podés ajustarlo según sea necesario.</p>
    <h2>Cuando tiene sentido lo quincenal</h2>
    <p>Los pagos quincenales pueden ser convenientes si te pagan quincenalmente y querés que tu pago de hipoteca se alinee con tu ciclo de ingresos. Esta sincronización puede facilitar la elaboración del presupuesto y garantizar que el pago se realice a tiempo.</p>
    <p>También ayudan si te cuesta ahorrar lo suficiente para un pago extra de suma global. Distribuir el extra en pagos más pequeños y frecuentes se siente menos doloroso para algunos borrowers.</p>
    <h2>Calculá tus propios números</h2>
    <p>Usá Amorta para comparar mensualmente versus quincenalmente lado a lado. La diferencia en intereses totales pagados y el plazo del préstamo hace claros los compromisos, para que puedas decidir si un plan quincenal o un simple pago mensual extra funciona mejor para tu situación.</p>
  `,
}
