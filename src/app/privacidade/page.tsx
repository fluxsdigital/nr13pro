export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a href="/vendas" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover mb-8 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Voltar para NR-13 Pro
        </a>
        <h1 className="text-3xl sm:text-4xl font-medium text-text-primary tracking-tight mb-8">Política de Privacidade</h1>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <p>Última atualização: julho de 2026.</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">1. Introdução</h2>
          <p>A Flux Soluções Digitais, inscrita no CNPJ 58.440.767/0001-11, valoriza a privacidade dos seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza a plataforma NR-13 Pro.</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">2. Dados Coletados</h2>
          <p>Podemos coletar as seguintes informações:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone e senha</li>
            <li><strong>Dados profissionais:</strong> empresa, CNPJ, cargo e endereço</li>
            <li><strong>Dados de utilização:</strong> informações sobre equipamentos, inspeções, laudos e demais registros inseridos na plataforma</li>
            <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, páginas acessadas e duração da sessão</li>
          </ul>

          <h2 className="text-lg font-medium text-text-primary pt-4">3. Finalidade do Tratamento</h2>
          <p>Seus dados são utilizados para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fornecer, manter e melhorar a plataforma NR-13 Pro</li>
            <li>Processar pagamentos e gerenciar assinaturas</li>
            <li>Enviar comunicações relacionadas ao serviço</li>
            <li>Cumprir obrigações legais e regulatórias</li>
            <li>Garantir a segurança da plataforma</li>
          </ul>

          <h2 className="text-lg font-medium text-text-primary pt-4">4. Base Legal</h2>
          <p>O tratamento de dados pessoais é realizado com base no consentimento do usuário, na execução do contrato de prestação de serviços e no cumprimento de obrigações legais, conforme a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">5. Compartilhamento de Dados</h2>
          <p>Não compartilhamos seus dados pessoais com terceiros, exceto:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Processadores de pagamento para cobrança da assinatura</li>
            <li>Autoridades legais quando exigido por lei</li>
            <li>Prestadores de serviços de infraestrutura (hospedagem, armazenamento em nuvem)</li>
          </ul>

          <h2 className="text-lg font-medium text-text-primary pt-4">6. Armazenamento e Segurança</h2>
          <p>Seus dados são armazenados em servidores seguros com criptografia SSL/TLS. Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição.</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">7. Direitos do Usuário</h2>
          <p>Você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Acessar, corrigir ou excluir seus dados pessoais</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
            <li>Solicitar a exclusão da conta e dos dados associados</li>
          </ul>

          <h2 className="text-lg font-medium text-text-primary pt-4">8. Cookies</h2>
          <p>Utilizamos cookies essenciais para o funcionamento da plataforma. Não utilizamos cookies de rastreamento para fins publicitários. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade da plataforma.</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">9. Retenção de Dados</h2>
          <p>Mantemos seus dados enquanto sua conta estiver ativa. Após o cancelamento da assinatura, os dados são retidos por até 90 dias para fins de recuperação, sendo posteriormente excluídos de forma segura.</p>

          <h2 className="text-lg font-medium text-text-primary pt-4">10. Contato</h2>
          <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
          <p>E-mail: contato@nr13pro.com.br<br />WhatsApp: (47) 97400-2478</p>
        </div>
      </div>
    </div>
  )
}
