class GenericVar {

	private IsGeneric(typeVar: TypeExp, list: TypeList) : bool {
		return !Type.OccursInTypeList(typeVar, list);
	}

	static FreshVar(typeVar: TypeExp, scan: CopyEnv, env : CopyEnv): TypeExp {
		var newTypeVar : TypeExp;
		if (scan === null) {
			newTypeVar = new VarType();
			env = new CopyEnv(typeVar, newTypeVar, env);
			return newTypeVar;
		} else if (Type.SameType(typeVar, scan.old)) {
			return scan.new;
		}
		return GenericVar.FreshVar(typeVar, scan.tail, env);
	}

	public Fresh(typeExp: TypeExp, list: TypeList, env:CopyEnv) : TypeExp {
		typeExp = Type.Prune(typeExp);
		if (typeExp instanceof VarType) {
			var vExp = <VarType> typeExp;
			if (this.IsGeneric(vExp, list)) {
				return this.FreshVar(vExp, env, env);
			} else {
				return vExp;
			}
		} else if (typeExp instanceof OperType) {
			var oExp = <OperType> typeExp;
			return new OperType(oExp.id, FreshList(oExp.args, list, env));
		}
	}

	public FreshList(args: TypeList, list: TypeExp, env: CopyEnv) : TypeList {
		if (args === null) return null;
		return TypeList.Extend(Fresh(args.head, list, env), FreshList(args.tail, list, env));
	}

	public FreshType(typeExp: TypeExp, list: TypeList): TypeExp {
		var env : CopyEnv;
		env = null;
		return this.Fresh(typeExp, list, env);
	}

}