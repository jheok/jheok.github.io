---
layout: about
title: 오준혁
permalink: /about/
---

# About me
현재 Python과 Java 를 주력으로 3년차 백엔드 엔지니어로써 일하고 있습니다.

저는 개발자란 사용자가 원하는 데이터를 정확하고 신속하게 전달하는 중간 매개자라고 생각하고 있습니다

| github | [jheok](https://github.com/jheok), [jheok318](https://github.com/jheok318) |
|:-------|:---------------------------------------------------------------------------| 
| blog   | [jheok.github.io](https://jheok.github.io/about/)                          |

---
# Work Experience

## Mobigen (full-time employee)
> 웹 기반 빅데이터 분석 플랫폼 서비스

| period   | 21.01.01 ~ 현재 (2년 4개월) |
|:---------|:-----------------------|
| position | Python, Java 백엔드 엔지니어  |
| project  | 웹 백엔드 기반 데이터 분석 플랫폼 개발 |
{:.stretch-table}

### CI/CD 강화 (23.04.01 ~ , 현재)
> Java, Groovy, declarative pipeline, GitHub, Gitlab, ArgoCD, Jenkins, Dockerfile, jira

- 개발 참여인원 : 4명
- Gitlab - Jenkins - ArgoCd CI/CD 구축 (Jenkins 통합화 / Gitlab 모듈화 기여)
- 통합 organization JenkinsFIle 구축 (조직 내의 모든 repo 에서 하나의 jenkinsFile 로 통합화)
- jenkins - sonarqube - slack 연동 (daily build 결과 report 개선)

[담당 역할]
- 개발

[성과 및 배운점]
- 기존 단순한 unittest, build 정도의 수준에서 unittest, e2etest, build, deploy 수준까지 끌어올림
- 각 repo 마다 각자의 ci/cd 과정을 통합적으로 동일한 과정으로 통합화 개발자는 초기 dockerfile 개발 
  및 단순 conf 만 설정하면 ci/cd 진행이 가능하도록 개선  
- 개발자는 코드 개발만을 잘하는 사람이 아닌 jenkins 와 같은 툴을 잘 사용하는 것도 좋은 개발자로 가는 방법중
  하나임을 깨달음

### 데이터 분석 플랫폼 개발 (21.11.01 ~ 현재, 1년 6개월)
> python & FastApi, pandas, polars, sqlAlchemy, redis, mariadb, postgresql, tibero, oracle,
> minio, hdfs, 자체DB, Yacc, Lex, jenkins, swagger, sonarqube, git, jira

- 개발 참여인원 : 2명
- 쿼리 토큰화 및 파싱, 암호화(RSA) 처리
- pandas 와 polars 의 조합으로 분석 성능 및 처리 속도 향상
- yacc(parser), lex(tokenizer) 를 통한 DSL 개발
- jenkins 를 통한 ci/cd 진행
- release 버전 외부 업체 배포 완료

[담당 역할]
- 설계, 개발

[성과 및 배운점]
- 기존 db 에 직접연결하여 query 를 날리던 서비스와 비교하여 2초 쿼리를 1초 쿼리로 성능향상
- query + dsl 기반으로 인해 기존 query 만을 사용하게 되면 복잡한 query 를 dsl 을 통해 단순화

### 빅데이터 분석 플랫폼 (레거시) 유지보수 (21.01.01 ~ 현재, 2년 4개월)
> python & flask, spark, pyspark, sqlAlchemy, redis, memcached, mariadb, postgresql, redis, tibero,
> oracle, altibase, minio, hdfs, 자체DB, Yacc, Lex, jenkins, swagger, sonarqube, git, mattermost,
> jira

- 개발 참여인원 : 3명
- spark 를 통한 빅데이터 분석 서비스
- 쿼리 토큰화 및 파싱, 암호화(RSA) 처리
- 기존 spark 의 기본적인 conf 를 이용 -> 빅데이터 분석에 이용되는 conf 세팅 완료
- spark job 로그 세팅 (쿼리를 통해 로그 분석 가능하도록 세팅)
- spark cluster 서버 이전 (1G -> 10G, 소프트웨어적인 부분 담당)
- yacc(parser), lex(tokenizer) 를 통한 DSL 개발
- pyspark udf 개발
- 대용량 데이터 partitioning 처리 (동작되지않는 slow query 1초 내로 출력되도록 개선)
- jenkins 를 통한 ci/cd 진행
- release 버전 외부 업체 배포 완료

[담당 역할]
- 설계, 개발

[성과 및 배운점]
- 레거시 프로그램의 conf 수정만으로도 기존 성능대비 2배 이상의 성능 및 속도 향상
- 레거시 프로그램에 대한 이해와 레거시 프로그램에 접근해야하는 방식 이해
- 다수의 개발자가 동시에 개발하는 서비스에서 사용되는 gitflow 를 경험함으로 인해 협업에 대해 충분히 숙지 
- spark 에 대한 개념 이해 및 데이터 분석에 이용되는 툴에 대한 이해
- DB 에서 사용되는 쿼리의 구조 및 파싱에 대한 이해와 스스로 구현이 가능


### 메타데이터 관리 서비스 개선 (23.01.01 ~ 23.03.31, 3개월)
> Java & Spirng & Jpa, Flyway, mariaDB, docker, k8s, jenkins, sonarqube, git, jira

- 개발 참여인원 : 2명
- spring datasource 기반 에서 db 형상관리 flyway 로 마이그레션 (db history 구축)
- JPA 기반 기존 대비 성능 향상 (data 로딩 개선, load 시간 단축)
- jenkins 를 통한 ci/cd 진행
- release 버전 외부 업체 배포 완료

[담당 역할]
- 기획, 설계, 개발

[성과 및 배운점]
- 기존 metadata 를 조회시 모든 데이터를 분석후 fetch 해오는 형식에서 특정 metadata 만 fetch 하는 방식 채택
  (기존 성능 1초내외 -> 0.01초 수준으로 향상)
- 다른 개발자가 만든 코드를 성능향상에 포커스를 두어 리뷰함으로 인해 현재 내가 알고 있는 지식으로 이 프로그램이 
  현 상황에 맞게 개발되어있는지 선택과 집중을 하는 시간을 가지게 되었다

### 웹 기반 데이터 분석 플랫폼 개발 (22.07.01 ~ 22.12.31, 6개월)
> Java & Spring & Jpa, Python & FastApi, Mariadb, flyway, sqlAlchemy, pandas, mecab, 
> textrank, docker, k8s, jenkins, swagger, git, jira

- 개발 참여인원 : 1명
- EDA(Exploratory Data Analysis) 시각화 데이터 추출
- NLP(Natural language processing) 분석 추출
- GEO 폴리곤 추출
- 로드 밸런싱 구조 적용
- jenkins 를 통한 ci 진행
- release 버전 외부 업체 배포 완료

[담당 역할]
- 기획, 설계, 개발

[성과 및 배운점]
- 다수의 사용자가 하나의 서비스에 붙어 과부화되는 서버를 분할 함으로 인해 트래픽과 분석데이터의 사이즈가 늘어나도 
  대용량의 데이터를 분석 가능
- 무언가를 개발함에 있어 언어도 그저 툴이다
- 로드 밸런싱을 구현함으로써 기존 서비스 하나만으로 구현하던 것을 여러개의 서비스로 분할 하니 동기화 문제 등 
  그 안에서 또 다른 이슈가 발생할 수 있다

### slow 쿼리 캐시서버 개발 (21.06.01~21.12.31, 6개월)
> Python & FastApi, sqlAlchemy, Mariadb, Yacc, Lex, docker, k8s, jenkins, swagger, sonarqube, 
> git, jira

- 개발 참여인원 : 1명
- 쿼리 토큰화 및 파싱, 암호화(RSA) 처리
- 본 분석플랫폼의 slow 쿼리 자체 파악 후 캐시화
- 기존 10초 내외의 response time 에서 1초 내외의 response time 으로 개선
- jenkins 를 통한 ci/cd 진행
- 확연한 성능 향상으로 인해 메인 프로젝트로 진행화 (타 개발자 진행)

[담당 역할]
- 기획, 설계, 개발

[성과 및 배운점]
- DB 에서 데이터를 불러오고 전달하는데만 해도 수십초 걸리던 무거운 데이터를 단순히 캐시 서버를 둠으로써 1초 내외로 
처리 가능할 수 있게 되었다 
- 데이터를 serving 함에 있어 빠르게 처리하고 전달하는 것만이 정답이 아닌 중간에 매개체를 둠으로써 복잡한 것 보단
떄로는 단숨함이 해결책이 될 수 있다

---
## Mobigen (intern)

| period   | 20.07.01 ~ 20.12.31 (6개월)                                 |                                 
|:---------|:----------------------------------------------------------|
| position | Python 백엔드 엔지니어                                           |
| project  | 웹 백엔드 기반 데이터 분석 플랫폼 개발                                    |
| tech     | Python & flask, pySpark, MariaDB, Postgresql, docker, k8s |
{:.stretch-table}

### 자체 DSL 및 spark 기반 데이터 분석프로그램 분석 & 개발 (20.07.01 ~ 20.12.31, 6개월)
- 회사 내부의 핵심 프로그램 코드 분석, QA 진행
- 프로그램의 동작 이해 후 필요한 추가 DSL 개발 및 테스트코드 작성
- 인턴 종료 1개월전 개발한 프로그램 배포 & 릴리즈

[담당 역할]
- 기획, 설계, 개발, QA

---
## 한양대 (erica)

| period | 19.03 ~ 21.02 |
|:-------|:--------------|
| 전공     | 컴퓨터 공학과       |
| 성적     | 3.65 / 4.5    |
| 졸업상태   | 졸업 / 편입       |
{:.stretch-table}





