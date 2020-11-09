/**
 *  add letter
 */
const uniID = require('uni-id');
const db = uniCloud.database();
const collection = db.collection('letters');

module.exports = async function(event) {
	delete event.action;
	const docid = event._id || `id_${Date.now()}`;
	// 數據庫插入數據如果
	const {
		code,
		id
	} = await collection.doc(docid).set({
		...event
	});
	await uniID.updateUser({
		uid: event.uid,
		signature: event.desc,
	})
	const result = code === 0 || id;
	return {
		code: Boolean(result) ? 0 : 500,
		message: Boolean(result) ? '操作成功' : '操作失败'
	}
}