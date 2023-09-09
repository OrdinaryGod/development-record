import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";

export default defineUserConfig({
    lang: 'zh-CN',
    title: '开发记录',
    description: "编程开发记录与总结",
    base: '/development-record/',
    head: [['link', { rel: 'icon', href: './favicon-16x16.png' }]],
    theme: defaultTheme({
        docsBranch: 'main',
        navbar: [
            {
                text: 'Woiq Home',
                link: 'https://woiq.xyz/',
            },
            {
                text: 'Projects',
                link: 'https://github.com/OrdinaryGod',
            }
        ],
        repo: 'OrdinaryGod/development-record',
        sidebar: [
            {
                'text': '说明',
                'link': '/',
            },
            'next-full-stack-app.md',
            'monorepo.md'
        ],
    }),
    plugins: [],
})