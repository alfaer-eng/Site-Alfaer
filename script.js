/* ==========================================================================
   BLOCO 1: CONTROLE DO MENU RESPONSIVO (MOBILE HAMBURGER)
   Função: Gerencia a abertura, fechamento e acessibilidade do menu em telas menores.
   ========================================================================== */

// Seleciona o botão do menu e a barra de navegação através das classes CSS
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Adiciona um evento de clique no botão do menu (o operador '?.' previne erros caso o botão não exista na página)
menuToggle?.addEventListener('click', () => {
  // Alterna a classe 'open' no menu. Se tiver, remove; se não tiver, adiciona. Retorna true se adicionou.
  const isOpen = nav.classList.toggle('open');
  
  // Atualiza os atributos de acessibilidade (ARIA) para leitores de tela saberem se o menu está aberto
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

/* ==========================================================================
   BLOCO 2: FECHAMENTO AUTOMÁTICO DO MENU MOBILE
   Função: Fecha o menu lateral automaticamente quando o usuário clica em qualquer link.
   ========================================================================== */

// Localiza todos os links dentro do menu de navegação e adiciona um evento de clique a cada um deles
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    // Remove a classe de abertura, fazendo o menu mobile sumir
    nav.classList.remove('open');
    
    // Reseta o estado do botão do menu para fechado nos atributos de acessibilidade
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ==========================================================================
   BLOCO 3: ATUALIZAÇÃO AUTOMÁTICA DO ANO DE COPYRIGHT
   Função: Insere o ano atual dinamicamente no rodapé para evitar manutenção manual anual.
   ========================================================================== */

// Procura um elemento com id="year" e injeta o ano atual gerado pelo sistema
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ==========================================================================
   BLOCO 4: INTERAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO (Mailto)
   Função: Captura os dados do formulário e abre o gerenciador de e-mail padrão do usuário.
   ========================================================================== */

// Endereço de e-mail comercial de destino onde as mensagens serão entregues
const BUSINESS_EMAIL = 'contato@alfaer.app';

// Captura o evento de envio do formulário através do id="contact-form"
document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  // Previne o comportamento padrão do navegador de recarregar a página ao enviar o formulário
  event.preventDefault();
  
  // Agrupa e extrai todos os dados preenchidos nos campos de entrada (inputs/textarea)
  const form = new FormData(event.currentTarget);
  
  // Monta o assunto do e-mail incluindo a solução ou serviço selecionado
  const subject = `Contato pelo site ALFA-ER — ${form.get('service') || 'Geral'}`;
  
  // Estrutura o corpo da mensagem pulando linhas (\n) com as informações do cliente
  const body = [
    `Nome: ${form.get('name')}`,
    `Empresa: ${form.get('company') || 'Não informada'}`,
    `E-mail: ${form.get('email')}`,
    `Assunto: ${form.get('service') || 'Geral'}`,
    '',
    'Mensagem:',
    form.get('message')
  ].join('\n');
  
  // Codifica os textos de forma segura para URLs e redireciona o navegador para disparar o aplicativo de e-mail local (Outlook, Gmail, Apple Mail)
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
