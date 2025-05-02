// 공통 유틸리티 함수 모음

// 경력 정보 HTML 생성 함수
function generateExperienceHTML(experience) {
    if (!experience) return '';
    
    let html = '';
    
    if (Array.isArray(experience)) {
        experience.forEach(job => {
            html += `<div class="job">
                <h3><span>${job.company || '회사명'}</span></h3>
                <div class="job-details">${job.period || ''} - <span>${job.position || '직책'}</span></div>
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
                    html += `<h3>${project.title}</h3>`;
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

// Node.js 환경에서 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateExperienceHTML,
        generateResponsibilitiesHTML,
        generateCompanyProjectsHTML,
        generateCertificationsHTML,
        generateEducationHTML,
        generateSkillsHTML
    };
} 