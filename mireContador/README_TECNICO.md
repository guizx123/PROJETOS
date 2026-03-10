# MireContador - Resumo Técnico e Guia de Contexto

Este documento consolida todas as evoluções, correções e a nova arquitetura implementada na sessão de 20/02/2026.

## 🏗️ Nova Arquitetura de Ambientes

O projeto agora suporta múltiplas variantes utilizando a mesma base de código através de variáveis de ambiente (`APP_VARIANT`).

### Dispositivos Lado a Lado
Você pode instalar as duas versões no mesmo celular sem uma substituir a outra:
- **Produção**: `com.anonymous.mireContador`
- **Homologação**: `com.anonymous.mireContador.homolog`

### 🔄 Sistema de Updates (OTA)
Implementado o `expo-updates`. Mudanças simples agora podem ser publicadas sem gerar um novo APK:
- **Canal staging**: Usado pela variante de homologação.
- **Canal production**: Usado pela versão final.

---

## 🛠️ Principais Correções Técnicas

### 1. Estabilização e Performance
- **Rules of Hooks**: Corrigidos diversos erros em `Collection.tsx` onde funções de React eram chamadas condicionalmente, o que causava travamentos aleatórios.
- **React Native Reanimated**: Atualizado para `~4.1.1` e sincronizado com a **Nova Arquitetura (New Arch)** do React Native 0.81 para garantir suporte total às animações e worklets.
- **Expo Doctor**: O projeto agora passa em 100% dos 17 testes de integridade da Expo.

### 2. Melhorias de UX
- **Feedback Tátil**: Implementado feedback profissional (Haptics) para confirmação imediata de leitura do código de barras.
- **Auto-Navegação**: Ao criar um novo balanço, o app agora te leva automaticamente para a tela de escaneamento.
- **Indicadores Visuais**: Badge amarelo "MODO HOMOLOGAÇÃO" adicionado à Home para identificação rápida.

---

## 🚀 Como Operar o Projeto

### Comandos de Build (APK)
```powershell
# Gerar APK de Homologação
eas build --platform android --profile homolog

# Gerar APK de Produção
eas build --platform android --profile production
```

### Comandos de Update (OTA)
```powershell
# Publicar atualização para Homologação
eas update --channel staging

# Publicar atualização para Produção
eas update --channel production
```

### Desenvolvimento Local 
```powershell
# Iniciar simulando Homologação
$env:APP_VARIANT='homolog'; npx expo start

# Iniciar simulando Produção
$env:APP_VARIANT='production'; npx expo start
```

---

## 📌 Estado Atual
- **Configuração**: 100% validada e moderna (SDK 54).
- **Ambientes**: Ambas variantes (`homolog` e `production`) validadas com `expo-doctor` (17/17 checks).
- **Build**: APK de homologação concluído com sucesso. 
- **Feedback**: Sistema de Beep removido a pedido do usuário; Feedback tátil (Vibração) mantido.
- **Próximos Passos**: Testar o APK de homologação e, após validação, gerar o APK de `production`.
