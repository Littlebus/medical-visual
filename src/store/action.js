import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		if(res.success)
			commit(GET_USERINFO, res.data)
	},
	async saveAddress({
		commit,
		state
	}) {

		if(state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);	
	},
}