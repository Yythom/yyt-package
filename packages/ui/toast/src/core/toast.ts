import {
    Renderable,
    Toast,
    ToastOptions,
    ToastType,
    DefaultToastOptions,
    ValueOrFunction,
    resolveValue,
} from '../interface/types'
import { genId } from './utils'
import { dispatch, ActionType } from './store'

type Message = ValueOrFunction<Renderable, Toast>

type ToastHandler = (message: Message, options?: ToastOptions) => any

const createToast = (
    message: Message,
    type: ToastType = 'blank',
    opts?: ToastOptions,
): Toast => ({
    createdAt: Date.now(),
    visible: true,
    type,
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
    message,
    pauseDuration: 0,
    ...opts,
    id: opts?.id || genId(),
})

const createHandler = (type?: ToastType): ToastHandler => (
    message,
    options: ToastOptions,
) => {
    const toast = createToast(message, type, options)
    dispatch({ type: ActionType.UPSERT_TOAST, toast })
    return toast
}

/** 默认的方式 */
const toast = (message: Message, opts?: ToastOptions) => createHandler('success')(message, opts)

toast.error = createHandler('error')
toast.warning = createHandler('warning')
toast.success = createHandler('success')
toast.loading = createHandler('loading')
toast.custom = createHandler('custom')

toast.dismiss = (toastId?: string) => {
    dispatch({
        type: ActionType.DISMISS_TOAST,
        toastId,
    })
}

toast.remove = (_toast?: any) => {
    const { id, type, duration } = _toast
    dispatch({ type: ActionType.REMOVE_TOAST, toastId: id })
}

toast.promise = <T>(
    promise: Promise<T>,
    msgs: {
        loading: Renderable;
        success: ValueOrFunction<Renderable, T>;
        error: ValueOrFunction<Renderable, any>;
    },
    opts?: DefaultToastOptions,
) => {
    const { id } = toast.loading(msgs.loading, { ...opts, ...opts?.loading })
    promise
        .then(p => {
            toast.success(resolveValue(msgs.success, p), {
                id,
                ...opts,
                ...opts?.success,
            })
            return p
        })
        .catch(e => {
            toast.error(resolveValue(msgs.error, e), {
                id,
                ...opts,
                ...opts?.error,
            })
        })

    return promise
}

export { toast }
