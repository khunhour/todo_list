(()=>{"use strict";function e(e){const t=document.querySelector(".title");console.log(t),t.textContent=e.textContent}function t(e){console.log(e.currentTarget.parentNode.dataset.project)}const n=e=>{let t=e.target.parentNode.parentNode,n=t.parentNode;n.dataset.project,c(t),!0===o()&&(s(),l()),d(n),r(),document.getElementById("projectRenameInput").focus(),n.classList.add("hidden")},c=e=>{e.classList.remove("active")},o=()=>null!=document.querySelector("#renameForm"),d=e=>{let t=e.querySelector(".projectName").textContent;const n=document.createElement("form");n.setAttribute("id","renameForm"),n.setAttribute("autocomplete","off"),n.classList.add("hidden"),e.parentNode.insertBefore(n,e);const c=document.createElement("div");c.classList.add("projectIcon"),n.appendChild(c);const o=E("menu");c.appendChild(o);const d=document.createElement("div");d.classList.add("inputField"),n.appendChild(d);const r=document.createElement("input");r.type="text",r.id="projectRenameInput",r.value=t,d.appendChild(r);const i=document.createElement("div");i.classList.add("formButtons"),d.appendChild(i);const u=document.createElement("input");u.classList.add("rename-renameBtn"),u.type="submit",u.value="Rename",i.appendChild(u);const m=document.createElement("input");m.classList.add("rename-cancelBtn"),m.type="button",m.value="Cancel",i.appendChild(m),u.addEventListener("click",(function(t){a(e),t.preventDefault()})),m.addEventListener("click",(function(){s(),l()}))},r=()=>{const e=document.querySelector("#renameForm");setTimeout((function(){e.classList.remove("hidden")}),1)},a=e=>{let t=document.getElementById("projectRenameInput").value;e.querySelector(".projectName").textContent=t,l(),s()},l=()=>{document.querySelector("div.hidden").classList.remove("hidden")},s=()=>{document.querySelector("#renameForm").remove()},i=e=>{let t=e.target.parentNode.parentNode.parentNode.dataset.project;const n=document.querySelector(`[data-project="${t}"]`);n.classList.contains("selected")&&document.querySelector("#today").classList.add("selected"),n.remove(),u(t)},u=e=>{document.querySelectorAll("[data-project]").forEach((t=>{t.dataset.project>e&&(t.dataset.project=t.dataset.project-1)}))},m=e=>{let t=document.getElementById("projectInput").value;L(t),v(),e.preventDefault()},p=()=>{document.querySelector("#projectForm").classList.remove("hidden"),document.getElementById("projectInput").focus()},v=()=>{const e=document.querySelector("#projectForm");document.querySelector("#projectInput").value="",e.classList.add("hidden")},L=e=>{let c=y();const o=document.querySelector(".project"),d=document.querySelector("#projectForm"),r=document.createElement("div");r.setAttribute("data-project",`${c}`),r.classList.add("tile"),o.insertBefore(r,d);const a=E("menu");r.appendChild(a);const l=document.createElement("div");l.classList.add("projectInfo"),l.tabIndex="0",r.appendChild(l);const s=document.createElement("div");s.classList.add("projectName"),s.textContent=e,l.appendChild(s);const u=document.createElement("div");u.classList.add("editProject"),u.setAttribute("data-dropdown",""),r.appendChild(u);const m=E("more_vert");m.setAttribute("data-dropdown-button",""),u.appendChild(m);const p=document.createElement("div");p.classList.add("option"),u.appendChild(p);const v=document.createElement("button"),L=document.createElement("button");v.textContent="Rename",L.textContent="Delete",p.appendChild(v),p.appendChild(L),v.addEventListener("click",n),L.addEventListener("click",i),l.addEventListener("click",t)},E=e=>{const t=document.createElement("span");return t.classList.add("material-icons-round"),t.textContent=e,t},y=()=>document.querySelectorAll("[data-project]").length;function h(t){console.log("checklog");let n=t.target.closest(".home .tile"),c=t.target.closest(".project .tile");if(console.log(t.target.tagName),null!=n){const t=n.querySelector("[data-name]");console.log(n),console.log(t.textContent),j(n),e(t)}else{if(null==c)return;{const t=c.querySelector(".projectName");j(c),e(t)}}}const j=e=>{document.querySelector(".selected").classList.remove("selected"),e.classList.add("selected")};document.querySelector("#addList").addEventListener("click",(()=>{document.querySelector("#listForm").classList.remove("hidden")})),document.querySelector(".listCancelBtn").addEventListener("click",(e=>{const t=document.querySelector("#listForm");document.querySelector("#listInput").value="",t.classList.add("hidden")})),document.getElementById("listForm").addEventListener("submit",(function(e){console.log()})),document.querySelector(".unchecked").addEventListener("click",(function(){check.classList.contains("checked")?check.classList.remove("checked"):check.classList.add("checked")})),document.querySelector(".projectCancelBtn").addEventListener("click",v),document.getElementById("addProject").addEventListener("click",p),document.getElementById("projectForm").addEventListener("submit",m),document.querySelector(".leftPanel").addEventListener("click",h),document.querySelectorAll(".option").forEach((e=>{e.firstElementChild.addEventListener("click",n),e.lastElementChild.addEventListener("click",i)})),document.addEventListener("click",(e=>{const t=e.target.matches("[data-dropdown-button]");if(!t&&null!=e.target.closest("[data-dropdown]"))return;let n;t&&(n=e.target.closest("[data-dropdown]"),n.classList.toggle("active")),document.querySelectorAll("[data-dropdown].active").forEach((e=>{e!==n&&e.classList.remove("active")}))})),console.log("yo maama")})();