class TypeList {
	public head : TypeExp;
	public tail : TypeList;

	constructor(head : TypeExp, tail : TypeList) {
		this.head = head;
		this.tail = tail;
	}

	static Extend(head: TypeExp, tail: TypeList) : TypeList {
		var r : TypeList;
		r.head = head;
		r.tail = tail;
		return r;
	}
}