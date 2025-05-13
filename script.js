// 페이지 로드 후 실행될 코드
document.addEventListener("DOMContentLoaded", function () {
  // --- 사이드바 토글 기능 ---
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");

  // 초기 상태 설정: body 클래스에 따라 사이드바 상태 결정
  // CSS에서 body.sidebar-open을 기본으로 설정했으므로 여기서는 닫힘 상태만 처리
  if (!document.body.classList.contains('sidebar-open')) {
       sidebar.classList.add("closed");
       document.body.classList.add("sidebar-closed");
  }


  toggleBtn.addEventListener("click", () => {
      // 'closed' 클래스를 토글하여 사이드바를 숨기거나 보이게 합니다.
      sidebar.classList.toggle("closed");
      // body 태그의 클래스를 토글하여 CSS에서 사이드바 상태에 따른 스타일을 적용합니다.
      document.body.classList.toggle("sidebar-closed");
      document.body.classList.toggle("sidebar-open"); // 사이드바 열림/닫힘 상태 클래스 토글
  });


  // --- 외부 하이퍼링크 관리 기능 ---
  const addLinkForm = document.getElementById("add-link-form");
  const linkText = document.getElementById("link-text");
  const linkUrl = document.getElementById("link-url");
  const externalLinksList = document.getElementById("external-links-list");

  // localStorage에서 링크 불러오기
  function loadLinks() {
      // localStorage에서 'externalLinks' 항목을 가져와 파싱합니다.
      // 데이터가 없으면 빈 배열([])을 기본값으로 사용합니다.
      const links = JSON.parse(localStorage.getItem("externalLinks") || "[]");
      externalLinksList.innerHTML = ""; // 현재 목록을 비웁니다.
      // 불러온 각 링크를 DOM에 추가합니다.
      links.forEach(link => addLinkToDOM(link.text, link.url));
  }

  // localStorage에 링크 저장하기
  function saveLinks() {
      const links = [];
      // 현재 DOM에 있는 링크들을 순회하며 데이터를 추출합니다.
      externalLinksList.querySelectorAll("#external-links-list li").forEach(li => {
          const a = li.querySelector("a");
          links.push({
              text: a.textContent,
              url: a.href
          });
      });
      // 추출한 링크 데이터를 JSON 문자열로 변환하여 localStorage에 저장합니다.
      localStorage.setItem("externalLinks", JSON.stringify(links));
  }

  // DOM에 링크 요소 추가하기
  function addLinkToDOM(text, url) {
      const li = document.createElement("li"); // <li> 요소 생성
      const a = document.createElement("a");   // <a> 요소 생성
      a.href = url;                      // 링크 URL 설정
      a.textContent = text;              // 링크 텍스트 설정
      a.target = "_blank";               // 새 탭에서 열기

      const removeBtn = document.createElement("button"); // 버튼 요소 생성
      removeBtn.textContent = "삭제";                    // 버튼 텍스트 설정
      removeBtn.classList.add("remove-link");            // CSS 클래스 추가
      removeBtn.addEventListener("click", () => {
          li.remove(); // 클릭 시 해당 <li> 요소를 DOM에서 제거
          saveLinks(); // localStorage 업데이트
      });

      li.appendChild(a);         // <li>에 <a> 추가
      li.appendChild(removeBtn); // <li>에 삭제 버튼 추가
      externalLinksList.appendChild(li); // 외부 링크 목록에 <li> 추가
  }

  // 링크 추가 폼 제출 이벤트 리스너
  addLinkForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

      const text = linkText.value.trim(); // 입력된 링크 이름 가져오기 (앞뒤 공백 제거)
      const url = linkUrl.value.trim();   // 입력된 URL 가져오기 (앞뒤 공백 제거)

      // 입력 필드가 비어있지 않으면 링크 추가
      if (text && url) {
          addLinkToDOM(text, url); // DOM에 링크 추가
          saveLinks(); // localStorage 업데이트
          linkText.value = ""; // 입력 필드 초기화
          linkUrl.value = "";
      } else {
          alert("링크 이름과 URL을 모두 입력해주세요.");
      }
  });

  // 페이지 로드 시 localStorage에 저장된 링크들을 불러와 표시합니다.
  loadLinks();
});

console.log("Script Loaded");