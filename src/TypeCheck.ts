class TypeCheck {
	public BoolType : TypeExp;

	constructor() {
		this.BoolType = new OperType(new Symbol('bool'), null);
	}

	private FunType(dom, cod: TypeExp): TypeExp {
		return new OperType(new Symbol('->'), TypeList.Extend(dom, TypeList.Extend(cod, null)));
	}

	private AnalyzeExp(exp: Exp, env: Env, list: TypeList): TypeExp {
		var typeOfThen, typeOfElse, typeOfBinder, typeOfBody, typeOfFun, typeOfArg, typeOfRes : TypeExp;
		var bodyEnv, declEnv: Env;
		var bodyList: TypeList;
		if (exp instanceof IdeClass) {
			return Env.Retrieve(exp.ide, env, list);
		} else if (exp instanceof CondClass) {
			Type.UnifyType(AnalyzeExp(exp.test, env, list), BoolType);
			typeOfThen = this.AnalyzeExp(exp.ifTrue, env, list);
			typeOfElse = this.AnalyzeExp(exp.ifFalse, env, list);
			Type.UnifyType(typeOfThen, typeOfElse);
			return typeOfThen;
		} else if (exp instanceof LambClass) {
			typeOfBinder = new VarType();
			bodyEnv = new Env(exp.binder, typeOfBinder, list);
			bodyList = new GenericVar(typeOfBinder, list);
			typeOfBody = this.AnalyzeExp(exp.body, bodyEnv, bodyList);
			return FunType(typeOfBinder, typeOfBody);
		} else if (exp instanceof ApplClass) {
			typeOfFun = this.AnalyzeExp(exp.fun, env, list);
			typeOfArg = this.AnalyzeExp(exp.arg, env, list);
			typeOfRes = new VarType();
			Type.UnifyType(typeOfFun, FunType(typeOfArg, typeOfRes));
			return typeOfRes;
		} else if (exp instanceof BlockClass) {
			declEnv = this.AnalyzeDecl(exp.decl, env, list);
			return this.AnalyzeExp(exp.scope, declEnv, list);
		}
	}

	private AnalyzeDecl(decl: Decl, env: Env, list: TypeList): Env {
		if (decl instanceof DefClass) {
			return new Env(decl.binder, this.AnalyzeExp(decl.def, env, list), env);
		} else if (decl instanceof SeqClass) {
			return this.AnalyzeDecl(decl.second, this.AnalyzeDecl(decl.first, env, list), list);
		} else if (decl instanceof RecClass) {
			this.AnalyzeRecDeclBind(decl.rec, env, list);
			this.AnalyzeRecDecl(decl.rec, env, list);
			return env;
		}
	}

	private AnalyzeRecDeclBind(decl: Decl, env: Env, list: VarType): void {
		var newTypeVar : TypeExp;
		if (decl.class instanceof DefClass) {
			newTypeVar = new VarType();
			env = new Env(decl.binder, newTypeVar, env);
			list = TypeList.Extend(newTypeVar, list);
		} else if (decl.class instanceof SeqClass) {
			this.AnalyzeRecDeclBind(decl.first, env, list);
			this.AnalyzeRecDeclBind(decl.second, env, list);
		} else if (decl.class instanceof SeqClass) {
			this.AnalyzeRecDeclBind(decl.rec, env, list);
		}
	}

	private AnalyzeRecDecl(decl: Decl, env:Env, list:TypeList): void {
		if (decl instanceof DefClass) {
			Type.UnifyType(Env.Retrieve(decl.binder, env, list), this.AnalyzeExp(decl.def, env, list));
		} else if (decl instanceof SeqClass) {
			this.AnalyzeRecDecl(decl.first, env, list);
			this.AnalyzeRecDecl(decl.second, env, list);
		}
	}

}