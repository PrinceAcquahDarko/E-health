import {basicInfo} from './basicInfo'
import {serve} from './servers'
import {Tags} from './tags'
import {compo} from './component'
import users from './users'

const docs = {
    ...basicInfo,
    ...serve,
    ...compo,
    ...Tags,
    ...users

}

export default docs