# Protocolo Intestinal Vital 4F (PIV4F)

PWA (Progressive Web App) completa para gerenciamento de protocolo de saúde intestinal em 21 dias.

## 📱 Recursos PWA

- **Instalável**: Pode ser instalado como aplicativo em dispositivos móveis e desktop
- **Offline**: Funciona offline após o primeiro carregamento
- **Responsivo**: Design mobile-first (320px+)
- **Rápido**: Carregamento otimizado com caching de recursos

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **TailwindCSS** - Framework CSS
- **Lucide React** - Ícones
- **PWA** - Service workers e manifest

## 🎨 Design

- **Glassmorphism** - Componentes com efeito de vidro
- **Mobile-first** - Layout otimizado para dispositivos móveis
- **Animações suaves** - Transições e animações fluidas

## 🎯 Funcionalidades

### Dashboard
- Visão geral do protocolo
- Status do dia atual
- Progresso no protocolo (barra de progresso)
- Previews de recursos premium

### Protocolo Diário
- Instruções detalhadas para cada dia
- Divisão por fase (Preparação, Eliminação, Restauração, Fortalecimento)
- Tracking de tarefas concluídas

### Sistema de Planos
- **Essencial**: Protocolo básico de 21 dias
- **Completo**: Guia de manutenção + Receitas extras
- **Premium**: Protocolo Turbo + Analytics avançado + Coach Virtual
- **VIP**: Comunidade exclusiva (assinatura mensal)

### Premium Modal
- Preview de funcionalidades bloqueadas
- Convite para upgrade de plano

### Página de Upgrade
- Comparação entre planos
- Checkout de novos planos

### Sistema de Progresso
- Tracking de protocolo diário
- Badges por conquistas

## 📚 Estrutura de Arquivos

```
/public
  - manifest.json    # Configuração PWA
  - sw.js            # Service Worker PWA
  - pivlogo-solo.png # Ícone do aplicativo
/src
  /components        # Componentes React
  /context           # Contextos React (UserContext)
  /data              # Dados mockados
  /types             # Tipos TypeScript
  - App.tsx          # Componente principal
  - main.tsx         # Ponto de entrada
  - index.css        # Estilos globais
```

## 📋 Protocolo 21 Dias

Protocolo completo em português brasileiro, dividido em 4 fases:

1. **Fase 1 (Dias 1-5)**: Preparação
   - Manhã: Água morna + limão + gengibre
   - Tarde: Chá hortelã + chia
   - Noite: Chá verde + respiração

2. **Fase 2 (Dias 6-12)**: Eliminação
   - Manhã: Suco anti-parasita (abacaxi + alho + cúrcuma)
   - Tarde: Óleo de coco
   - Noite: Vitamina digestiva (mamão + cúrcuma)

3. **Fase 3 (Dias 13-18)**: Restauração
   - Manhã: Smoothie probiótico
   - Tarde: Maçã com casca
   - Noite: Linhaça + água morna

4. **Fase 4 (Dias 19-21)**: Fortalecimento
   - Manhã: Suco verde detox
   - Tarde: Água de coco
   - Noite: Chá finalizador

## 🚀 Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse http://localhost:5173 (ou porta alternativa indicada pelo Vite)

## 📦 Build para produção

```
npm run build
```

Os arquivos de produção serão gerados na pasta `/dist`.

## 📱 Instalação como PWA

Para instalar como aplicativo:
1. Acesse o site em um navegador compatível (Chrome, Edge, etc.)
2. Procure pelo botão de instalação no canto inferior direito
3. Siga as instruções de instalação

## 📝 Licença

Este projeto está licenciado sob a Licença MIT.
