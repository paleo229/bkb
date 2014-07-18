/// <reference path='../d.ts/woc.d.ts' />
/// <reference path='../d.ts/jquery.d.ts' />

module wocsingle {
	'use strict';

	export class CloseButton implements woc.Component {

		private disabled: boolean = false;
		private $btn: JQuery;

		// --
		// -- Component
		// --

		constructor(private cc: woc.ComponentContext, props: {}) {
			this.$btn = $(this.cc.getTemplate('.close-btn'));
			if (props['cssClass'])
				this.$btn.addClass(props['cssClass']);
		}

		public getElement(): HTMLElement {
			return this.$btn[0];
		}

		public show(): CloseButton {
			this.$btn.show();
			return this;
		}

		public hide(): CloseButton {
			this.$btn.hide();
			return this;
		}

		public setEnabled(b: boolean): CloseButton {
			this.disabled = !b;
			this.$btn.prop('disabled', this.disabled);
			return this;
		}

		public destruct(removeFromDOM: boolean) {
			if (removeFromDOM)
				this.$btn.remove();
		}

		// --
		// -- Public
		// --

		public setSelected(b: boolean) {
			if (b)
				this.$btn.addClass('btn-cur');
			else
				this.$btn.removeClass('btn-cur');
		}

		public click(cb: Function = null): CloseButton {
			if (cb === null) {
				this.$btn.click();
				return this;
			}
			this.$btn.click((e) => {
				try {
					cb(e);
				} catch (err) {
					this.cc.getService('woc.Log').unexpectedErr(err);
				}
			});
			return this;
		}
	}
}
