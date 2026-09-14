import { decisionCatalog, stages, variantLabels } from "@/lib/mock-data";
import { decisionRules } from "@/lib/rules";
import type { Variant } from "@/lib/types";
import type { Language } from "./LanguageContext";

type DecisionText = { title: string; text: string; immediateEffectText: string };
type StageText = { title: string; caseDevelopment: string };

const enDecisions: Record<string, DecisionText> = Object.fromEntries(
  decisionCatalog.map((d) => [d.code, { title: d.title, text: d.text, immediateEffectText: d.immediateEffectText }]),
);
const enStages: Record<number, StageText> = Object.fromEntries(
  stages.map((s) => [s.number, { title: s.title, caseDevelopment: s.caseDevelopment }]),
);
const enRuleExplanations: Record<string, string> = Object.fromEntries(
  decisionRules.map((r) => [r.decisionCode, r.confidentialExplanation]),
);

const esDecisions: Record<string, DecisionText> = {
  U1: { title: "Cuenta dedicada del proyecto", text: "Establecer una cuenta dedicada del proyecto con autorización dual para desembolsos, transferencias y conciliaciones.", immediateEffectText: "Se establece una cuenta dedicada del proyecto y los controles aumentan de inmediato." },
  U2: { title: "Exigencia de informes trimestrales", text: "Exigir informes trimestrales documentados sobre el uso del pago anticipado y las fuentes y aplicaciones de fondos asociadas.", immediateEffectText: "Las obligaciones de informar fortalecen el rastro probatorio para las revisiones de garantías y recuperación." },
  U3: { title: "Reducciones condicionales de la garantía", text: "Condicionar toda reducción de la Garantía de Pago Anticipado a evidencia de amortización y confirmación escrita de ERAP.", immediateEffectText: "El proceso de reducción de la garantía queda más controlado y menos expuesto a liberaciones no controladas." },
  U4: { title: "Revisión técnica independiente", text: "Encargar una revisión técnica independiente del presupuesto y el cronograma antes de aprobar cambios importantes.", immediateEffectText: "El análisis de riesgo técnico y de retrasos mejora la disciplina temprana de suscripción." },
  U5: { title: "Garantía bancaria irrevocable", text: "Exigir una garantía bancaria irrevocable de USD 15 millones vinculada a la Garantía de Pago Anticipado.", immediateEffectText: "Se crea colateral adicional para respaldar la exposición del pago anticipado." },
  U6: { title: "Prima inicial adicional", text: "Cobrar una prima inicial adicional del 10% para reflejar el mayor riesgo de suscripción y monitoreo.", immediateEffectText: "La base de la prima aumenta desde el inicio para reflejar el perfil de riesgo." },

  A1: { title: "Aumentar la prima de extensión", text: "Aumentar la prima de extensión en un 15% para reflejar el riesgo modificado y el cronograma enmendado.", immediateEffectText: "La prima de la cartera aumenta con la extensión y el mayor nivel de exposición." },
  A2: { title: "Aporte de capital", text: "Exigir un aporte de capital de USD 25 millones a la cuenta del proyecto.", immediateEffectText: "Se introduce una medida material de respaldo a la cuenta del proyecto." },
  A3: { title: "Contraindemnización directa de Mediterranea", text: "Exigir una contraindemnización directa de Mediterranea con un tope de USD 25 millones.", immediateEffectText: "Se preserva un derecho de reclamación directo contra el miembro del consorcio con responsabilidad directa." },
  A4: { title: "Control conjunto sobre desembolsos", text: "Establecer un control conjunto sobre los nuevos desembolsos y las transferencias entre empresas para limitar la fuga de fondos.", immediateEffectText: "Se refuerzan los controles sobre los movimientos de caja del proyecto y las transferencias entre partes relacionadas." },
  A5: { title: "Bloquear reducciones de la garantía", text: "Bloquear nuevas reducciones de la Garantía de Pago Anticipado hasta que el pago anticipado esté totalmente conciliado.", immediateEffectText: "La exposición de la Garantía de Pago Anticipado se preserva hasta contar con respaldo claro para cada reducción." },
  A6: { title: "Coaseguro de la garantía de cumplimiento", text: "Colocar el 20% del incremento de la Garantía de Cumplimiento en coaseguro.", immediateEffectText: "Parte del incremento de la exposición de la garantía se comparte con las coaseguradoras." },

  R1: { title: "Auditoría forense", text: "Encargar una auditoría forense de los USD 30 millones con documentación de respaldo incompleta.", immediateEffectText: "Se inicia una revisión detallada de documentación y controles para respaldar la disciplina de recuperación y reserva." },
  R2: { title: "Restituir la cuenta del proyecto", text: "Exigir que se restituyan USD 12 millones a la cuenta del proyecto.", immediateEffectText: "El efectivo se restituye a la cuenta controlada y queda blindado para respaldar los reclamos." },
  R3: { title: "Reserva de derechos", text: "Emitir una notificación formal de reserva de derechos a los tres miembros del consorcio.", immediateEffectText: "La aseguradora preserva sus derechos frente a los miembros del consorcio y sus obligaciones de indemnización." },
  R4: { title: "Monitor técnico mensual independiente", text: "Designar un monitor técnico mensual independiente para revisar el proyecto y los reclamos de avance.", immediateEffectText: "El proyecto es supervisado por un experto técnico independiente durante los meses críticos." },
  R5: { title: "Cesión de cuentas por cobrar", text: "Obtener la cesión de USD 10 millones de cuentas por cobrar certificadas.", immediateEffectText: "Se crea una protección recuperable sobre cuentas por cobrar que podrá ejecutarse posteriormente." },
  R6: { title: "Comité de crisis", text: "Crear un comité de crisis formal con la aseguradora, las reaseguradoras y las coaseguradoras.", immediateEffectText: "El equipo implementa una estructura de respuesta coordinada entre todas las partes interesadas." },

  T1: { title: "Informe de causalidad de retrasos", text: "Encargar un informe independiente de causalidad de retrasos para respaldar el análisis de terminación.", immediateEffectText: "Se fortalece la narrativa causal y la evidencia de retrasos para la posición de reclamo y recuperación." },
  T2: { title: "Revisión de la validez de la terminación", text: "Obtener asesoría legal sobre la validez de la terminación y la redacción de la garantía para poner a prueba los argumentos de la garantía y el reclamo.", immediateEffectText: "Se aclara la posición legal sobre la terminación y la redacción de la garantía." },
  T3: { title: "Preservar el inventario de equipos", text: "Inventariar y preservar los equipos financiados con el pago anticipado.", immediateEffectText: "Se identifican y preservan los equipos financiados con el pago anticipado para su uso en la recuperación." },
  T4: { title: "Reservas de derechos y demandas de contraindemnización", text: "Emitir reservas de derechos y demandas inmediatas bajo las contraindemnizaciones disponibles.", immediateEffectText: "Los derechos se hacen valer de forma temprana y se activa el marco de contraindemnización." },
  T5: { title: "Asesoría legal coordinadora", text: "Designar asesoría legal coordinadora en Perú, España e Italia para gestionar los aspectos jurisdiccionales.", immediateEffectText: "La respuesta a los reclamos se coordina entre las principales jurisdicciones y equipos legales." },
  T6: { title: "Un único informe de reserva", text: "Notificar a las coaseguradoras y reaseguradoras mediante un único informe de reserva.", immediateEffectText: "Se utiliza una narrativa única de reserva para alinear las recuperaciones y el informe de pérdidas." },

  C1: { title: "Auditoría final de la garantía de pago anticipado", text: "Realizar una auditoría final del saldo de la Garantía de Pago Anticipado y la conciliación de la cuenta del proyecto.", immediateEffectText: "El reclamo de la Garantía de Pago Anticipado se contrasta con el saldo real y la evidencia de respaldo." },
  C2: { title: "Revisión de superposición", text: "Realizar una revisión de superposición entre la Garantía de Pago Anticipado y la Garantía de Cumplimiento.", immediateEffectText: "Se revisa y controla el riesgo de doble contabilización entre los reclamos de las garantías." },
  C3: { title: "Acuerdo global", text: "Negociar un acuerdo global con ERAP, que incluya la liberación y cesión de derechos.", immediateEffectText: "El reclamo se resuelve mediante un marco de acuerdo coordinado y la transferencia de derechos." },
  C4: { title: "Ejecución de la garantía bancaria", text: "Ejecutar de inmediato las garantías bancarias y las cuentas por cobrar cedidas.", immediateEffectText: "Se ejecutan el colateral y los derechos cedidos para materializar valor sobre el reclamo." },
  C5: { title: "Ejecución de la contraindemnización", text: "Ejecutar las obligaciones directas frente a los contraindemnizantes disponibles.", immediateEffectText: "Se ejecutan los derechos de contraindemnización disponibles para recuperar una parte de la pérdida." },
  C6: { title: "Recuperación coordinada", text: "Implementar una estrategia de recuperación coordinada en las tres jurisdicciones.", immediateEffectText: "Los esfuerzos de recuperación se coordinan entre las principales jurisdicciones y partes." },
};

const ptDecisions: Record<string, DecisionText> = {
  U1: { title: "Conta dedicada do projeto", text: "Estabelecer uma conta dedicada do projeto com autorização dupla para desembolsos, transferências e conciliações.", immediateEffectText: "Uma conta dedicada do projeto é estabelecida e os controles aumentam imediatamente." },
  U2: { title: "Exigência de relatórios trimestrais", text: "Exigir relatórios trimestrais documentados sobre o uso do pagamento antecipado e as fontes e aplicações de fundos associadas.", immediateEffectText: "As obrigações de reporte fortalecem o rastro probatório para as revisões de garantias e recuperação." },
  U3: { title: "Reduções condicionais da garantia", text: "Condicionar toda redução da Garantia de Pagamento Antecipado a evidência de amortização e confirmação por escrito da ERAP.", immediateEffectText: "O processo de redução da garantia torna-se mais controlado e menos exposto a liberações não controladas." },
  U4: { title: "Revisão técnica independente", text: "Encomendar uma revisão técnica independente do orçamento e do cronograma antes de aprovar mudanças importantes.", immediateEffectText: "A análise de risco técnico e de atrasos melhora a disciplina inicial de subscrição." },
  U5: { title: "Garantia bancária irrevogável", text: "Exigir uma garantia bancária irrevogável de USD 15 milhões vinculada à Garantia de Pagamento Antecipado.", immediateEffectText: "É criado colateral adicional para dar suporte à exposição do pagamento antecipado." },
  U6: { title: "Prêmio inicial adicional", text: "Cobrar um prêmio inicial adicional de 10% para refletir o maior risco de subscrição e monitoramento.", immediateEffectText: "A base do prêmio aumenta desde o início para refletir o perfil de risco." },

  A1: { title: "Aumentar o prêmio de extensão", text: "Aumentar o prêmio de extensão em 15% para refletir o risco alterado e o cronograma emendado.", immediateEffectText: "O prêmio da carteira aumenta com a extensão e o maior nível de exposição." },
  A2: { title: "Aporte de capital", text: "Exigir um aporte de capital de USD 25 milhões na conta do projeto.", immediateEffectText: "É introduzida uma medida material de suporte à conta do projeto." },
  A3: { title: "Contraindenização direta da Mediterranea", text: "Exigir uma contraindenização direta da Mediterranea com limite de USD 25 milhões.", immediateEffectText: "É preservado um direito de reclamação direto contra o membro do consórcio com responsabilidade direta." },
  A4: { title: "Controle conjunto sobre desembolsos", text: "Estabelecer um controle conjunto sobre os novos desembolsos e as transferências entre empresas para limitar o vazamento de fundos.", immediateEffectText: "Os controles sobre os movimentos de caixa do projeto e as transferências entre partes relacionadas são reforçados." },
  A5: { title: "Bloquear reduções da garantia", text: "Bloquear novas reduções da Garantia de Pagamento Antecipado até que o pagamento antecipado esteja totalmente conciliado.", immediateEffectText: "A exposição da Garantia de Pagamento Antecipado é preservada até que haja suporte claro para cada redução." },
  A6: { title: "Cosseguro da garantia de desempenho", text: "Colocar 20% do aumento da Garantia de Desempenho em cosseguro.", immediateEffectText: "Parte do aumento da exposição da garantia é compartilhada com as cosseguradoras." },

  R1: { title: "Auditoria forense", text: "Encomendar uma auditoria forense dos USD 30 milhões com documentação de suporte incompleta.", immediateEffectText: "É iniciada uma revisão detalhada de documentação e controles para apoiar a disciplina de recuperação e reserva." },
  R2: { title: "Restituir a conta do projeto", text: "Exigir que USD 12 milhões sejam restituídos à conta do projeto.", immediateEffectText: "O caixa é restituído à conta controlada e fica blindado para dar suporte aos sinistros." },
  R3: { title: "Reserva de direitos", text: "Emitir uma notificação formal de reserva de direitos aos três membros do consórcio.", immediateEffectText: "A seguradora preserva seus direitos frente aos membros do consórcio e suas obrigações de indenização." },
  R4: { title: "Monitor técnico mensal independente", text: "Designar um monitor técnico mensal independente para revisar o projeto e as medições de avanço.", immediateEffectText: "O projeto é acompanhado por um especialista técnico independente durante os meses críticos." },
  R5: { title: "Cessão de contas a receber", text: "Obter a cessão de USD 10 milhões em contas a receber certificadas.", immediateEffectText: "É criada uma proteção recuperável sobre contas a receber que poderá ser executada posteriormente." },
  R6: { title: "Comitê de crise", text: "Criar um comitê de crise formal com a seguradora, as resseguradoras e as cosseguradoras.", immediateEffectText: "A equipe implementa uma estrutura de resposta coordenada entre todas as partes interessadas." },

  T1: { title: "Relatório de causalidade de atrasos", text: "Encomendar um relatório independente de causalidade de atrasos para embasar a análise de rescisão.", immediateEffectText: "A narrativa causal e a evidência de atrasos são fortalecidas para a posição de sinistro e recuperação." },
  T2: { title: "Revisão da validade da rescisão", text: "Obter assessoria jurídica sobre a validade da rescisão e a redação da garantia para testar os argumentos da garantia e do sinistro.", immediateEffectText: "A posição jurídica sobre a rescisão e a redação da garantia é esclarecida." },
  T3: { title: "Preservar o inventário de equipamentos", text: "Inventariar e preservar os equipamentos financiados pelo pagamento antecipado.", immediateEffectText: "Os equipamentos financiados pelo pagamento antecipado são identificados e preservados para uso na recuperação." },
  T4: { title: "Reservas de direitos e demandas de contraindenização", text: "Emitir reservas de direitos e demandas imediatas sob as contraindenizações disponíveis.", immediateEffectText: "Os direitos são exercidos de forma antecipada e o arcabouço de contraindenização é ativado." },
  T5: { title: "Assessoria jurídica coordenadora", text: "Designar assessoria jurídica coordenadora no Peru, na Espanha e na Itália para gerenciar as questões jurisdicionais.", immediateEffectText: "A resposta aos sinistros é coordenada entre as principais jurisdições e equipes jurídicas." },
  T6: { title: "Único relatório de reserva", text: "Notificar as cosseguradoras e resseguradoras por meio de um único relatório de reserva.", immediateEffectText: "É utilizada uma narrativa única de reserva para alinhar as recuperações e o relatório de perdas." },

  C1: { title: "Auditoria final da garantia de pagamento antecipado", text: "Realizar uma auditoria final do saldo da Garantia de Pagamento Antecipado e da conciliação da conta do projeto.", immediateEffectText: "O sinistro da Garantia de Pagamento Antecipado é testado em relação ao saldo real e à evidência de suporte." },
  C2: { title: "Revisão de sobreposição", text: "Realizar uma revisão de sobreposição entre a Garantia de Pagamento Antecipado e a Garantia de Desempenho.", immediateEffectText: "O risco de dupla contagem entre os sinistros das garantias é revisado e controlado." },
  C3: { title: "Acordo global", text: "Negociar um acordo global com a ERAP, incluindo a liberação e a cessão de direitos.", immediateEffectText: "O sinistro é resolvido por meio de um arcabouço de acordo coordenado e da transferência de direitos." },
  C4: { title: "Execução da garantia bancária", text: "Executar imediatamente as garantias bancárias e as contas a receber cedidas.", immediateEffectText: "O colateral e os direitos cedidos são executados para realizar valor sobre o sinistro." },
  C5: { title: "Execução da contraindenização", text: "Executar as obrigações diretas frente aos contraindenizantes disponíveis.", immediateEffectText: "Os direitos de contraindenização disponíveis são executados para recuperar parte da perda." },
  C6: { title: "Recuperação coordenada", text: "Implementar uma estratégia de recuperação coordenada nas três jurisdições.", immediateEffectText: "Os esforços de recuperação são coordenados entre as principais jurisdições e partes." },
};

const esStages: Record<number, StageText> = {
  1: { title: "Suscripción inicial", caseDevelopment: "La movilización del proyecto en Perú comienza con el pago anticipado y la puesta en marcha de la cuenta del proyecto." },
  2: { title: "Enmienda del contrato", caseDevelopment: "Mes 16: el valor del contrato aumenta a USD 660 millones y el margen de la oferta se comprime al 7,1%." },
  3: { title: "Señales de alerta y deterioro", caseDevelopment: "Mes 31: el avance físico es del 50%, el avance financiero del 67%, y surgen vacíos de documentación." },
  4: { title: "Terminación y preparación previa al reclamo", caseDevelopment: "Mes 43: se produce la terminación, Iberagua entra en un proceso concursal y el costo de finalización aumenta." },
  5: { title: "Reclamo y recuperación", caseDevelopment: "Se activan los reclamos de la Garantía de Pago Anticipado y la Garantía de Cumplimiento, con riesgo de superposición de equipos." },
};

const ptStages: Record<number, StageText> = {
  1: { title: "Subscrição inicial", caseDevelopment: "A mobilização do projeto no Peru começa com o pagamento antecipado e a configuração da conta do projeto." },
  2: { title: "Aditivo contratual", caseDevelopment: "Mês 16: o valor do contrato sobe para USD 660 milhões e a margem da proposta se comprime para 7,1%." },
  3: { title: "Sinais de alerta e deterioração", caseDevelopment: "Mês 31: o progresso físico é de 50%, o progresso financeiro é de 67%, e surgem lacunas de documentação." },
  4: { title: "Rescisão e preparação pré-sinistro", caseDevelopment: "Mês 43: ocorre a rescisão, a Iberagua entra em recuperação judicial e o custo de conclusão aumenta." },
  5: { title: "Sinistro e recuperação", caseDevelopment: "Os sinistros da Garantia de Pagamento Antecipado e da Garantia de Desempenho são acionados, com risco de sobreposição de equipamentos." },
};

const esVariants: Record<Variant, string> = {
  A: "Garantía de Pago Anticipado documentaria condicional / Garantía de Cumplimiento condicional / indemnización solidaria ilimitada",
  B: "Garantía de Pago Anticipado a primera demanda / Garantía de Cumplimiento a primera demanda / indemnización solidaria ilimitada",
  C: "Garantía de Pago Anticipado a primera demanda / Garantía de Cumplimiento a primera demanda / contraindemnización exclusiva de Iberagua",
  D: "Garantía de Pago Anticipado a primera demanda / Garantía de Cumplimiento a primera demanda / coaseguro 55/25/20 + indemnización proporcional",
};

const ptVariants: Record<Variant, string> = {
  A: "Garantia de Pagamento Antecipado documentária condicional / Garantia de Desempenho condicional / indenização solidária ilimitada",
  B: "Garantia de Pagamento Antecipado à primeira demanda / Garantia de Desempenho à primeira demanda / indenização solidária ilimitada",
  C: "Garantia de Pagamento Antecipado à primeira demanda / Garantia de Desempenho à primeira demanda / contraindenização exclusiva da Iberagua",
  D: "Garantia de Pagamento Antecipado à primeira demanda / Garantia de Desempenho à primeira demanda / cosseguro 55/25/20 + indenização proporcional",
};

const esRuleExplanations: Record<string, string> = {
  U1: "La cuenta dedicada del proyecto crea un control delimitado y un mejor rastro probatorio, fortaleciendo la posición del reclamo.",
  U2: "El informe trimestral preserva la evidencia necesaria para argumentar el sobrepago y la conciliación del pago anticipado.",
  U3: "Las reducciones condicionales reducen el riesgo de que la garantía de pago anticipado quede sobregirada o de que el reclamo esté sobrestimado.",
  U4: "La revisión técnica independiente agrega un costo de investigación moderado, pero fortalece la base probatoria.",
  U5: "La garantía proporciona colateral directo vinculado a la exposición del pago anticipado y puede ejecutarse como valor asegurado.",
  U6: "La prima adicional se cobra al inicio y constituye un costo directo de la estructura de suscripción.",
  A1: "La prima de extensión aumenta de forma significativa a medida que crecen el valor del contrato y la exposición.",
  A2: "El aporte de capital crea un respaldo directo en efectivo y fortalece la cuenta del proyecto.",
  A3: "La indemnización directa de Mediterranea preserva un reclamo de recuperación valioso frente al miembro del consorcio.",
  A4: "El control conjunto reduce la fuga de fondos y preserva el conjunto de activos explotables del proyecto.",
  A5: "Bloquear las reducciones de la Garantía de Pago Anticipado mantiene la exposición hasta que se demuestre la conciliación y evita un acuerdo prematuro.",
  A6: "Una parte del incremento de la garantía de cumplimiento queda coasegurada y, por lo tanto, se comparte entre los participantes en lugar de recaer totalmente en la aseguradora.",
  R1: "La auditoría forense genera una carga de costos directa, pero mejora la calidad probatoria y reduce disputas posteriores.",
  R2: "Restituir un monto a la cuenta del proyecto mejora el respaldo blindado y reduce la fuga en la recuperación.",
  R3: "La reserva de derechos preserva la posición legal de reclamo de la aseguradora mientras se evalúan las disputas y las contraindemnizaciones.",
  R4: "El monitoreo técnico genera costos profesionales, pero reduce la incertidumbre y mejora la preparación de los reclamos.",
  R5: "La cesión de cuentas por cobrar certificadas crea un activo de recuperación tangible que podrá ejecutarse posteriormente.",
  R6: "Un comité de crisis mejora la coordinación, preserva derechos y alinea a todas las partes en el proceso de reclamo y recuperación.",
  T1: "Un informe de causalidad de retrasos genera gastos legales y técnicos, pero fortalece de forma significativa la cobertura y el análisis de terminación.",
  T2: "Validar la terminación y la redacción de la garantía preserva la base para un reclamo viable o un ajuste de derechos.",
  T3: "Preservar el equipo financiado proporciona un conjunto de activos tangibles y mejora las perspectivas de recuperación.",
  T4: "Las demandas inmediatas y las notificaciones de derechos pueden convertir los derechos preservados en recuperación realizada si existen reclamos ejecutables.",
  T5: "La asesoría legal coordinadora mejora el respaldo de los reclamos en Perú, España e Italia y fortalece la recuperabilidad.",
  T6: "Un informe de reserva unificado respalda un acuerdo más rápido y un informe de recuperación más coherente.",
  C1: "La auditoría final de la garantía de pago anticipado reduce el valor del reclamo si se excluyen saldos sin respaldo.",
  C2: "La revisión de superposición evita la doble contabilización entre los reclamos de la Garantía de Pago Anticipado y la Garantía de Cumplimiento, y reduce las pérdidas sobrestimadas.",
  C3: "El acuerdo global resuelve la disputa y produce un perfil de recuperación más limpio y rápido.",
  C4: "Ejecutar las garantías bancarias y las cuentas por cobrar cedidas materializa valor directamente a partir de los activos asegurados.",
  C5: "La ejecución directa frente a los contraindemnizantes convierte los derechos preservados en recuperaciones reales.",
  C6: "Una estrategia coordinada entre jurisdicciones mejora el momento y el valor de la ejecución de la recuperación.",
};

const ptRuleExplanations: Record<string, string> = {
  U1: "A conta dedicada do projeto cria um controle delimitado e um melhor rastro probatório, fortalecendo a posição do sinistro.",
  U2: "O relatório trimestral preserva a evidência necessária para argumentar o pagamento em excesso e a conciliação do pagamento antecipado.",
  U3: "As reduções condicionais reduzem o risco de que a garantia de pagamento antecipado fique sobregirada ou de que o sinistro seja superestimado.",
  U4: "A revisão técnica independente acrescenta um custo de investigação moderado, mas fortalece a base probatória.",
  U5: "A garantia fornece colateral direto vinculado à exposição do pagamento antecipado e pode ser executada como valor garantido.",
  U6: "O prêmio adicional é cobrado na contratação e constitui um custo direto da estrutura de subscrição.",
  A1: "O prêmio de extensão aumenta de forma significativa à medida que crescem o valor do contrato e a exposição.",
  A2: "O aporte de capital cria um suporte direto em caixa e fortalece a conta do projeto.",
  A3: "A indenização direta da Mediterranea preserva um sinistro de recuperação valioso frente ao membro do consórcio.",
  A4: "O controle conjunto reduz o vazamento de fundos e preserva o conjunto de ativos exploráveis do projeto.",
  A5: "Bloquear as reduções da Garantia de Pagamento Antecipado mantém a exposição até que a conciliação seja comprovada e evita um acordo prematuro.",
  A6: "Uma parte do aumento da garantia de desempenho fica cosseguradora e, portanto, é compartilhada entre os participantes em vez de recair totalmente sobre a seguradora.",
  R1: "A auditoria forense gera um ônus direto de custos, mas melhora a qualidade probatória e reduz disputas posteriores.",
  R2: "Restituir um valor à conta do projeto melhora o suporte blindado e reduz o vazamento na recuperação.",
  R3: "A reserva de direitos preserva a posição jurídica de sinistro da seguradora enquanto as disputas e as contraindenizações são avaliadas.",
  R4: "O monitoramento técnico gera custos profissionais, mas reduz a incerteza e melhora a preparação dos sinistros.",
  R5: "A cessão de contas a receber certificadas cria um ativo de recuperação tangível que poderá ser executado posteriormente.",
  R6: "Um comitê de crise melhora a coordenação, preserva direitos e alinha todas as partes no processo de sinistro e recuperação.",
  T1: "Um relatório de causalidade de atrasos gera despesas jurídicas e técnicas, mas fortalece de forma significativa a cobertura e a análise de rescisão.",
  T2: "Validar a rescisão e a redação da garantia preserva a base para um sinistro viável ou um ajuste de direitos.",
  T3: "Preservar o equipamento financiado proporciona um conjunto de ativos tangíveis e melhora as perspectivas de recuperação.",
  T4: "Demandas imediatas e notificações de direitos podem converter direitos preservados em recuperação realizada, caso existam sinistros exequíveis.",
  T5: "A assessoria jurídica coordenadora melhora o suporte aos sinistros no Peru, na Espanha e na Itália e fortalece a recuperabilidade.",
  T6: "Um relatório de reserva unificado apoia um acordo mais rápido e um relatório de recuperação mais coerente.",
  C1: "A auditoria final da garantia de pagamento antecipado reduz o valor do sinistro se saldos sem suporte forem excluídos.",
  C2: "A revisão de sobreposição evita a dupla contagem entre os sinistros da Garantia de Pagamento Antecipado e da Garantia de Desempenho, e reduz as perdas superestimadas.",
  C3: "O acordo global resolve a disputa e produz um perfil de recuperação mais limpo e rápido.",
  C4: "Executar as garantias bancárias e as contas a receber cedidas realiza valor diretamente a partir dos ativos garantidos.",
  C5: "A execução direta frente aos contraindenizantes converte direitos preservados em recuperações reais.",
  C6: "Uma estratégia coordenada entre jurisdições melhora o momento e o valor da execução da recuperação.",
};

export const decisionContent: Record<Language, Record<string, DecisionText>> = {
  en: enDecisions,
  es: esDecisions,
  pt: ptDecisions,
};

export const stageContent: Record<Language, Record<number, StageText>> = {
  en: enStages,
  es: esStages,
  pt: ptStages,
};

export const variantContent: Record<Language, Record<Variant, string>> = {
  en: variantLabels,
  es: esVariants,
  pt: ptVariants,
};

export const ruleExplanationContent: Record<Language, Record<string, string>> = {
  en: enRuleExplanations,
  es: esRuleExplanations,
  pt: ptRuleExplanations,
};

export function getLocalizedDecision(code: string, language: Language): DecisionText | undefined {
  return decisionContent[language][code] ?? decisionContent.en[code];
}

export function getLocalizedStage(stageNumber: number, language: Language): StageText | undefined {
  return stageContent[language][stageNumber] ?? stageContent.en[stageNumber];
}

export function getLocalizedVariantLabel(variant: Variant, language: Language): string {
  return variantContent[language][variant] ?? variantContent.en[variant];
}

export function getLocalizedRuleExplanation(code: string, language: Language): string {
  return ruleExplanationContent[language][code] ?? ruleExplanationContent.en[code] ?? "Confidential adjustment applied.";
}
