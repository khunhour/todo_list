(()=>{"use strict";const e=e=>{const t=e.target.matches("[data-dropdown-button]");if(!t&&null!=e.target.closest("[data-dropdown]"))return;let n;t&&(function(e){let t=e.target.parentNode;if(null!=e.target.closest(".tile")){const e=document.querySelector(".project .option");e.classList.remove("hidden"),t.appendChild(e)}else if(null!=e.target.closest("li")){const e=document.querySelector(".list-todo .option");t.appendChild(e),e.classList.remove("hidden")}}(e),n=e.target.closest("[data-dropdown]"),setTimeout((function(){n.classList.toggle("active")}),0)),document.querySelectorAll("[data-dropdown].active").forEach((e=>{e!==n&&e.classList.remove("active")}))},t=e=>{let t=e.target.parentNode.parentNode,l=t.parentNode;n(t),!0===o()&&(c(),d()),function(e){const t=e.parentNode,n=document.getElementById("renameForm");let o=e.querySelector(".projectName").textContent;n.querySelector("input").value=o,t.insertBefore(n,e)}(l),r(),document.getElementById("projectRenameInput").focus(),l.classList.add("hidden")},n=e=>{e.classList.remove("active")},o=()=>!document.querySelector("#renameForm").classList.contains("hidden");function c(){const e=document.getElementById("renameForm"),t=document.querySelector(".project");e.classList.add("hidden"),t.appendChild(e)}const r=()=>{const e=document.querySelector("#renameForm");setTimeout((function(){e.classList.remove("hidden")}),0)},d=()=>{document.querySelector("div.hidden").classList.remove("hidden")},l=e=>{let t=e.target.parentNode.parentNode.parentNode.dataset.project;const n=document.querySelector(`[data-project="${t}"]`);if(n.classList.contains("selected")){const e=document.querySelector("#today"),t=e.querySelector("[data-name]");e.classList.add("selected"),i(t)}a(e),n.remove(),s(t)},s=e=>{document.querySelectorAll("[data-project]").forEach((t=>{t.dataset.project>e&&(t.dataset.project=t.dataset.project-1)}))};function a(e){if(null!=e.target.closest(".tile")){const e=document.querySelector(".project .option");e.classList.add("hidden"),document.querySelector(".project").appendChild(e)}else if(null!=e.target.closest("li")){const e=document.querySelector("li .option");e.classList.add("hidden"),document.querySelector(".list-todo").appendChild(e)}}function i(e){const t=document.querySelector(".title");console.log(t),t.textContent=e.textContent}function u(e){e.target.matches("[data-drag]")&&(e.target.parentNode.draggable=!0)}function m(e){e.addEventListener("dragstart",(()=>{e.classList.add("dragging")})),e.addEventListener("dragend",(()=>{e.classList.remove("dragging"),e.draggable=!1}))}function p(e){e.preventDefault();const t=document.querySelector(".project"),n=document.querySelector(".dragging"),o=document.querySelector("#projectForm"),c=(r=e.clientY,[...document.querySelectorAll(".project .tile:not(.dragging)")].reduce(((e,t)=>{const n=t.getBoundingClientRect(),o=r-n.top-n.height/2;return o<0&&o>e.offset?{offset:o,element:t}:e}),{offset:Number.NEGATIVE_INFINITY}).element);var r;null==c?t.insertBefore(n,o):t.insertBefore(n,c)}const g=e=>{let t=document.getElementById("projectInput").value;L(t),f(),e.preventDefault()},y=()=>{document.querySelector("#projectForm").classList.remove("hidden"),document.getElementById("projectInput").focus()},f=()=>{const e=document.querySelector("#projectForm");document.querySelector("#projectInput").value="",e.classList.add("hidden")},L=e=>{let t=S();const n=document.querySelector(".project"),o=document.querySelector("#projectForm"),c=document.createElement("div");c.setAttribute("data-project",`${t}`),c.classList.add("tile"),n.insertBefore(c,o);const r=v("menu");r.setAttribute("data-drag",""),c.appendChild(r);const d=document.createElement("div");d.classList.add("projectInfo"),d.tabIndex="0",c.appendChild(d);const l=document.createElement("div");l.classList.add("projectName"),l.textContent=e,d.appendChild(l);const s=document.createElement("div");s.classList.add("editContainer"),s.setAttribute("data-dropdown",""),c.appendChild(s);const a=v("more_vert");a.setAttribute("data-dropdown-button",""),s.appendChild(a),m(c)},v=e=>{const t=document.createElement("span");return t.classList.add("material-icons-round"),t.textContent=e,t},S=()=>document.querySelectorAll("[data-project]").length;function h(e){let t=e.target.closest(".home .tile"),n=e.target.closest(".project .tile");if(null!=t){const e=t.querySelector("[data-name]");q(t),i(e)}else{if(null==n)return;{const e=n.querySelector(".projectName");q(n),i(e)}}}const q=e=>{document.querySelector(".selected").classList.remove("selected"),e.classList.add("selected")};document.querySelector("#addList").addEventListener("click",(()=>{document.querySelector("#listForm").classList.remove("hidden")})),document.querySelector(".listCancelBtn").addEventListener("click",(e=>{const t=document.querySelector("#listForm");document.querySelector("#listInput").value="",t.classList.add("hidden")})),document.getElementById("listForm").addEventListener("submit",(function(e){console.log()})),document.querySelector(".list-todo").addEventListener("click",(function(e){e.target;let t=e.target.matches(".star-outline"),n=e.target.matches(".unchecked"),o=e.target.matches("[data-title]"),c=e.target.matches("#listDelete"),r=e.target.matches("#listEdit");if(t)!function(e){let t=e.target;t.classList.toggle("listHidden");let n=e.target.nextElementSibling;n.classList.toggle("listHidden"),console.log(n),console.log(t)}(e);else if(n)!function(e){let t=e.target,n=e.target.nextElementSibling,o=e.target.closest("li");t.classList.toggle("checked"),n.classList.toggle("lineThrough"),o.classList.toggle("fade")}(e);else if(o)!function(e){let t=e.target.nextElementSibling;console.log(t),t.classList.toggle("hidden")}(e);else if(c)!function(e){let t=e.target.closest("li");a(e),t.remove()}(e);else{if(!r)return;console.log()}})),document.querySelector(".projectCancelBtn").addEventListener("click",f),document.getElementById("addProject").addEventListener("click",y),document.getElementById("projectForm").addEventListener("submit",g),document.querySelector(".leftPanel").addEventListener("click",h),function(){document.addEventListener("click",e);const n=document.querySelector(".project .option");n.firstElementChild.addEventListener("click",t),n.lastElementChild.addEventListener("click",l),document.querySelector(".rename-renameBtn").addEventListener("click",(function(e){(()=>{const e=document.querySelector(".project .tile.hidden");let t=document.getElementById("projectRenameInput").value;const n=e.querySelector(".projectName");n.textContent=t,d(),i(n),c()})(),e.preventDefault()})),document.querySelector(".rename-cancelBtn").addEventListener("click",(function(){c(),d()}))}(),function(){const e=document.querySelector(".project");e.addEventListener("mousedown",u),document.querySelectorAll(".project .tile").forEach((e=>{m(e)})),e.addEventListener("dragover",p)}(),console.log("yo maama")})();