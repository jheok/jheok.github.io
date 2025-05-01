document.addEventListener('DOMContentLoaded', function() {
    // 현재 연도 업데이트
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // 개인 정보 업데이트 함수
    function updateResumeInfo(data) {
        // 기본 정보 업데이트
        if (data.name) document.getElementById('name').textContent = data.name;
        if (data.intro) document.getElementById('intro').textContent = data.intro;
        
        // 연락처 정보 업데이트
        if (data.contact) {
            if (data.contact.phone) document.getElementById('phone').textContent = data.contact.phone;
            if (data.contact.email) document.getElementById('email').textContent = data.contact.email;
            if (data.contact.website) document.getElementById('website').textContent = data.contact.website;
        }
        
        // 스킬 정보 업데이트
        if (data.skills) {
            // 새로운 배열 형태의 스킬 구조 처리
            if (Array.isArray(data.skills)) {
                const skillsTable = document.querySelector('.skills-table table');
                skillsTable.innerHTML = ''; // 기존 테이블 내용 초기화
                
                data.skills.forEach(function(skill) {
                    const tr = document.createElement('tr');
                    
                    const categoryTd = document.createElement('td');
                    categoryTd.className = 'skill-category';
                    categoryTd.textContent = skill.name;
                    tr.appendChild(categoryTd);
                    
                    const valueTd = document.createElement('td');
                    valueTd.textContent = skill.value;
                    tr.appendChild(valueTd);
                    
                    skillsTable.appendChild(tr);
                });
            }
        }
        
        // 경력 정보 업데이트
        if (data.experience) {
            const experienceSection = document.querySelector('.section:nth-of-type(1)');
            experienceSection.innerHTML = '<h2>EXPERIENCE</h2>';
            
            // 배열 형태의 경력 정보 처리
            if (Array.isArray(data.experience)) {
                data.experience.forEach(function(job) {
                    const jobDiv = document.createElement('div');
                    jobDiv.className = 'job';
                    
                    const jobTitle = document.createElement('h3');
                    jobTitle.innerHTML = `<span>${job.company || '회사명'}</span>`;
                    jobDiv.appendChild(jobTitle);
                    
                    const jobDetails = document.createElement('div');
                    jobDetails.className = 'job-details';
                    jobDetails.innerHTML = `${job.position || '직책'}, <span>${job.period || ''}</span>`;
                    jobDiv.appendChild(jobDetails);
                    
                    if (job.responsibilities && job.responsibilities.length > 0) {
                        const ul = document.createElement('ul');
                        job.responsibilities.forEach(function(responsibility) {
                            const li = document.createElement('li');
                            li.textContent = responsibility;
                            ul.appendChild(li);
                        });
                        jobDiv.appendChild(ul);
                    }
                    
                    experienceSection.appendChild(jobDiv);
                });
            } 
            // 기존 방식 지원 (하위 호환성)
            else {
                // 현재 직장 처리
                if (data.experience.current) {
                    const currentJob = document.createElement('div');
                    currentJob.className = 'job';
                    
                    const jobTitle = document.createElement('h3');
                    jobTitle.innerHTML = `데이터 엔지니어, <span id="current-company">${data.experience.current.company || '회사명'}</span> (<span id="current-period">${data.experience.current.period || ''}</span>)`;
                    currentJob.appendChild(jobTitle);
                    
                    if (data.experience.current.responsibilities && data.experience.current.responsibilities.length > 0) {
                        const ul = document.createElement('ul');
                        data.experience.current.responsibilities.forEach(function(responsibility) {
                            const li = document.createElement('li');
                            li.textContent = responsibility;
                            ul.appendChild(li);
                        });
                        currentJob.appendChild(ul);
                    }
                    
                    experienceSection.appendChild(currentJob);
                }
                
                // 이전 직장 처리
                if (data.experience.previous) {
                    const previousJob = document.createElement('div');
                    previousJob.className = 'job';
                    
                    const jobTitle = document.createElement('h3');
                    jobTitle.innerHTML = `데이터 엔지니어, <span id="previous-company">${data.experience.previous.company || '회사명'}</span> (<span id="previous-period">${data.experience.previous.period || ''}</span>)`;
                    previousJob.appendChild(jobTitle);
                    
                    if (data.experience.previous.responsibilities && data.experience.previous.responsibilities.length > 0) {
                        const ul = document.createElement('ul');
                        data.experience.previous.responsibilities.forEach(function(responsibility) {
                            const li = document.createElement('li');
                            li.textContent = responsibility;
                            ul.appendChild(li);
                        });
                        previousJob.appendChild(ul);
                    }
                    
                    experienceSection.appendChild(previousJob);
                }
            }
        }
        
        // 자격증 정보 업데이트
        if (data.certifications && data.certifications.length > 0) {
            const certList = document.querySelector('.certification-list');
            certList.innerHTML = ''; // 기존 내용 초기화
            
            data.certifications.forEach(function(cert) {
                const li = document.createElement('li');
                li.innerHTML = `${cert.name} <span class="cert-date">${cert.date}</span>`;
                certList.appendChild(li);
            });
        }
        
        // 교육 정보 업데이트
        if (data.education && data.education.length > 0) {
            const eduList = document.querySelector('.education-list');
            eduList.innerHTML = ''; // 기존 내용 초기화
            
            data.education.forEach(function(edu) {
                const li = document.createElement('li');
                li.innerHTML = `${edu.school} <span class="edu-date">${edu.period}</span>`;
                eduList.appendChild(li);
            });
        }
        
        // 프로젝트 정보 업데이트
        if (data.companyProjects && data.companyProjects.length > 0) {
            const projectsSection = document.querySelector('.section:nth-of-type(3)');
            projectsSection.innerHTML = '<h2>PROJECTS</h2>';
            
            // generateCompanyProjectsHTML 함수 호출
            const companyProjectsHTML = generateCompanyProjectsHTML(data.companyProjects);
            projectsSection.innerHTML += companyProjectsHTML;
        }
        // 기존 projects 배열 처리 (fallback)
        else if (data.projects && data.projects.length > 0) {
            const projectsSection = document.querySelector('.section:nth-of-type(3)');
            projectsSection.innerHTML = '<h2>PROJECTS</h2>';
            
            // 각 프로젝트 추가
            data.projects.forEach(function(project) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                
                // 프로젝트 제목 및 기간
                if (project.name) {
                    const projectTitle = document.createElement('h3');
                    projectTitle.innerHTML = `<span id="project-name">${project.name}</span>`;
                    projectDiv.appendChild(projectTitle);
                }
                
                if (project.period) {
                    const projectPeriod = document.createElement('div');
                    projectPeriod.className = 'project-period';
                    projectPeriod.innerHTML = `<span id="project-period">${project.period}</span>`;
                    projectDiv.appendChild(projectPeriod);
                }
                
                // 프로젝트 상세 제목
                if (project.title) {
                    const projectSubtitle = document.createElement('h4');
                    projectSubtitle.textContent = project.title;
                    projectDiv.appendChild(projectSubtitle);
                }
                
                // 프로젝트 상세 내용
                if (project.details && project.details.length > 0) {
                    const ul = document.createElement('ul');
                    
                    project.details.forEach(function(detail) {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        ul.appendChild(li);
                    });
                    
                    projectDiv.appendChild(ul);
                }
                
                // 프로젝트 성과
                if (project.achievements && project.achievements.length > 0) {
                    const achievementsDiv = document.createElement('div');
                    achievementsDiv.className = 'project-result';
                    
                    const achievementsTitle = document.createElement('h4');
                    achievementsTitle.textContent = '프로젝트 성과';
                    achievementsDiv.appendChild(achievementsTitle);
                    
                    const achievementsList = document.createElement('ul');
                    project.achievements.forEach(function(achievement) {
                        const li = document.createElement('li');
                        li.textContent = achievement;
                        achievementsList.appendChild(li);
                    });
                    
                    achievementsDiv.appendChild(achievementsList);
                    projectDiv.appendChild(achievementsDiv);
                }
                
                // 스킬 키워드
                if (project.skills) {
                    const skillsDiv = document.createElement('div');
                    skillsDiv.className = 'skills';
                    
                    const skillsTitle = document.createElement('h4');
                    skillsTitle.textContent = 'Skill Keywords';
                    skillsDiv.appendChild(skillsTitle);
                    
                    const skillsPara = document.createElement('p');
                    skillsPara.textContent = project.skills;
                    skillsDiv.appendChild(skillsPara);
                    
                    projectDiv.appendChild(skillsDiv);
                }
                
                projectsSection.appendChild(projectDiv);
            });
        }
    }
    
    // config.json 파일에서 이력서 정보 로드
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // 기본 정보 업데이트
            document.getElementById('name').textContent = config.name;
            document.getElementById('intro').textContent = config.intro;
            document.getElementById('current-year').textContent = new Date().getFullYear();
            document.getElementById('phone').textContent = config.contact.phone;
            document.getElementById('email').textContent = config.contact.email;
            document.getElementById('website').textContent = config.contact.website;

            // 경력 정보 생성
            const experienceSection = document.querySelector('.section:nth-of-type(1)');
            if (config.experience && config.experience.length > 0) {
                experienceSection.innerHTML += generateExperienceHTML(config.experience);
            }

            // 스킬 정보 생성
            const skillsTable = document.querySelector('.skills-table table');
            if (config.skills && config.skills.length > 0) {
                skillsTable.innerHTML = generateSkillsHTML(config.skills);
            }

            // 프로젝트 정보 생성
            const projectsSection = document.querySelector('.section:nth-of-type(3)');
            if (config.companyProjects && config.companyProjects.length > 0) {
                projectsSection.innerHTML += generateCompanyProjectsHTML(config.companyProjects);
            }

            // 자격증 정보 생성
            const certList = document.querySelector('.certification-list');
            if (config.certifications && config.certifications.length > 0) {
                certList.innerHTML = generateCertificationsHTML(config.certifications);
            }

            // 교육 정보 생성
            const eduList = document.querySelector('.education-list');
            if (config.education && config.education.length > 0) {
                eduList.innerHTML = generateEducationHTML(config.education);
            }
        })
        .catch(error => {
            console.error('이력서 데이터를 로드하는 중 오류가 발생했습니다:', error);
            // 오류 발생 시 기본 데이터 사용
            const defaultData = {
                name: '홍길동',
                intro: '간략한 자기소개를 입력하세요',
                contact: {
                    phone: '010-1234-5678',
                    email: 'example@example.com',
                    website: 'example.com'
                },
                skills: {
                    dataPlatform: 'ELK, Kubernetes, Docker, Kafka, ...',
                    language: 'Python, Java, ...',
                    monitoring: 'Prometheus, Grafana, ...',
                    cicd: 'Jenkins, Ansible, ...',
                    projectManagement: 'Wiki, Jira, ...'
                },
                certifications: [
                    { name: '자격증 이름', date: '20XX.XX' }
                ],
                education: [
                    { school: '학교 이름', period: '20XX - 20XX' }
                ],
                experience: [
                    {
                        company: '현재 회사',
                        position: '현재 직책',
                        period: '20XX.XX ~ Present',
                        responsibilities: ['담당 업무 1', '담당 업무 2', '담당 업무 3']
                    },
                    {
                        company: '이전 회사',
                        position: '이전 직책',
                        period: '20XX.XX ~ 20XX.XX',
                        responsibilities: ['담당 업무 1', '담당 업무 2', '담당 업무 3']
                    },
                    {
                        company: '과거 회사',
                        position: '과거 직책',
                        period: '20XX.XX ~ 20XX.XX',
                        responsibilities: ['담당 업무 1', '담당 업무 2']
                    }
                ],
                projects: [
                    {
                        name: '프로젝트명',
                        period: '20XX.XX ~',
                        title: '프로젝트 상세 제목',
                        details: ['프로젝트 내용 1', '프로젝트 내용 2', '프로젝트 내용 3'],
                        achievements: ['성과 1', '성과 2'],
                        skills: '기술 키워드 1, 기술 키워드 2, 기술 키워드 3'
                    }
                ]
            };
            updateResumeInfo(defaultData);
        });
});

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