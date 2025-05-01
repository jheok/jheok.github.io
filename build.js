const fs = require('fs');
const path = require('path');

// config.json 파일 읽기
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// HTML 템플릿 생성
let html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이력서 - ${config.name}</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>${config.name}</h1>
            <p>${config.intro}</p>
        </header>

        <main>
            <section class="section">
                <h2>EXPERIENCE</h2>
                ${generateExperienceHTML(config.experience)}
            </section>

            <section class="section">
                <h2>SKILLS</h2>
                <div class="skills-table">
                    <table>
                        ${generateSkillsHTML(config.skills)}
                    </table>
                </div>
            </section>

            <section class="section">
                <h2>PROJECTS</h2>
                ${generateCompanyProjectsHTML(config.companyProjects)}
            </section>

            <section class="section">
                <h2>CERTIFICATIONS</h2>
                <ul class="certification-list">
                    ${generateCertificationsHTML(config.certifications)}
                </ul>
            </section>

            <section class="section">
                <h2>EDUCATION</h2>
                <ul class="education-list">
                    ${generateEducationHTML(config.education)}
                </ul>
            </section>
        </main>

        <aside>
            <section class="contact-info">
                <h2>CONTACT</h2>
                <p><i class="fas fa-phone"></i> Phone: ${config.contact.phone}</p>
                <p><i class="fas fa-envelope"></i> Email: ${config.contact.email}</p>
                <p><i class="fas fa-globe"></i> Website: ${config.contact.website}</p>
            </section>
        </aside>
    </div>

    <footer>
        <p>&copy; ${new Date().getFullYear()} - 이력서</p>
    </footer>
</body>
</html>`;

// 경력 정보 HTML 생성 함수
function generateExperienceHTML(experience) {
    if (!experience) return '';
    
    let html = '';
    
    if (Array.isArray(experience)) {
        experience.forEach(job => {
            html += `<div class="job">
                <h3>${job.position || '직책'}, <span>${job.company || '회사명'}</span> (<span>${job.period || ''}</span>)</h3>
                ${generateResponsibilitiesHTML(job.responsibilities)}
            </div>`;
        });
    }
    
    return html;
}

// 담당 업무 HTML 생성 함수
function generateResponsibilitiesHTML(responsibilities) {
    if (!responsibilities || !responsibilities.length) return '';
    
    let html = '<ul>';
    responsibilities.forEach(responsibility => {
        html += `<li>${responsibility}</li>`;
    });
    html += '</ul>';
    
    return html;
}

// 회사별 프로젝트 HTML 생성 함수
function generateCompanyProjectsHTML(companyProjects) {
    if (!companyProjects || !companyProjects.length) return '';
    
    let html = '';
    
    companyProjects.forEach(companyProject => {
        // 회사 정보
        html += `<div class="company-project">
            <h3 class="company-name">${companyProject.company}</h3>
            <div class="project-period">${companyProject.period}</div>`;
        
        // 각 프로젝트
        if (companyProject.projects && companyProject.projects.length) {
            companyProject.projects.forEach(project => {
                html += `<div class="project">`;
                
                if (project.title) {
                    html += `<h4>${project.title}</h4>`;
                }
                
                if (project.details && project.details.length) {
                    html += '<ul>';
                    project.details.forEach(detail => {
                        html += `<li>${detail}</li>`;
                    });
                    html += '</ul>';
                }
                
                if (project.achievements && project.achievements.length) {
                    html += `<div class="project-result">
                        <h4>프로젝트 성과</h4>
                        <ul>`;
                    project.achievements.forEach(achievement => {
                        html += `<li>${achievement}</li>`;
                    });
                    html += `</ul>
                    </div>`;
                }
                
                if (project.skills) {
                    html += `<div class="skills">
                        <h4>Skill Keywords</h4>
                        <p>${project.skills}</p>
                    </div>`;
                }
                
                html += `</div>`; // project 닫기
            });
        }
        
        html += `</div>`; // company-project 닫기
    });
    
    return html;
}

// 자격증 정보 HTML 생성 함수
function generateCertificationsHTML(certifications) {
    if (!certifications || !certifications.length) return '';
    
    let html = '';
    
    certifications.forEach(cert => {
        html += `<li>${cert.name} <span class="cert-date">${cert.date}</span></li>`;
    });
    
    return html;
}

// 학력 정보 HTML 생성 함수
function generateEducationHTML(education) {
    if (!education || !education.length) return '';
    
    let html = '';
    
    education.forEach(edu => {
        html += `<li>${edu.school} <span class="edu-date">${edu.period}</span></li>`;
    });
    
    return html;
}

// 스킬 정보 HTML 생성 함수
function generateSkillsHTML(skills) {
    if (!skills || !skills.length) return '';
    
    let html = '';
    
    skills.forEach(skill => {
        html += `<tr>
            <td class="skill-category">${skill.name}</td>
            <td>${skill.value}</td>
        </tr>`;
    });
    
    return html;
}

// 생성된 HTML 파일 저장
const outputPath = path.join(__dirname, 'resume.html');
fs.writeFileSync(outputPath, html);

console.log(`정적 HTML 파일이 생성되었습니다: ${outputPath}`); 