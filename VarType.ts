class VarType extends TypeExp {
	public instance : TypeExp;
	constructor (instance?: TypeExp) {
		super();
		this.instance = instance || null;
	}
}