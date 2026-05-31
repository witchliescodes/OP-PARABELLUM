document.addEventListener(
'DOMContentLoaded',
()=>{

document
.querySelectorAll('.wrap-npc')
.forEach(npc=>{

const tabs =
npc.querySelectorAll(
'.npc-tabs label'
);

const paneles =
npc.querySelectorAll(
'.cont-npc-labs > div'
);

if(!tabs.length || !paneles.length)
return;

tabs[0].classList.add('active');
paneles[0].classList.add('activo');

tabs.forEach((tab,index)=>{

tab.addEventListener(
'click',
()=>{

tabs.forEach(t=>
t.classList.remove('active')
);

paneles.forEach(p=>
p.classList.remove('activo')
);

tab.classList.add('active');

paneles[index]
?.classList.add('activo');

}
);

});

});

});
