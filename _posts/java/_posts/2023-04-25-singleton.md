---
layout: post
title: 싱글톤 패턴
date: 2023.04.25
categories: java
tag: ["java", "design pattern"]
---

하나의 클래스에 오직 하나의 인스턴스만 가지는 패턴 / DB 연결모듈에 많이 쓰인다

- 장점
    - 인스턴스를 생성할때 방생되는 자원의 비용이 줄어든다
    - I/O 바운드에 많이 사용된다
- 단점
    - 의존성이 높아짐
    - TDD 에 약하다

## 싱글톤 패턴을 구현하는 방법

### 1. synchronized
```java
public class SingletonSynchronized {
    private static SingletonSynchronized instance;

    private SingletonSynchronized() {
    }

    public static synchronized SingletonSynchronized getInstance() {
        if (instance == null) {
            instance = new SingletonSynchronized();
        }
        return instance;
    }
}
```

### 2. static 변수
```java
public class SingletonStaticValue {
    private static final SingletonStaticValue instance = new SingletonStaticValue();

    private SingletonStaticValue() {
    }

    public static SingletonStaticValue getInstance() {
        return instance;
    }
}
```

### 3. static block
```java
public class SingletonStaticBlock {
    private static SingletonStaticBlock instance = null;

    static {
        instance = new SingletonStaticBlock();
    }

    private SingletonStaticBlock() {
    }

    public static SingletonStaticBlock getInstance() {
        return instance;
    }
}
```

### 4. static 변수와 Lazy Holder(중첩 클래스)
```java
public class SingletonLazyHolder {
    private static class LazyHolder {
        private static final SingletonLazyHolder INSTANCE = new SingletonLazyHolder();
    }

    public static SingletonLazyHolder getInstance() {
        return LazyHolder.INSTANCE;
    }
}
```

### 5. 이중 확인 잠금(DCL, Double Checked Locking)

- volatile 을 쓰는이유
  - java 는 기본적으로 각 Thread 는 CPU 캐시메모리를 이용하게 되는데 volatile 을 사용하지 않으면 CPU 캐시메모리에 저장된 변수를 load 해서 싱글톤을 구현하는데 문제가 될수 있다
  - volatile 키워드는 사용하게 되면 Main 메모리를 기반으로 저장하고 읽기 때문에 문제를 해결할 수 있다

```java
public class SingletonDoubleCheckLocking {
    private volatile SingletonDoubleCheckLocking instance;
    public SingletonDoubleCheckLocking() {
    }

    public SingletonDoubleCheckLocking getInstance() {
        if (instance == null) {
            synchronized (SingletonDoubleCheckLocking.class) {
                if (instance == null) {
                    instance = new SingletonDoubleCheckLocking();
                }
            }
        }
        return instance;
    }
}
```

### 6. enum
```java
public enum SingletonEnum {
    INSTANCE;
    int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
```


## Q. 최고의 방법은 무엇일까?
- 추천할 만한 방법은 4번과 6번이다
- 4번은 가장많이 쓰이는 방법이고 6번은 thread safe 가 무조건 보장된다(effective java 참고)

