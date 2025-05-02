const fs = require('fs');
const path = require('path');
const utils = require('./js/utils');

// config.json 파일 읽기
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// index.html 파일 복사
const templatePath = path.join(__dirname, 'index.html');
const outputPath = path.join(__dirname, 'resume.html');
const indexPath = path.join(__dirname, 'index.html');
fs.copyFileSync(templatePath, outputPath);

// 생성된 HTML 파일 읽기
let html = fs.readFileSync(outputPath, 'utf8');

// 기본 정보 설정
const titleRegex = /<title>이력서.*?<\/title>/;
html = html.replace(titleRegex, `<title>이력서 - ${config.name}</title>`);

// ID 기반 속성 설정
const idMap = {
    'name': config.name,
    'phone': config.contact.phone,
    'email': config.contact.email,
    'current-year': new Date().getFullYear()
};

// 줄바꿈(\n)이 있는 내용 처리 (intro)
let introText = config.intro;
if (introText && introText.includes('\n')) {
    introText = introText.replace(/\n/g, '<br>');
}
idMap['intro'] = introText;

// 스킬 설명 추가
if (config.skills_description) {
    idMap['skills-description'] = config.skills_description;
}

// ID 값 설정
for (const [id, value] of Object.entries(idMap)) {
    const regex = new RegExp(`<([^>]+)\\s+id=['"]{1}${id}['"]{1}[^>]*>\\s*<\\/`, 'g');
    html = html.replace(regex, `<$1 id="${id}">${value}</`);
}

// 웹사이트 링크 특별 처리
const websiteRegex = /<a\s+id=['"]{1}website['"]{1}[^>]*>.*?<\/a>/g;
const websiteValue = config.contact.website;

// 객체 형태의 웹사이트 정보 처리
if (websiteValue && typeof websiteValue === 'object') {
    // 링크 설정 - 웹사이트 이름 대신 'LinkedIn' 같이 고정 텍스트 사용
    html = html.replace(websiteRegex, `<a id="website" href="${websiteValue.value || '#'}">${websiteValue.name || 'LinkedIn'}</a>`);
    
    // 아이콘 설정
    const iconRegex = /<i\s+id=['"]{1}website-icon['"]{1}[^>]*class=['"]{1}.*?['"]{1}>/g;
    if (websiteValue.icon) {
        html = html.replace(iconRegex, `<i id="website-icon" class="fab fa-${websiteValue.icon}">`);
    }
} else if (typeof websiteValue === 'string') {
    // 문자열인 경우 기존 로직 유지
    const linkMatch = websiteValue.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch && linkMatch.length === 3) {
        // Markdown 형식이면 텍스트와 URL 분리
        const linkParts = linkMatch[1].split('|');
        const linkText = linkParts[0] || 'Link';
        const linkUrl = linkMatch[2];
        html = html.replace(websiteRegex, `<a id="website" href="${linkUrl}">${linkText}</a>`);
        
        // 아이콘이 지정되어 있으면 변경
        if (linkParts.length > 2 && linkParts[2]) {
            const iconRegex = /<i\s+id=['"]{1}website-icon['"]{1}[^>]*class=['"]{1}.*?['"]{1}>/g;
            html = html.replace(iconRegex, `<i id="website-icon" class="fas fa-${linkParts[2]}">`);
        }
    } else {
        // 일반 URL이면 그대로 사용
        html = html.replace(websiteRegex, `<a id="website" href="${websiteValue}">Link</a>`);
    }
}

// 컨테이너 내용 설정
const containerMap = {
    'experience-container': utils.generateExperienceHTML(config.experience),
    'skills-table': utils.generateSkillsHTML(config.skills),
    'projects-container': utils.generateCompanyProjectsHTML(config.companyProjects),
    'certifications-list': utils.generateCertificationsHTML(config.certifications),
    'education-list': utils.generateEducationHTML(config.education)
};

// 컨테이너 내용 채우기
for (const [id, content] of Object.entries(containerMap)) {
    const regex = new RegExp(`<([^>]+)\\s+id=['"]{1}${id}['"]{1}[^>]*>\\s*<\\/`, 'g');
    if (!regex.test(html)) {
        const containerRegex = new RegExp(`<([^>]+)\\s+id=['"]{1}${id}['"]{1}[^>]*>`, 'g');
        html = html.replace(containerRegex, `<$1 id="${id}">${content}`);
    } else {
        html = html.replace(regex, `<$1 id="${id}">${content}</`);
    }
}

// 스크립트 태그 제거 (정적 HTML이므로 필요 없음)
html = html.replace(/<script.*?<\/script>/gs, '');

// resume.html 저장
fs.writeFileSync(outputPath, html);
console.log(`정적 HTML 파일이 생성되었습니다: ${outputPath}`);
