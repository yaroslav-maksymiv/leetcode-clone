import { useEffect, useRef } from 'react'

const useUpdateEffect = (effect, dependencies) => {
    const isMountedRef = useRef(true)

    useEffect(() => {
        if (isMountedRef.current) {
            isMountedRef.current = false
            return
        }
        return effect()
    }, dependencies)
}

export default useUpdateEffect
