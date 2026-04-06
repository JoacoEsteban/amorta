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

export const frFRMessages = {
  sharedResult: 'Résultat partagé',
  liveCalculator: 'Calculateur en direct',
  sharedFrenchAmortizationResult: "Résultat d'amortissement français partagé",
  frenchAmortizationCalculator: "Calculateur d'amortissement français",
  reviewSharedResultSummary:
    "Consultez le tableau de remboursement, comparez le capital et les intérêts pour chaque quota, et copiez l'URL du résultat partagé.",
  modelFrenchLoanSummary:
    "Modélisez un prêt de style français, inversez un paiement en son taux annuel effectif, et examinez le tableau d'amortissement visuellement.",
  shareResult: 'Partager le résultat',
  sharedInputs: 'Données partagées',
  frenchMortgageInputs: 'Données de prêt français',
  sharedInputsDescription:
    "Ces valeurs proviennent d'un résultat partagé et ne peuvent pas être modifiées directement.",
  changeValueDescription:
    "Modifiez n'importe quelle valeur et le tableau d'amortissement se recalcule immédiatement.",
  loanAmount: 'Montant du prêt',
  timeInYears: 'Durée en années',
  paymentsPerYear: 'Paiements par an',
  effectiveAnnualRate: 'Taux annuel effectif',
  paymentAmountOptionalOverride: 'Montant du paiement (remplacement optionnel)',
  placeholderLoanAmount: '250000',
  placeholderYears: '30',
  placeholderEar: '0,12',
  placeholderPaymentAmount: 'Laissez vide pour calculer le paiement',
  loadingSharedResult: 'Chargement du résultat partagé',
  calculatedAutomatically: 'Calculé automatiquement',
  waitingForValidInputs: 'En attente de données valides',
  fieldNoteReadonly:
    'Ce résultat partagé ne peut pas être modifié ici. Utilisez « Modifier ce résultat » pour continuer à partir de ces valeurs.',
  fieldNoteEarDisabled:
    "Désactivé lorsqu'un montant de paiement est fourni. L'application calcule le TAE à partir de ce paiement.",
  fieldNoteEarFormat:
    'Utilisez le format décimal. Exemple : 0,12 signifie un taux annuel effectif de 12 %.',
  fieldNotePaymentOverride:
    'Remplissez ce champ pour passer en mode paiement et calculer le TAE dynamiquement.',
  startNewCalculation: 'Nouveau calcul',
  editThisResult: 'Modifier ce résultat',
  openCalculator: 'Ouvrir le calculateur',
  collapseAll: 'Tout réduire',
  expandAll: 'Tout développer',
  activePayment: 'Paiement actif',
  activeEAR: 'TAE actif',
  repaymentHorizon: 'Horizon de remboursement',
  installmentsAtRate: '{count} échéances à {rate}/an',
  amortizationGraph: "Graphique d'amortissement",
  chartPendingSharedResult:
    "L'aperçu du résultat partagé est en cours de chargement. Le graphique interactif apparaîtra une fois les données de l'URL résolues.",
  chartPrerendered:
    'Un aperçu du graphique prérendu est affiché immédiatement. Le graphique interactif devient disponible juste après le chargement.',
  chartInteractive:
    'Le capital et les intérêts sont empilés pour chaque quota, avec un point zéro final ajouté pour la clôture.',
  chartCannotGraph: 'Le tableau ne peut pas encore être affiché.',
  loadingSharedAmortization: "Chargement du résultat d'amortissement partagé",
  loadingSharedAmortizationSubtitle:
    'Le résultat partagé est en cours de chargement. Le tableau et le graphique apparaîtront sous peu.',
  amortizationSchedule: "Tableau d'amortissement",
  scheduleExpandDescription:
    'Développez chaque année pour voir la répartition détaillée des paiements.',
  loanAmountMetric: 'Montant du prêt',
  totalInterestMetric: 'Intérêts totaux',
  totalPaidMetric: 'Total payé',
  principal: 'Capital',
  ofTotalPaid: '{percent} du total payé',
  principalRepaid: '{multiplier}x le capital remboursé',
  yearMarker: 'Année {year}',
  yearSectionPayments:
    'Année {year} ({count} {count, plural, one {paiement} other {paiements}})',
  tableHeaderQuota: 'N°',
  tableHeaderPayment: 'Paiement',
  tableHeaderPrincipal: 'Capital',
  tableHeaderInterest: 'Intérêts',
  tableHeaderBalance: 'Solde',
  quotaTooltip: 'Quota {quota}',
  tooltipTotal: 'Total',
  tooltipPrincipal: 'Capital',
  tooltipInterest: 'Intérêts',
  sharedResultUnavailable: 'Résultat partagé indisponible',
  noSharedResultFound: 'Aucun résultat partagé trouvé',
  thisSharedResultIsInvalid: 'Ce résultat partagé est invalide',
  validResultRequired:
    'Un résultat partagé valide est requis avant de pouvoir le partager à nouveau.',
  clipboardUnavailable: "L'accès au presse-papiers n'est pas disponible ici.",
  shareUrlCopied: 'URL de partage copiée dans le presse-papiers.',
  shareUrlCopyFailed: "L'URL de partage n'a pas pu être copiée.",
  loadingSharedResultTooltip:
    'Le résultat partagé doit finir de charger avant de pouvoir être copié.',
  mustBeValidNumber: '{label} doit être un nombre valide',
  mustBeGreaterThanZero: '{label} doit être supérieur à 0',
  mustBeZeroOrGreater: '{label} doit être supérieur ou égal à 0',
  isRequired: '{label} est requis',
  timeInYearsMustBeWhole:
    'La durée en années doit produire un nombre entier de paiements pour la fréquence sélectionnée',
  paymentAmountMustBeAtLeast:
    "Le montant du paiement doit être d'au moins {minimum} pour le prêt et la durée sélectionnés",
  cannotSolveEAR:
    'Impossible de résoudre le taux annuel effectif pour ce montant de paiement',
  earIsRequired: 'Le taux annuel effectif est requis',
  paymentIsRequired: 'Le montant du paiement est requis',
  loanInputsIncomplete: 'Les données du prêt sont incomplètes',
  noSharedResultProvided: "Aucun résultat partagé n'a été fourni dans l'URL.",
  sharedResultCouldNotBeDecoded: "Le résultat partagé n'a pas pu être décodé.",
  sharedResultNotValidJSON: "Le résultat partagé n'est pas un JSON valide.",
  sharedResultInvalidFormat:
    'Le résultat partagé ne correspond pas au format de données attendu.',
  loadingSharedResultFromURL: "Chargement du résultat partagé depuis l'URL.",
  seoTitleIndex: "Amorta | Calculateur d'amortissement français",
  seoTitleResult: 'Résultat partagé | Amorta',
  seoTitleUnavailable: 'Résultat partagé indisponible | Amorta',
  seoDescription:
    "Amorta est un calculateur d'amortissement français interactif avec résultats partageables, inversion paiement-taux, et une répartition visuelle capital-intérêts.",
  seoDescriptionShare:
    "Consultez un résultat d'amortissement français en lecture seule, examinez la répartition des quotas, et continuez le calcul dans Amorta.",
  seoDescriptionUnavailable:
    "Le résultat partagé demandé est indisponible. Retournez au calculateur pour créer ou examiner un tableau d'amortissement valide.",
  frequencyOnePayment: '1 paiement / an',
  frequencyThreePayments: '3 paiements / an',
  frequencySixPayments: '6 paiements / an',
  frequencyTwelvePayments: '12 paiements / an',
  madeBy: 'Créé par',
  exportSchedule: 'Exporter le tableau',
  exportScheduleDescription:
    "Téléchargez le tableau d'amortissement dans votre format préféré.",
  downloadCsv: 'Tableur CSV',
  downloadCsvDetail:
    'Nombres localisés, toutes les lignes avec en-têtes de colonnes',
  downloadJson: 'Données JSON',
  downloadJsonDetail:
    'Structure complète des données avec entrées et résultats',
  cancel: 'Annuler',
  aboutFrenchAmortization: "À propos de l'amortissement français",
  aboutFrenchAmortizationDescription:
    "Concepts clés et terminologie pour comprendre comment fonctionne l'amortissement français.",
  eduWhatTrigger: "Qu'est-ce que l'amortissement français ?",
  eduWhatBody,
  eduHowTrigger: 'Comment fonctionnent les mathématiques ?',
  eduHowBody,
  eduTermsTrigger: 'Terminologie clé',
  eduTermsBody,
  eduWhenTrigger: 'Quand ce calculateur est-il utile ?',
  eduWhenBody,
  blog: 'Blog',
  articles: 'Articles',
  blogIndexTitle: 'Articles',
  blogIndexDescription:
    "Explications approfondies de l'amortissement français, des conventions de taux, et des mathématiques financières.",
  backToCalculator: 'Retour au calculateur',
  backToBlog: 'Retour aux articles',
  articleNotFound: 'Article non trouvé',
  relatedArticlesTitle: 'Articles Connexes',
  relatedArticlesDescription:
    "Poursuivez avec des sujets proches pour comparer les mécanismes de remboursement, les notions de taux, et les arbitrages pratiques autour d'un prêt.",
  articleCtaText: 'Prêt à faire votre propre calcul ?',
  seoTitleBlogIndex: 'Articles | Amorta',
  seoDescriptionBlogIndex:
    "Lisez des articles approfondis sur l'amortissement français, les taux annuels effectifs, et les mathématiques derrière les prêts à paiement constant.",
  articleMathTitle: "Les mathématiques derrière l'amortissement français",
  articleMathDescription:
    "Une plongée approfondie dans la formule d'annuité, la conversion de taux périodique, et comment chaque paiement se divise entre capital et intérêts sur la durée de vie d'un prêt français.",
  articleMathDate: '25 mars 2026',
  articleMathBody,
  articleAprVsEarTitle: 'TAEG vs TAE : Pourquoi la différence compte',
  articleAprVsEarDescription:
    'Comprenez la différence entre le TAEG nominal et le taux annuel effectif, et apprenez pourquoi le TAE est le bon taux à utiliser dans les calculs financiers.',
  articleAprVsEarDate: '31 mars 2026',
  articleAprVsEarBody,
  articleUnderstandingAmortizationScheduleTitle:
    "Comprendre votre tableau d'amortissement",
  articleUnderstandingAmortizationScheduleDescription:
    "Apprenez à lire un tableau d'amortissement, ce que signifie chaque colonne, et comment identifier les tendances dans votre remboursement au fil du temps.",
  articleUnderstandingAmortizationScheduleDate: '31 mars 2026',
  articleUnderstandingAmortizationScheduleBody,
  articleExtraPaymentsTitle: 'Le pouvoir des paiements supplémentaires',
  articleExtraPaymentsDescription:
    'Apprenez comment des paiements supplémentaires vers votre capital peuvent réduire considérablement les intérêts totaux et raccourcir la durée de votre prêt.',
  articleExtraPaymentsDate: '31 mars 2026',
  articleExtraPaymentsBody,
  articleBiweeklyVsMonthlyPaymentsTitle:
    'Paiements bihebdomadaires vs mensuels : Est-ce vraiment important ?',
  articleBiweeklyVsMonthlyPaymentsDescription:
    "Explorez si passer des paiements mensuels aux paiements bihebdomadaires économise réellement de l'argent, et comprenez les mécanismes derrière les échéanciers de paiement plus fréquents.",
  articleBiweeklyVsMonthlyPaymentsDate: '31 mars 2026',
  footerPrivacyPolicy: 'Politique de confidentialité',
  footerAbout: 'À propos',
  footerContact: 'Contact',
  footerTerms: 'Conditions générales',
  privacyPolicyTitle: 'Politique de confidentialité',
  privacyIntroductionTitle: 'Introduction',
  privacyIntroductionText:
    'Cette Politique de confidentialité décrit comment Amorta (« nous », « notre » ou « nos ») collecte, utilise et protège vos informations lorsque vous utilisez notre site web. Nous nous engageons à protéger votre vie privée et à assurer la transparence sur nos pratiques de données.',
  privacyDataCollectionTitle: 'Données que nous collectons',
  privacyDataCollectionText:
    "Nous collectons les types d'informations suivants :",
  privacyDataCollectionPersonal:
    "Informations personnelles : Nous ne collectons pas d'informations personnelles sauf si vous nous contactez volontairement par email.",
  privacyDataCollectionNonPersonal:
    "Informations non personnelles : Nous collectons automatiquement le type de navigateur, l'adresse IP, les informations sur l'appareil, et les modèles d'utilisation via des cookies et des outils d'analyse.",
  privacyDataUsageTitle: 'Comment nous utilisons vos données',
  privacyDataUsageText:
    'Nous utilisons les informations collectées aux fins suivantes :',
  privacyDataUsageAnalytics:
    "Analyses : Pour comprendre comment les visiteurs utilisent notre site et améliorer l'expérience utilisateur",
  privacyDataUsageCommunication:
    'Communication : Pour répondre aux demandes envoyées par email',
  privacyDataUsageImprovement:
    'Amélioration du site : Pour identifier et résoudre les problèmes techniques et améliorer les fonctionnalités',
  privacyCookiesTitle: 'Cookies',
  privacyCookiesText:
    'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à comprendre le comportement et les préférences des utilisateurs.',
  privacyCookiesPurpose:
    'Nos cookies sont utilisés pour : mémoriser vos préférences, analyser le trafic du site, et diffuser des publicités personnalisées via des services tiers.',
  privacyThirdPartyTitle: 'Services tiers',
  privacyThirdPartyText:
    'Nous utilisons des services tiers pour améliorer la fonctionnalité et la monétisation de notre site web.',
  privacyThirdPartyAdsense:
    "Google AdSense : Nous affichons des publicités servies par Google AdSense. Google peut utiliser des cookies et des balises web pour collecter des données sur vos visites sur ce site et d'autres sites web.",
  privacyThirdPartyCookies:
    "Ces tiers peuvent utiliser des cookies pour diffuser des publicités basées sur vos visites antérieures sur ce site web et d'autres sites sur Internet. Vous pouvez refuser la publicité personnalisée en visitant les paramètres de Google Ads.",
  privacyUserRightsTitle: 'Vos droits',
  privacyUserRightsText:
    'Vous avez le droit de contrôler vos données. Vous pouvez désactiver les cookies via les paramètres de votre navigateur à tout moment. Veuillez noter que la désactivation des cookies peut affecter les fonctionnalités de certaines caractéristiques de notre site web.',
  privacyContactTitle: 'Contactez-nous',
  privacyContactText:
    'Si vous avez des questions ou des préoccupations concernant cette Politique de confidentialité ou nos pratiques de données, veuillez nous contacter à :',
  contactEmail: 'support@joaco.io',
  aboutTitle: "À propos d'Amorta",
  aboutIdentityTitle: 'Qui nous sommes',
  aboutIdentityText:
    "Amorta est un projet indépendant créé et maintenu par joaco.io. Je suis un développeur solo passionné par la création d'outils financiers accessibles et faciles à comprendre pour tout le monde.",
  aboutPurposeTitle: 'Ce que nous fournissons',
  aboutPurposeText:
    "Amorta fournit un calculateur d'amortissement français gratuit et interactif qui aide les utilisateurs à comprendre les échéanciers de remboursement de prêts, à visualiser la répartition capital-intérêts, et à comparer différents scénarios de prêts. Nos outils sont conçus pour donner aux utilisateurs des calculs financiers clairs et précis.",
  aboutAudienceTitle: "À qui s'adresse notre contenu",
  aboutAudienceText:
    "Notre contenu est conçu pour toute personne intéressée par la compréhension de l'amortissement de prêts, y compris : les acheteurs de maison comparant les options hypothécaires, les étudiants en finance apprenant les méthodes d'amortissement, les professionnels de l'immobilier ayant besoin de calculs rapides, et toute personne planifiant un achat important nécessitant un prêt.",
  aboutCredibilityTitle: 'Notre expertise',
  aboutCredibilityText:
    "Bien que nous ne soyons pas une institution financière, notre calculateur est construit sur des mathématiques financières établies et minutieusement testé selon les normes de l'industrie. Nous nous engageons pour la précision et la transparence dans tous nos calculs et explications.",
  aboutTransparencyTitle: 'Intention éditoriale',
  aboutTransparencyText:
    "Amorta est un outil d'information et d'éducation. Nous ne fournissons pas de conseils financiers. Notre objectif est d'aider les utilisateurs à comprendre les mécanismes de l'amortissement français et à prendre des décisions éclairées. Consultez toujours un conseiller financier qualifié pour les décisions financières personnelles.",
  contactTitle: 'Contactez-nous',
  contactMethodsTitle: 'Comment nous joindre',
  contactMethodsText:
    'Nous accueillons vos commentaires, questions et suggestions. Le meilleur moyen de nous contacter est par email :',
  contactResponseTitle: 'Délai de réponse',
  contactResponseText:
    'Nous visons à répondre à toutes les demandes dans un délai de 2-3 jours ouvrables. Pour les problèmes techniques ou les rapports de bogues, veuillez inclure des détails sur votre navigateur et appareil pour nous aider à vous assister plus efficacement.',
  termsTitle: 'Conditions générales',
  termsAcceptanceTitle: 'Acceptation des conditions',
  termsAcceptanceText:
    "En accédant et en utilisant Amorta, vous acceptez et vous engagez à respecter ces Conditions générales. Si vous n'êtes pas d'accord avec une partie de ces conditions, veuillez ne pas utiliser notre site web.",
  termsContentUseTitle: 'Utilisation du contenu',
  termsContentUseText:
    "Tout le contenu sur Amorta est fourni uniquement à des fins d'information et d'éducation. Vous pouvez utiliser le calculateur et lire nos articles pour un usage personnel, non commercial. Vous ne pouvez pas reproduire, distribuer, modifier ou créer des œuvres dérivées de notre contenu sans autorisation écrite explicite.",
  termsIntellectualPropertyTitle: 'Propriété intellectuelle',
  termsIntellectualPropertyText:
    "Tout le contenu, le code, les éléments de design et les fonctionnalités de ce site web sont la propriété d'Amorta et de ses créateurs. Cela inclut mais ne se limite pas au texte, graphiques, logos, icônes, images, clips audio, téléchargements numériques et logiciels.",
  termsLiabilityTitle: 'Limitation de responsabilité',
  termsLiabilityText:
    "Amorta fournit ses outils et contenu « en l'état » sans garanties d'aucune sorte. Bien que nous nous efforcions d'assurer l'exactitude, nous ne garantissons pas que les résultats de notre calculateur sont sans erreur ou adaptés à votre situation spécifique. Nous ne sommes pas responsables des décisions financières prises sur la base des informations de ce site web.",
  termsExternalLinksTitle: 'Liens externes',
  termsExternalLinksText:
    "Notre site web peut contenir des liens vers des sites web tiers. Nous n'avons aucun contrôle sur ces sites et déclinons toute responsabilité pour leur contenu, leurs politiques de confidentialité ou leurs pratiques.",
  termsModificationsTitle: 'Modifications des conditions',
  termsModificationsText:
    "Nous nous réservons le droit de modifier ces Conditions générales à tout moment. Les changements prendront effet immédiatement après leur publication sur cette page. Votre utilisation continue du site web après tout changement constitue l'acceptation des nouvelles conditions.",
  seoTitlePrivacyPolicy: 'Politique de confidentialité | Amorta',
  seoTitleAbout: 'À propos | Amorta',
  seoTitleContact: 'Contact | Amorta',
  seoTitleTerms: 'Conditions générales | Amorta',
  seoDescriptionPrivacyPolicy:
    'Lisez notre Politique de confidentialité pour comprendre comment Amorta collecte, utilise et protège vos informations. Apprenez-en plus sur les cookies, les services tiers incluant Google AdSense, et vos droits de confidentialité.',
  seoDescriptionAbout:
    "Découvrez Amorta, un calculateur d'amortissement français gratuit. Apprenez qui nous sommes, ce que nous fournissons, et notre engagement envers une éducation financière précise.",
  seoDescriptionContact:
    "Contactez l'équipe Amorta. Écrivez-nous par email pour toute question, remarque ou demande d'aide concernant notre calculateur d'amortissement français.",
  seoDescriptionTerms:
    "Lisez nos Conditions générales pour comprendre les règles applicables à l'utilisation du calculateur d'amortissement français et du contenu éducatif d'Amorta.",
  aboutLink: 'À propos',
  contactLink: 'Contact',
  privacyPolicyLink: 'Confidentialité',
  termsLink: 'Conditions',
  articleLoanTermComparisonTitle:
    'Prêts de 15 ans vs 30 ans : Faire le bon choix',
  articleLoanTermComparisonDescription:
    "Comparez les compromis entre les durées de prêt plus courtes et plus longues, comprenez l'impact sur les paiements mensuels et les intérêts totaux, et apprenez quelle option correspond à votre situation financière.",
  articleLoanTermComparisonDate: '3 avril 2026',
  articleLoanTermComparisonBody,
  articleLoanTermComparisonSeoTitle:
    'Prêts de 15 ans vs 30 ans : Faire le bon choix | Amorta',
  articleLoanTermComparisonSeoDescription:
    'Comparez les durées de prêt de 15 et 30 ans. Comprenez les compromis entre paiements mensuels et intérêts totaux pour choisir la bonne hypothèque pour votre situation financière.',
  articleBiweeklyVsMonthlyPaymentsBody,
  articleCalculatingRemainingLoanBalanceTitle:
    'Comment calculer votre solde de prêt restant à tout moment',
  articleCalculatingRemainingLoanBalanceDescription:
    "Apprenez les formules mathématiques et méthodes pour calculer votre solde de prêt exact à n'importe quel point pendant le remboursement, y compris des exemples pratiques et les pièges courants à éviter.",
  articleCalculatingRemainingLoanBalanceDate: '6 avril 2026',
  articleCalculatingRemainingLoanBalanceBody,
  articleCalculatingRemainingLoanBalanceSeoTitle:
    'Comment calculer votre solde de prêt restant à tout moment | Amorta',
  articleCalculatingRemainingLoanBalanceSeoDescription:
    "Apprenez les formules mathématiques pour calculer votre solde de prêt exact à n'importe quel moment. Comprenez les méthodes prospective et rétrospective avec des exemples pratiques.",
  articleFactorsAffectingMortgageRatesTitle:
    "Les facteurs qui affectent votre taux d'intérêt hypothécaire",
  articleFactorsAffectingMortgageRatesDescription:
    "Apprenez les facteurs clés que les prêteurs considèrent lors de l'établissement des taux hypothécaires, des scores de crédit aux conditions du marché, et comment vous pouvez améliorer votre taux.",
  articleFactorsAffectingMortgageRatesDate: '6 avril 2026',
  articleFactorsAffectingMortgageRatesBody,
  articleFactorsAffectingMortgageRatesSeoTitle:
    "Les facteurs qui affectent votre taux d'intérêt hypothécaire | Amorta",
  articleFactorsAffectingMortgageRatesSeoDescription:
    "Découvrez quels facteurs affectent votre taux d'intérêt hypothécaire. Apprenez comment les scores de crédit, les ratios prêt-valeur, les ratios dette-revenu, et les conditions du marché influencent votre taux.",
  articleNegativeAmortizationTitle: "Qu'est-ce que l'Amortissement Négatif ?",
  articleNegativeAmortizationDescription:
    "Découvrez ce qu'est l'amortissement négatif, pourquoi un solde peut augmenter après un paiement, et quelles clauses contractuelles le provoquent le plus souvent.",
  articleNegativeAmortizationDate: '6 avril 2026',
  articleNegativeAmortizationBody,
  articleNegativeAmortizationSeoTitle:
    "Qu'est-ce que l'Amortissement Négatif ? | Amorta",
  articleNegativeAmortizationSeoDescription:
    "L'amortissement négatif ajoute les intérêts impayés au solde du prêt. Découvrez son fonctionnement, le risque de choc de paiement, et comment l'identifier tôt.",
}
