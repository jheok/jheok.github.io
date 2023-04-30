---
layout: post
date: 2023-04-30 16:30:53+0900
title: "@Configuration과 바이트코드 조작"
categories: java
tag: [Spring]
---


@Configuration과 바이트코드 조작의 마법

```java
@Configuration
public class AppConfig {

    @Bean
    public DiscountPolicy discountPolicy() {
        return new RateDiscountPolicy();
    }

    @Bean
    public MemberRepository memberRepository() {
        System.out.println("call AppConfig.memberRepository");
        return new MemoryMemberRepository();
    }

    @Bean
    public MemberServiceImpl memberService(){
        System.out.println("call AppConfig.memberService");
        return new MemberServiceImpl(memberRepository());
    }

    @Bean
    public OrderServiceImpl orderService(){
        System.out.println("call AppConfig.orderService");
        return new OrderServiceImpl(memberRepository(), discountPolicy());
    }
}
```

스프링 컨테이너는 싱글톤 레지스트리다. 따라서 스프링 빈이 싱글톤이 되도록 보장해주어야 한다.

그런데 스프링이 자바 코드까지 어떻게 하기는 어렵다. AppConfig 를 보면 분명 memberRopository 가 3번 호출되어야 하는 것이 맞다.

하지만 테스트를 해보면 3번이 아니라 1번만 불린다.

그 이유는 스프링은 클래스의 바이트코드를 조작하는 라이브러리를 사용하기 때문이다.

**모든 비밀은 @Configuration 을 적용한 AppConfig 에 있다.**



다음 코드를 보자

```java
@Test
void configurationDeep() {
ApplicationContext ac = new
AnnotationConfigApplicationContext(AppConfig.class);

    //AppConfig도 스프링 빈으로 등록된다.
    AppConfig bean = ac.getBean(AppConfig.class);
    System.out.println("bean = " + bean.getClass());
}
```

출력

```java
bean = class hello.core.AppConfig$$EnhancerBySpringCGLIB$$bd479d70
```

순수한 클래스라면 다음과 같이 출력되어야 한다.

`class hello.core.AppConfig`

그런데 예상과는 다르게 클래스 명에 xxxCGLIB 가 붙으면서 상당히 복잡해진 것을 볼 수 있다. 이것은 내가 만든 클래스가 아니라 스프링이 CGLIB라는 바이트코드 조작 라이브러리를 사용해서 AppConfig 클래스를 상속받은 임의의 다른 클래스를 만들고, 그 다른 클래스를 스프링 빈으로 등록한 것이다.

**그 임의의 다른 클래스가 바로 싱글톤이 보장되도록 해준다.**

**@Bean이 붙은 메서드마다 이미 스프링 빈이 존재하면 존재하는 빈을 반환하고, 스프링 빈이 없으면 생성해서 스프링 빈으로 등록하고 반환하는 코드가 동적으로 만들어진다. 덕분에 싱글톤이 보장되는 것이다.**



만약 @Configuration 을 적용하지 않고, @Bean 만 적용하면 어떻게 될까?

@Bean 이 적용된 메소드는 스프링 빈으로 등록되지만, 싱글톤을 보장하지 않는다.

크게 고민할 것이 없다. 스프링 설정 정보는 항상 @Configuration 을 사용하자.
