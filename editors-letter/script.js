(() => {
  const message = document.querySelector('#actionMessage');
  const shareButton = document.querySelector('#shareButton');
  const notifyButton = document.querySelector('#notifyButton');

  shareButton?.addEventListener('click', async () => {
    const payload = {
      title: document.title,
      text: '안성마춤 웹진 2026년 8월호 — 뜨거운 걸 먹고 싶어지는 계절',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        message.textContent = '페이지 주소를 클립보드에 복사했습니다.';
      } else {
        message.textContent = '브라우저 주소창의 링크를 복사해 공유해 주세요.';
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        message.textContent = '공유 기능을 사용할 수 없습니다. 페이지 주소를 직접 복사해 주세요.';
      }
    }
  });

  notifyButton?.addEventListener('click', () => {
    message.textContent = '9월호에는 실제 인터뷰가 실립니다. 공유하기로 주소를 남겨 주시면 다음 호가 나왔을 때 전해 드리겠습니다.';
  });
})();
