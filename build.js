const fs = require('fs');
const path = require('path');
const utils = require('./js/utils');

// config.json 파일 읽기
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// index.html 파일 복사
const templatePath = path.join(__dirname, 'index.html');
const outputPath = path.join(__dirname, 'resume.html');
fs.copyFileSync(templatePath, outputPath);

// 생성된 HTML 파일 읽기
let html = fs.readFileSync(outputPath, 'utf8');

// 기본 정보 설정
const titleRegex = /<title>이력서.*?<\/title>/;
html = html.replace(titleRegex, `<title>이력서 - ${config.name}</title>`);

// ID 기반 속성 설정
const idMap = {
    'name': config.name,
    'intro': config.intro,
    'phone': config.contact.phone,
    'email': config.contact.email,
    'website': config.contact.website,
    'current-year': new Date().getFullYear()
};

// ID 값 설정
for (const [id, value] of Object.entries(idMap)) {
    const regex = new RegExp(`<([^>]+)\\s+id=['"]{1}${id}['"]{1}[^>]*>\\s*<\\/`, 'g');
    html = html.replace(regex, `<$1 id="${id}">${value}</`);
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

// 저장
fs.writeFileSync(outputPath, html);

console.log(`정적 HTML 파일이 생성되었습니다: ${outputPath}`);
