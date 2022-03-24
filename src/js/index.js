const $ = (selector) => document.querySelector(selector);
// $ 표시는 자바스크립트에서 DOM element를 가져올 때 관용적으로 많이 사용한다.

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

// 이벤트에 관련된 기능
function App() {
  // 상태는 변하는 데이터 : 메뉴명
  this.menu = [];

  // 메뉴를 추가하는 함수
  const addMenuName = () => {
    if ($("#espresso-menu-name").value.trim() === "") {
      // 공백이나 입력하지 않고 추가하는 것 방지
      alert("메뉴 이름을 입력해주세요!");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;

    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);

    const template = this.menu
      .map((item, index) => {
        // index로 해당 메뉴의 고유값을 부여한다.
        return `<li data-menu-id="${index}">
      <span class="menu-name">${item.name}</span>
      <button
        type="button"
      >
        품절
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

    // console.log(menuItemTemplate(espressoMenuName));
    $("#espresso-menu-list").innerHTML = template;
  };

  // 총 메뉴 갯수를 count하여 상단에 보여주는 함수
  const countMenu = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
    $("#espresso-menu-name").value = "";
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
      this.menu[menuId].name = updatedMenuName;
      store.setLocalStorage(this.menu);
      $menuName.innerText = updatedMenuName;
    }
  };

  // 메뉴를 삭제하는 함수
  const removeMenuitem = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    // 삭제에서 확인을 누르면 메뉴가 삭제된다.
    if (confirm(`"${$menuName.innerText}" 메뉴를 정말 삭제하시겠습니까?`)) {
      const menuId = e.target.closest("li").dataset.menuId;
      // menuId는 인덱스로 아이디값을 준 것
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      countMenu();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 메뉴의 수정 버튼을 눌러 prompt를 통해 이름을 수정한다.
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 메뉴의 삭제 버튼을 누르면 메뉴 삭제 컨펌(confirm)창이 뜬다.
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuitem(e);
    }
  });

  // form 태그가 자동으로 전송되는 것을 방지한다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      // 값을 입력하려고 키를 눌렀을 때 value값을 인식해 alert가 뜨는 것을 방지
      return;
    }
    addMenuName();
    countMenu();
  });

  // 메뉴의 이름을 입력받고 확인 버튼을 눌러서 추가한다.
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
    countMenu();
  });
}

// App();

const app = new App();
// new 키워드를 사용하여 생성자 함수를 호출하게 되면 이 때의 this는 만들어질 객체를 참조한다.
