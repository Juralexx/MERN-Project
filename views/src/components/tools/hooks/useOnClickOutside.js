import { useEventListener } from './useEventListener';

function useOnClickOutside(ref, handler, mouseEvent = 'mousedown') {
    useEventListener(mouseEvent, event => {
        const el = ref?.current;
        if (!el || el.contains(event.target)) {
            return;
        }
        handler(event);
    });
}

export default useOnClickOutside;