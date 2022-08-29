import {useEffect, useCallback, useMemo, useReducer} from 'react'
import debounce from 'lodash.debounce'

const bouncer = (Comp, duration = 300, method = debounce) => props => {
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [dep, forceUpdate] = useReducer(x => ++x, 0)
    const updater = useCallback(method(forceUpdate, duration), [])

    // call the delayed function when props change (or was re-rendered without any props)
    useEffect(updater, [props])

    return useMemo(() => <Comp {...props}/>, [dep])
}

export default bouncer
