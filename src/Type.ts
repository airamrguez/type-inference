export class Type {
	static SameType(typeExp1, typeExp2 : TypeExp) : bool {
		if (typeExp1 instanceof VarType && typeExp2 instanceof VarType) return true;
		if (typeExp1 instanceof OperType && typeExp2 instanceof OperType) return true;
		return false;
	}

	static Prune(typeExp : TypeExp) : TypeExp {
		if (typeExp instanceof VarType) {
			var tExp = <VarType> typeExp;
			if (tExp.instance === null) {
				return tExp;
			} else {
				tExp.instance = Type.Prune(tExp.instance);
				return tExp.instance;
			}
		} else {
			return <OperType> typeExp;
		}
	}

	static OccursInTypeList(typeVar: TypeExp, list: TypeList) : bool {
		if (list == null) return false;
		if (this.OccursInType(typeVar, list.head)) return true;
		return this.OccursInTypeList(typeVar, list.tail);
	}

	private OccursInType(typeVar: TypeExp, typeExp: TypeExp) : bool {
		typeExp = Type.Prune(typeExp);
		if (typeExp instanceof VarType) {
			return Type.SameType(typeVar, typeExp);
		} else {
			return this.OccursInTypeList(typeVar, (<OperType>typeExp).args);
		}
	}

	static UnifyType (typeExp1, typeExp2: TypeExp) : void {
		typeExp1 = Type.Prune(typeExp1);
		typeExp2 = Type.Prune(typeExp2);
		if (typeExp1 instanceof VarType) {
			if (this.OccursInType(typeExp1, typeExp2)) {
				if (!Type.SameType(typeExp1, typeExp2)) {
					console.log('[Error]: type clash');
				}
			} else {
				typeExp1.instance = typeExp2; // Sure?
			}
		} else if (typeExp1 instanceof OperType) {
			var oType1 = <OperType> typeExp1;
			if (typeExp2 instanceof VarType) {
				Type.UnifyType(typeExp2, typeExp1);
			} else if (typeExp2 instanceof OperType) {
				var oType2 = <OperType> typeExp2;
				if (oType1.id.Equals(oType2.id)) {
					this.UnifyArgs(oType1.args, oType2.args);
				} else {
					console.log("Type clash");
				}
			}
		}
	}

	private UnifyArgs(list1, list2 : TypeList) {
		if (list1 === null && list2 === null) return;
		if (list1 === null || list2 === null) {
			console.log("Type clash");
		} else {
			Type.UnifyType(list1.head, list2.head);
			UnifyArgs(list1.head, list2.tail);
		}
	}
}