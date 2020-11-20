/**
 * query letter
 * 
 */
const db = uniCloud.database();
const collection = db.collection('letters');

module.exports = async function(event) {
	let pageSize = event.pageSize || 0;
	let page = event.page || 1;
	let skip = (page - 1) * pageSize;

	const uid = event.uid;
	let where = uid ? {
		uid
	} : {}
	let {
		data=[]
	} = await collection
		.where(where)
		.skip(skip)
		.limit(pageSize)
		.orderBy("createtime", 'desc')
		.get();
	const {
		total
	} = await collection.where(where).count();
	return {
		code: 0,
		data: {
			total,
			data
		}
	}
}
