export function useTableauEmbed(containerId : any) {
  var divElement = document.getElementById("viz1712831147001");
  var vizElement = divElement.getElementsByTagName("object")[0];
  if (divElement.offsetWidth > 800) {
    vizElement.style.width = "1204px";
    vizElement.style.height = "1772px";
  } else if (divElement.offsetWidth > 500) {
    vizElement.style.width = "1204px";
    vizElement.style.height = "1772px";
  } else {
    vizElement.style.width = "100%";
    vizElement.style.height = "1577px";
  }
  var scriptElement = document.createElement("script");
  scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
}
