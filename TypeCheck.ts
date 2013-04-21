class TypeCheck {
	public BoolType : TypeExp;

	private FunType(dom, cod: TypeExp): TypeExp {
		return new OperType(new Symbol('->'), TypeList.Extend(dom, TypeList.Extend(cod, null)));
	}

	private AnalyzeExp(exp: Exp env: Env, list: TypeList): TypeExp {
		var typeOfThen, typeOfElse, typeOfBinder, typeOfBody, typeOfFun, typeOfArg, typeOfRes : TypeExp;
		var bodyEnv, declEnv: Env;
		var bodyList: TypeList;
		if (exp instanceof IdeClass)
	}
}