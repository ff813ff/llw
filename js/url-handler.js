/**
 * URL关键词解析处理器
 * 从URL路径中提取关键词并动态显示
 */

(function() {
    'use strict';

    // 获取URL路径
    function getUrlPath() {
        // 优先从查询参数获取（通过.htaccess重写）
        const urlParams = new URLSearchParams(window.location.search);
        const pathFromQuery = urlParams.get('path');
        
        if (pathFromQuery) {
            return pathFromQuery;
        }
        
        // 否则直接从window.location.pathname获取
        return window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    }

    // 解析关键词
    function parseKeywords(path) {
        if (!path || path.trim() === '') {
            return [];
        }
        
        // 将路径按连字符分割成关键词
        const keywords = path.split('-').filter(keyword => keyword.length > 0);
        
        // 过滤掉常见的无意义词（可选）
        const stopWords = ['html', 'htm', 'php', 'asp', 'aspx', 'jsp'];
        return keywords.filter(keyword => !stopWords.includes(keyword.toLowerCase()));
    }

    // 显示当前URL
    function displayCurrentUrl() {
        const urlElement = document.getElementById('currentUrl');
        if (urlElement) {
            const fullUrl = window.location.href;
            urlElement.textContent = fullUrl;
            urlElement.title = fullUrl;
        }
    }

    // 显示关键词
    function displayKeywords(keywords) {
        const container = document.getElementById('keywordsContainer');
        const countElement = document.getElementById('keywordCount');
        
        if (!container) return;
        
        // 更新关键词数量
        if (countElement) {
            countElement.textContent = keywords.length;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        if (keywords.length === 0) {
            container.innerHTML = '<p class="no-keywords">当前URL路径中没有关键词，请尝试访问示例链接</p>';
            return;
        }
        
        // 创建关键词标签
        keywords.forEach((keyword, index) => {
            const keywordTag = document.createElement('span');
            keywordTag.className = 'keyword-tag';
            keywordTag.textContent = keyword;
            keywordTag.title = `关键词 #${index + 1}: ${keyword}`;
            container.appendChild(keywordTag);
        });
    }

    // 高亮关键词（在URL中）
    function highlightKeywordsInUrl(keywords) {
        const urlElement = document.getElementById('currentUrl');
        if (!urlElement || keywords.length === 0) return;
        
        let urlText = window.location.href;
        
        // 为每个关键词添加高亮标记（简单实现）
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            urlText = urlText.replace(regex, '<mark>$1</mark>');
        });
        
        urlElement.innerHTML = urlText;
    }

    // 初始化
    function init() {
        const path = getUrlPath();
        const keywords = parseKeywords(path);
        
        displayCurrentUrl();
        displayKeywords(keywords);
        
        // 如果有关键词，高亮显示
        if (keywords.length > 0) {
            highlightKeywordsInUrl(keywords);
        }
        
        console.log('URL路径:', path);
        console.log('解析的关键词:', keywords);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 监听URL变化（用于单页应用）
    window.addEventListener('popstate', init);
})();

/**
 * URL生成器功能
 */
(function() {
    'use strict';

    // 示例关键词列表（包含大量关键词）
    const exampleKeywords = [
        'web', 'development', 'frontend', 'backend', 'javascript', 'typescript', 'react', 'vue', 'angular',
        'nodejs', 'express', 'mongodb', 'mysql', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
        'ci', 'cd', 'git', 'github', 'gitlab', 'api', 'rest', 'graphql', 'microservices', 'serverless', 'lambda',
        'cloud', 'computing', 'devops', 'agile', 'scrum', 'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
        'webpack', 'vite', 'npm', 'yarn', 'pnpm', 'jest', 'cypress', 'selenium', 'testing', 'unit', 'integration',
        'e2e', 'performance', 'optimization', 'seo', 'accessibility', 'responsive', 'mobile', 'desktop', 'tablet',
        'progressive', 'web', 'app', 'spa', 'ssr', 'ssg', 'cms', 'headless', 'jamstack', 'server', 'side',
        'client', 'side', 'fullstack', 'mean', 'mern', 'mevn', 'lamp', 'lemp', 'php', 'python', 'java',
        'csharp', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart', 'flutter', 'react', 'native', 'ionic',
        'cordova', 'xamarin', 'native', 'hybrid', 'cross', 'platform', 'ui', 'ux', 'design', 'figma', 'sketch',
        'adobe', 'xd', 'prototyping', 'wireframing', 'user', 'experience', 'interface', 'design', 'system',
        'component', 'library', 'framework', 'architecture', 'pattern', 'mvc', 'mvp', 'mvvm', 'clean', 'code',
        'refactoring', 'debugging', 'logging', 'monitoring', 'analytics', 'security', 'authentication',
        'authorization', 'encryption', 'ssl', 'tls', 'https', 'oauth', 'jwt', 'session', 'cookie', 'cache',
        'cdn', 'load', 'balancing', 'scalability', 'reliability', 'availability', 'disaster', 'recovery',
        'backup', 'version', 'control', 'merge', 'conflict', 'branch', 'pull', 'request', 'code', 'review',
        'continuous', 'integration', 'deployment', 'automation', 'scripting', 'bash', 'powershell', 'cli',
        'terminal', 'command', 'line', 'ide', 'editor', 'vscode', 'sublime', 'atom', 'vim', 'emacs'
    ];

    // 生成URL路径
    function generateUrlPath(keywords) {
        if (!keywords || keywords.length === 0) {
            return '';
        }
        
        // 清理关键词：去除空格，转换为小写，过滤空值
        const cleanedKeywords = keywords
            .map(k => k.trim().toLowerCase())
            .filter(k => k.length > 0)
            .filter((value, index, self) => self.indexOf(value) === index); // 去重
        
        return cleanedKeywords.join('-');
    }

    // 解析输入的关键词
    function parseInputKeywords(input) {
        if (!input || input.trim() === '') {
            return [];
        }
        
        // 支持空格、逗号、换行符分隔
        return input
            .split(/[\s,\n]+/)
            .map(k => k.trim())
            .filter(k => k.length > 0);
    }

    // 更新生成的URL显示
    function updateGeneratedUrl() {
        const input = document.getElementById('keywordInput');
        const output = document.getElementById('generatedUrl');
        const previewLink = document.getElementById('previewLink');
        
        if (!input || !output) return;
        
        const keywords = parseInputKeywords(input.value);
        const path = generateUrlPath(keywords);
        
        if (path) {
            const baseUrl = window.location.origin;
            const fullUrl = `${baseUrl}/${path}`;
            output.textContent = fullUrl;
            output.title = fullUrl;
            
            if (previewLink) {
                previewLink.href = `/${path}`;
                previewLink.style.display = 'inline-block';
            }
        } else {
            output.textContent = '请输入关键词';
            output.title = '';
            if (previewLink) {
                previewLink.style.display = 'none';
            }
        }
    }

    // 复制URL到剪贴板
    function copyUrlToClipboard() {
        const output = document.getElementById('generatedUrl');
        if (!output || !output.textContent || output.textContent === '请输入关键词') {
            alert('请先生成URL');
            return;
        }
        
        const url = output.textContent;
        
        // 使用现代 Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL已复制到剪贴板！');
            }).catch(err => {
                console.error('复制失败:', err);
                fallbackCopy(url);
            });
        } else {
            fallbackCopy(url);
        }
    }

    // 备用复制方法
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('URL已复制到剪贴板！');
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        }
        
        document.body.removeChild(textarea);
    }

    // 加载示例关键词
    function loadExampleKeywords() {
        const input = document.getElementById('keywordInput');
        if (input) {
            // 随机选择100-150个关键词
            const shuffled = [...exampleKeywords].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, Math.floor(Math.random() * 50) + 100);
            input.value = selected.join(' ');
            updateGeneratedUrl();
        }
    }

    // 初始化生成器
    function initGenerator() {
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const exampleBtn = document.getElementById('loadExampleBtn');
        const input = document.getElementById('keywordInput');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', updateGeneratedUrl);
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', copyUrlToClipboard);
        }
        
        if (exampleBtn) {
            exampleBtn.addEventListener('click', loadExampleKeywords);
        }
        
        if (input) {
            // 实时更新（可选，如果觉得太频繁可以注释掉）
            input.addEventListener('input', updateGeneratedUrl);
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGenerator);
    } else {
        initGenerator();
    }
})();

