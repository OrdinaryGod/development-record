import{_ as p,r as c,o as i,c as d,a as e,b as n,d as a,e as o}from"./app.c43dec81.js";const r={},t=e("h1",{id:"monorepo",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#monorepo","aria-hidden":"true"},"#"),n(" monorepo")],-1),l={href:"https://www.pnpm.cn/workspaces",target:"_blank",rel:"noopener noreferrer"},u=o('<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么？</h2><p>Monorepo 是一种管理多个项目代码的方式，将多个项目存储在同一个版本库中。通过这种方式，多个项目可以共享代码，同时保持各自的独立性。</p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>Monorepo 的出现主要是为了解决跨项目代码复用、版本管理和协同开发的问题。对于大型组织来说，虽然 NPM 包也可以用于代码共享，但是在一些场景下维护管理起来比较复杂，在大型组织项目中，使用 Monorepo 可以更方便地管理和共享代码。</p><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><p>当你需要管理和维护多个有共享代码的项目，或者你需要协调一个团队开发多个项目，你可以考虑使用 Monorepo。例如，Google 和 Facebook 都使用 Monorepo 来管理他们的代码库。</p><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><ul><li><p><strong>默认策略</strong> 在使用 Node.js 进行模块引用时，它的解析策略大致是这样的：当你使用 <code>require</code> 或 <code>import</code> 引入一个模块时，Node.js 首先会查看是否有本地文件或文件夹匹配该模块名。如果没有，它会向上遍历目录树，查看每个 <code>node_modules</code> 文件夹，看是否存在匹配的模块。 然而，在 Monorepo 结构中， <code>app01</code> 和 <code>shared</code> 并不在同一个文件夹内，也没有相同的父 <code>node_modules</code> 文件夹。因此，如果没有额外的帮助，Node.js 将无法正确解析跨包的</p></li><li><p><strong>符号链接</strong> 这就是 Pnpm Workspaces, Yarn Workspaces 和 Lerna 发挥作用的地方。它们通过创建符号链接（symlink）来帮助 Node.js 解析跨包引用。</p></li></ul>',8),m={href:"https://www.pnpm.cn/npmrc#link-workspace-packages",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>当你在 Monorepo 中运行 <code>pnpm install</code>, <code>yarn install</code> 或 <code>lerna bootstrap</code> 时，Pnpm, Yarn 和 Lerna 会遍历所有的子项目，看它们的 <code>package.json</code> 中是否有对其他子项目的依赖。如果有，它们就会在该子项目的 <code>node_modules</code> 文件夹中创建一个指向被依赖子项目的符号链接。这样，当 Node.js 尝试查找模块时，它会找到这个符号链接，并被正确地重定向到被依赖的子项目。</p><p>所以，尽管 Node.js 本身并不支持 Monorepo 中的跨包引用，但通过使用 Yarn Workspaces 或 Lerna，我们可以“欺骗” Node.js，让它以为所有的子项目都在同一个 <code>node_modules</code> 文件夹中，从而正确地解析跨包的 <code>import</code> 语句。</p><h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用？</h2><ul><li><strong>项目结构参考：</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/monorepo
├── package.json
├── public
├── /packages   <span class="token comment"># 应用目录</span>
│    ├── /app01
│    │   ├── package.json
│    │   ├── src
│    ├── /app02
│    │   ├── package.json
│    │   ├── src
│    ├── /shared
│    │   ├── package.json
│    │   ├── src
├── pnpm-lock.yaml
├── pnpm-workspace.yaml  <span class="token comment"># 定义工作区的根 并使您能够从工作区中包含/排除目录，默认情况下，包括所有子目录的所有包</span>
├── typings     <span class="token comment"># 类型声明，包括：全局组件、业务数据、远程微模块、shim</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>pnpm-workspace.yaml</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">packages</span><span class="token punctuation">:</span>
  <span class="token comment"># all packages in direct subdirs of packages/</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;packages/**&#39;</span>
  <span class="token comment"># all packages in subdirs of components/</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;components/**&#39;</span>
  <span class="token comment"># exclude packages that are inside test directories</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;!**/test/**&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><ul><li><strong>代码写法</strong> 如果你想在应用 app01 中引入 shared 中的某个模块， 你可以在 app01 的 <code>package.json</code> 中声明</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@monorepo/shared&quot;</span><span class="token operator">:</span><span class="token string">&quot;*&quot;</span>  <span class="token comment">// * 表示使用最新版本</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者这样直接在项目根目录下使用 pnpm 命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> @monorepo/shared <span class="token parameter variable">--filter</span> @monorepo/app01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上命令是 <code>pnpm --filter</code> 系列命令，可以为指定包 安装依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> @types/lodash <span class="token parameter variable">--filter</span> @monorepo/shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，就可以引入并使用了</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useHttp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@monorepo/shared&quot;</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">useHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，你不必先将 <code>shared</code> 发布到 npm，但可以像引用 npm 包一样引用 <code>shared</code> 代码库中的 <code>useHttp</code> 方法。</p>`,17);function k(h,b){const s=c("ExternalLinkIcon");return i(),d("div",null,[t,e("p",null,[n("基于 "),e("a",l,[n("pnpm workspace"),a(s)]),n(" 机制实现 monorepo 把单独的包抽离到独立的子项目中维护")]),u,e("p",null,[n("具体看 pnpm 的 "),e("a",m,[n("链接工作区（link-workspace-packages）"),a(s)])]),v])}const _=p(r,[["render",k],["__file","monorepo.html.vue"]]);export{_ as default};