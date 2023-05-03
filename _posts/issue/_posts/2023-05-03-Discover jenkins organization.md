---
layout: post
date: 2023-05-03 15:24:38+0900
title: Discover jenkins organization
categories: issue
tag: [jenkins]
---

# Discover jenkins organization

## 이슈 사항
github app 을 사용하여 Jenkins Organization 을 구성중

`Scan Organization now` 가 제대로 동작을 하지 않았다

그로 인해 App 내부의 repo 들이 제대로 jenkins 파일을 인식하지 못하였고 jenkins 파일의 위치를 변경해도 
반영이 불가능하였다 


## 이슈 분석 && 원인 파악
로그를 분석해본 결과 Organization 을 Scan 하던 도중 에러가 발생되었다

원인은 upstream repo 에서 fork 받은 다른 사람의 origin repo 에서 작업한 결과물을 PR 한 부분까지 
jenkins 가 Scan 할때 origin repo 에 대한 권한이 존재하지 않았기 때문이다

- From users with Admin or Write permission
  - 풀 요청 포크는 포크 소유자가 오리진 리포지토리에 대한 관리자 또는 쓰기 권한을 가지고 있는 경우에만 신뢰할 수 있는 것으로 간주됩니다. 
    권장되는 정책입니다

|           From users with Admin or Write permission           |
|:-------------------------------------------------------------:| 
| ![Image Alt 텍스트]({{"/assets/img/issue/23-05-03/from_user.png" | relative_url}}) |


## 이슈 해결

origin repo 에 의존하지 않는 설정을 해주면 `Scan Organization now` 가 제대로 동작한다

- nobody
  - 포크에서 끌어오기 요청은 모두 신뢰할 수 없는 것으로 처리됩니다. 즉, Jenkins가 신뢰할 수 있는 파일(예: Jenkins 파일)을 요구하는 경우 
    해당 파일의 내용이 포크 저장소의 풀 요청 분기가 아닌 오리진 저장소의 대상 분기에서 검색됩니다

|                           nobody                           |
|:----------------------------------------------------------:| 
| ![Image Alt 텍스트]({{"/assets/img/issue/23-05-03/nobody.png" | relative_url}}) |
