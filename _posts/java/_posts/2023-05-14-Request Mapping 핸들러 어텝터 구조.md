---
layout: post
date: 2023-05-14 18:00:30+0900
title: Request Mapping 핸들러 어텝터 구조
categories: java
tag: [Spring]
---

# Request Mapping 핸들러 어텝터 구조

| ![사진]({{"/assets/img/java/23-05-14/springMVC_구조.png" | relative_url}}) |
|:---------------------------------------------------------:|
|                      springMVC_구조                       |

HTTP 메시지 컨버터는 스프링 MVC 의 구조에서 는 보이지 않는다

왜냐하면 HTTP 메시지 컨버터는 `@RequestMapping` 을 처리하는 핸들러 어댑터인 `RequestMappingHandlerAdapter` (요청 매핑 헨들러 어뎁터)에 있다

- 선수지식 : [HTTP 메시지 컨버터](/java/2023-05-14-HTTP-메시지-컨버터)

## RequestMappingHandlerAdapter 동작 방식

| ![사진]({{"/assets/img/java/23-05-14/RequestMappingHandlerAdapter_동작 방식.png" | relative_url}}) |
|:--------------------------------------------------------------------------------------:|
|                       RequestMappingHandlerAdapter_동작 방식                       |


1. 어노테이션 기반 컨트롤러를 처리하는 RequestMappingHandlerAdapter 는 ArgumentResolver 를 호출한다 
2. 컨트롤러(핸들러)가 필요로 하는 다양한 파라미터의 값(객체)을 ArgumentResolver 가 생성한다. 
3. 파리미터의 값이 모두 준비되면 컨트롤러를 호출하면서 값을 넘겨준다.


## HTTP 메시지 컨버터


| ![사진]({{"/assets/img/java/23-05-14/HTTP 메시지 컨버터 위치.png" | relative_url}}) |
|:--------------------------------------------------------------------:|
|                       HTTP 메시지 컨버터 위치                       |

- **Request 의 경우**:  `@RequestBody`와 `HttpEntity` 를 처리하는 `ArgumentResolver` 가 있다. 
  이 `ArgumentResolver` 들이 HTTP 메시지 컨버터를 사용해서 필요한 객체를 생성한다.
- **Response 의 경우**:  `@ResponseBody` 와 `HttpEntity` 를 처리하는 `ReturnValueHandler` 가 있다. 
  그리고 여기에서 HTTP 메시지 컨버터를 호출해서 응답 결과를 만든다.

- 스프링 MVC는 `@RequestBody` `@ResponseBody` 가 있으면 `RequestResponseBodyMethodProcessor` (ArgumentResolver) 
  `HttpEntity` 가 있으면 `HttpEntityMethodProcessor` (ArgumentResolver)를 사용한다.

