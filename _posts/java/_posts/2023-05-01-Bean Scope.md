---
layout: post
date: 2023-05-01 13:45:29+0900
title: Bean Scope
categories: java
tag: [Spring]
---

# Bean Scope


## 빈 스코프란?

스코프는 번역 그대로 빈이 존재할 수 있는 범위를 뜻한다.

* **싱글톤** : 기본 스코프, 스프링 컨테이너의 시작과 종료까지 유지되는 가장 넓은 범위의 스코프이다.

* **프로토타입** : 스프링 컨테이너는 프로토타입 빈의 생성과 의존관계 주입까지만 관여하고 더는 관리하지 않는다. 또한 요청마다 서로 다른 인스턴스를 생성한다.
* **웹 관련 스코프**
    * **request** : 웹 요청이 들어오고 나갈때 까지 유지되는 스코프이다. 각 요청마다 서로 다른 인스턴스를 생성한다.
    * session : 웹 세션이 생성되고 종료될 때 까지 유지되는 스코프이다.
    * application : 웹의 서블릿 컨텍스와 같은 범위로 유지되는 스코프이다.

<br/>

빈 스코프틑 다음과 같이 지정할 수 있다.

-  **컴포넌트 스캔 자동 등록**
```java
@Scope("prototype")
@Component
public class Bean {}
```

-  **수동 등록**
```java
@Scope("request")
@Component
PrototypeBean Bean() {
    return new Bean();
}
```

## 프로토타입 스코프

- 싱글톤 스코프 빈을 조회하면 스프링 컨테이너는 항상 같은 인스턴스의 스프링 빈을 반환한다.
- 반면에 프로토타입 스코프를 스프링 컨테이너에서 조회하면 스프링 컨테이너는 항상 **새로운 인스턴스**를 반환한다.
- 스프링 컨테이너는 프로토타입 빈을 생성하고, 의존관계 주입, 초기화까지만 처리하며 그 이후에는 관리하지 않는다.
- 따라서 프로토타입 빈을 관리할 책임은 프로토타입 빈을 받은 클라이언트에 있다. 그래서 `@PreDestroy` 같은 종료 메서드가 호출되지 않는다.

### **프로토타입 스코프 빈 테스트**

```java
void singletonBeanTest() {
        AnnotationConfigApplicationContext ac = 
                new AnnotationConfigApplicationContext(PrototypeBean.class);

        System.out.println("find bean1");
        PrototypeBean bean1 = ac.getBean(PrototypeBean.class);

        System.out.println("find bean2");
        PrototypeBean bean2 = ac.getBean(PrototypeBean.class);

        System.out.println("bean1 : " + bean1);
        System.out.println("bean2 : " + bean2);

        Assertions.assertThat(bean1).isNotSameAs(bean2);

        bean1.destroy();
        bean2.destroy();

        ac.close();
    }

    @Scope("prototype")
    static class PrototypeBean{

        @PostConstruct
        public void init(){
            System.out.println("PrototypeBean.init");
        }

        @PreDestroy
        public void destroy(){
            System.out.println("PrototypeBean.destroy");
        }
    }
```

### **실행 결과**

```java
find bean1
PrototypeBean.init
find bean2
PrototypeBean.init
bean1 : ...core.scope.PrototypeTest$PrototypeBean@2efe459d
bean2 : ...core.scope.PrototypeTest$PrototypeBean@ee3865w
PrototypeBean.destroy
PrototypeBean.destroy
```

- 실행 결과를 보면 프로토타입 빈은 스프링 컨테이너 생성 시점이 아닌 조회 시점에 생성되고, 초기화 메서드도 실행된다.
- 프로토타입 빈은 스프링 컨테이너가 생성과 의존관계 주입 그리고 초기화 까지만 관여하고, 더는 관리하지 않는다.
- 따라서 프로토타입 빈은 스프링 컨테이너가 종료될 때 ``@PreDestory`` 같은 종료 메서드가 전혀 실행되지 않는다. 위의 결과는 직접 destroy 메서드를 호출한 결과이다.

### **정리**
- 스프링 컨테이너에 요청할 때 마다 새로 생성된다.
- 스프링 컨테이너는 프로토타입 빈의 생성과 의존관계 주입 그리고 초기화까지만 관여한다.
- 종료 메서드가 호출되지 않는다.
- 그래서 프로토타입 빈은 프로토타입 빈을 조회한 클라이언트가 관리해야 한다.
- 종료 메서드에 대한 호출도 클라이언트가 직접 해야한다.

<br/>

## 프로토타입 스코프 - 싱글톤 빈과 함께 사용시 문제점

스프링은 일반적으로 싱글톤 빈을 사용하므로, 싱글톤 빈이 프로토타입 빈을 사용하게 된다.

그런데 싱글톤 빈은 생성 시점에만 의존관계 주입을 받기 때문에, 프로토타입 빈이 새로 생성되기는 하지만, 싱글톤 빈과 함께 계속 유지되는 것이 문제다.


| ![Image Alt 텍스트]({{"/assets/img/java/23-05-01/23-05-01-빈스코프.PNG" | relative_url}}) |
|:--------------------------------------------------:|
|                          싱글톤과 프로토타입 빈                          |

클라이언트A 와 클라이언트B가 싱글톤 빈과 함께 사용되는 프로토타입 빈의 addCount() 메서드를 호출하는 예제이다.

우리가 원하는 결과는 A, B 모두 count=1 이다. 하지만 결과는 클라이언트A는 1 클라이언트B는 2가 저장된다.

그 이유는 싱글톤 빈이 내부에 가지고 있는 프로토타입 빈은 이미 과거(싱글톤 빈이 생성될때)에 주입이 끝난 빈이기 때문에 이후에 새로 생성될 일이 없기 때문이다. 따라서 프로토타입 빈의 특징을 잃어버린다.


## 프로토타입 스코프 - 싱글톤 빈과 함께 사용시 Provider로 문제 해결

싱글톤 빈과 프로토타입 빈을 함께 사용할 때, 어떻게 하면 사용할 때 마다 항상 새로운 프로토타입 빈을 생성할 수 있을까?

필요한 의존관계를 찾는 Dependency Lookup(DL) 의존관계 조회를 제공하는 무언가를 사용하면 된다.


## **ObjectFactory, ObjectProvider**

지정된 빈을 컨테이너에서 대신 찾아주는 DL 서비스를 제공하는 것이 바로 `ObjectProvider`이다. 참고로 과거에는 `ObjectFactory`가 있었는데, 여기에 기능을 추가한 것이 `ObjectProvider`이다.


### **사용 예제**
```java
@Autowired
private ObjectProvider<PrototypeBean> prototypeBeanProvider;
    
public int logic() {
    PrototypeBean prototypeBean = prototypeBeanProvider.getObject();
    prototypeBean.addCount();
    int count = prototypeBean.getCount();
    return count;
}
```

- ObjectProvider 의 getObject() 를 호출하면 내부에서는 스프링 컨테이너를 통해 해당 빈을 찾아서 반환한다. (DL)
- 스프링이 제공하는 기능을 사용하지만, 기능이 단순하므로 단위테스트를 만들거나 mock 코드를 만들기는 훨씬 쉬워진다.
- ObjectProvider 는 지금 딱 필요한 DL 정도의 기능만 제공

### **특징**

- ObjectFactory : 기능이 단순, 별도의 라이브러리 필요 없음, 스프링에 의존
- bjectProvider : ObjectFactory 상속, 옵션, 스트림 처리등 편의 기능이 많고, 별도의 라이브러리 필요 없음, 스프링에 의존


## **정리**

- 그러면 프로토타입 빈을 언제 사용할까? 매번 사용할 때 마다 의존관계 주입이 완료된 새로운 객체가 필요하면 사용하면 된다.
- 그런데 실무에서 웹 애플리케이션을 개발해보면, 싱글톤 빈으로 대부분의 문제를 해결할 수 있기 때문에 프로토타입 빈을 직접적으로 사용하는 일은 매우 드물다.
- ObjectProvider , JSR330 Provider 등은 프로토타입 뿐만 아니라 DL이 필요한 경우는 언제든지 사용할 수 있다.
