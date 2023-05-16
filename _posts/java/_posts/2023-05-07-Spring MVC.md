---
layout: post
date: 2023-05-07 17:17:59+0900
title: Spring MVC
categories: java
tag: [Spring, Architecture]
---

# Spring MVC

MVC 패턴은 애플리케이션을 개발할 때 사용하는 디자인 패턴이다.

애플리케이션의 개발 영역을 MVC(Model, View, Controller)로 구분하여 각 역할에 맞게 코드를 작성하는 개발 방식이다.

- 선수지식 : [서블릿](/java/2023-05-05-서블릿)

## Spring MVC 구조 

| ![사진]({{"/assets/img/java/23-05-07/SpringMvc 구조.png" | relative_url}}) |
|:----------------------------------------------------------:|
|                       Spring MVC 구조                        |



## DispacherServlet 서블릿 등록

`DispacherServlet` 도 부모 클래스에서 `HttpServlet` 을 상속 받아서 사용하고, 서블릿으로 동작한다.
DispatcherServlet -> FrameworkServlet -> HttpServletBean -> HttpServlet
스프링 부트는 `DispacherServlet` 을 서블릿으로 자동으로 등록하면서 모든 경로(`urlPatterns="/"`)에 대해서 매핑한다.


## 요청 흐름
- 서블릿이 호출되면 `HttpServlet` 이 제공하는 `serivce()` 가 호출된다.
- 스프링 MVC는 `DispatcherServlet` 의 부모인 `FrameworkServlet` 에서 `service()` 를 오버라이드 해두었다.
- `FrameworkServlet.service()` 를 시작으로 여러 메서드가 호출되면서 `DispacherServlet.doDispatch()` 가 호출된다.


## DispacherServlet.doDispatch()

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    ModelAndView mv = null;
    
    // 1. 핸들러 조회
    mappedHandler = getHandler(processedRequest);
    if (mappedHandler == null) {
        noHandlerFound(processedRequest, response);
        return; 
    }
    
    //2.핸들러 어댑터 조회-핸들러를 처리할 수 있는 어댑터
    HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
    
    // 3. 핸들러 어댑터 실행 -> 4. 핸들러 어댑터를 통해 핸들러 실행 -> 5. ModelAndView 반환 
    mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    
    processDispatchResult(processedRequest, response, mappedHandler, mv,dispatchException);
}


private void processDispatchResult(HttpServletRequest request,
HttpServletResponse response, HandlerExecutionChain mappedHandler, ModelAndView mv, Exception exception) throws Exception {
    // 뷰 렌더링 호출
    render(mv, request, response);
}

protected void render(ModelAndView mv, HttpServletRequest request, HttpServletResponse response) throws Exception {
     View view;
     String viewName = mv.getViewName();
     
     //6. 뷰 리졸버를 통해서 뷰 찾기, 7.View 반환
     view = resolveViewName(viewName, mv.getModelInternal(), locale, request);
     
     // 8. 뷰 렌더링
     view.render(mv.getModelInternal(), request, response);
}
```


## 동작 순서

| ![사진]({{"/assets/img/java/23-05-07/SpringMvc 구조.png" | relative_url}}) |
|:----------------------------------------------------------:|
|                            동작순서                            |

1. **핸들러 조회**: 핸들러 매핑을 통해 요청 URL에 매핑된 핸들러(컨트롤러)를 조회한다.
2. **핸들러 어댑터 조회**: 핸들러를 실행할 수 있는 핸들러 어댑터를 조회한다.
3. **핸들러 어댑터 실행**: 핸들러 어댑터를 실행한다.
4. **핸들러 실행**: 핸들러 어댑터가 실제 핸들러를 실행한다.
5. **ModelAndView 반환**: 핸들러 어댑터는 핸들러가 반환하는 정보를 `ModelAndView`로 변환해서 반환한다.
6. **viewResolver 호출**: `ViewResolver`를 찾고 실행한다.
   - JSP의 경우: `InternalResourceViewResolver` 가 자동 등록되고, 사용된다.
7. **View 반환**:`ViewResolver`는 뷰의 논리이름을 물리이름으로 바꾸고,렌더링 역할을 담당하는 뷰객체를 반환한다.
   - JSP의 경우 `InternalResourceView(JstlView)` 를 반환하는데, 내부에 forward() 로직이 있다.
8. **뷰 렌더링**: 뷰를 통해서 뷰를 렌더링한다.
