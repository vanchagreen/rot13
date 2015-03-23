var sel = window.getSelection();
var range;

if (sel.rangeCount) {
  range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(plainText))
}
