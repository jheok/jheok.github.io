---
layout: post
date: 2023-04-30 15:43:59+0900
title: BeanFactory와 ApplicationContext
categories: java
tag: [Spring]
---

BeanFactory와 ApplicationContext 란???


## BeanFactory

스프링 컨테이너의 최상위 인터페이스다.

스프링 빈을 관리하고 조회하는 역할을 담당한다.


## ApplicationContext

BeanFactory 기능을 모두 상속받아서 제공한다.

애플리케이션을 개발할 때는 빈은 관리하고 조회하는 기능은 물론이고, 수 많은 부가기능이 필요하다.

ApplicationContext 은 부가기능을 제공한다.

- 메시지소스를 활용한 국제화 기능 (MessageSource)
  - 예를 들어서 한국에서 들어오면 한국어로, 영어권에서 들어오면 영어로 출력
- 환경변수 (EnvironmentCapable)
  - 로컬, 개발, 운영등을 구분해서 처리
- 애플리케이션 이벤트 (ApplicationEventPublisher)
  - 이벤트를 발행하고 구독하는 모델을 편리하게 지원
- 편리한 리소스 조회 (ResouceLoader)
  - 파일, 클래스패스, 외부 등에서 리소스를 편리하게 조회

| ![Image Alt 텍스트]({{"/assets/img/java/23-04-30.PNG" | relative_url}}) |
|:--------------------------------------------------:|
|                          BeanFactory와 ApplicationContext                          |


