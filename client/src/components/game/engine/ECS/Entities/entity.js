import * as uuidv4 from "uuid/v4";

class Entity {
	constructor() {
		this.id = uuidv4();
		this.components = {};
	}

	addComponent(component) {
		this[component.name]=component;
//		this.components[component.name] = component;
		return this;
	}

	removeComponent(component) {
		let name;
		typeof component === "function"
			? (name = component.name)
			: (name = component);

		delete this[name];
		return this;
    }
    
    logEntity(){
        console.log(this);
        return this;
    }
}

export default Entity;