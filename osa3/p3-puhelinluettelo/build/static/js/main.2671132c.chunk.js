(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t(15),r=t.n(a),o=t(6),u=t(3),i=t(0),s=function(e){var n=e.value,t=e.onChangeHandler;return Object(i.jsxs)("div",{children:["Filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addName,t=e.newName,c=e.handleNameChange,a=e.newNumber,r=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:a,onChange:r})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.persons,t=e.deleteItem;return Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsxs)("li",{className:"person",children:[e.name," ",e.number,Object(i.jsx)("button",{className:"deletebutton",onClick:function(){return t(e.id)},children:"-"})]},e.name)}))})},f=t(4),j=t.n(f),b="/api/persons",h=function(){return j.a.get(b).then((function(e){return e.data}))},m=function(e){return j.a.post(b,e).then((function(e){return e.data}))},O=function(e,n){var t="".concat(b,"/").concat(e);return j.a.put(t,n).then((function(e){return e.data}))},v=function(e){var n="".concat(b,"/").concat(e);return j.a.delete(n)},p=function(e){var n,t=e.message;return null===t[0]?Object(i.jsx)("div",{className:"emptymessage"}):(n=t[1]?"error":"",Object(i.jsx)("div",{className:"message",id:n,children:t}))},x=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),f=Object(u.a)(r,2),j=f[0],b=f[1],x=Object(c.useState)(""),g=Object(u.a)(x,2),w=g[0],N=g[1],C=Object(c.useState)(""),y=Object(u.a)(C,2),S=y[0],k=y[1],I=Object(c.useState)([null,!1]),D=Object(u.a)(I,2),A=D[0],E=D[1];Object(c.useEffect)((function(){h().then((function(e){a(e)}))}),[]);var H=function(e,n,t){E(t?[e,!0]:[e,!1]),setTimeout((function(){E([null,!1])}),n)},J=function(){var e=t.find((function(e){return e.name===j})),n=Object(o.a)(Object(o.a)({},e),{},{number:w});O(e.id,n).then((function(e){a(t.map((function(t){return t.id!==n.id?t:e}))),H("Updated number for ".concat(n.name),2e3)})).catch((function(e){H("Information of ".concat(n.name," has already been removed from the sever"),2e3,!0),a(t.filter((function(e){return e.id!==n.id}))),b(""),N("")}))},L=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)("h1",{children:"Phonebook"}),Object(i.jsx)(p,{message:A}),Object(i.jsx)(s,{value:S,onChangeHandler:function(e){k(e.target.value)}}),Object(i.jsx)("h2",{children:"Add a new"}),Object(i.jsx)(d,{addName:function(e){if(e.preventDefault(),t.find((function(e){return e.name===j})))return window.confirm("".concat(j," is already in the phonebook. Replace the old number with a new one?"))?void J():(b(""),void N(""));m({name:j,number:w}).then((function(e){a(t.concat(e)),b(""),N(""),H("Added ".concat(e.name),2e3)})).catch((function(e){console.log(e.response.data.error),H(e.response.data.error,4e3,!0)}))},newName:j,handleNameChange:function(e){b(e.target.value)},newNumber:w,handleNumberChange:function(e){N(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(l,{persons:L,deleteItem:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Do you want to delete ".concat(n,"?"))&&v(e).then((function(c){console.log(c),H("Deleted ".concat(n),2e3),a(t.filter((function(n){return n.id!==e}))),b(""),N("")})).catch((function(c){H("".concat(n," has already been removed from the server"),2e3,!0),a(t.filter((function(n){return n.id!==e}))),b(""),N("")}))}})]})};t(39);r.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.2671132c.chunk.js.map