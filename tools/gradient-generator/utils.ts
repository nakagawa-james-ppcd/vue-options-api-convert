const cloneObject = (object: any) => {
	return JSON.parse(JSON.stringify(object));
};

export { cloneObject };