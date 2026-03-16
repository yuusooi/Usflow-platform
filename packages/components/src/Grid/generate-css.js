// import fs from 'fs';
// import path from 'path';

// // 断点配置
// const breakpoints = {
// xs: { media: '(max-width: 480px)' },
// sm: { media: '(min-width: 576px)' },
// md: { media: '(min-width: 768px)' },
// lg: { media: '(min-width: 992px)' },
// xl: { media: '(min-width: 1200px)' },
// };

// // 生成 CSS 内容
// let css = '/* 自动生成的响应式样式 */\n\n';

// Object.entries(breakpoints).forEach(([name, config]) => {
// css += `/* ${name} 断点 */\n`;
// css += `@media ${config.media} {\n`;

// // 生成 span 类
// for (let i = 1; i <= 24; i++) {
//     const width = (i / 24) * 100;
//     css += `  .my-col-${name}-span-${i} { width: ${width}%; }\n`;
// }

// // 生成 offset 类
// for (let i = 1; i <= 24; i++) {
//     const margin = (i / 24) * 100;
//     css += `  .my-col-${name}-offset-${i} { margin-left: ${margin}%; }\n`;
// }

// // 生成 push 类
// for (let i = 1; i <= 24; i++) {
//     const margin = (i / 24) * 100;
//     css += `  .my-col-${name}-push-${i} { margin-left: ${margin}%; }\n`;
// }

// // 生成 pull 类
// for (let i = 1; i <= 24; i++) {
//     const margin = (i / 24) * 100;
//     css += `  .my-col-${name}-pull-${i} { margin-right: ${margin}%; }\n`;
// }

// css += '}\n\n';
// });

// // 写入文件
// const outputPath = path.join(__dirname, 'grid.responsive.css');
// fs.writeFileSync(outputPath, css);

// console.log('✅ 响应式 CSS 已生成！');

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // 1. 修复 __dirname (在 ESM 模式下必须这样写)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 2. 调整断点策略 (Mobile First)
// // xs 不设 media query，作为默认值应用到所有屏幕
// // 其他断点使用 min-width，表示 "从这个尺寸开始及以上"
// const breakpoints = {
//   xs: { media: null }, // 默认为空，不包裹 @media
//   sm: { media: '(min-width: 576px)' },
//   md: { media: '(min-width: 768px)' },
//   lg: { media: '(min-width: 992px)' },
//   xl: { media: '(min-width: 1200px)' },
// };

// let css = '/* 自动生成的响应式样式 - Mobile First */\n\n';

// // 通用样式：让 Col 支持相对定位，以便 push/pull 生效
// css += `[class*="my-col-"] {
//   position: relative;
//   min-height: 1px;
//   padding-right: 15px;
//   padding-left: 15px;
// }\n\n`;

// Object.entries(breakpoints).forEach(([name, config]) => {
//   let blockContent = '';

//   // 生成 span (宽度)
//   for (let i = 1; i <= 24; i++) {
//     const width = (i / 24) * 100;
//     // 使用 toFixed(4) 防止无限循环小数，保持 CSS 整洁
//     blockContent += `  .my-col-${name}-span-${i} { display: block; flex: 0 0 ${width.toFixed(4)}%; max-width: ${width.toFixed(4)}%; }\n`;
//   }

//   // 生成 offset (左偏移)
//   for (let i = 0; i <= 24; i++) {
//     if (i === 0 && name === 'xs') continue; // xs-offset-0通常不需要生成
//     const margin = (i / 24) * 100;
//     blockContent += `  .my-col-${name}-offset-${i} { margin-left: ${margin.toFixed(4)}%; }\n`;
//   }

//   // 3. 修复 Push (向右推 -> left)
//   for (let i = 0; i <= 24; i++) {
//     if (i === 0) {
//       blockContent += `  .my-col-${name}-push-0 { left: auto; }\n`;
//     } else {
//       const left = (i / 24) * 100;
//       blockContent += `  .my-col-${name}-push-${i} { left: ${left.toFixed(4)}%; }\n`;
//     }
//   }

//   // 3. 修复 Pull (向左拉 -> right)
//   for (let i = 0; i <= 24; i++) {
//     if (i === 0) {
//       blockContent += `  .my-col-${name}-pull-0 { right: auto; }\n`;
//     } else {
//       const right = (i / 24) * 100;
//       blockContent += `  .my-col-${name}-pull-${i} { right: ${right.toFixed(4)}%; }\n`;
//     }
//   }

//   // 4. 根据是否有 media 决定是否包裹
//   if (config.media) {
//     css += `/* ${name} 断点 */\n`;
//     css += `@media ${config.media} {\n${blockContent}}\n\n`;
//   } else {
//     css += `/* ${name} 默认 (手机优先) */\n`;
//     css += blockContent + '\n\n';
//   }
// });

// // 写入文件
// const outputPath = path.join(__dirname, 'grid.responsive.css');
// fs.writeFileSync(outputPath, css);

// console.log(`✅ 响应式 CSS 已生成！路径: ${outputPath}`);

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 1. 修复 __dirname (在 ESM 模式下必须这样写)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 2. 断点配置
const breakpoints = {
  xs: { media: null }, // 默认样式，不包裹 @media
  sm: { media: '(min-width: 576px)' },
  md: { media: '(min-width: 768px)' },
  lg: { media: '(min-width: 992px)' },
  xl: { media: '(min-width: 1200px)' },
}

let css = '/* 自动生成的响应式样式 - Mobile First */\n\n'

// 通用样式：让 Col 支持相对定位
css += `[class*="my-col-"] {
position: relative;
min-height: 1px;
padding-right: 15px;
padding-left: 15px;
}\n\n`

// 3. 定义属性生成配置（核心改进：一个配置代替四个循 环）
const propTypes = [
  {
    name: 'span',
    range: { start: 1, end: 24 },
    template: (i) => {
      const width = ((i / 24) * 100).toFixed(4)
      return `display: block; flex: 0 0 ${width}%; max-width: ${width}%;`
    },
  },
  {
    name: 'offset',
    range: { start: 0, end: 24 },
    skipZero: true,
    template: (i) => {
      const margin = ((i / 24) * 100).toFixed(4)
      return `margin-left: ${margin}%;`
    },
  },
  {
    name: 'push',
    range: { start: 0, end: 24 },
    template: (i) => {
      if (i === 0) return 'left: auto;'
      const left = ((i / 24) * 100).toFixed(4)
      return `left: ${left}%;`
    },
  },
  {
    name: 'pull',
    range: { start: 0, end: 24 },
    template: (i) => {
      if (i === 0) return 'right: auto;'
      const right = ((i / 24) * 100).toFixed(4)
      return `right: ${right}%;`
    },
  },
]

// 4. 遍历断点
Object.entries(breakpoints).forEach(([name, config]) => {
  let blockContent = ''

  // 5. 用一个循环生成所有属性类型（核心优化）
  propTypes.forEach(({ name: propType, range, template, skipZero }) => {
    for (let i = range.start; i <= range.end; i++) {
      // 跳过 xs-offset-0
      if (skipZero && i === 0 && name === 'xs') continue

      const styles = template(i)
      blockContent += `  .my-col-${name}-${propType}-${i} { ${styles} }\n`
    }
  })

  // 6. 根据是否有 media 决定是否包裹
  if (config.media) {
    css += `/* ${name} 断点 */\n`
    css += `@media ${config.media} {\n${blockContent}}\n\n`
  } else {
    css += `/* ${name} 默认 (手机优先) */\n`
    css += blockContent + '\n\n'
  }
})

// 写入文件
const outputPath = path.join(__dirname, 'grid.responsive.css')
fs.writeFileSync(outputPath, css)

console.log(`✅ 响应式 CSS 已生成！路径: ${outputPath}`)
