import {
    Strategy
} from 'passport-local';
import Member from '../models/model/Member';

export default new Strategy({
    usernameField: 'passport',
    passwordField: 'password'
}, async (passport, password, done) => {

	const member = new Member({
		id: 45,
		cellPhone: '',
		nickName: '波风皆人',
		userName: 'GOaC1476033708',
		status: '',
		createTime: 1476033708,
		updateTime: 1476033708,
		statusTime: 1476033708,
		openId: 'osgj-wm-CKTT4K3xJoBoxh78w73w'
	});
	done('', member);
})
// import { Strategy } from 'passport-local';

// export default new Strategy(
//     {
//         usernameField: 'passport',
//         passwordField: 'password'
//     }, async (passport, password, done) => {
//         try {
//             if (true) {
//                 let user = { passport, password };
//                 user.id = 1;
//                 done(null, user);
//             } else {
//                 done(null, false);
//             }
//         } catch (err) {
//             return done(err);
//         }
//     }
// )
