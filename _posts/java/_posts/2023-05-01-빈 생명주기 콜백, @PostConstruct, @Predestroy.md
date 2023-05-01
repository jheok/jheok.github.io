---
layout: post
date: 2023-05-01 13:14:32+0900
title: 빈 생명주기 콜백, @PostConstruct, @Predestroy
categories: java
tag: [Spring]
---

# 빈 생명주기 콜백, @PostConstruct, @Predestroy

`@PostConstruct` , `@PreDestroy` 이 두 애노테이션을 사용하면 가장 편리하게 초기화와 종료를 실행할 수
있다.

아래의 예제를 보자.

<br/>

### **NetworkClient**
```java
@PostConstruct
public void init() {
    System.out.println("NetworkClient.init");
    connect();
    call("초기화 연결 메시지");
}

@PreDestroy
public void close() {
    System.out.println("NetworkClient.close");
    disConnect();
}
```

<br/>

<br/>

### **@PostConstruct, @PreDestory 애노테이션 특징**

* 최신 스프링에서 가장 권장하는 방법이다.

* 애노테이션 하나만 붙이면 되므로 매우 편리하다.

* 패키지를 잘 보면 javax.annotation.PostConstruct 이다. 스프링에 종속적인 기술이 아니라 JSR-250
  라는 자바 표준이다. 따라서 스프링이 아닌 다른 컨테이너에서도 동작한다.

* 컴포넌트 스캔과 잘 어울린다.

* 유일한 단점은 외부 라이브러리에는 적용하지 못한다는 것이다. 외부 라이브러리를 초기화, 종료 해야 하면
  `@Bean`의 기능을 사용하자.

<br/>

<br/>

<br/>

# 정리

* **@PostConstruct, @PreDestory 애노테이션을 사용하자**

* **코드를 고칠 수 없는 외부 라이브러리를 초기화, 종료해야 하면 @Bean 의 initMethod , destroyMethod를 사용하자.**

<br/>

