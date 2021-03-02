import * as D from '../src/Decoder'
import * as S from '../src/Schema'
import * as _ from './DSL'
import { deepStrictEqual } from './util'
import * as C from 'fp-ts/Const'

describe('DSL', () => {
  it('string', () => {
    deepStrictEqual(_.string.dsl(), C.make({ _tag: 'string' }))
  })

  it('number', () => {
    deepStrictEqual(_.number.dsl(), C.make({ _tag: 'number' }))
  })

  it('struct', () => {
    deepStrictEqual(
      _.struct({
        name: _.string,
        age: _.number
      }).dsl(),
      C.make({
        _tag: 'struct',
        props: {
          name: { _tag: 'string' },
          age: { _tag: 'number' }
        }
      } as const)
    )
  })

  it('toSchema', () => {
    const dsl = _.struct({
      a: _.string
    })
    const schema = _.toSchema(dsl)
    const decoder = S.interpreter(D.Schemable)(schema)
    deepStrictEqual(decoder.decode({ a: 'a' }), D.success({ a: 'a' }))
  })
})