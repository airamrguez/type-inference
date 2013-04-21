class OperType extends TypeExp {
	public id: Symbol;
	public args: TypeList;
	constructor (id: Symbol, args : TypeList) {
		super();
		this.id = id;
		this.args = args;
	}
}