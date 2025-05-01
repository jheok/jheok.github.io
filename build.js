const fs = require('fs');
const path = require('path');
const utils = require('./js/utils');

// config.json 파일 읽기
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// index.html 파일을 템플릿으로 읽기
const templatePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(templatePath, 'utf8');

// 기본 정보 대체
html = html.replace('{{name}}', config.name);
html = html.replace('{{intro}}', config.intro);
html = html.replace('{{year}}', new Date().getFullYear());
html = html.replace('{{phone}}', config.contact.phone);
html = html.replace('{{email}}', config.contact.email);
html = html.replace('{{website}}', config.contact.website);

// 경력 정보 대체
html = html.replace('{{experience}}', utils.generateExperienceHTML(config.experience));

// 스킬 정보 대체
html = html.replace('{{skills}}', utils.generateSkillsHTML(config.skills));

// 프로젝트 정보 대체
html = html.replace('{{projects}}', utils.generateCompanyProjectsHTML(config.companyProjects));

// 자격증 정보 대체
html = html.replace('{{certifications}}', utils.generateCertificationsHTML(config.certifications));

// 교육 정보 대체
html = html.replace('{{education}}', utils.generateEducationHTML(config.education));

// 생성된 HTML 파일 저장
const outputPath = path.join(__dirname, 'resume.html');
fs.writeFileSync(outputPath, html);

console.log(`정적 HTML 파일이 생성되었습니다: ${outputPath}`);
