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
  } else if (type == "math") {
    text = `Inline: \\\\( \\\\)
Display: $$ $$

Note: use \\_ instead of _`
  }
  document.getElementById("helpText").value = text;
}

//image from clipboard
document.onpaste = function(event) {
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  //console.log(JSON.stringify(items)); // will give you the mime types
  for (index in items) {
    var item = items[index];
    if (item.kind === 'file') {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = function(event) {
        console.log(event.target.result);
        $.ajax({
          url: 'https://api.imgur.com/3/image',
          method: 'POST',
          headers: {
            Authorization: 'Client-ID df19982cff02728'
          },
          data: {
            image: event.target.result.replace(/^data:image\/(png|jpg);base64,/, ""),
            type: 'base64'
          },
          success: function(result) {
            document.getElementById("helpText").value = "![](" + result["data"]["link"] + ")";
          }
        });
      }; // data url!
      reader.readAsDataURL(blob);
    }
  }
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
  document.getElementById('mathButton').addEventListener('click', function() {
    insertHelpText("math");
  });
});
