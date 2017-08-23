export function saveToLocal(id,key,value){
	let store=window.localStorage.__store__
	if(!store){
		store={};
		store[id]={};
	}else{
		store=JSON.parse(store);
		if(!store[id]){
			store[id]={}
		}
	}
	store[id][key]=value;
	window.localStorage.setItem('__store__',JSON.stringify(store))
}
export function loadFromlocal(id,key,defaults){
	console.log("0000");
	let store=window.localStorage.__store__;

	if(!store){
		return defaults;
	}
	store=JSON.parse(store)[id];
	if(!store){
		return defaults;
	}
	let ret=store[key];
	console.log(ret||defaults)
	return ret||defaults;
}