# 动态URL关键词堆砌演示页面

这是一个静态网站演示项目，展示如何使用URL重写规则和JavaScript实现动态URL关键词解析和堆砌效果。

## 功能特性

- ✅ URL路径关键词自动解析
- ✅ 动态显示关键词列表
- ✅ URL重写规则支持（Apache .htaccess）
- ✅ 响应式设计
- ✅ 关键词高亮显示

## 文件结构

```
.
├── index.html          # 主页面
├── .htaccess          # Apache URL重写规则
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── url-handler.js # URL处理逻辑
└── README.md          # 说明文档
```

## 使用方法

### 1. 本地开发

直接在浏览器中打开 `index.html` 文件即可。JavaScript会自动解析URL路径中的关键词。

### 2. Apache服务器部署

1. 将所有文件上传到Apache服务器
2. 确保服务器启用了 `mod_rewrite` 模块
3. 访问网站，URL路径中的关键词会被自动解析

### 3. URL格式示例

- `/keyword1-keyword2-keyword3`
- `/test-seo-optimization-demo`
- `/example-url-rewrite-keyword-parsing`

## 技术说明

### URL重写规则

`.htaccess` 文件将所有非真实文件的请求重定向到 `index.html`，并通过查询参数传递原始路径：

```apache
RewriteRule ^(.*)$ index.html?path=$1 [L,QSA]
```

### 关键词解析

JavaScript从URL路径中提取关键词：
- 按连字符（`-`）分割路径
- 过滤空字符串和常见文件扩展名
- 动态显示在页面上

### 浏览器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移动端浏览器

## 注意事项

1. **服务器配置**：如果使用Apache，需要确保启用了 `mod_rewrite` 模块
2. **Nginx配置**：如果使用Nginx，需要配置相应的重写规则
3. **SEO考虑**：关键词堆砌可能对SEO产生负面影响，本演示仅用于技术学习

## 自定义配置

### 修改关键词分隔符

在 `js/url-handler.js` 中修改：

```javascript
const keywords = path.split('-'); // 将 '-' 改为其他分隔符
```

### 添加停用词过滤

在 `js/url-handler.js` 的 `stopWords` 数组中添加需要过滤的词汇。

### 修改样式

编辑 `css/style.css` 文件来自定义页面外观。

## 许可证

本项目仅供学习和演示使用。


