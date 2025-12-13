// Simple multiplication behavior for the page
(function(){
  const form = document.getElementById('multForm');
  const aInput = document.getElementById('a');
  const bInput = document.getElementById('b');
  const resultEl = document.getElementById('value');
  const clearBtn = document.getElementById('clear');

  // Format number for display with up to 12 significant digits (avoids long floating noise)
  function formatNumber(n){
    if (!isFinite(n)) return String(n);
    // Try to keep integer-looking results clean
    if (Math.abs(n) >= 1 && Number.isInteger(n)) return n.toString();
    // Use toPrecision but remove trailing zeros
    let s = Number(n).toPrecision(12);
    // remove trailing zeros and possible trailing dot
    s = s.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
    return s;
  }

  function showResult(text, ok = true){
    resultEl.textContent = text;
    resultEl.style.color = ok ? '' : 'var(--danger)';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const a = aInput.value;
    const b = bInput.value;

    // Basic validation
    if (a === '' || b === '') {
      showResult('Please enter both numbers', false);
      return;
    }

    const aNum = Number(a);
    const bNum = Number(b);

    if (!isFinite(aNum) || !isFinite(bNum)) {
      showResult('Invalid number', false);
      return;
    }

    const product = aNum * bNum;
    showResult(formatNumber(product), true);
  });

  clearBtn.addEventListener('click', function(){
    aInput.value = '';
    bInput.value = '';
    showResult('—');
    aInput.focus();
  });

  // Improve UX: show running product as numbers change (optional, live)
  [aInput, bInput].forEach(input =>{
    input.addEventListener('input', function(){
      const a = aInput.value, b = bInput.value;
      if (a === '' || b === '') {
        showResult('—');
        return;
      }
      const aNum = Number(a), bNum = Number(b);
      if (!isFinite(aNum) || !isFinite(bNum)) {
        showResult('Invalid number', false);
        return;
      }
      showResult(formatNumber(aNum * bNum));
    });
  });

  // Initialize
  showResult('—');
})();
