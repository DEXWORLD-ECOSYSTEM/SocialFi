const fs = require('fs');
const path = require('path');

const ROOT_SRC = path.join(__dirname, 'src');

/**
 * CONFIGURAÇÃO DA ARQUITETURA DEFINITIVA
 * Mapeamento baseado na Árvore Otimizada fornecida.
 */
const MASTER_PLAN = {
  '_mock': ['_blog.ts'],
  'actions': ['blog-ssr.ts', 'blog.ts'],
  'actions/mappers': ['blog-mapper.ts'],
  'app/post': ['page.tsx', 'layout.tsx', 'loading.tsx', 'error.tsx'],
  'app/post/[title]': ['page.tsx', 'loading.tsx', 'error.tsx'],
  'app/post/category/[slug]': ['page.tsx'],
  'layouts/blog': ['index.ts', 'layout.tsx'],
  'routes': ['paths.ts'],
  'schemas': ['blog-zod.ts'],
  'types': ['blog.ts'],
  'sections/blog': ['constants.ts'],
  'sections/blog/components': ['authors.tsx', 'banner.tsx', 'community.tsx', 'featured.tsx', 'post-search.tsx', 'post-sort.tsx', 'video.tsx', 'index.ts'],
  'sections/blog/details': ['post-comment-item.tsx', 'post-comment-list.tsx', 'post-details-hero.tsx', 'post-details-toolbar.tsx'],
  'sections/blog/forms': ['newsletter.tsx', 'post-comment-form.tsx'],
  'sections/blog/item': ['item-horizontal.tsx', 'item.tsx', 'list-horizontal.tsx', 'list.tsx', 'recent.tsx', 'skeleton.tsx', 'trending.tsx', 'index.ts'],
  'sections/blog/management': ['post-create-edit-form.tsx', 'post-create-view.tsx', 'post-details-preview.tsx', 'post-edit-view.tsx'],
  'sections/blog/view': ['post-details-home-view.tsx', 'post-details-view.tsx', 'post-list-home-view.tsx', 'post-list-view.tsx', 'index.ts']
};

const ISSUES = {
  missing: [],
  empty: [],
  brokenImports: [],
  boundaries: [],
  zombies: []
};

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

function log(color, msg) { console.log(`${color}${msg}${colors.reset}`); }

function checkIntegrity() {
  log(colors.bold + colors.cyan, "🔍 AUDITORIA PROFUNDA: ARQUITETURA BLOG OTIMIZADA\n");

  // 1. Validar Presença de Arquivos do Plano Mestre
  for (const [folder, files] of Object.entries(MASTER_PLAN)) {
    files.forEach(file => {
      const fullPath = path.join(ROOT_SRC, folder, file);
      if (!fs.existsSync(fullPath)) {
        ISSUES.missing.push(`${folder}/${file}`);
      }
    });
  }

  // 2. Scan de Conteúdo e Relações
  function auditDirectory(dir) {
    const list = fs.readdirSync(dir);

    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const relativePath = path.relative(ROOT_SRC, fullPath);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        auditDirectory(fullPath);
      } else {
        const content = fs.readFileSync(fullPath, 'utf8');

        // A. Detectar Arquivos Vazios
        if (content.trim().length === 0) {
          ISSUES.empty.push(relativePath);
        }

        // B. Detectar Zombies (Arquivos que não deveriam estar nessas pastas)
        const folderKey = path.dirname(relativePath).replace(/\\/g, '/');
        if (MASTER_PLAN[folderKey] && !MASTER_PLAN[folderKey].includes(file)) {
          // Ignorar arquivos de sistema como .DS_Store
          if (!file.startsWith('.')) ISSUES.zombies.push(relativePath);
        }

        // C. Analisar Imports (Relativos e src/)
        const importRegex = /from\s+['"](src\/.*|\.\.?\/.*)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
          const target = match[1];
          let resolvedPath;

          if (target.startsWith('src/')) {
            resolvedPath = path.join(ROOT_SRC, target.replace('src/', ''));
          } else {
            resolvedPath = path.resolve(path.dirname(fullPath), target);
          }

          const exts = ['', '.tsx', '.ts', '.js', '.json', '/index.ts', '/index.tsx'];
          const exists = exts.some(ext => fs.existsSync(resolvedPath + ext));

          if (!exists) {
            ISSUES.brokenImports.push({ file: relativePath, target });
          }
        }

        // D. Violação de Fronteiras (Arquitetura)
        // Regra: Views Púbicas NÃO podem importar de Management
        if (relativePath.includes('sections/blog/view') && content.includes('/management/')) {
          ISSUES.boundaries.push(`[VAZAMENTO] ${relativePath} está importando lógica administrativa.`);
        }
        // Regra: Mappers não devem importar Views
        if (relativePath.includes('mappers') && content.includes('/view/')) {
          ISSUES.boundaries.push(`[INVERSÃO] Mapper ${relativePath} não deve depender da UI.`);
        }
      }
    });
  }

  auditDirectory(ROOT_SRC);
  printReport();
}

function printReport() {
  const hasCritical = ISSUES.missing.length > 0 || ISSUES.brokenImports.length > 0;

  if (hasCritical) {
    log(colors.red, "❌ FALHA NA AUDITORIA: ERROS CRÍTICOS DETECTADOS\n");
  } else {
    log(colors.green, "✅ AUDITORIA PASSOU: ARQUITETURA ÍNTEGRA\n");
  }

  if (ISSUES.missing.length > 0) {
    log(colors.bold + colors.red, "🚩 ARQUIVOS FALTANTES (Obrigatórios):");
    ISSUES.missing.forEach(m => console.log(`   - ${m}`));
  }

  if (ISSUES.brokenImports.length > 0) {
    log(colors.bold + colors.red, "\n🚩 IMPORTS QUEBRADOS (Fatal):");
    ISSUES.brokenImports.forEach(i => console.log(`   - Em: ${i.file} -> Não achou: ${i.target}`));
  }

  if (ISSUES.empty.length > 0) {
    log(colors.bold + colors.yellow, "\n🚩 ARQUIVOS VAZIOS (Touch sem conteúdo):");
    ISSUES.empty.forEach(e => console.log(`   - ${e}`));
  }

  if (ISSUES.zombies.length > 0) {
    log(colors.bold + colors.cyan, "\n🚩 ZOMBIES (Arquivos fora do padrão definido):");
    ISSUES.zombies.forEach(z => console.log(`   - ${z}`));
  }

  if (ISSUES.boundaries.length > 0) {
    log(colors.bold + colors.yellow, "\n🚩 VIOLAÇÕES DE FRONTEIRA (Performance/Design):");
    ISSUES.boundaries.forEach(b => console.log(`   - ${b}`));
  }

  console.log("\n" + "=".repeat(50) + "\n");
}

checkIntegrity();