const $ = (selector) => document.querySelector(selector);
// $ 표시는 자바스크립트에서 DOM element를 가져올 때 관용적으로 많이 사용한다.

// 이벤트에 관련된 기능
function App() {
  // 메뉴의 수정 버튼을 눌러 prompt를 통해 이름을 수정한다.
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // console.log(e.target);

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
        $menuName.innerText = updatedMenuName;
      }
    }
    // 메뉴의 삭제 버튼을 누르면 메뉴 삭제 컨펌(confirm)창이 뜬다.
    if (e.target.classList.contains("menu-remove-button")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      // 삭제에서 확인을 누르면 메뉴가 삭제된다.
      if (confirm(`"${$menuName.innerText}" 메뉴를 정말 삭제하시겠습니까?`)) {
        e.target.closest("li").remove();
        countMenu();
      }
    }
  });

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

  // 총 메뉴 갯수를 count하여 상단에 보여주는 함수
  const countMenu = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
    $("#espresso-menu-name").value = "";
  };

  // 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      // 값을 입력하려고 키를 눌렀을 때 value값을 인식해 alert가 뜨는 것을 방지
      return;
    }
    addEspressoMenuName(e);
    countMenu();
  });

  // 메뉴의 이름을 입력받고 확인 버튼을 눌러서 추가한다.
  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addEspressoMenuName(e);
    countMenu();
  });
}

App();
