import{u as l,r as c,j as e,B as n}from"./index-10f317c0.js";const d=()=>{const{data:s,refetch:a}=l();return c.useEffect(()=>{const t=setInterval(a,5e3);return()=>clearInterval(t)},[a]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed top-0 left-0 mt-12",children:e.jsx(n,{})}),e.jsx("div",{className:"space-y-4 mt-5 pt-16 mx-5",children:s==null?void 0:s.map((t,r)=>e.jsxs("div",{className:"border border-blue-300 rounded-lg p-4 bg-blue-100 shadow-lg",children:[e.jsxs("div",{className:"font-bold text-xl mb-2",children:["Сообщение ",r+1]}),e.jsx("p",{className:"text-gray-700 text-base",children:t.body}),e.jsxs("p",{className:"text-gray-400 text-sm",children:["Отправлено: ",new Date(t.createdAt).toLocaleString()]})]},r))})]})},x=()=>e.jsx("div",{children:e.jsx(d,{})});export{x as default};
