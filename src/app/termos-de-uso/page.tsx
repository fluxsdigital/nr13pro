export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a href="/vendas" className="inline-flex items-center gap-2 text-sm text-[#C56A2D] hover:text-[#B35C24] mb-8 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Voltar para NR-13 Pro
        </a>
        <h1 className="text-3xl sm:text-4xl font-medium text-[#171717] tracking-tight mb-8">Termos de Uso</h1>

        <div className="space-y-6 text-sm text-[#676767] leading-relaxed">
          <p>Última atualização: julho de 2026.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">1. Aceitação dos Termos</h2>
          <p>Ao acessar ou utilizar a plataforma NR-13 Pro, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">2. Descrição do Serviço</h2>
          <p>O NR-13 Pro é uma plataforma SaaS de gestão de inspeção de equipamentos conforme a NR-13, oferecendo funcionalidades como cadastro de equipamentos, geração de QR Code, checklists digitais, emissão de laudos técnicos em PDF, dashboard e relatórios gerenciais.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">3. Cadastro e Conta</h2>
          <p>Para utilizar a plataforma, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">4. Assinatura e Pagamento</h2>
          <p>O serviço é oferecido mediante assinatura mensal no valor de R$ 197,00. O pagamento é processado no momento da contratação. Você pode cancelar sua assinatura a qualquer momento, sem multa ou burocracia, e o acesso permanecerá ativo até o final do período já pago.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">5. Uso Permitido</h2>
          <p>Você concorda em utilizar a plataforma apenas para fins legítimos e de acordo com todas as leis e regulamentos aplicáveis. Não é permitido:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Utilizar a plataforma para atividades ilegais ou não autorizadas</li>
            <li>Tentar acessar áreas restritas do sistema sem autorização</li>
            <li>Reproduzir, distribuir ou modificar o software sem autorização expressa</li>
            <li>Utilizar a plataforma para armazenar ou transmitir conteúdo ilegal</li>
          </ul>

          <h2 className="text-lg font-medium text-[#171717] pt-4">6. Propriedade Intelectual</h2>
          <p>Todos os direitos de propriedade intelectual relacionados à plataforma NR-13 Pro, incluindo software, design, logos e conteúdo, são de propriedade exclusiva da Flux Soluções Digitais.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">7. Limitação de Responsabilidade</h2>
          <p>A plataforma é fornecida "como está", sem garantias de qualquer tipo. A Flux Soluções Digitais não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso da plataforma.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">8. Alterações nos Termos</h2>
          <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação. O uso continuado da plataforma após alterações constitui aceitação dos novos termos.</p>

          <h2 className="text-lg font-medium text-[#171717] pt-4">9. Contato</h2>
          <p>Para questões relacionadas a estes Termos de Uso, entre em contato pelo e-mail contato@nr13pro.com.br ou WhatsApp (47) 97400-2478.</p>
        </div>
      </div>
    </div>
  )
}
