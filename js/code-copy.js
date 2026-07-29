document.addEventListener('DOMContentLoaded', function () {
  var blocks = document.querySelectorAll('.highlight');
  var iconTemplate = document.getElementById('code-copy-icon-template');
  var iconMarkup = iconTemplate ? iconTemplate.innerHTML : '';

  blocks.forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;

    var source = block.querySelector('pre code') || pre;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy-button';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = iconMarkup + '<span class="label">Copy</span>';

    button.addEventListener('click', function () {
      var text = source.textContent || '';
      var resetLabel = function () {
        button.querySelector('.label').textContent = 'Copy';
      };
      var setCopied = function () {
        button.querySelector('.label').textContent = 'Copied';
        window.setTimeout(resetLabel, 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(setCopied).catch(function () {
          fallbackCopy(text, setCopied);
        });
        return;
      }

      fallbackCopy(text, setCopied);
    });

    block.appendChild(button);
  });
});

function fallbackCopy(text, onSuccess) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  onSuccess();
}
