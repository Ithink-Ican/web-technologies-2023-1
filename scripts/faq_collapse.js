document.querySelectorAll(".collapsible").forEach(n => n.addEventListener("click", f => {
  var target = f.target;
  var content = target.parentElement.nextElementSibling;
  target.classList.toggle("active");
  if (content.style.maxHeight){
    content.style.maxHeight = null;
    content.className = "content";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.className = "expanded";
  }
}))