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
  U1: { title: "Cuenta dedicada del proyecto", text: "Establecer una cuenta dedicada del proyecto con autorización dual.", immediateEffectText: "El pago anticipado solo podrá utilizarse a través de la cuenta controlada." },
  U2: { title: "Exigencia de informes trimestrales", text: "Exigir informes trimestrales documentados sobre el uso del pago anticipado.", immediateEffectText: "El consorcio entrega estados de cuenta, facturas y conciliaciones trimestrales." },
  U3: { title: "Reducciones condicionales de la garantía", text: "Condicionar cada reducción de la Fianza de Anticipo a evidencia de amortización y confirmación escrita de ERAP.", immediateEffectText: "No se reconoce ninguna reducción basada únicamente en el avance declarado por el consorcio." },
  U4: { title: "Revisión técnica independiente", text: "Encargar una revisión técnica independiente del presupuesto y el cronograma.", immediateEffectText: "Un asesor independiente valida el presupuesto, la contingencia, las adquisiciones y la ruta crítica." },
  U5: { title: "Garantía bancaria irrevocable", text: "Exigir una garantía bancaria irrevocable de USD 15,000,000 vinculada a la Fianza de Anticipo.", immediateEffectText: "USD 15,000,000 quedan respaldados por una garantía bancaria." },
  U6: { title: "Prima inicial adicional", text: "Cobrar una prima inicial adicional del 10%.", immediateEffectText: "La prima inicial aumenta un 10%, de USD 6,960,000 a USD 7,656,000." },

  R1: { title: "Auditoría forense", text: "Encargar una auditoría forense de los USD 30,000,000 con documentación incompleta.", immediateEffectText: "Se investiga y documenta el destino de los fondos." },
  R2: { title: "Depósito en cuenta bloqueada", text: "Exigir que Iberagua deposite USD 12,000,000 en una cuenta bloqueada pignorada a favor de la aseguradora.", immediateEffectText: "Los fondos permanecen segregados y podrán ejecutarse mediante C4 si se realiza un pago cubierto." },
  R3: { title: "Reserva de derechos", text: "Emitir una notificación formal de reserva de derechos a los tres miembros.", immediateEffectText: "Los derechos quedan preservados antes de la insolvencia." },
  R4: { title: "Monitor técnico mensual independiente", text: "Designar un monitor técnico mensual independiente.", immediateEffectText: "La aseguradora recibe informes mensuales de avance y de costo de finalización." },
  R5: { title: "Cesión de cuentas por cobrar", text: "Obtener la cesión de USD 10,000,000 en cuentas por cobrar certificadas.", immediateEffectText: "Las cuentas por cobrar del consorcio frente a ERAP se ceden a la aseguradora." },
  R6: { title: "Comité de crisis", text: "Crear un comité de crisis formal que incluya a los equipos de suscripción, reclamos, recuperación, legal y técnico de la aseguradora, junto con las reaseguradoras relevantes.", immediateEffectText: "La información, las reservas y la estrategia se comparten mensualmente." },

  T1: { title: "Informe de causalidad de retrasos", text: "Encargar un informe independiente de causalidad de los retrasos.", immediateEffectText: "El informe atribuye el 34% a ERAP, el 45% a Iberagua y el 21% a Andina." },
  T2: { title: "Revisión de la validez de la terminación", text: "Obtener asesoría legal sobre la validez de la terminación y la redacción de la garantía.", immediateEffectText: "La defensa se estructura conforme a la variante asignada." },
  T3: { title: "Preservar el inventario de equipos", text: "Inventariar y preservar los equipos financiados con el pago anticipado.", immediateEffectText: "Se identifican y protegen los equipos reutilizables." },
  T4: { title: "Reservas de derechos y demandas de contraindemnización", text: "Emitir reservas de derechos y demandas inmediatas bajo las contraindemnizaciones.", immediateEffectText: "Las demandas se presentan antes de que surjan nuevas restricciones judiciales." },
  T5: { title: "Asesoría legal coordinadora", text: "Designar asesoría legal coordinadora en Perú, España e Italia.", immediateEffectText: "La estrategia legal se centraliza." },
  T6: { title: "Informe de reserva consolidado", text: "Notificar a las reaseguradoras mediante un único informe de reserva consolidado.", immediateEffectText: "Todos los mercados reciben la misma información y base de cálculo." },

  C1: { title: "Auditoría final de la fianza de anticipo", text: "Realizar una auditoría final del saldo de la Fianza de Anticipo.", immediateEffectText: "El monto adeudado se concilia con la amortización y los equipos reutilizables." },
  C2: { title: "Revisión de superposición", text: "Realizar una revisión de superposición entre la Fianza de Anticipo y la Fianza de Cumplimiento.", immediateEffectText: "Los montos duplicados se eliminan antes del pago." },
  C3: { title: "Acuerdo global", text: "Negociar un acuerdo global con ERAP, que incluya la liberación y cesión de derechos.", immediateEffectText: "Ambos reclamos se resuelven mediante un único acuerdo global." },
  C4: { title: "Ejecución de la garantía bancaria", text: "Ejecutar las garantías bancarias y las cuentas por cobrar cedidas.", immediateEffectText: "El colateral previamente obtenido se convierte en efectivo." },
  C5: { title: "Ejecución de la contraindemnización", text: "Ejecutar las obligaciones directas frente a los contraindemnizantes disponibles.", immediateEffectText: "La recuperación se inicia contra todos los obligados accesibles." },
  C6: { title: "Recuperación coordinada", text: "Implementar una estrategia de recuperación coordinada en las tres jurisdicciones.", immediateEffectText: "Se adopta un único plan de ejecución." },
};

const ptDecisions: Record<string, DecisionText> = {
  U1: { title: "Conta dedicada do projeto", text: "Estabelecer uma conta dedicada do projeto com autorização dupla.", immediateEffectText: "O pagamento antecipado só poderá ser utilizado por meio da conta controlada." },
  U2: { title: "Exigência de relatórios trimestrais", text: "Exigir relatórios trimestrais documentados sobre o uso do pagamento antecipado.", immediateEffectText: "O consórcio fornece extratos, faturas e conciliações trimestrais." },
  U3: { title: "Reduções condicionais da garantia", text: "Condicionar cada redução da Garantia de Pagamento Antecipado a evidência de amortização e confirmação por escrito da ERAP.", immediateEffectText: "Nenhuma redução é reconhecida com base apenas no progresso declarado pelo consórcio." },
  U4: { title: "Revisão técnica independente", text: "Encomendar uma revisão técnica independente do orçamento e do cronograma.", immediateEffectText: "Um assessor independente valida o orçamento, a contingência, as aquisições e o caminho crítico." },
  U5: { title: "Garantia bancária irrevogável", text: "Exigir uma garantia bancária irrevogável de USD 15.000.000 vinculada à Garantia de Pagamento Antecipado.", immediateEffectText: "USD 15.000.000 ficam garantidos por segurança bancária." },
  U6: { title: "Prêmio inicial adicional", text: "Cobrar um prêmio inicial adicional de 10%.", immediateEffectText: "O prêmio inicial aumenta 10%, de USD 6.960.000 para USD 7.656.000." },

  R1: { title: "Auditoria forense", text: "Encomendar uma auditoria forense dos USD 30.000.000 com documentação incompleta.", immediateEffectText: "O destino dos fundos é investigado e documentado." },
  R2: { title: "Depósito em conta bloqueada", text: "Exigir que a Iberagua deposite USD 12.000.000 em uma conta bloqueada empenhada em favor da seguradora.", immediateEffectText: "Os fundos permanecem segregados e poderão ser executados por meio de C4 caso um pagamento coberto seja realizado." },
  R3: { title: "Reserva de direitos", text: "Emitir uma notificação formal de reserva de direitos aos três membros.", immediateEffectText: "Os direitos ficam preservados antes da insolvência." },
  R4: { title: "Monitor técnico mensal independente", text: "Designar um monitor técnico mensal independente.", immediateEffectText: "A seguradora recebe relatórios mensais de progresso e de custo de conclusão." },
  R5: { title: "Cessão de contas a receber", text: "Obter a cessão de USD 10.000.000 em contas a receber certificadas.", immediateEffectText: "As contas a receber do consórcio junto à ERAP são cedidas à seguradora." },
  R6: { title: "Comitê de crise", text: "Criar um comitê de crise formal que envolva as equipes de subscrição, sinistros, recuperação, jurídica e técnica da seguradora, junto com as resseguradoras relevantes.", immediateEffectText: "As informações, reservas e estratégia são compartilhadas mensalmente." },

  T1: { title: "Relatório de causalidade de atrasos", text: "Encomendar um relatório independente de causalidade dos atrasos.", immediateEffectText: "O relatório atribui 34% à ERAP, 45% à Iberagua e 21% à Andina." },
  T2: { title: "Revisão da validade da rescisão", text: "Obter assessoria jurídica sobre a validade da rescisão e a redação da garantia.", immediateEffectText: "A defesa é estruturada conforme a variante atribuída." },
  T3: { title: "Preservar o inventário de equipamentos", text: "Inventariar e preservar os equipamentos financiados pelo pagamento antecipado.", immediateEffectText: "Os equipamentos reutilizáveis são identificados e protegidos." },
  T4: { title: "Reservas de direitos e demandas de contraindenização", text: "Emitir reservas de direitos e demandas imediatas sob as contraindenizações.", immediateEffectText: "As demandas são apresentadas antes que surjam novas restrições judiciais." },
  T5: { title: "Assessoria jurídica coordenadora", text: "Designar assessoria jurídica coordenadora no Peru, na Espanha e na Itália.", immediateEffectText: "A estratégia jurídica é centralizada." },
  T6: { title: "Relatório de reserva consolidado", text: "Notificar as resseguradoras por meio de um único relatório de reserva consolidado.", immediateEffectText: "Todos os mercados recebem a mesma informação e base de cálculo." },

  C1: { title: "Auditoria final da garantia de pagamento antecipado", text: "Realizar uma auditoria final do saldo da Garantia de Pagamento Antecipado.", immediateEffectText: "O valor devido é conciliado com a amortização e os equipamentos reutilizáveis." },
  C2: { title: "Revisão de sobreposição", text: "Realizar uma revisão de sobreposição entre a Garantia de Pagamento Antecipado e a Garantia de Desempenho.", immediateEffectText: "Os valores duplicados são removidos antes do pagamento." },
  C3: { title: "Acordo global", text: "Negociar um acordo global com a ERAP, incluindo a liberação e a cessão de direitos.", immediateEffectText: "Ambos os pedidos são resolvidos por meio de um único acordo global." },
  C4: { title: "Execução da garantia bancária", text: "Executar as garantias bancárias e as contas a receber cedidas.", immediateEffectText: "O colateral previamente obtido é convertido em dinheiro." },
  C5: { title: "Execução da contraindenização", text: "Executar as obrigações diretas frente aos contraindenizantes disponíveis.", immediateEffectText: "A recuperação é iniciada contra todos os obrigados acessíveis." },
  C6: { title: "Recuperação coordenada", text: "Implementar uma estratégia de recuperação coordenada nas três jurisdições.", immediateEffectText: "Um único plano de execução é adotado." },
};

const esStages: Record<number, StageText> = {
  1: { title: "Suscripción inicial", caseDevelopment: "Los términos generales del contrato ya se conocen. Se constituyen el pago anticipado y la cuenta del proyecto, y los equipos pueden seleccionar tres protecciones adicionales para aumentar su nivel de confianza en la suscripción." },
  2: { title: "Señales de alerta y deterioro del proyecto", caseDevelopment: "Mes 31: el avance físico alcanza el 50% frente a un 63% esperado, el avance financiero se adelanta al 67%, y la documentación de parte del saldo remanente del pago anticipado está incompleta." },
  3: { title: "Terminación y preparación previa al reclamo", caseDevelopment: "Mes 43: ERAP termina el contrato. Iberagua solicita protección judicial frente a sus acreedores y el equipo prepara reservas, documentación, defensa y recuperación antes de que se presenten los reclamos formales." },
  4: { title: "Reclamo y recuperación", caseDevelopment: "ERAP presenta reclamos formales bajo la Fianza de Anticipo y la Fianza de Cumplimiento. El equipo finaliza su posición sobre límites, prima, protecciones, reservas y derechos preservados." },
};

const ptStages: Record<number, StageText> = {
  1: { title: "Subscrição inicial", caseDevelopment: "Os termos gerais do contrato já são conhecidos. O pagamento antecipado e a conta do projeto são constituídos, e as equipes podem selecionar três proteções adicionais para aumentar seu nível de confiança na subscrição." },
  2: { title: "Sinais de alerta e deterioração do projeto", caseDevelopment: "Mês 31: o progresso físico chega a 50% frente a um esperado de 63%, o progresso financeiro avança para 67%, e a documentação de parte do saldo remanescente do pagamento antecipado está incompleta." },
  3: { title: "Rescisão e preparação pré-sinistro", caseDevelopment: "Mês 43: a ERAP rescinde o contrato. A Iberagua busca recuperação judicial frente a seus credores e a equipe prepara reservas, documentação, defesa e recuperação antes que os pedidos formais sejam apresentados." },
  4: { title: "Sinistro e recuperação", caseDevelopment: "A ERAP apresenta pedidos formais sob a Garantia de Pagamento Antecipado e a Garantia de Desempenho. A equipe finaliza sua posição quanto a limites, prêmio, proteções, reservas e direitos preservados." },
};

const esVariants: Record<Variant, string> = {
  A: "Fianza de Anticipo documentaria condicional / Fianza de Cumplimiento condicional / contraindemnizaciones solidarias e ilimitadas de los tres miembros del consorcio",
  B: "Fianza de Anticipo a primera demanda / Fianza de Cumplimiento a primera demanda / contraindemnizaciones solidarias e ilimitadas de los tres miembros del consorcio",
  C: "Fianza de Anticipo a primera demanda / Fianza de Cumplimiento a primera demanda / contraindemnización otorgada únicamente por Iberagua",
};

const ptVariants: Record<Variant, string> = {
  A: "Garantia de Pagamento Antecipado documentária condicional / Garantia de Desempenho condicional / contraindenizações solidárias e ilimitadas dos três membros do consórcio",
  B: "Garantia de Pagamento Antecipado à primeira demanda / Garantia de Desempenho à primeira demanda / contraindenizações solidárias e ilimitadas dos três membros do consórcio",
  C: "Garantia de Pagamento Antecipado à primeira demanda / Garantia de Desempenho à primeira demanda / contraindenização outorgada exclusivamente pela Iberagua",
};

const esRuleExplanations: Record<string, string> = {
  U1: "La cuenta dedicada del proyecto crea un control delimitado y un rastro probatorio más claro sobre el pago anticipado.",
  U2: "El informe trimestral fortalece la evidencia disponible si el pago anticipado es cuestionado más adelante.",
  U3: "Condicionar las reducciones de la garantía a la confirmación de ERAP reduce el riesgo de una liberación sin respaldo.",
  U4: "La revisión técnica independiente agrega un costo moderado, pero mejora la fiabilidad de los supuestos de presupuesto y cronograma.",
  U5: "La garantía bancaria crea colateral adicional vinculado a la exposición del pago anticipado.",
  U6: "La prima adicional se cobra al inicio y constituye un costo directo de la estructura de suscripción.",
  R1: "La auditoría forense documenta el uso del pago anticipado y respalda los argumentos de recuperación posteriores.",
  R2: "La cuenta bloqueada asegura fondos que podrán ejecutarse posteriormente si se realiza un pago cubierto.",
  R3: "La notificación de reserva de derechos preserva la posición de la aseguradora antes de una eventual insolvencia.",
  R4: "El monitoreo independiente mejora la visibilidad sobre el avance y el costo de finalización, con un costo moderado.",
  R5: "La cesión de cuentas por cobrar crea un activo recuperable adicional vinculado a los montos certificados que adeuda ERAP.",
  R6: "Un comité de crisis conjunto mejora la coordinación entre suscripción, reclamos, recuperación, legal y reaseguro.",
  T1: "El informe de causalidad de retrasos asigna responsabilidad por el retraso y puede afectar de forma significativa el resultado de la Fianza de Cumplimiento bajo una redacción condicional.",
  T2: "La asesoría legal sobre la validez de la terminación y la redacción de la garantía aclara la solidez de la defensa disponible según la variante del equipo.",
  T3: "Preservar los equipos financiados protege una base de activos tangibles que respalda la posición del equipo.",
  T4: "Las reservas de derechos y demandas tempranas de contraindemnización ayudan a asegurar la posición del equipo antes de que surjan nuevas restricciones.",
  T5: "Coordinar la asesoría legal entre jurisdicciones fortalece y centraliza la estrategia legal del equipo.",
  T6: "Un único informe de reserva consolidado mantiene alineadas a las reaseguradoras sobre la posición reportada por el equipo.",
  C1: "La auditoría final del saldo de la Fianza de Anticipo reduce el reclamo al monto efectivamente respaldado por evidencia.",
  C2: "La revisión de superposición evita que el mismo monto se reclame dos veces bajo ambas fianzas.",
  C3: "Un acuerdo global resuelve ambas fianzas de forma conjunta y puede reducir los pagos netos y el costo legal.",
  C4: "Ejecutar las garantías bancarias y las cuentas por cobrar cedidas convierte el colateral previamente asegurado en efectivo.",
  C5: "Ejecutar las obligaciones de contraindemnización persigue directamente la recuperación de las partes que aún pueden pagar.",
  C6: "Una estrategia de recuperación coordinada entre jurisdicciones ayuda al equipo a materializar todo el valor de los derechos preservados.",
};

const ptRuleExplanations: Record<string, string> = {
  U1: "A conta dedicada do projeto cria um controle delimitado e um rastro probatório mais claro sobre o pagamento antecipado.",
  U2: "O relatório trimestral fortalece a evidência disponível caso o pagamento antecipado seja questionado mais adiante.",
  U3: "Condicionar as reduções da garantia à confirmação da ERAP reduz o risco de uma liberação sem respaldo.",
  U4: "A revisão técnica independente acrescenta um custo moderado, mas melhora a confiabilidade das premissas de orçamento e cronograma.",
  U5: "A garantia bancária cria colateral adicional vinculado à exposição do pagamento antecipado.",
  U6: "O prêmio adicional é cobrado no início e constitui um custo direto da estrutura de subscrição.",
  R1: "A auditoria forense documenta o uso do pagamento antecipado e apoia os argumentos de recuperação posteriores.",
  R2: "A conta bloqueada garante fundos que poderão ser executados posteriormente caso um pagamento coberto seja realizado.",
  R3: "A notificação de reserva de direitos preserva a posição da seguradora antes de uma eventual insolvência.",
  R4: "O monitoramento independente melhora a visibilidade sobre o progresso e o custo de conclusão, com um custo moderado.",
  R5: "A cessão de contas a receber cria um ativo recuperável adicional vinculado aos valores certificados devidos pela ERAP.",
  R6: "Um comitê de crise conjunto melhora a coordenação entre subscrição, sinistros, recuperação, jurídico e resseguro.",
  T1: "O relatório de causalidade de atrasos atribui responsabilidade pelo atraso e pode afetar de forma significativa o resultado da Garantia de Desempenho sob uma redação condicional.",
  T2: "A assessoria jurídica sobre a validade da rescisão e a redação da garantia esclarece a solidez da defesa disponível conforme a variante da equipe.",
  T3: "Preservar os equipamentos financiados protege uma base de ativos tangíveis que respalda a posição da equipe.",
  T4: "As reservas de direitos e demandas antecipadas de contraindenização ajudam a assegurar a posição da equipe antes que surjam novas restrições.",
  T5: "Coordenar a assessoria jurídica entre jurisdições fortalece e centraliza a estratégia jurídica da equipe.",
  T6: "Um único relatório de reserva consolidado mantém as resseguradoras alinhadas sobre a posição reportada pela equipe.",
  C1: "A auditoria final do saldo da Garantia de Pagamento Antecipado reduz o sinistro ao valor efetivamente respaldado por evidência.",
  C2: "A revisão de sobreposição evita que o mesmo valor seja reclamado duas vezes sob ambas as garantias.",
  C3: "Um acordo global resolve ambas as garantias em conjunto e pode reduzir os pagamentos líquidos e o custo jurídico.",
  C4: "Executar as garantias bancárias e as contas a receber cedidas converte o colateral previamente garantido em dinheiro.",
  C5: "Executar as obrigações de contraindenização persegue diretamente a recuperação das partes que ainda podem pagar.",
  C6: "Uma estratégia de recuperação coordenada entre jurisdições ajuda a equipe a realizar todo o valor dos direitos preservados.",
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
