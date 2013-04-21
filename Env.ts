class Env {
	public id : Symbol;
	public typeExp : TypeExp;
	public tail: Env;
	constructor(id: Symbol, typeExp: TypeExp, tail: Env) {
		this.id = id;
		this.typeExp = typeExp;
		this.tail = tail;
	}

	public Retrieve (id: Symbol, env: Env, list: TypeList): TypeExp {
		if (env === null) {
			console.log('Unbound id');
			return null;
		} else if (Symbol.Equal(id, env.id)) {
			return GenericVar.FreshType(env.typeExp, list);
		} else {
			return Retrieve(id, env.tail, list);
		}
	}
}