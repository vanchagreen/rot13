if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
  var ta = document.activeElement;
  ta.value = ta.value.slice(0, ta.selectionStart) + atob(plainText) + ta.value.slice(ta.selectionEnd, ta.length);
}
else {
  var sel = window.getSelection();
  var range;
  if (sel.rangeCount) {
    range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(atob(plainText)));
  }
}
