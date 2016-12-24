interface CallbackEventOnly {
  mode: 'eventOnly'
  callback: (evt: ComponentEvent<any>) => void
  thisArg?: any
}
interface CallbackDataFirst {
  mode: 'dataFirst'
  callback: (data: any, evt: ComponentEvent<any>) => void
  thisArg?: any
}
interface CallbackArguments {
  mode: 'arguments'
  callback: (...args: any[]) => void
  thisArg?: any
}
type Callback = CallbackEventOnly | CallbackDataFirst | CallbackArguments

class Emitter {
  public static empty(): Transmitter<any> {
    const transmitter = {
      call: () => {
        return transmitter
      },
      disable: () => {
      },
      isDisabled: () => false
    }
    return transmitter
  }

  private eventNames: Set<string>|null
  private strictEvents = false
  private callbacks: Map<string, Callback[]>|null
  private destroyed = false
  private fromEolCancelers: Transmitter<any>[]|null = []

  constructor(private app: InternalApplicationContainer, eventNames?: string[]) {
    if (eventNames)
      this.exposeEvents(eventNames, false)
  }

  public exposeEvents(eventNames: string[], strictEventsMode: boolean): void {
    if (this.destroyed)
      throw new Error(`Cannot call exposeEvents in a destroyed transmitter`)
    if (!this.eventNames)
      this.eventNames = new Set()
    for (const name of eventNames)
      this.eventNames.add(name)
    if (strictEventsMode)
      this.strictEvents = true
  }

  public emit(evt: ComponentEvent<any>): void {
    if (!this.callbacks)
      return
    if (this.strictEvents && this.eventNames && !this.eventNames.has(evt.eventName))
      throw new Error(`Unexposed event: ${evt.eventName}`)
    let cbList = this.callbacks.get(evt.eventName)
    if (cbList)
      this.callCbList(cbList, evt)
  }

  public listen(eventName: string, from?: Container<any>): Transmitter<any> {
    if (this.destroyed || !this.fromEolCancelers)
      throw new Error(`Cannot call listen in a destroyed emitter`)
    if (!this.callbacks)
      this.callbacks = new Map()
    let idList: number[]|null = []
    const isDisabled = () => this.destroyed || !idList
    const transmitter: Transmitter<any> = {
      call: (modeOrCb: any, cbOrThisArg?: any, thisArg?: any) => {
        if (this.destroyed || !idList || !this.callbacks)
          return transmitter
        let cbList = this.callbacks.get(eventName)
        if (!cbList)
          this.callbacks.set(eventName, cbList = [])
        const id = cbList.length
        idList.push(id)
        if (typeof modeOrCb === 'string') {
          cbList[id] = {
            mode: modeOrCb as any,
            callback: cbOrThisArg,
            thisArg
          }
        } else {
          cbList[id] = {
            mode: 'eventOnly',
            callback: modeOrCb,
            thisArg: cbOrThisArg
          }
        }
        return transmitter
      },
      disable: () => {
        if (isDisabled() || !this.callbacks)
          return
        let cbList = this.callbacks.get(eventName)
        if (cbList) {
          for (const id of idList!)
            delete cbList[id]
        }
        idList = null
        if (fromEolCanceler) {
          fromEolCanceler()
          fromEolCanceler = null
        }
      },
      isDisabled
    }
    let fromEolCanceler
    if (from && from.bkb) {
      const destroyTransmitter = from.bkb.listen('destroy').call(() => transmitter.disable()),
        cancelerId = this.fromEolCancelers.length
      this.fromEolCancelers[cancelerId] = destroyTransmitter
      fromEolCanceler = () => {
        destroyTransmitter.disable()
        if (this.fromEolCancelers)
          delete this.fromEolCancelers[cancelerId]
      }
    } else
      fromEolCanceler = null
    return transmitter
  }

  public destroy(): void {
    if (this.fromEolCancelers) {
      for (const i in this.fromEolCancelers) {
        if (this.fromEolCancelers.hasOwnProperty(i))
          this.fromEolCancelers[i].disable()
      }
    }
    this.fromEolCancelers = null
    this.callbacks = null
    this.eventNames = null
    this.destroyed = true
  }

  private callCbList(cbList: Callback[], evt: ComponentEvent<any>) {
    for (const i in cbList) {
      if (!cbList.hasOwnProperty(i))
        continue
      try {
        call(cbList[i], evt)
      } catch (e) {
        this.app.errorHandler(e)
      }
    }
  }
}

function call(cb: Callback, evt: ComponentEvent<any>) {
  switch (cb.mode) {
    case 'dataFirst':
      if (cb.thisArg)
        cb.callback.call(cb.thisArg, evt.data, evt)
      else
        cb.callback(evt.data, evt)
      break
    case 'arguments':
      if (cb.thisArg)
        cb.callback.apply(cb.thisArg, evt.data)
      else
        cb.callback(...evt.data)
      break
    case 'eventOnly':
    default:
      if (cb.thisArg)
        cb.callback.call(cb.thisArg, evt)
      else
        cb.callback(evt)
      break
  }
}