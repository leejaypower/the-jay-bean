import { $ } from "./utils/dom.js";
import store from "./store/index.js";

// 이벤트에 관련된 기능
function App() {
  // 상태는 변하는 데이터 : 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso"; // 초기 화면은 에스프레소 메뉴로 보인다.

  // 로컬 스토리지에 메뉴 데이터가 있으면 불러와서 화면에 그린다.
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
      paint();
    }
    this.initEventListeners();
  };

  // 메뉴를 화면에 그리는 함수
  const paint = () => {
    const template = this.menu[this.currentCategory]
      .map((item, index) => {
        // index로 해당 메뉴의 고유값을 부여한다.
        return `<li data-menu-id="${index}" >
    <span class="menu-name ${item.soldOut ? "sold-out" : ""}">${
          item.name
        }</span>
    <button
      type="button"
      class="sold-out-button"
    >
      ${item.soldOutText ? "입고" : "품절"} 
    </button>
    <button
      type="button"
      class="menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="menu-remove-button"
    >
      삭제
    </button>
  </li>`;
      })
      // menu 배열의 모든 요소를 하나의 문자열로 만들기 위해 join 메서드 사용
      .join("");

    $("#menu-list").innerHTML = template;
    countMenu();
  };

  // 메뉴를 추가하는 함수
  const addMenuName = () => {
    if ($("#menu-name").value.trim() === "") {
      // 공백이나 입력하지 않고 추가하는 것 방지
      alert("메뉴 이름을 입력해주세요!");
      return;
    }
    const menuName = $("#menu-name").value;

    this.menu[this.currentCategory].push({ name: menuName });
    // 객체에서 키값으로 특정 문자열을 넣을 때는 []표시로 표현할 수 있다.
    // 여기서 객체의 키값은 실시간으로 정해진다.

    store.setLocalStorage(this.menu);

    paint();
  };

  // 총 메뉴 갯수를 count하여 상단에 보여주는 함수
  const countMenu = () => {
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${
      this.menu[this.currentCategory].length
    } 개`;
    $("#menu-name").value = "";
  };

  // 메뉴명을 수정하는 함수
  const updateMenuName = (e) => {
    // html의 data-menu-id 속성을 JS에서 불러올 때는 대시가 빠지고 카멜표기법으로 바뀌는 것 주의
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    // 동적으로 생성된 element에 접근하는 방법 - 이벤트 위임
    // closest : 현재 element에서 매개변수로 준 조건과 맞는 가장 가까운 부모 요소가 반환된다.

    const updatedMenuName = prompt(
      "메뉴명을 입력해서 수정해주세요.",
      $menuName.innerText
    );

    if (updatedMenuName.trim() === "") {
      alert("메뉴 이름은 공백일 수 없습니다.");
      return;
    } else {
      this.menu[this.currentCategory][menuId].name = updatedMenuName;
      store.setLocalStorage(this.menu);
      paint();
    }
  };

  // 메뉴를 삭제하는 함수
  const removeMenuItem = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    // 삭제에서 확인을 누르면 메뉴가 삭제된다.
    if (confirm(`"${$menuName.innerText}" 메뉴를 정말 삭제하시겠습니까?`)) {
      const menuId = e.target.closest("li").dataset.menuId;
      // menuId는 인덱스로 아이디값을 준 것
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      paint();
    }
  };

  // 품절 상태 함수
  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $soldOutButton = e.target
      .closest("li")
      .querySelector(".sold-out-button");

    // console.log($soldOutButton.innerText);

    // soldOut이라는 property를 이런 방법으로 추가할 수도 있다. 자바스크립트의 유연함..
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    // boolean 으로 toggle 기능처럼 만들 수 있다.
    // 처음에는 undefined라 false -> false인 상태에서 누르면 !가 붙어서 true가 되고 이후 참거짓을 반복한다.

    // 품절버튼 내용 바꾸기
    this.menu[this.currentCategory][menuId].soldOutText =
      !this.menu[this.currentCategory][menuId].soldOutText;

    store.setLocalStorage(this.menu);
    paint();
  };

  // 이벤트 함수들 분리
  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      // 메뉴의 수정 버튼을 눌러 prompt를 통해 이름을 수정한다.
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
        // if문이 여러개이기 때문에 마지막에 return을 붙여 불필요한 연산을 하지 않게 한다.
      }

      // 메뉴의 삭제 버튼을 누르면 메뉴 삭제 컨펌(confirm)창이 뜬다.
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuItem(e);
        return;
      }

      if (e.target.classList.contains("sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // form 태그가 자동으로 전송되는 것을 방지한다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        // 값을 입력하려고 키를 눌렀을 때 value값을 인식해 alert가 뜨는 것을 방지
        return;
      }
      addMenuName();
    });

    // 메뉴의 이름을 입력받고 확인 버튼을 눌러서 추가한다.
    $("#menu-submit-button").addEventListener("click", () => {
      addMenuName();
    });

    // 카테고리 변경한다.
    $("nav").addEventListener("click", (e) => {
      const isCategoryButton = e.target.classList.contains("menu-category");
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        paint();
      }
    });
  };
}

// App();

// new 키워드를 사용하여 생성자 함수를 호출하게 되면 이 때의 this는 만들어질 객체를 참조한다.
const app = new App();

// 로컬 스토리지의 저장된 메뉴를 불러온다.
app.init();
