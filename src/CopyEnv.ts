class CopyEnv {
	public new: TypeExp;
	public old: TypeExp;
	public tail: CopyEnv;
	constructor(old, new_: TypeExp, tail : CopyEnv) {
		this.old = old;
		this.new = new_;
		this.tail = tail;
	}
}