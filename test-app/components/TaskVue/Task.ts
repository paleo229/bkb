import {Component, Dash, Bkb} from 'bkb'
import CommentList from '../CommentList/CommentList'
import BkbVueProvider from '../../bkb-libraries/BkbVueProvider';
import TestApp from '../TestApp/TestApp'

const templates = new BkbVueProvider(require("html-loader!./Task.html"))
// import tplStr from './Task.html!text'
// const templates = new BkbVueProvider(tplStr)

export default class Task implements Component {
  static readonly componentName = 'Task'
  readonly bkb: Bkb

  private vm = {
    label: '',
    updMode: true
  };

  constructor(private dash: Dash<TestApp>) {
    this.setUpdateMode(true)
  }

  public attachTo(el: HTMLElement): this {
    templates.attachVue(this.dash, {
      el: el,
      templateName: '.TaskV',
      data: this.vm,
      methods: {
        select: () => {
          this.setUpdateMode(true)
          this.dash.emit('grabFocus')
        }
      },
      childComponents: {CommentList}
    })
    this.dash.emit('grabFocus')
    return this
  }

  public setUpdateMode(mode: boolean) {
    if (this.vm.updMode === mode)
      return
    this.vm.updMode = mode
    this.dash.emit('enabled', mode)
  }
}