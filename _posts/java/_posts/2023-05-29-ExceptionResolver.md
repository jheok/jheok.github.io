---
layout: post
date: 2023-05-29 19:49:35+0900
title: ExceptionResolver
categories: java
tag: [Spring, Servlet]
---

예외가 발생해서 서블릿을 넘어 WAS까지 예외가 전달되면 HTTP 상태코드가 500으로 처리된다. 

발생하는 예외에 따라서 400, 404 등등 다른 상태코드로 처리하고 싶다.

오류 메시지, 형식등을 API마다 다르게 처리하고 싶다

예를 들어서 IllegalArgumentException 을 처리하지 못해서 컨트롤러 밖으로 넘어가는 일이 발생하면 HTTP 상태코드를 400으로 처리하고 싶다.

```java
@GetMapping("/api/members/{id}")
public MemberDto getMember(@PathVariable("id") String id) {
    if (id.equals("ex")) {
        throw new RuntimeException("잘못된 사용자"); 
    }
    if (id.equals("bad")) {
        throw new IllegalArgumentException("잘못된 입력 값");
    }
    return new MemberDto(id, "hello " + id);
}
```

http://localhost:8080/api/members/bad 라고 호출하면 IllegalArgumentException 이 발생하도록 했다.

```json
{
  "status": 500,
  "error": "Internal Server Error",
  "exception": "java.lang.IllegalArgumentException",
  "path": "/api/members/bad"
}

```


### HandlerExceptionResolver

스프링 MVC는 컨트롤러(핸들러) 밖으로 예외가 던져진 경우 예외를 해결하고, 동작을 새로 정의할 수 있는 방법을 제공한다.

컨트롤러 밖으로 던져진 예외를 해결하고, 동작 방식을 변경하고 싶으면 HandlerExceptionResolver 를 사용하면 된다.

줄여서 ExceptionResolver 라 한다.


### ExceptionResolver 적용 전

| ![사진]({{"/assets/img/java/23-05-29/적용전.png" | relative_url}}) |
|:--------------------------------------------------:|
|                          ExceptionResolver 적용 전                          |

### ExceptionResolver 적용 후

`ExceptionResolver` 로 예외를 해결해도 `postHandle` 은 호출되지 않는다

interceptor 참고

| ![사진]({{"/assets/img/java/23-05-29/적용후.png" | relative_url}}) |
|:--------------------------------------------------:|
|                          ExceptionResolver 적용 후                          |


### Spring 이 제공하는 ExceptionResolver

스프링 부트가 기본으로 제공하는 `ExceptionResolver` 는 다음과 같다. `HandlerExceptionResolverComposite` 에 다음 순서로 등록

1. `ExceptionHandlerExceptionResolver`
 - `@ExceptionHandler` 을 처리한다

2. `ResponseStatusExceptionResolver`
  - HTTP 상태 코드를 지정해준다.
  - 예) @ResponseStatus(value = HttpStatus.NOT_FOUND)

3. `DefaultHandlerExceptionResolver` -> 우선 순위가 가장 낮다.
  - 스프링 내부 기본 예외를 처리한다.



 ### @ResponseStatus 적용

```java

// 직접 reason 을 적을 수 있다
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "잘못된 요청 오류") 
public class BadRequestException extends RuntimeException {
}


// messages.properties 에 error.bad 를 등록해 놓을 수 있다
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "error.bad") 
public class BadRequestException extends RuntimeException {
}
```


### @ExceptionHandler 적용

스프링은 API 예외 처리 문제를 해결하기 위해 `@ExceptionHandler` 라는 애노테이션을 사용하는 매우 편리한 예외 처리 기능을 제공 한다


#### ErrorResult.java

예외가 발생했을 때 API 응답으로 사용하는 객체를 정의

```java
@Data
@AllArgsConstructor
public class ErrorResult {
    private String code;
    private String message;
}
```


#### ApiExceptionController

@ExceptionHandler 애노테이션을 선언하고, 해당 컨트롤러에서 처리하고 싶은 예외를 지정해주면 된다. 

해당 컨트롤러에서 예외가 발생하면 이 메서드가 호출된다. 참고로 지정한 예외 또는 그 예외의 자식 클래스는 모두 잡을 수 있다.

```java
@Slf4j
@RestController
public class ApiExceptionV2Controller {
    
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
    
    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandle(UserException e) {
        log.error("[exceptionHandle] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
        return new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
    }
    
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandle(Exception e) {
        log.error("[exceptionHandle] ex", e); 
        return new ErrorResult("EX", "내부 오류");
    }
    
    @GetMapping("/api2/members/{id}")
    public MemberDto getMember(@PathVariable("id") String id) {
        if (id.equals("ex")) {
            throw new RuntimeException("잘못된 사용자"); }
        if (id.equals("bad")) {
            throw new IllegalArgumentException("잘못된 입력 값");
        }
        if (id.equals("user-ex")) {
            throw new UserException("사용자 오류"); 
        }
        return new MemberDto(id, "hello " + id);
    }
    
    @Data
    @AllArgsConstructor
    static class MemberDto {
        private String memberId;
        private String name;
    }
}
```

### @ExceptionHandler 예외 처리 방법

`IllegalArgumentException` 또는 그 하위 자식 클래스를 모두 처리할 수 있다.

```java
@ExceptionHandler(IllegalArgumentException.class)
public ErrorResult illegalExHandle(IllegalArgumentException e) {
    log.error("[exceptionHandle] ex", e);
    return new ErrorResult("BAD", e.getMessage());
}

// 괄호를 생략하면 메서드 파라미터의 예외가 지정된다
@ExceptionHandler
public ErrorResult illegalExHandle(IllegalArgumentException e) {
```


### @ControllerAdvice

`@ExceptionHandler` 를 사용해서 예외를 깔끔하게 처리할 수 있게 되었지만, 정상 코드와 예외 처리 코드가 하나의 컨트롤러에 섞여 있다.
`@ControllerAdvice` 또는 `@RestControllerAdvice` 를 사용하면 둘을 분리할 수 있다.

`@ControllerAdvice` 는 대상으로 지정한 여러 컨트롤러에 `@ExceptionHandler` , `@InitBinder` 기능을 부여해주는 역할을 한다.
`@ControllerAdvice` 에 대상을 지정하지 않으면 모든 컨트롤러에 적용된다. (글로벌 적용)
`@RestControllerAdvice` 는 `@ControllerAdvice` 와 같고, `@ResponseBody` 가 추가되어 있다. `@Controller` , `@RestController` 의 차이와 같다.

```java
@Slf4j
@RestControllerAdvice
public class ExControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandle(UserException e) {
        log.error("[exceptionHandle] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
        return new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
    }
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandle(Exception e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("EX", "내부 오류"); 
    }
}
```


### 대상 컨트롤러 지정 방법

```java
// Target all Controllers annotated with @RestController
@ControllerAdvice(annotations = RestController.class)
public class ExampleAdvice1 {}

// Target all Controllers within specific packages
@ControllerAdvice("org.example.controllers")
public class ExampleAdvice2 {}

// Target all Controllers assignable to specific classes
@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class})
public class ExampleAdvice3 {}
```


### 결론

`@ExceptionHandler` 와 `@ControllerAdvice` 를 조합하면 예외를 깔끔하게 해결할 수 있다.

