import { relationshipIdParameters } from '../config/relationshipConf'

/**
 * url参数里是否有relationshipId
 *
 * @export
 * @param {any} ctx
 * @returns
 */
export function parametersHasRelationshipId (ctx) {
  return !!getParameterRelationshipId(ctx)
}

/**
 * 获取url参数里的relationshipId
 *
 * @export
 * @param {any} ctx
 * @returns
 */
export function getParameterRelationshipId (ctx) {
  for (let parameter of relationshipIdParameters) {
    if (ctx.query[parameter] && ctx.query[parameter] > 0) {
      return ctx.query[parameter]
    }
  }
  return null
}

/**
 * 获取有效的relationshipId, 不能等于当前用户，不能小于关联用户
 *
 * @export
 * @param {any} ctx
 * @returns
 */
export function getParameterValidRelationshipId (ctx) {
  const relationshipId = getParameterRelationshipId(ctx)
  if (relationshipId < ctx.state.user.id) {
    return relationshipId
  }
}
