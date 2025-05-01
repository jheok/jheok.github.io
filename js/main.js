document.addEventListener('DOMContentLoaded', function() {
    // 현재 연도 업데이트
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // config.json 파일에서 이력서 정보 로드
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // 기본 정보 업데이트
            document.getElementById('name').textContent = config.name;
            
            // intro 텍스트에 줄바꿈 처리
            const introEl = document.getElementById('intro');
            if (config.intro && config.intro.includes('\n')) {
                introEl.innerHTML = config.intro.replace(/\n/g, '<br>');
            } else {
                introEl.textContent = config.intro;
            }
            
            document.getElementById('current-year').textContent = new Date().getFullYear();
            document.getElementById('phone').textContent = config.contact.phone;
            document.getElementById('email').textContent = config.contact.email;
            
            // 웹사이트 링크 설정
            const websiteElement = document.getElementById('website');
            const websiteValue = config.contact.website;

            // 객체 형태의 웹사이트 정보 처리
            if (websiteValue && typeof websiteValue === 'object') {
                // 링크 설정
                websiteElement.href = websiteValue.value || '#';
                websiteElement.textContent = websiteValue.name || 'LinkedIn'; // 'LinkedIn'으로 고정 텍스트 사용
                
                // 아이콘 설정
                const iconElement = document.getElementById('website-icon');
                if (iconElement && websiteValue.icon) {
                    iconElement.className = `fab fa-${websiteValue.icon}`;
                }
            } else if (typeof websiteValue === 'string') {
                // 이전 버전 호환성 유지 (문자열 형태)
                const linkMatch = websiteValue.match(/\[(.*?)\]\((.*?)\)/);
                if (linkMatch && linkMatch.length === 3) {
                    // Markdown 형식이면 텍스트와 URL 분리
                    const linkParts = linkMatch[1].split('|');
                    const linkText = linkParts[0] || 'Link';
                    
                    // 아이콘이 지정되어 있으면 변경
                    if (linkParts.length > 2 && linkParts[2]) {
                        const iconElement = document.getElementById('website-icon');
                        iconElement.className = `fab fa-${linkParts[2]}`;
                    }
                    
                    const linkUrl = linkMatch[2];
                    websiteElement.href = linkUrl;
                    websiteElement.textContent = linkText;
                } else {
                    // 일반 URL이면 그대로 사용
                    websiteElement.href = websiteValue;
                    websiteElement.textContent = 'Link';
                }
            }

            // 경력 정보 생성
            const experienceContainer = document.getElementById('experience-container');
            if (config.experience && config.experience.length > 0) {
                experienceContainer.innerHTML = generateExperienceHTML(config.experience);
            }

            // 스킬 정보 생성
            const skillsTable = document.getElementById('skills-table');
            if (config.skills && config.skills.length > 0) {
                skillsTable.innerHTML = generateSkillsHTML(config.skills);
            }

            // 프로젝트 정보 생성
            const projectsContainer = document.getElementById('projects-container');
            if (config.companyProjects && config.companyProjects.length > 0) {
                projectsContainer.innerHTML = generateCompanyProjectsHTML(config.companyProjects);
            }

            // 자격증 정보 생성
            const certList = document.getElementById('certifications-list');
            if (config.certifications && config.certifications.length > 0) {
                certList.innerHTML = generateCertificationsHTML(config.certifications);
            }

            // 교육 정보 생성
            const eduList = document.getElementById('education-list');
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
                skills: [
                    { name: 'Data Platform & Framework', value: 'ELK, Kubernetes, Docker, Kafka, ...' },
                    { name: 'Language', value: 'Python, Java, ...' },
                    { name: 'Monitoring', value: 'Prometheus, Grafana, ...' },
                    { name: 'CI/CD', value: 'Jenkins, Ansible, ...' },
                    { name: 'Project Management', value: 'Wiki, Jira, ...' }
                ],
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
                    }
                ],
                companyProjects: [
                    {
                        company: '회사명',
                        period: '20XX.XX ~ Present',
                        projects: [
                            {
                                title: '프로젝트 제목',
                                details: ['프로젝트 내용 1', '프로젝트 내용 2'],
                                achievements: ['성과 1', '성과 2'],
                                skills: '기술 키워드 1, 기술 키워드 2, 기술 키워드 3'
                            }
                        ]
                    }
                ]
            };
            
            // 기본 정보 업데이트
            document.getElementById('name').textContent = defaultData.name;
            
            // intro 텍스트에 줄바꿈 처리
            const defaultIntroEl = document.getElementById('intro');
            if (defaultData.intro && defaultData.intro.includes('\n')) {
                defaultIntroEl.innerHTML = defaultData.intro.replace(/\n/g, '<br>');
            } else {
                defaultIntroEl.textContent = defaultData.intro;
            }
            
            document.getElementById('phone').textContent = defaultData.contact.phone;
            document.getElementById('email').textContent = defaultData.contact.email;
            
            // 웹사이트 링크 설정
            const defaultWebsiteElement = document.getElementById('website');
            const defaultWebsiteValue = defaultData.contact.website;

            // 객체 형태의 웹사이트 정보 처리
            if (defaultWebsiteValue && typeof defaultWebsiteValue === 'object') {
                // 링크 설정
                defaultWebsiteElement.href = defaultWebsiteValue.value || '#';
                defaultWebsiteElement.textContent = defaultWebsiteValue.name || 'LinkedIn'; // 'LinkedIn'으로 고정 텍스트 사용
                
                // 아이콘 설정
                const defaultIconElement = document.getElementById('website-icon');
                if (defaultIconElement && defaultWebsiteValue.icon) {
                    defaultIconElement.className = `fab fa-${defaultWebsiteValue.icon}`;
                }
            } else if (typeof defaultWebsiteValue === 'string') {
                // 이전 버전 호환성 유지 (문자열 형태)
                const defaultLinkMatch = defaultWebsiteValue.match(/\[(.*?)\]\((.*?)\)/);
                if (defaultLinkMatch && defaultLinkMatch.length === 3) {
                    // Markdown 형식이면 텍스트와 URL 분리
                    const defaultLinkParts = defaultLinkMatch[1].split('|');
                    const defaultLinkText = defaultLinkParts[0] || 'Link';
                    
                    // 아이콘이 지정되어 있으면 변경
                    if (defaultLinkParts.length > 2 && defaultLinkParts[2]) {
                        const defaultIconElement = document.getElementById('website-icon');
                        defaultIconElement.className = `fab fa-${defaultLinkParts[2]}`;
                    }
                    
                    const defaultLinkUrl = defaultLinkMatch[2];
                    defaultWebsiteElement.href = defaultLinkUrl;
                    defaultWebsiteElement.textContent = defaultLinkText;
                } else {
                    // 일반 URL이면 그대로 사용
                    defaultWebsiteElement.href = defaultWebsiteValue;
                    defaultWebsiteElement.textContent = 'Link';
                }
            }

            // 경력 정보 생성
            const experienceContainer = document.getElementById('experience-container');
            if (defaultData.experience && defaultData.experience.length > 0) {
                experienceContainer.innerHTML = generateExperienceHTML(defaultData.experience);
            }

            // 스킬 정보 생성
            const skillsTable = document.getElementById('skills-table');
            if (defaultData.skills && defaultData.skills.length > 0) {
                skillsTable.innerHTML = generateSkillsHTML(defaultData.skills);
            }

            // 프로젝트 정보 생성
            const projectsContainer = document.getElementById('projects-container');
            if (defaultData.companyProjects && defaultData.companyProjects.length > 0) {
                projectsContainer.innerHTML = generateCompanyProjectsHTML(defaultData.companyProjects);
            }

            // 자격증 정보 생성
            const certList = document.getElementById('certifications-list');
            if (defaultData.certifications && defaultData.certifications.length > 0) {
                certList.innerHTML = generateCertificationsHTML(defaultData.certifications);
            }

            // 교육 정보 생성
            const eduList = document.getElementById('education-list');
            if (defaultData.education && defaultData.education.length > 0) {
                eduList.innerHTML = generateEducationHTML(defaultData.education);
            }
        });
});
