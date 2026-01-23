#!/bin/bash

REPORT="RELATORIO_AUDITORIA_ELITE.txt"
echo "🚀 INICIANDO AUDITORIA ELITE - VERSÃO 10/10" > $REPORT
echo "📅 Data: $(date)" >> $REPORT
echo "====================================================" >> $REPORT

# 1. SAÚDE DAS DEPENDÊNCIAS (Node Modules)
echo -e "\n[!] ANALISANDO DEPENDÊNCIAS FANTASMAS (Bibliotecas inúteis)" >> $REPORT
# npx depcheck identifica pacotes no package.json que não aparecem no código
npx depcheck --skip-missing=true --ignores="eslint*,prettier*,@types*,typescript,next,rimraf,cross-env,husky" >> $REPORT

# 2. IDENTIFICAÇÃO DE "ARQUIVOS ZUMBI" (Arquivos sem Importação)
echo -e "\n[!] LOCALIZANDO ARQUIVOS ÓRFÃOS (Zumbis)" >> $REPORT
# Filtra apenas arquivos que NÃO estão no index e verifica se o nome aparece em outros arquivos
find src -type f \( -name "*.tsx" -o -name "*.ts" \) ! -name "index.ts" ! -name "index.tsx" | while read file; do
    filename=$(basename "$file" | cut -d. -f1)
    # Busca por referências ignorando a própria declaração
    usage=$(grep -r "$filename" src --exclude="$file" --exclude="index.ts" --exclude="index.tsx" | wc -l)
    if [ "$usage" -eq 0 ]; then
        echo "❌ DELETÁVEL: $file (Zero referências encontradas)" >> $REPORT
    fi
done

# 3. RASTREIO DE REFERÊNCIAS QUEBRADAS (Import Trace)
echo -e "\n[!] RASTREANDO IMPORTAÇÕES DE MÓDULOS DELETADOS (Bugs fatais)" >> $REPORT
# Procura por imports que tentam acessar o que já removemos (mapa, invoice, job, files)
grep -rnE "(_examples|_files|_job|_invoice|components/map)" src/ >> $REPORT

# 4. AUDITORIA DE ASSETS (Imagens e Vídeos Pesados)
echo -e "\n[!] AUDITORIA DE MÍDIA (Imagens > 500kb)" >> $REPORT
find public src/assets -type f -size +500k >> $REPORT

# 5. ANÁLISE DE CÓDIGO MORTO EM LAYOUTS (Menu e Rotas)
echo -e "\n[!] VERIFICANDO CAMINHOS MORTOS NO NAV-CONFIG" >> $REPORT
# Verifica se os paths definidos no menu lateral ainda existem no sistema de arquivos
grep "path:" src/layouts/nav-config-dashboard.tsx | cut -d"\'" -f2 | while read path; do
    if [[ "$path" == /dashboard/* ]]; then
        folder="src/app${path//[\[\]]/}"
        if [ ! -d "$folder" ] && [ ! -f "$folder/page.tsx" ]; then
            echo "⚠️ ROTA QUEBRADA NO MENU: $path (Pasta não encontrada em $folder)" >> $REPORT
        fi
    fi
done

# 6. TESTE SUPREMO DE INTEGRIDADE (TS-CHECK)
echo -e "\n[!] DIAGNÓSTICO FINAL DE COMPILAÇÃO (Bugs Lógicos)" >> $REPORT
NODE_OPTIONS=\'--max_old_space_size=4096\' npx tsc --noEmit >> $REPORT 2>&1

echo -e "\n====================================================" >> $REPORT
echo "✅ AUDITORIA CONCLUÍDA! Resultado em: $REPORT"