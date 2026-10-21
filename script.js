const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// O formulário abre o aplicativo de e-mail padrão. Substitua o endereço abaixo pelo e-mail comercial real.
const BUSINESS_EMAIL = 'contato@alfaer.app';
document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Contato pelo site ALFA-ER — ${form.get('service')}`;
  const body = [
    `Nome: ${form.get('name')}`,
    `Empresa: ${form.get('company') || 'Não informada'}`,
    `E-mail: ${form.get('email')}`,
    `Assunto: ${form.get('service')}`,
    '',
    'Mensagem:',
    form.get('message')
  ].join('\n');
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
