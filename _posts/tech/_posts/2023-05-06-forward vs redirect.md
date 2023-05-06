---
layout: post
date: 2023-05-06 17:52:35+0900
title: forward vs redirect
categories: tech
tag: [web, servlet]
---

# Forward vs Redirect

## Forward

| ![사진]({{"/assets/img/tech/23-05-06/forward.png" | relative_url}}) |
|:--------------------------------------------------:|
|                          forward                          |

클라이언트와 서버간에 통신이 한번 일어나면 서버 내부에서 정보가 그대로 유지된채로 다른 url 을 호출하거나 할 수 있다
(Request 객체와 Response 객체를 공유 O)

즉, 클라이언트가 최초로 요청한 요청정보는 다음 url 에서도 유효하다

이때 클라이언트는 서버 내부에서 다른 url 을 이용하는지 전혀 알수없다

단 한번의 통신


## Redirect

| ![사진]({{"/assets/img/tech/23-05-06/redirect.png" | relative_url}}) |
|:--------------------------------------------------:|
|                          redirect                          |

클라이언트와 서버간에 통신이 한번 일어났을 때 서버가 다른 url 에 대한 정보를 클라이언트에게 전송해준다
(Request 객체와 Response 객체를 공유 X)

클라이언트와 서버간에 통신이 두번쨰 일어났을 때 서버는 이전에 가지고 있던 정보를 자체적으로 알수가 없다

이때 클라이언트는 서버가 다른 url 을 이용한다는 것을 인식할 수 있다

두번의 통신


## forward, redirect 의 큰 차이점

- forward
  - url 의 변화 : X
  - 객체의 재사용여부 : O

- redirect
  - url 의 변화 : O
  - 객체의 재사용여부 : X

## usage

- forward
  - 시스템 (session, DB) 에 변화가 생기는 요청 (로그인, 회원가입, 글쓰기 등) 의 경우
- redirect
  - 시스템에 변화가 생기지 않는 단순조회 (리스트 출력, 검색)
