function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function headerText() {
  var now = new Date();
  return `---
title:
tags: []
date: ${now.getFullYear()}-${pad(now.getMonth()+1, 2)}-${pad(now.getDate(), 2)} ${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:${pad(now.getSeconds(), 2)}
---`
}

function insertHelpText(type) {
  var text = "";
  if (type == "header") {
    text = headerText();
  } else if (type == "more") {
    text = "<!-- more -->";
  } else if (type == "code") {
    text = `\`\`\`bash
\`\`\``;
  }
  document.getElementById("helpText").value = text;
}

document.addEventListener('DOMContentLoaded', function() {
  $('[data-toggle="tooltip"]').tooltip();

  document.getElementById('headerButton').addEventListener('click', function() {
    insertHelpText("header");
  });
  document.getElementById('moreButton').addEventListener('click', function() {
    insertHelpText("more");
  });
  document.getElementById('codeButton').addEventListener('click', function() {
    insertHelpText("code");
  });
});
