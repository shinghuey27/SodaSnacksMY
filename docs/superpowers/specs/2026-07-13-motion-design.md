# SodaSnacks 动效升级设计

**日期**: 2026-07-13
**状态**: 已确认（动效语汇与地图经浏览器伴侣会话选定；强度由 Claude 代决策：克制版 + 零食视差）

## 目标

给目前完全静态的滚动体验加入符合像素街机风格的入场动效，加深品牌记忆点，同时不干扰阅读、不影响转化、不增加依赖。

## 动效语汇（用户选定）

| 代号 | 名称 | 描述 | 用途 |
|---|---|---|---|
| D | CRT 扫描显像 | clip-path 从上到下按 steps() 逐行显现，附一条发光扫描线 | 主打 — 用在「屏幕感」元素 |
| A | 像素拼合 | 覆盖层网格色块错峰消失，内容如马赛克显影 | 点睛 — 只用在 Featured 项目卡 |
| B | 8-bit 阶梯滑入 | translateY + steps(5) 跳帧上移 | 打底 — 其余所有入场 |

## 动效地图（克制版 + 视差）

| 区块 | 动效 | 触发 |
|---|---|---|
| Hero 插图 | D 扫描显像（约 700ms） | 页面加载时（首屏，不用 IO） |
| Hero 文字块 | B，标题→副标题→CTA 错峰 | 页面加载时 |
| Featured 项目卡 | A 像素拼合（约 600ms） | 首次滚入视野 |
| 卡带选择器缩略图 | B，逐个错峰 80ms | 首次滚入视野 |
| Services 三张卡 | B，逐个错峰 120ms | 首次滚入视野 |
| Contact 表单窗口 | D 扫描显像 | 首次滚入视野 |
| Contact 信息卡 | B 错峰 | 首次滚入视野 |
| 漂浮零食 | 视差滚动（每个 sprite 因子 0.1–0.3，transform-only） | 持续，随滚动 |
| 分隔条 / Footer / 跑马灯 | 不动（维持现状） | — |

明确不做（本期）：hero 扫描线纹理层、分隔条行进灯、卡带切换扫描动画。语汇兼容，后续可单独追加。

## 技术方案

**零新依赖**：CSS keyframes + IntersectionObserver，与现有代码库的手写风格一致。

1. **`hooks/use-in-view.ts`（新）** — IntersectionObserver 钩子：`once: true`、`threshold: 0.2`，返回 `{ ref, inView }`。内部整合现有 `lib/use-reduced-motion.ts`：reduced motion 时直接返回 `inView: true`（不注册 observer）。
2. **`app/globals.css`** — 新增 keyframes：`px-scan-in`（D，clip-path + steps(9)）、`px-step-in`（B，steps(5)）、拼合覆盖格 `px-cell-out`；以及对应的工具类。动画只用 `transform` / `opacity` / `clip-path`，零布局抖动。
3. **A 拼合覆盖层** — 小组件 `PixelAssemble`：内容上方绝对定位 5×4 网格（背景色单元格），nth-child 错峰淡出，动画结束后整层 `display: none`，`pointer-events: none`。
4. **视差** — 在 `floating-snacks.tsx` 内：passive scroll 监听 + rAF 节流，对每个 sprite 施加 `translate3d(0, scrollY × factor, 0)`；reduced motion 时跳过。
5. **各区块组件**（hero / portfolio / services / contact）挂 `useInView`，用条件 class 触发动画。

## 无障碍与性能约束

- 所有入场动效在 `prefers-reduced-motion: reduce` 时退化为直接显示（无位移、无延迟）。
- 每个区块只播一次（IO `once`），回滚不重播。
- 动画时长 300–700ms，错峰 ≤120ms/个；不阻塞交互，不做滚动劫持。
- 不引入 framer-motion / GSAP 等依赖。

## 验收标准

1. 首次从上到下滚一遍：每个地图内区块各播一次对应动效；往回滚不重播。
2. 系统开启「减少动态」后：页面无任何动画，内容立即可见，视差关闭。
3. 动画期间无横向溢出、无布局位移（CLS 不变）。
4. 手机（375px）与桌面（1440px）均正常；中英文模式均正常。
