const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人简介</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Microsoft YaHei',Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}.container{background:white;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,.2);max-width:500px;width:100%;padding:40px;text-align:center}.avatar{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:40px;color:white}h1{font-size:1.8em;color:#333;margin-bottom:10px}.title{color:#667eea;margin-bottom:25px}.content{line-height:1.8;color:#555;margin-bottom:25px;text-align:left}.contact{margin-top:25px;padding-top:20px;border-top:1px solid #eee;color:#666}
    </style>
</head>
<body>
    <div class="container">
        <div class="avatar">👤</div>
        <h1>张三</h1>
        <p class="title">网页开发者 | 设计师</p>
        <div class="content">
            <p>您好，我是一名专业的网页开发者和设计师，专注于创造优秀的用户体验。</p>
        </div>
        <div class="contact">
            <p>📧 your.email@example.com</p>
            <p>📱 +86 138-0000-0000</p>
        </div>
    </div>
</body>
</html>`;

const keywords = "personal-intro-web-developer-designer-creative-professional-portfolio-resume-cv-about-me-contact-bio-profile-career-job-work-experience-skills-html-css-javascript-react-vue-angular-nodejs-python-php-java-csharp-cpp-mobile-app-ios-android-ui-ux-design-graphic-design-web-design-frontend-backend-fullstack-database-mysql-postgresql-mongodb-redis-api-rest-graphql-microservices-cloud-aws-azure-gcp-docker-kubernetes-devops-ci-cd-git-github-gitlab-bitbucket-agile-scrum-project-management-team-lead-senior-junior-freelance-remote-work-office-company-startup-enterprise-business-consulting-agency-studio-creative-agency-marketing-digital-marketing-seo-sem-social-media-content-creation-blogging-writing-copywriting-branding-identity-logo-design-typography-photography-video-editing-animation-3d-modeling-cad-illustration-drawing-painting-art-creative-direction-strategy-planning-research-analysis-data-analytics-big-data-machine-learning-ai-artificial-intelligence-deep-learning-neural-networks-nlp-computer-vision-blockchain-cryptocurrency-nft-web3-metaverse-vr-ar-gaming-game-development-unity-unreal-engine-mobile-games-console-games-pc-games-indie-games-esports-streaming-youtube-twitch-content-creator-influencer-social-influencer-entrepreneur-founder-ceo-cto-coo-cfo-manager-director-executive-leadership-business-development-sales-marketing-strategy-finance-accounting-legal-compliance-hr-human-resources-recruiting-talent-acquisition-training-education-teaching-mentoring-coaching-consulting-advisory-board-advisor-investor-venture-capital-angel-investor-startup-accelerator-incubator-innovation-technology-software-hardware-electronics-iot-internet-of-things-smart-devices-automation-robotics-drones-autonomous-vehicles-electric-vehicles-sustainability-green-tech-renewable-energy-solar-wind-hydro-nuclear-climate-change-environmental-protection-conservation-wildlife-nature-outdoor-adventure-travel-tourism-hospitality-food-beverage-restaurant-cafe-bar-hotel-resort-spa-wellness-fitness-health-medical-healthcare-pharmaceutical-biotech-genetics-research-science-physics-chemistry-biology-mathematics-statistics-economics-finance-banking-insurance-real-estate-construction-architecture-interior-design-furniture-home-decor-fashion-clothing-apparel-accessories-jewelry-watches-luxury-brands-automotive-cars-motorcycles-bikes-sports-fitness-gym-yoga-pilates-meditation-mindfulness-mental-health-psychology-therapy-counseling-education-school-university-college-student-learning-online-education-elearning-mooc-courses-certifications-training-workshops-seminars-conferences-events-networking-community-social-activism-volunteer-charity-nonprofit-ngo-foundation-philanthropy-humanitarian-aid-disaster-relief-emergency-response-public-safety-security-defense-military-police-firefighter-paramedic-nurse-doctor-physician-surgeon-specialist-dentist-veterinarian-pharmacist-therapist-counselor-psychologist-psychiatrist-social-worker-teacher-professor-researcher-scientist-engineer-architect-lawyer-attorney-judge-prosecutor-paralegal-accountant-auditor-financial-advisor-planner-banker-broker-trader-analyst-economist-statistician-mathematician-physicist-chemist-biologist-geologist-meteorologist-astronomer-astronaut-pilot-flight-attendant-airport-logistics-supply-chain-warehouse-distribution-shipping-delivery-postal-courier-transportation-trucking-railway-maritime-shipping-cruise-ferry-freight-cargo-logistics-customs-import-export-trade-international-business-global-markets-foreign-exchange-currency-trading-stocks-bonds-commodities-derivatives-options-futures-forex-crypto-bitcoin-ethereum-blockchain-defi-nft-metaverse-web3.html";

const basePath = "C:\\Users\\Administrator\\Desktop\\个人名片";
const longPathPrefix = "\\\\?\\";
const fullPath = longPathPrefix + path.join(basePath, keywords);

try {
    fs.writeFileSync(fullPath, htmlContent, 'utf8');
    console.log(`文件创建成功: ${keywords}`);
    console.log(`关键词数量: ${keywords.split('-').length}`);
} catch (error) {
    console.error(`错误: ${error.message}`);
}

