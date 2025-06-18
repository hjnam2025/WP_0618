   // ... (퀴즈 결과 계산 및 result-text, result-image 설정 코드 생략) ...

// 퀴즈 결과 계산 후 (result 객체에 최종 결과 정보가 담겨있다고 가정)
const categoryScores = JSON.parse(localStorage.getItem('quizResult') || '{}');

const results = {
  A: { text: "[ 비현실적 낙관주의형 ]", image: "../img/R-A.png" },
  B: { text: "[ 자기비난형 ]", image: "../img/R-B.png" },
  C: { text: "[ 현실저항형 ]", image: "../img/R-C.png" },
  D: { text: "[ 완벽주의형 ]", image: "../img/R-D.png" },
  E: { text: "[ 자극추구형 ]", image: "../img/R-E.png" }
};

let max = -1;
let winner = null;

for (let key in categoryScores) {
  if (categoryScores[key] > max) {
    max = categoryScores[key];
    winner = key;
  }
}

const result = results[winner]; // 최종 결과 객체 (예: results['A'])

if (result) {
  // 결과 유형 텍스트와 이미지 설정 (기존 코드)
  document.getElementById("result-text").textContent = result.text;
  const img = document.getElementById("result-image");
  img.src = result.image;
  img.alt = result.text;

  // localStorage에 결과 저장 (기존 코드)
  localStorage.setItem('resultType', winner);
  localStorage.setItem('resultImage', result.image);

  // --- 추가 텍스트 박스 내용 설정 ---

  // 1. 결과 유형에 따른 추가 텍스트 내용 정의
  const additionalTexts = {
      A: "* 긍정적 착각<br>* 노력 없이도 해낼 수 있을 거라는 착각<br>* 남 일은 객관적으로, 내 일은 주관적으로!",
      B: "* 내가 두려워하는 위험을 사전차단<br>* 나는 능력이 없으니/ 자만으로 곤경에 처할 수도 있으니 →  스스로를 작고 안전한 상태로 있도록 스스로의 사기를 꺾어 미룬다.<br>* 쓴소리 자극법: 순간의 문제는 모면하지만 장기적으로는 ‘과제를 해낸 나’ 가 아니라 ‘위기를 겨우 모면한 나’만 남는다.",
      C: "* 의욕이 안 생기고 왜 해야하는지도 모르겠다.<br>* 내 일을 남일처럼 받아들인다.",
      D: "* 높은 개인적 기준- 도달하기 위해 성취 지향적<br>* 평가가 예상되는 상황에서 과도하게 염려/ 민감<br>* 당위적 기준에 평가요소를 추가한다.<br>* 칭찬에 익숙해서 실수하거나 잘 못 해내면 중요한 타인에게 인정받지 못할까봐 두렵다.",
      E: "* 일을 벌인 후 유지하기가 힘들다 : 작심삼일!<br>* 작은 일이나 일상적 습관도 지속이 어렵다. !<br>* 아무리 쉬운 목표를 세워도 2주이상 계속하기 어렵다."
  
  };

  // 2. 추가 텍스트 박스 HTML 요소 찾기
  // >>> 클래스 이름을 '.add'로 수정 <<<
  const additionalTextBox = document.querySelector('.add');

  // 3. 결과 유형에 따라 추가 텍스트 내용 설정
  if (additionalTextBox) { // 요소가 존재하는지 확인
      if (winner && additionalTexts[winner]) {
          // innerHTML을 사용하여 HTML 태그와 줄 바꿈을 인식시킵니다.
          additionalTextBox.innerHTML = `<p>${additionalTexts[winner]}</p>`; // p 태그로 감싸서 넣기
          console.log("추가 텍스트 박스 내용 설정 완료:", additionalTexts[winner]); // 확인용 로그
      } else {
          // 결과 유형을 찾지 못했거나 정의되지 않은 경우 기본 메시지 설정
          additionalTextBox.innerHTML = "<p>결과 설명을 불러오지 못했습니다.</p>";
          console.warn("결과 유형을 찾을 수 없거나 추가 텍스트가 정의되지 않았습니다.", winner); // 경고 로그
      }
  } else {
      // >>> 콘솔 메시지도 클래스 이름에 맞게 수정 <<<
      console.error("클래스가 'add'인 요소를 찾을 수 없습니다."); // 오류 로그
  }

  // --- 추가 텍스트 박스 내용 설정 끝 ---

} // if (result) 끝

// ... (나머지 코드 생략) ...
