**Personal portfolio & blog** — graphics projects, tutorials, tech writing, and more. Built with React, Vite, and Tailwind CSS.

个人作品集与技术博客：图形学项目、教程、随笔与小说节选；评论等功能可选用 Supabase。

---

## 在线访问

若已在仓库 **Settings → Pages** 中启用 **GitHub Actions** 部署，站点通常为：

- **用户主页仓库**（`<用户名>.github.io`）：`https://<用户名>.github.io/`
- **普通仓库**：`https://<用户名>.github.io/<仓库名>/`

（将 `<用户名>`、`<仓库名>` 换成你的 GitHub 账号与仓库名。）

---

## 本地开发

环境与依赖在子目录 `blog-app/` 中。

```bash
cd blog-app
npm ci
npm run dev
```

或在仓库根目录：

```bash
npm install --prefix blog-app
npm run dev
```

浏览器访问终端里提示的本地地址（一般为 `http://localhost:5173`）。

---

## 构建

```bash
npm run build
```

产物输出至 `blog-app/dist/`。

模拟「部署在子路径」时可指定（与 CI 中逻辑一致）：

```bash
VITE_BASE=/仓库名/ npm run build --prefix blog-app
```

---

## 部署（GitHub Pages）

仓库已包含 Workflow：`.github/workflows/deploy-github-pages.yml`。推送至 `main` / `master` 后会自动构建并发布。

首次使用请在 **Settings → Pages** 中将 **Source** 设为 **GitHub Actions**。

---

## 可选：Supabase（评论等）

复制环境变量模板并按项目填写：

```bash
cp blog-app/.env.example blog-app/.env
```

未配置时站点仍可浏览，相关功能会处于不可用状态。

---

## 目录说明

| 路径 | 说明 |
|------|------|
| `blog-app/` | 前端应用（Vite + React） |
| `blog-app/src/content/` | Markdown 项目页与教程正文 |
| `blog-app/public/` | 静态资源（图片、favicon 等） |
| `.github/workflows/` | GitHub Actions（含 Pages 部署） |
