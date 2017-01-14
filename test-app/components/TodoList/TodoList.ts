import * as $ from 'jquery'
import {Component, Dash, Bkb} from 'bkb'
import Task from "../TaskJQuery/Task"
import Task2 from "../TaskMonkberry/Task"
import Task3 from "../TaskVue/Task"
import RawTemplateProvider from "../../bkb-libraries/RawTemplateProvider"
import TestApp from '../TestApp/TestApp'

const templates = new RawTemplateProvider(require("html-loader!./TodoList.html"))

export default class TodoList implements Component {
  static readonly componentName = 'TodoList'
  readonly bkb: Bkb
  private $container: JQuery
  private $ul: JQuery

  constructor(private dash: Dash<TestApp>, title: string) {
    this.$container = $(templates.getTemplate('.TodoList'))
    this.$container.find('.TodoList-h1').text(title)
    this.$ul = this.$container.find('.TodoList-ul')
    this.$container.find('.TodoList-addBtn').click(() => this.add())
    dash.listenToChildren('grabFocus', {group: 'items'}).call((evt) => {
      console.log(`[Event] [${this.bkb.componentName} ${this.bkb.componentId}] grabFocus`)
      for (const child of dash.find<Task>({group: 'items', componentName: 'Task'})) {
        if (child !== evt.source)
          child.setUpdateMode(false)
      }
    })
  }

  public attachTo(el: HTMLElement) {
    $(el).append(this.$container)
  }

  public add() {
    this.dash.app.log.info('add from todolist')
    const $li = $(templates.getTemplate('.TodoLi'))
    const task = this.dash.create(this.getTaskClass(), {group: 'items'}).attachTo($li.find('.TodoLi-content')[0])
    $li.appendTo(this.$ul).find('.TodoLi-rmBtn').click(() => {
      task.bkb.destroy()
      $li.remove()
    })
  }

  private getTaskClass(): typeof Task {
    let val = this.$ul.children().length % 3
    // console.log('-->', val, this.$ul.children())
    switch (val) {
      case 1:
        return Task2 as any
      case 2:
        return Task3 as any
      case 0:
        return Task
    }
  }
}