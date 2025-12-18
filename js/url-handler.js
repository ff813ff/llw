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

