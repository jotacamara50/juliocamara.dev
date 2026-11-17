const snippets = {
  hero: [
    ['com', '// transformando ideias em produto'],
    ['key', 'const'], ['var', ' developer'], ['', ' = {'],
    ['', '  name: '], ['str', "'Júlio Câmara'"], ['', ','],
    ['', '  role: '], ['str', "'Full Stack Developer'"], ['', ','],
    ['', '  location: '], ['str', "'Brazil · Remote'"], ['', ','],
    ['', '  available: '], ['key', 'true'], ['', ','],
    ['', '  build: (' ], ['var', 'idea'], ['', ') => '], ['fn', 'ship'], ['', '('], ['var', 'idea'], ['', ')'],
    ['', '}']
  ],
  about: [
    ['com', '// primeiro, entenda o problema'],
    ['key', 'async function'], ['fn', ' solve'], ['', '('], ['var', 'challenge'], ['', ') {'],
    ['', '  '], ['key', 'const'], ['var', ' context'], ['', ' = '], ['key', 'await'], ['fn', ' listen'], ['', '('], ['var', 'challenge'], ['', ')'],
    ['', '  '], ['key', 'const'], ['var', ' path'], ['', ' = '], ['fn', ' design'], ['', '('], ['var', 'context'], ['', ')'],
    ['', '  '], ['key', 'return'], ['fn', ' build'], ['', '({'],
    ['', '    simple: '], ['key', 'true'], ['', ','],
    ['', '    scalable: '], ['key', 'true'], ['', ','],
    ['', '    human: '], ['key', 'true'],
    ['', '  })'], ['', '\n}']
  ],
  work: [
    ['com', '// integrações que simplificam operações'],
    ['key', 'const'], ['var', ' workflow'], ['', ' = '], ['key', 'new'], ['fn', ' Workflow'], ['', '({'],
    ['', '  trigger: '], ['str', "'webhook'"], ['', ','],
    ['', '  steps: ['],
    ['', '    '], ['str', "'validate'"], ['', ', '], ['str', "'integrate'"], ['', ','],
    ['', '    '], ['str', "'automate'"],
    ['', '  ],'],
    ['', '})'],
    ['', '\n'], ['fn', 'workflow'], ['', '.'], ['fn', 'run'], ['', '()']
  ],
  stack: [
    ['com', '// escolha ferramentas, não modismos'],
    ['key', 'type'], ['var', ' Stack'], ['', ' = {'],
    ['', '  frontend: '], ['str', "'React · Next · TypeScript'"], ['', ','],
    ['', '  backend: '], ['str', "'Node · PHP · SQL'"], ['', ','],
    ['', '  automation: '], ['str', "'n8n · APIs · AI'"], ['', ','],
    ['', '  infrastructure: '], ['str', "'Docker · Linux · Cloud'"],
    ['', '}'],
    ['', '\n'], ['key', 'const'], ['var', ' bestTool'], ['', ' = ('], ['var', 'problem'], ['', ') =>'],
    ['', '  '], ['fn', 'understand'], ['', '('], ['var', 'problem'], ['', ').'], ['fn', 'then'], ['', '('], ['fn', 'choose'], ['', ')']
  ],
  contact: [
    ['com', '// vamos construir juntos?'],
    ['key', 'const'], ['var', ' nextProject'], ['', ' = {'],
    ['', '  owner: '], ['str', "'you'"], ['', ','],
    ['', '  developer: '], ['str', "'Júlio Câmara'"], ['', ','],
    ['', '  idea: '], ['str', "'something memorable'"], ['', ','],
    ['', '  status: '], ['str', "'ready to start'"],
    ['', '}'],
    ['', '\n'], ['key', 'await'], ['fn', ' connect'], ['', '({'],
    ['', '  email: '], ['str', "'contato@juliocamara.dev'"],
    ['', '})']
  ]
}

const codeOutput = document.querySelector('#codeOutput')
const lineNumbers = document.querySelector('#lineNumbers')
const editor = document.querySelector('.editor')
let activeSnippet = ''

function renderCode(name) {
  if (name === activeSnippet || !snippets[name]) return
  activeSnippet = name
  const parts = snippets[name]
  codeOutput.innerHTML = ''
  let i = 0
  function type() {
    if (i >= parts.length) {
      const lines = codeOutput.textContent.split('\n').length
      lineNumbers.textContent = Array.from({ length: Math.max(lines, 18) }, (_, n) => n + 1).join('\n')
      return
    }
    const [token, content] = parts[i++]
    const span = document.createElement('span')
    span.className = token ? `tok-${token}` : ''
    span.textContent = content
    codeOutput.appendChild(span)
    requestAnimationFrame(type)
  }
  type()
}

const sections = document.querySelectorAll('[data-code]')
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
  if (visible) renderCode(visible.target.dataset.code)
}, { threshold: [0.2, 0.45, 0.7] })
sections.forEach(section => sectionObserver.observe(section))

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`
  revealObserver.observe(el)
})

window.addEventListener('scroll', () => {
  const progress = window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)
  editor.style.transform = `perspective(1200px) rotateY(${-7 + progress * 3}deg) rotateX(${2 - progress * 2}deg) translateY(${progress * -50}px)`
}, { passive: true })

const menuButton = document.querySelector('.menu-button')
const mobileNav = document.querySelector('.mobile-nav')
menuButton.addEventListener('click', () => mobileNav.classList.toggle('open'))
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')))

document.querySelector('#year').textContent = new Date().getFullYear()
renderCode('hero')
