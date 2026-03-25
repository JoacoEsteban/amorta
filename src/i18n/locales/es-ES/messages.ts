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
  paymentAmountOptionalOverride: 'Monto del pago (anulación opcional)',
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
    'Deshabilitado mientras se proporciona un monto de pago. La app deriva la TAE de ese pago.',
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
    'Se muestra una vista previa del gráfico pre-renderizado. El gráfico interactivo se hidrata justo después de cargar.',
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
    'Revisa un resultado de amortización francesa de solo lectura, inspecciona el desglose de cuotas, y continúa el cálculo en Amorta.',
  seoDescriptionUnavailable:
    'El resultado compartido de Amorta solicitado no está disponible. Regresa a la calculadora para crear o inspeccionar un calendario de amortización válido.',
  frequencyOnePayment: '1 pago / año',
  frequencyThreePayments: '3 pagos / año',
  frequencySixPayments: '6 pagos / año',
  frequencyTwelvePayments: '12 pagos / año',
}
