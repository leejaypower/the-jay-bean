const $ = (selector) => document.querySelector(selector);
// $ 표시는 자바스크립트에서 DOM element를 가져올 때 관용적으로 많이 사용한다.

// 이벤트에 관련된 기능
function App() {
  // form 태그가 자동으로 전송되는 것을 방지한다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 에스프레소 메뉴를 추가하는 함수
  const addEspressoMenuName = (e) => {
    if ($("#espresso-menu-name").value.trim() === "") {
      // 공백이나 입력하지 않고 추가하는 것 방지
      alert("메뉴 이름을 입력해주세요!");
      return;
    }
    if (e.key === "Enter") {
      const espressoMenuName = $("#espresso-menu-name").value;
      const menuItemTemplate = (espressoMenuName) => {
        return `<li>
      <span class="menu-name">${espressoMenuName}</span>
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
      };
      // console.log(menuItemTemplate(espressoMenuName));
      $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        menuItemTemplate(espressoMenuName)
      );
    }
  };

  // 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      // 값을 입력하려고 키를 눌렀을 때 value값을 인식해 alert가 뜨는 것을 방지
      return;
    }
    addEspressoMenuName(e);
  });
}

App();
