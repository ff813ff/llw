// 从 Twitter Card meta 标签同步图片到页面
window.addEventListener('load', () => {
    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
    const pageImage = document.querySelector('.image');
    
    if (twitterImageMeta && pageImage) {
        const imageUrl = twitterImageMeta.getAttribute('content');
        if (imageUrl) {
            pageImage.src = imageUrl;
        }
    }
    
    // 页面加载动画
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

