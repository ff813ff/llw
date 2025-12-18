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

    // 解析路径和关键词（支持格式：/path/file.htmlkeyword1-keyword2-...）
    function parsePathAndKeywords(fullPath) {
        if (!fullPath || fullPath.trim() === '') {
            return { path: '', keywords: [] };
        }
        
        // 匹配格式：路径/文件名.html关键词部分
        // 例如：AEDJWOYG/XXTuKkPRGO4EW.htmlsafada-cerda-feet-...
        // 注意：.html后面直接跟着关键词，没有分隔符
        const htmlMatch = fullPath.match(/^(.+?\.html)([^-].*)?$/i);
        
        if (htmlMatch) {
            const pathPart = htmlMatch[1]; // 路径和文件名部分
            const keywordPart = htmlMatch[2] || ''; // 关键词部分（.html后面的所有内容）
            
            // 解析关键词（按连字符分割）
            // 第一个关键词可能紧跟在.html后面，需要特殊处理
            let keywords = [];
            if (keywordPart) {
                // 如果关键词部分以连字符开头，去掉第一个连字符
                const cleanKeywordPart = keywordPart.startsWith('-') 
                    ? keywordPart.substring(1) 
                    : keywordPart;
                
                // 检查第一个"关键词"是否实际上是.html的一部分
                // 如果keywordPart不以连字符开头，说明第一个词紧跟在.html后面
                if (!keywordPart.startsWith('-')) {
                    // 找到第一个连字符的位置
                    const firstDashIndex = cleanKeywordPart.indexOf('-');
                    if (firstDashIndex > 0) {
                        // 第一个关键词是.html后面的部分，直到第一个连字符
                        const firstKeyword = cleanKeywordPart.substring(0, firstDashIndex);
                        const restKeywords = cleanKeywordPart.substring(firstDashIndex + 1);
                        keywords = [firstKeyword, ...restKeywords.split('-')];
                    } else {
                        // 只有一个关键词，没有连字符
                        keywords = [cleanKeywordPart];
                    }
                } else {
                    // 正常情况：关键词用连字符分隔
                    keywords = cleanKeywordPart.split('-');
                }
            }
            
            // 过滤空值并清理
            keywords = keywords
                .filter(k => k && k.length > 0)
                .map(k => k.trim())
                .filter(k => k.length > 0);
            
            return { path: pathPart, keywords: keywords };
        }
        
        // 如果没有.html，尝试直接解析为关键词
        const keywords = fullPath.split('-').filter(k => k.length > 0);
        return { path: '', keywords: keywords };
    }

    // 解析关键词（兼容旧格式）
    function parseKeywords(path) {
        if (!path || path.trim() === '') {
            return [];
        }
        
        const { keywords } = parsePathAndKeywords(path);
        return keywords;
    }
    
    // 获取路径部分
    function getPathPart(path) {
        const { path: pathPart } = parsePathAndKeywords(path);
        return pathPart;
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

    // 显示路径信息
    function displayPathInfo() {
        const path = getUrlPath();
        const { path: pathPart, keywords } = parsePathAndKeywords(path);
        
        // 如果有路径部分，显示在页面上
        const pathInfoElement = document.getElementById('pathInfo');
        if (pathInfoElement) {
            if (pathPart) {
                pathInfoElement.textContent = `路径: ${pathPart}`;
                pathInfoElement.style.display = 'block';
            } else {
                pathInfoElement.style.display = 'none';
            }
        }
    }

    // 初始化
    function init() {
        const path = getUrlPath();
        const keywords = parseKeywords(path);
        
        displayCurrentUrl();
        displayKeywords(keywords);
        displayPathInfo();
        
        // 如果有关键词，高亮显示
        if (keywords.length > 0) {
            highlightKeywordsInUrl(keywords);
        }
        
        console.log('URL路径:', path);
        const { path: pathPart, keywords: parsedKeywords } = parsePathAndKeywords(path);
        console.log('路径部分:', pathPart);
        console.log('解析的关键词:', parsedKeywords);
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
    function generateUrlPath(keywords, format = 'simple', pathPrefix = '') {
        if (!keywords || keywords.length === 0) {
            return pathPrefix || '';
        }
        
        // 清理关键词：去除空格，转换为小写，过滤空值
        const cleanedKeywords = keywords
            .map(k => k.trim().toLowerCase())
            .filter(k => k.length > 0)
            .filter((value, index, self) => self.indexOf(value) === index); // 去重
        
        const keywordString = cleanedKeywords.join('-');
        
        if (format === 'path-html' && pathPrefix) {
            // 路径格式：路径/文件名.html关键词1-关键词2-...
            return `${pathPrefix}${keywordString}`;
        }
        
        // 简单格式：关键词1-关键词2-...
        return keywordString;
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
        const formatSelect = document.getElementById('urlFormat');
        const pathInput = document.getElementById('pathInput');
        
        if (!input || !output) return;
        
        const keywords = parseInputKeywords(input.value);
        const format = formatSelect ? formatSelect.value : 'simple';
        const pathPrefix = (format === 'path-html' && pathInput) ? pathInput.value.trim() : '';
        
        // 如果使用路径格式但没有提供路径前缀，使用默认值
        const finalPathPrefix = (format === 'path-html' && !pathPrefix) 
            ? 'AEDJWOYG/XXTuKkPRGO4EW.html' 
            : pathPrefix;
        
        const path = generateUrlPath(keywords, format, finalPathPrefix);
        
        if (path || keywords.length > 0) {
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

    // 切换URL格式
    function toggleFormat() {
        const formatSelect = document.getElementById('urlFormat');
        const pathInputGroup = document.getElementById('pathInputGroup');
        
        if (formatSelect && pathInputGroup) {
            const format = formatSelect.value;
            if (format === 'path-html') {
                pathInputGroup.style.display = 'block';
            } else {
                pathInputGroup.style.display = 'none';
            }
            updateGeneratedUrl();
        }
    }

    // 初始化生成器
    function initGenerator() {
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const exampleBtn = document.getElementById('loadExampleBtn');
        const input = document.getElementById('keywordInput');
        const formatSelect = document.getElementById('urlFormat');
        const pathInput = document.getElementById('pathInput');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', updateGeneratedUrl);
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', copyUrlToClipboard);
        }
        
        if (exampleBtn) {
            exampleBtn.addEventListener('click', loadExampleKeywords);
        }
        
        if (formatSelect) {
            formatSelect.addEventListener('change', toggleFormat);
            // 初始化显示状态
            toggleFormat();
        }
        
        if (pathInput) {
            pathInput.addEventListener('input', updateGeneratedUrl);
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

