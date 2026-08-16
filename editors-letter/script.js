(() => {
  const message = document.querySelector('#actionMessage');
  const shareButton = document.querySelector('#shareButton');
  const notifyButton = document.querySelector('#notifyButton');
  const futureLinks = document.querySelectorAll('[data-future-page]');

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
    message.textContent = '다음 호 알림 신청은 뉴스레터/CRM 연결 후 활성화할 수 있도록 버튼 영역을 준비해 두었습니다.';
  });

  futureLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      message.textContent = '해당 섹션 페이지가 추가되면 이 목차 링크에 연결됩니다.';
      document.querySelector('.closing')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
