# ☕ The Jay Bean

<a href="https://github.com/imakerjun">Maker Jun</a>님의 <a href="https://www.udemy.com/course/vanilla-js-lv1/"> 유데미 강의</a>와 함께 바닐라 자바스크립트로 상태관리가 가능한 카페 메뉴 관리 애플리케이션을 만들어 봅니다!

이 프로젝트를 통해 다음을 학습하고 실습합니다.

- 자바스크립트의 이벤트 처리

- 서버와의 비동기 통신

- 객체의 상태관리

- 자바스크립트 모듈 관리

<br>

<b>개발 전 요구 사항을 체크하고 요구사항을 최대한 작게 쪼개서 하나씩 기능을 구현합니다.</b>

<br>

## 🚩 요구사항 1 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

### 메뉴 추가

- [x] 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.

- [x] 메뉴의 이름을 입력받고 확인 버튼을 눌러서 추가한다.

- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

- [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.

- [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

### 메뉴 수정

- [x] 메뉴의 수정 버튼을 클릭하면 메뉴 이름을 업데이트한다.

- [x] 메뉴 수정 시 브라우저가 제공하는 prompt를 사용한다.

- [x] 메뉴 수정 prompt에서 메뉴명을 입력받고 확인 버튼을 누르면 메뉴명이 수정된다.

### 메뉴 삭제

- [x] 메뉴 삭제 버튼을 클릭하면 브라우저가 제공하는 confirm을 이용해 삭제의사를 확인한다.

- [x] confirm에서 확인 버튼을 클릭하면 메뉴가 삭제된다.

- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

<br>

## 🚩 요구사항 2 - 상태 관리로 메뉴 관리하기

### localStorage Read & Write

- [x] localStorage에 데이터를 저장한다.

- [x] localStorage에 있는 데이터를 읽어 온다.

### 카테고리별 메뉴판 관리

- [x] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트로 나뉜 메뉴판 관리

### 페이지 접근시 최초 데이터 Read & Rendering

- [x] 페이지 최초 접근 시 localStorage에서 에스프레소 메뉴 데이터를 읽어온다.

- [x] 에스프레소 메뉴를 페이지에 그려준다.

### 메뉴 상태 관리

- [x] 품절 상태인 경우를 위해 품절 버튼을 추가한다.

- [x] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.

- [x] 품절 메뉴의 상태값이 페이지에 보인다.

- [x] 품절 버튼 클릭 이벤트에서 가장 가까운 li태그에 sold-out class를 추가한다.

<br>

## 🚩 요구사항 3 - 서버와의 통신을 통해 메뉴 관리하기

- [ ] 웹 서버를 띄운다.

- [ ] 서버에 새로운 메뉴를 추가될 수 있도록 요청한다.

- [ ] 서버로부터 카테고리별 메뉴 리스트를 받아온다.

- [ ] 서버에 메뉴 이름을 수정 요청한다.

- [ ] 서버에 메뉴 품절 상태가 toggle 되도록 요청한다.

- [ ] 서버에 저장된 메뉴를 삭제 요청한다.

- [ ] fetch 비동기 api를 사용하는 부분을 async await를 사용하여 구현한다.
- [ ] api 통신이 실패하는 경우 사용자가 알 수 있게 alert로 예외처리를 한다.

- [ ] 중복되는 메뉴는 추가할 수 없다.

<br>

## 새로 알게 된 것

- script type="module"

- DOM element를 가져올 때 변수로 만들어 간편하게 가져오고, 코드의 길이를 줄일 수 있다.

- 새롭게 알게 된 메서드들

  - element.insertAdjacentHTML()
  - element.closest()

  <br>

- 동적으로 생성된 element에 접근하는 방법

  - 이벤트 위임

<br>

- 코드의 가독성을 높이기 위해 리팩토링하는 방법

- 호출 맥락에 따라 가리키는 것이 달라지는 this 키워드

- 자바스크립트에서 동적으로 엘리먼트를 생성할 때, 조건에 따라 클래스나 텍스트를 바꾸기 위해 삼항연산자를 사용하는 방법

- runtime에서 정해지는 객체의 키값을 가져오는 방법 실습 (computed properties)

- <a href="https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes">HTML data- 속성, dataset으로 접근</a>
