---
layout: post
date: 2023-05-28 16:41:40+0900
title: Interceptor
categories: java
tag: [Spring]
---

# Interceptor

Spring MVC가 지원하는 클래스이다

스프링 인터셉터도 서블릿 필터와 같이 웹과 관련된 공통 관심 사항을 효과저긍로 해결할 수 있다.

하지만 필터와는 달리 적용되는 순서와, 범위, 그리고 사용방법이 다르다

### 스프링 인터셉터 흐름

인터셉터는 서블릿과 컨트롤러 호출 직전에 호출 된다

인터셉터는 spring MVC 가 지원하는 기능이기 떄문에 서블릿 이후에 등장한다

인터셉터도 URL 패턴을 적용할 수 있다. 하지만 서블릿 URL 패턴과는 다르게 정밀하게 설정 가능하다

```
HTTP 요청 ->WAS-> 필터 -> 서블릿 -> 스프링 인터셉터 -> 컨트롤러
```

### 스프링 인터셉터 제한

인터셉터에서 적절하지 않은 요청이라 판단하면 중단할 수 있다.

```
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 스프링 인터셉터 -> 컨트롤러 //로그인 사용자
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 스프링 인터셉터(적절하지 않은 요청이라 판단, 컨트롤러 호출 X) // 비 로그인 사용자
```

### 스프링 인터셉터 체인

인터셉터는 체인으로 구성되는데, 중간에 인터셉터를 자유롭게 추가할 수 있다

예를 들어 로그를 남기는 인터셉터를 먼저 적용하고, 그 다음 로그인 여부를 체크하는 인터셉터를 만들 수 있다.

```
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 인터셉터1 -> 인터셉터2 -> 컨트롤러
```

### 스프링 인터셉터 인터페이스

서블릿 필터의 경우 단순하게 doFilter() 하나만 제공된다. 인터셉터는 컨트롤러 호출 전( preHandle ), 호출 후( postHandle ), 요청 완료 이후( afterCompletion )와 같이 단계적으로 잘 세분화 되어 있다. 

서블릿 필터의 경우 단순히 request , response 만 제공했지만, 인터셉터는 어떤 컨트롤러( handler )가 호출되는지 호출 정보도 받을 수 있다. 그리고 어떤 modelAndView 가 반환되는지 응답 정보도 받을 수 있다.

```java
public interface HandlerInterceptor {
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                              Object handler) throws Exception;

    default void postHandle(HttpServletRequest request, HttpServletResponse response, 
                            Object handler, @Nullable ModelAndView modelAndView) throws Exception;

    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                                 Object handler, @Nullable Exception ex) throws Exception;
}
```

### 스프링 인터셉터 호출 흐름

- `preHandle` : 컨트롤러 호출 전에 호출된다. (더 정확히는 핸들러 어댑터 호출 전에 호출된다.) preHandle 의 응답값이 true 이면 다음으로 진행하고, 
false 이면 더는 진행하지 않는다. false 인 경우 나머지 인터셉터는 물론이고, 핸들러 어댑터도 호출되지 않는다. 그림에서 1번에서 끝이 나버린다.
- `postHandle` : 컨트롤러 호출 후에 호출된다. (더 정확히는 핸들러 어댑터 호출 후에 호출된다.) 
- `afterCompletion` : 뷰가 렌더링 된 이후에 호출된다.


| ![사진]({{"/assets/img/java/23-05-28/인터셉터 호출 흐름.png" | relative_url}}) |
|:----------------------------------------------------------:|
|                       인터셉터 호출 흐름                        |

### 스프링 인터셉터 예뢰 흐름

- `preHandle` : 컨트롤러 호출 전에 호출된다.
- `postHandle` : 컨트롤러에서 예외가 발생하면 postHandle 은 호출되지 않는다.
- `afterCompletion` : afterCompletion 은 항상 호출된다. 이 경우 예외( ex )를 파라미터로 받아서 어떤 예외가 발생했는지 로그로 출력할 수 있다.

| ![사진]({{"/assets/img/java/23-05-28/인터셉터 예외 흐름.png" | relative_url}}) |
|:----------------------------------------------------------:|
|                       인터셉터 예외 흐름                        |

### afterCompletion 은 예외가 발생해도 호출된다

- 예외가 발생하면 `postHandle()` 는 호출되지 않으므로 예외와 무관하게 공통 처리를 하려면 `afterCompletion()` 을 사용해야 한다.
- 예외가 발생하면 `afterCompletion()` 에 예외 정보( ex )를 포함해서 호출된다.


### 인터셉터 등록

인터셉터를 등록하는 방법은 여러가지가 존재하며, Configuration 에 등록하는 법을 추천하고 있다.

특히 Interceptor 를 Component 에 등록후 Bean 에서 Component 를 가져다 쓰면 Interceptor 에서 다른 Bean 을 가져다 쓸수 있다.


```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    // #1
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }

    // #2
    @Autowired LogInterceptor logInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(logInterceptor)
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
}
```
