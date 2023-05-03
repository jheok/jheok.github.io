---
layout: post
date: 2023-05-03 15:48:16+0900
title: Jenkins Sonarqube coverage 안보임
categories: issue
tag: [sonarqube]
---

# Jenkins Sonarqube coverage 안보임

## 이슈 사항

jenkins 에서 python project 에 대한 coverage 의 결과를 sonarqube 에 report 중 계속해서
연동되지 않는 현상이 발생했다 

## 이슈 분석 && 원인 파악

jenkins log 를 분석해본 결과 생성된 coverage.xml 을 잘 인식하고 있었으며 도저히 report 까지 올라가는 것 처럼 보였다

하지만 다시 분석해본 결과 report 의 결과는 제대로 읽지만 report 에 대한 src, test 코드의 위치는 제대로 읽지 못하고 있었다

## 이슈 해결

- 추가 라인

```yaml
sonar.projectBaseDir=/app
```

sonar-project.properties 에 위의 라인을 추가해준 결과 제대로 인식이 되었고 sonarqube 에서 coverage 가 출력되는 
것을 볼수 있었다.

|                          Coverage                          |
|:----------------------------------------------------------:| 
| ![Image]({{"/assets/img/issue/23-05-03/sonar_coverage.png" | relative_url}}) |

## 비고

로컬에서는 분명히 동작을 하고 있는데 server 로 올리면 basedir 을 제대로 설정하지 않으면 이럴수 있구나 깨달음...

하루종일 해서 짜증...
