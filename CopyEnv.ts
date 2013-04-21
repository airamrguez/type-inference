class CopyEnv {
	public new: TypeExp;
	public old: TypeExp;
	public tail: CopyEnv;
	constructor(old, new: TypeExp, tail : CopyEnv) {
		this.old = old;
		this.new = new;
		this.tail = tail;
	}
}